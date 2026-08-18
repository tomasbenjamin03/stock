import React, { useState } from "react";
import { 
  Search, 
  Tag, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check, 
  ShieldAlert, 
  Package, 
  ArrowUpDown, 
  Sparkles,
  Receipt,
  CheckCircle,
  Clock
} from "lucide-react";

export default function ClientCatalog({
  stock,
  onAddToCart,
  cartItems,
  onOpenCart,
  onOpenOrders,
  ordersCount,
  currentUser
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [sortBy, setSortBy] = useState("destacados"); // "destacados" | "precio-asc" | "precio-desc" | "nombre"
  const [quantities, setQuantities] = useState({});
  const [addedItemEffect, setAddedItemEffect] = useState(null);

  const getQuantityFor = (id) => quantities[id] || 1;

  const setQuantityFor = (id, val, max) => {
    const clamped = Math.max(1, Math.min(val, max));
    setQuantities(prev => ({ ...prev, [id]: clamped }));
  };

  const handleAdd = (item) => {
    const qty = getQuantityFor(item.id);
    onAddToCart(item, qty);
    
    // Animation effect
    setAddedItemEffect(item.id);
    setTimeout(() => setAddedItemEffect(null), 1200);
    
    // Reset quantity input to 1
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  // Filter stock
  const filteredStock = stock.filter((item) => {
    const matchesCat = selectedCategory === "todos" || item.propiedades.categoria === selectedCategory;
    const matchesSearch = item.propiedades.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort stock
  const sortedStock = [...filteredStock].sort((a, b) => {
    if (sortBy === "precio-asc") return a.propiedades.precio - b.propiedades.precio;
    if (sortBy === "precio-desc") return b.propiedades.precio - a.propiedades.precio;
    if (sortBy === "nombre") return a.propiedades.nombre.localeCompare(b.propiedades.nombre);
    return 0;
  });

  const totalCartCount = cartItems.reduce((acc, el) => acc + el.cantidad, 0);

  const categoryBadge = (cat) => {
    switch (cat) {
      case "Motor":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Motor</span>;
      case "Suspensión":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Suspensión</span>;
      case "Frenos":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">Frenos</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">{cat}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="client-store-view">
      {/* Welcome Banner for Client */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-[10.5px] font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
              Portal de Compras Online
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
              Hola, {currentUser?.nombre || "Comprador"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explora y adquiere autopartes certificadas con stock en tiempo real. Selecciona las piezas deseadas y confirma tu pedido en segundos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenOrders}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Mis Compras</span>
              {ordersCount > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                  {ordersCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ver Carrito</span>
              <span className="bg-white text-emerald-800 text-xs font-mono font-black px-2 py-0.5 rounded-full shadow-xs">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar autoparte por nombre..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all"
          />
        </div>

        {/* Categories & Sorting */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-hidden cursor-pointer"
            >
              <option value="todos">Todas las categorías</option>
              <option value="Motor">Motor</option>
              <option value="Suspensión">Suspensión</option>
              <option value="Frenos">Frenos</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-hidden cursor-pointer"
            >
              <option value="destacados">Orden por defecto</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="nombre">Alfabético (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Package className="w-4 h-4 text-indigo-600" />
            Catálogo Disponible ({sortedStock.length} productos)
          </p>
          {searchQuery && (
            <span className="text-[10.5px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              Filtrado por: "{searchQuery}"
            </span>
          )}
        </div>

        {sortedStock.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
            <Package className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-700">No encontramos autopartes con ese criterio</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Intenta cambiar la categoría o el término de búsqueda para ver más repuestos disponibles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="catalog-products-grid">
            {sortedStock.map((item) => {
              const { id, propiedades } = item;
              const { nombre, categoria, cantidad, precio } = propiedades;
              const isOutOfStock = cantidad <= 0;
              const isLowStock = cantidad > 0 && cantidad <= 5;
              const currentQty = getQuantityFor(id);
              const isJustAdded = addedItemEffect === id;

              // Check how many of this item is already in cart
              const cartItem = cartItems.find(c => c.id === id);
              const inCartCount = cartItem ? cartItem.cantidad : 0;
              const remainingAvailable = Math.max(0, cantidad - inCartCount);

              return (
                <div
                  key={id}
                  className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between p-5 hover:shadow-md ${
                    isOutOfStock 
                      ? "border-slate-200 opacity-75 bg-slate-50/50" 
                      : isJustAdded
                      ? "border-emerald-500 ring-2 ring-emerald-400/30"
                      : "border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Category & Stock Status */}
                    <div className="flex items-center justify-between gap-2">
                      {categoryBadge(categoria)}

                      {isOutOfStock ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> Agotado
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                          ¡Últimas {cantidad} unid.!
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-500 bg-slate-100">
                          {cantidad} disponibles
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 text-sm leading-snug min-h-[2.5rem]">
                      {nombre}
                    </h3>

                    {/* Price */}
                    <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Precio Unitario
                      </span>
                      <span className="text-lg font-black font-mono text-slate-900">
                        ${precio.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {inCartCount > 0 && (
                      <p className="text-[10.5px] text-indigo-700 font-medium bg-indigo-50/70 px-2 py-1 rounded border border-indigo-100 flex items-center justify-between">
                        <span>En tu carrito:</span>
                        <strong className="font-mono">{inCartCount} un.</strong>
                      </p>
                    )}
                  </div>

                  {/* Actions & Quantity */}
                  <div className="pt-4 mt-4 border-t border-slate-100 space-y-2.5">
                    {!isOutOfStock ? (
                      <div className="flex items-center gap-2">
                        {/* Quantity picker */}
                        <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 p-0.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setQuantityFor(id, currentQty - 1, remainingAvailable || cantidad)}
                            disabled={currentQty <= 1}
                            className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-30 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold text-slate-800">
                            {currentQty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantityFor(id, currentQty + 1, remainingAvailable || cantidad)}
                            disabled={currentQty >= (remainingAvailable || cantidad)}
                            className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-30 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Add to Cart button */}
                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          disabled={remainingAvailable <= 0}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                            isJustAdded
                              ? "bg-emerald-600 text-white"
                              : remainingAvailable <= 0
                              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>¡Agregado!</span>
                            </>
                          ) : remainingAvailable <= 0 ? (
                            <span>Límite en carrito</span>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Comprar</span>
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider rounded-lg cursor-not-allowed border border-slate-200"
                      >
                        Sin Stock Disponible
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
