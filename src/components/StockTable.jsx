import React, { useState } from "react";
import { Edit, Trash2, ArrowUpDown, ShieldAlert, PackageOpen, ShoppingBag } from "lucide-react";

export default function StockTable({ 
  items, 
  onEdit, 
  onEliminar, 
  isAdmin = true, 
  onAddToCart 
}) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortedItems = () => {
    if (!sortField) return items;

    return [...items].sort((a, b) => {
      let valA = "";
      let valB = "";

      switch (sortField) {
        case "nombre":
          valA = a.propiedades.nombre.toLowerCase();
          valB = b.propiedades.nombre.toLowerCase();
          break;
        case "categoria":
          valA = a.propiedades.categoria.toLowerCase();
          valB = b.propiedades.categoria.toLowerCase();
          break;
        case "cantidad":
          valA = a.propiedades.cantidad;
          valB = b.propiedades.cantidad;
          break;
        case "precio":
          valA = a.propiedades.precio;
          valB = b.propiedades.precio;
          break;
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const categoryBadge = (cat) => {
    switch (cat) {
      case "Motor":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Motor
          </span>
        );
      case "Suspensión":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Suspensión
          </span>
        );
      case "Frenos":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            Frenos
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
            {cat}
          </span>
        );
    }
  };

  const sortedItems = getSortedItems();

  return (
    <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden" id="table-container">
      {sortedItems.length === 0 ? (
        <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-3" id="empty-stock-state">
          <PackageOpen className="w-12 h-12 text-slate-300" />
          <div>
            <p className="text-sm font-bold text-slate-700">No se encontraron autopartes</p>
            <p className="text-[11px] text-slate-400 max-w-xs mt-1 leading-relaxed">
              Pruebe a modificar los filtros, realice otra búsqueda o agregue una nueva pieza arriba.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="block sm:hidden divide-y divide-slate-100 bg-white" id="tabla-autopartes-mobile">
            {sortedItems.map((item) => {
              const isOutOfStock = item.propiedades.cantidad === 0;
              const isLowStock = item.propiedades.cantidad > 0 && item.propiedades.cantidad <= 5;
              return (
                <div key={item.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 text-sm break-words">{item.propiedades.nombre}</h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {categoryBadge(item.propiedades.categoria)}
                        {isOutOfStock && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-700 border border-red-200">
                            Sin stock
                          </span>
                        )}
                        {isLowStock && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                            Stock bajo ({item.propiedades.cantidad})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">Precio</p>
                      <p className="text-sm font-bold font-mono text-slate-950">
                        ${item.propiedades.precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100/50 text-xs text-slate-500 gap-2">
                    <div>
                      <span>Cantidad: </span>
                      <strong className={`font-mono ${isOutOfStock ? "text-red-500 font-black" : "text-slate-800"}`}>
                        {item.propiedades.cantidad}
                      </strong>
                    </div>
                    <div className="flex gap-2">
                      {isAdmin ? (
                        <>
                          <button
                            onClick={() => onEdit(item)}
                            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => onEliminar(item.id)}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => onAddToCart && onAddToCart(item, 1)}
                          disabled={isOutOfStock}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-[11px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>{isOutOfStock ? "Sin Stock" : "Comprar"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse" id="tabla-autopartes">
            <thead>
              <tr className="bg-slate-900 text-slate-200 border-b border-slate-800 text-[10px] uppercase font-bold tracking-wider">
                <th 
                  onClick={() => handleSort("nombre")} 
                  className="px-6 py-4 font-bold cursor-pointer select-none hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-1.5">
                    <span>Nombre</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort("categoria")} 
                  className="px-6 py-4 font-bold cursor-pointer select-none hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-1.5">
                    <span>Categoría</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort("cantidad")} 
                  className="px-6 py-4 font-bold text-center cursor-pointer select-none hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center justify-center space-x-1.5">
                    <span>Cantidad</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort("precio")} 
                  className="px-6 py-4 font-bold text-right cursor-pointer select-none hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center justify-end space-x-1.5">
                    <span>Precio ($)</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th className="px-6 py-4 font-bold text-center tracking-widest text-slate-400">
                  {isAdmin ? "Acciones (Admin)" : "Comprar"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100" id="tablaStock">
              {sortedItems.map((item) => {
                const isOutOfStock = item.propiedades.cantidad === 0;
                const isLowStock = item.propiedades.cantidad > 0 && item.propiedades.cantidad <= 5;

                return (
                  <tr 
                    key={item.id} 
                    className="hover:bg-slate-50/70 transition-colors group text-xs text-slate-700"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div className="flex flex-col">
                        <span>{item.propiedades.nombre}</span>
                        {isOutOfStock && (
                          <span className="text-[9px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                            <ShieldAlert className="w-3 h-3 text-red-500" /> Sin stock
                          </span>
                        )}
                        {isLowStock && (
                          <span className="text-[9px] text-amber-600 font-bold uppercase tracking-wider mt-0.5">
                            Stock bajo: {item.propiedades.cantidad} disp.
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {categoryBadge(item.propiedades.categoria)}
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-slate-700">
                      <span className={isOutOfStock ? "text-red-500 font-black" : ""}>
                        {item.propiedades.cantidad}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                      ${item.propiedades.precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isAdmin ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEdit(item)}
                            className="editar px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-[10px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                            title="Editar"
                          >
                            <Edit className="w-3 h-3" />
                            <span className="hidden md:inline">Editar</span>
                          </button>
                          <button
                            onClick={() => onEliminar(item.id)}
                            className="eliminar px-3 py-1.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span className="hidden md:inline">Eliminar</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => onAddToCart && onAddToCart(item, 1)}
                            disabled={isOutOfStock}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-[10px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>{isOutOfStock ? "Sin Stock" : "Comprar"}</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
}
