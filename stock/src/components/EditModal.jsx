import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";

export default function EditModal({ isOpen, item, onClose, onSave }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Motor");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (item) {
      setNombre(item.propiedades.nombre);
      setCategoria(item.propiedades.categoria);
      setCantidad(item.propiedades.cantidad.toString());
      setPrecio(item.propiedades.precio.toString());
      setError(null);
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }

    const parsedCantidad = parseInt(cantidad, 10);
    if (isNaN(parsedCantidad) || parsedCantidad < 0) {
      setError("La cantidad debe ser un número entero mayor o igual a 0.");
      return;
    }

    const parsedPrecio = parseFloat(precio);
    if (isNaN(parsedPrecio) || parsedPrecio < 0) {
      setError("El precio debe ser un número mayor o igual a 0.");
      return;
    }

    onSave(item.id, {
      nombre: nombre.trim(),
      categoria,
      cantidad: parsedCantidad,
      precio: parsedPrecio,
    });
    onClose();
  };

  return (
    <div 
      id="edit-modal-backdrop"
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in"
    >
      <div 
        id="edit-modal-content"
        className="bg-white rounded-lg shadow-xl border border-slate-200 max-w-md w-full overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-sm uppercase tracking-tight text-slate-900 font-display">
            Editar Autoparte
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5" htmlFor="edit-nombre">
              Nombre de la Autoparte
            </label>
            <input
              type="text"
              id="edit-nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all duration-150"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5" htmlFor="edit-categoria">
              Categoría
            </label>
            <select
              id="edit-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all duration-150"
            >
              <option value="Motor">Motor</option>
              <option value="Suspensión">Suspensión</option>
              <option value="Frenos">Frenos</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5" htmlFor="edit-cantidad">
                Cantidad
              </label>
              <input
                type="number"
                id="edit-cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                min="0"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5" htmlFor="edit-precio">
                Precio ($)
              </label>
              <input
                type="number"
                id="edit-precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                step="0.01"
                min="0"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all duration-150"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
