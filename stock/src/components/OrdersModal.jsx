import React from "react";
import { 
  X, 
  ShoppingBag, 
  Calendar, 
  CreditCard, 
  Truck, 
  Receipt, 
  User, 
  PackageCheck, 
  DollarSign 
} from "lucide-react";

export default function OrdersModal({ 
  isOpen, 
  onClose, 
  orders = [], 
  currentUser 
}) {
  if (!isOpen) return null;

  const isAdmin = currentUser?.rol === "admin";
  
  // If client, filter to only orders made by this user (or all if user matches)
  const visibleOrders = isAdmin 
    ? orders 
    : orders.filter(o => !o.userId || o.userId === currentUser?.id || o.userEmail === currentUser?.email);

  const totalSalesRevenue = visibleOrders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalItemsSold = visibleOrders.reduce((acc, o) => acc + (o.totalUnidades || 0), 0);

  return (
    <div 
      id="orders-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in"
    >
      <div 
        id="orders-modal-card"
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white ${isAdmin ? "bg-indigo-600" : "bg-emerald-600"}`}>
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-white">
                {isAdmin ? "Historial de Ventas del Sistema" : "Mis Compras Realizadas"}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                {visibleOrders.length} {visibleOrders.length === 1 ? "pedido registrado" : "pedidos registrados"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Summary Stats */}
        {isAdmin && visibleOrders.length > 0 && (
          <div className="bg-slate-50 border-b border-slate-200 p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                Total Facturado
              </span>
              <span className="text-sm font-bold font-mono text-emerald-700">
                ${totalSalesRevenue.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                Unidades Vendidas
              </span>
              <span className="text-sm font-bold font-mono text-slate-900">
                {totalItemsSold} autopartes
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                Total de Órdenes
              </span>
              <span className="text-sm font-bold font-mono text-indigo-700">
                {visibleOrders.length} transacciones
              </span>
            </div>
          </div>
        )}

        {/* Orders list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {visibleOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-300">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="font-bold text-xs uppercase tracking-wider text-slate-600">
                {isAdmin ? "No hay ventas registradas aún" : "Aún no has realizado ninguna compra"}
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {isAdmin 
                  ? "Las compras confirmadas por los clientes aparecerán automáticamente aquí."
                  : "Explora el catálogo y añade autopartes al carrito para realizar tu primer pedido."}
              </p>
            </div>
          ) : (
            visibleOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
              >
                {/* Order Top Bar */}
                <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {order.id}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(order.fecha).toLocaleString("es-AR")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        {order.userName || order.userEmail || "Cliente"}
                      </span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <PackageCheck className="w-3 h-3 text-emerald-600" />
                      Aprobado
                    </span>
                  </div>
                </div>

                {/* Items Purchased in Order */}
                <div className="p-4 divide-y divide-slate-100">
                  <div className="space-y-2 pb-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                            {item.cantidad}x
                          </span>
                          <span className="text-slate-800 font-bold truncate">
                            {item.nombre}
                          </span>
                          <span className="text-[9px] uppercase font-bold text-slate-400">
                            ({item.categoria})
                          </span>
                        </div>
                        <span className="font-mono font-bold text-slate-900 shrink-0">
                          ${(item.cantidad * item.precio).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Meta */}
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-slate-400" />
                        <strong className="uppercase">{order.metodoPago || "Pago"}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3 text-slate-400" />
                        <span className="capitalize">{order.metodoEnvio || "Retiro"}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Total:</span>
                      <span className="font-mono text-sm font-black text-emerald-700">
                        ${order.total?.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
