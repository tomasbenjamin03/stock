import React from "react";
import { DollarSign, Package, Tag } from "lucide-react";

export default function Metrics({
  totalItems,
  valorTotal,
  filteredCount,
  activeFilter,
  categoryTotals = { Motor: 0, Suspensión: 0, Frenos: 0 },
 }) {
  return (
    <div className="space-y-4 mb-6 animate-fade-in" id="metricas-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          id="metric-card-items"
          className="bg-white rounded-lg shadow-xs border border-slate-200 p-5 flex items-center space-x-4 transition-all duration-200 hover:shadow-md"
        >
          <div className="p-3 rounded bg-slate-100 text-slate-700">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Total de Piezas Visibles
            </p>
            <p className="text-2xl font-bold font-mono tracking-tight text-slate-900" id="total-items-value">
              {totalItems}
            </p>
          </div>
        </div>

        <div 
          id="metric-card-value"
          className="bg-white rounded-lg shadow-xs border border-slate-200 p-5 flex items-center space-x-4 transition-all duration-200 hover:shadow-md"
        >
          <div className="p-3 rounded bg-emerald-50 text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Valor de Selección
            </p>
            <p className="text-2xl font-bold font-mono tracking-tight text-slate-900" id="total-value-value">
              ${valorTotal.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div 
          id="metric-card-filter"
          className="bg-white rounded-lg shadow-xs border border-slate-200 p-5 flex items-center space-x-4 transition-all duration-200 hover:shadow-md"
        >
          <div className="p-3 rounded bg-indigo-50 text-indigo-700">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Filtro Activo
            </p>
            <p className="text-base font-bold text-slate-900 truncate" id="active-filter-value">
              {activeFilter === "todos" ? "Todas las categorías" : activeFilter}
            </p>
            <p className="text-xs text-slate-500 font-medium font-mono">
              {filteredCount} de autopartes visibles
            </p>
          </div>
        </div>
      </div>

      <div 
        id="metric-categories-breakdown" 
        className="bg-white rounded-lg border border-slate-200 p-5 transition-all duration-200 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div className="shrink-0">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold block mb-1">
            Métricas de Inventario
          </span>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
            Suma de Stock por Categoría
          </h3>
          <p className="text-[10.5px] text-slate-500 mt-0.5">Suma total de unidades físicas disponibles</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 flex-1 justify-end">
          {Object.entries(categoryTotals || {}).map(([category, count]) => {
            const barColors = {
              "Motor": "bg-amber-500",
              "Suspensión": "bg-indigo-600",
              "Frenos": "bg-rose-500"
            };
            const labelColors = {
              "Motor": "text-amber-700",
              "Suspensión": "text-indigo-700",
              "Frenos": "text-rose-700"
            };
            const barCls = barColors[category] || "bg-slate-500";
            const textCls = labelColors[category] || "text-slate-700";
            
            const overallCategorySum = Object.values(categoryTotals || {}).reduce((s, val) => s + (val || 0), 0) || 1;
            const percentage = Math.min(100, Math.round(((count || 0) / overallCategorySum) * 100));

            return (
              <div 
                key={category} 
                className="flex items-center space-x-3 text-xs bg-slate-50/70 p-3 rounded-lg border border-slate-100 min-w-[155px] flex-1 lg:flex-initial"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`font-bold uppercase text-[10px] tracking-wider ${textCls}`}>{category}</span>
                    <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs shadow-3xs">
                      {count} <span className="text-[9px] text-slate-400 font-sans font-normal">u.</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${barCls} transition-all duration-500`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-slate-400 text-right mt-1 font-mono leading-none">
                    {percentage}% del total
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
