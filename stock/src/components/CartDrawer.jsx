import React, { useState } from "react";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  CreditCard, 
  Truck, 
  ShieldCheck 
} from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  stock
}) {
  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [shippingMethod, setShippingMethod] = useState("retiro");
  const [customerNotes, setCustomerNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(null);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + (item.cantidad * item.precio);
  }, 0);

  const totalUnits = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  const handleConfirmPurchase = () => {
    if (cartItems.length === 0) return;

    // Verify stock availability
    for (const item of cartItems) {
      const stockItem = stock.find(s => s.id === item.id);
      const available = stockItem ? stockItem.propiedades.cantidad : 0;
      if (item.cantidad > available) {
        alert(`No hay suficiente stock para "${item.nombre}". Stock disponible: ${available}`);
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        fecha: new Date().toISOString(),
        items: [...cartItems],
        total: totalAmount,
        totalUnidades: totalUnits,
        metodoPago: paymentMethod,
        metodoEnvio: shippingMethod,
        notas: customerNotes
      };

      onCheckout(newOrder);
      setIsProcessing(false);
      setCheckoutCompleted(newOrder);
    }, 600);
  };

  const handleCloseAndReset = () => {
    setCheckoutCompleted(null);
    onClose();
  };

  return (
    <div 
      id="cart-drawer-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-end z-50 animate-fade-in"
    >
      <div 
        id="cart-drawer-panel"
        className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slide-left overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-white">
                Carrito de Compras
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"} seleccionadas
              </p>
            </div>
          </div>
          <button 
            onClick={handleCloseAndReset}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {checkoutCompleted ? (
            <div className="p-6 bg-white rounded-xl border border-emerald-200 text-center space-y-4 my-auto shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Compra Exitosa
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2 font-display">
                  ¡Gracias por tu compra!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Tu pedido <strong>#{checkoutCompleted.id}</strong> ha sido confirmado y procesado en el inventario.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Fecha:</span>
                  <span className="font-medium text-slate-900">{new Date(checkoutCompleted.fecha).toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Método de pago:</span>
                  <span className="font-bold text-slate-900 uppercase text-[10px]">{checkoutCompleted.metodoPago}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Entrega:</span>
                  <span className="font-medium text-slate-900 capitalize">{checkoutCompleted.metodoEnvio}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Abonado:</span>
                  <span className="text-emerald-700 font-mono">
                    ${checkoutCompleted.total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-xs"
              >
                Seguir Comprando
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-bold text-sm text-slate-700">Tu carrito está vacío</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explora nuestro catálogo de autopartes y agrega los repuestos que necesites para tu vehículo.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-block mt-2"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-2.5">
                {cartItems.map((item) => {
                  const stockItem = stock.find(s => s.id === item.id);
                  const maxAvailable = stockItem ? stockItem.propiedades.cantidad : 0;
                  const itemSubtotal = item.cantidad * item.precio;

                  return (
                    <div 
                      key={item.id} 
                      className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between gap-3 transition-all hover:border-slate-300"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {item.categoria}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Disp: {maxAvailable} u.
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.nombre}
                        </h4>
                        <p className="text-xs font-bold font-mono text-emerald-700 mt-0.5">
                          ${item.precio.toLocaleString("es-AR", { minimumFractionDigits: 2 })} <span className="text-[9px] font-normal text-slate-400">c/u</span>
                        </p>
                      </div>

                      {/* Quantity selector */}
                      <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-md border border-slate-200">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                          className="w-6 h-6 rounded flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-bold text-slate-900">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                          disabled={item.cantidad >= maxAvailable}
                          className="w-6 h-6 rounded flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                          title={item.cantidad >= maxAvailable ? "Stock máximo alcanzado" : "Añadir unidad"}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal & Delete */}
                      <div className="text-right shrink-0">
                        <p className="text-xs font-black font-mono text-slate-900">
                          ${itemSubtotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                        </p>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[10px] text-red-500 hover:text-red-700 hover:underline flex items-center gap-0.5 ml-auto mt-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Quitar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Preferences / Options */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Opciones de Compra
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                    Forma de Pago
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "transferencia", label: "Transferencia" },
                      { id: "efectivo", label: "Efectivo" },
                      { id: "tarjeta", label: "Tarjeta" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPaymentMethod(opt.id)}
                        className={`py-1.5 px-2 rounded text-[10px] font-bold uppercase tracking-wider border text-center transition-all cursor-pointer ${
                          paymentMethod === opt.id
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-indigo-600" />
                    Entrega
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "retiro", label: "Retiro en Local" },
                      { id: "envio", label: "Envío a Domicilio" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setShippingMethod(opt.id)}
                        className={`py-1.5 px-2 rounded text-[10px] font-bold uppercase tracking-wider border text-center transition-all cursor-pointer ${
                          shippingMethod === opt.id
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Notas o aclaraciones para el pedido (opcional)
                  </label>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Ej. Entregar después de las 14hs..."
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with totals & action */}
        {!checkoutCompleted && cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-slate-200 space-y-3 shrink-0 shadow-lg">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalUnits} autopartes):</span>
                <span className="font-mono font-bold text-slate-800">
                  ${totalAmount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Descuento de compras online:</span>
                <span className="font-mono font-bold">$0.00</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900">Total Final:</span>
                <span className="font-mono text-xl font-black text-emerald-700">
                  ${totalAmount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClearCart}
                className="px-3 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                title="Vaciar carrito"
              >
                Vaciar
              </button>
              <button
                type="button"
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                {isProcessing ? (
                  <span>Procesando pedido...</span>
                ) : (
                  <>
                    <span>Confirmar y Comprar</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
