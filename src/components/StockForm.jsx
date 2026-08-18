import React, { useState } from "react";
import { PlusCircle, Info, Tag, Package, DollarSign } from "lucide-react";

export default function StockForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("Por favor, ingrese el nombre de la autoparte.");
      return;
    }
    if (!categoria) {
      setError("Por favor, seleccione una categoría válida.");
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

    onAdd(nombre.trim(), categoria, parsedCantidad, parsedPrecio);
    setNombre("");
    setCategoria("");
    setCantidad("");
    setPrecio("");
    setError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-6 mb-6" id="form-container">
      <h2 className="text-sm font-bold uppercase tracking-tight text-slate-900 font-display mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-600" />
        Agregar Autoparte
      </h2>

      {error && (
        <div id="form-error-banner" className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} id="autoparte" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label htmlFor="nombre" className="sr-only">Nombre</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <span className="text-xs font-mono">ABC</span>
          </div>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la autoparte"
            required
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all duration-150 text-gray-800"
          />
        </div>

        <div className="relative">
          <label htmlFor="categoria" className="sr-only">Categoría</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Tag className="w-4 h-4" />
          </div>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all duration-150 text-gray-800 appearance-none"
          >
            <option value="">Seleccionar categoría</option>
            <option value="Motor">Motor</option>
            <option value="Suspensión">Suspensión</option>
            <option value="Frenos">Frenos</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        <div className="relative">
          <label htmlFor="cantidad" className="sr-only">Cantidad</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Package className="w-4 h-4" />
          </div>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Cantidad"
            min="0"
            required
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all duration-150 text-gray-800"
          />
        </div>

        <div className="relative">
          <label htmlFor="precio" className="sr-only">Precio</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio ($)"
            step="0.01"
            min="0"
            required
            className="w-full pl-9 pr-14 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all duration-150 text-gray-800"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-xs text-gray-400 font-mono">ARS</span>
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-4 flex justify-end mt-2">
          <button
            type="submit"
            id="btn-agregar-autoparte"
            className="w-full md:w-auto px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-all duration-150 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Agregar Autoparte
          </button>
        </div>
      </form>
    </div>
  );
}
