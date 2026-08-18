import React, { useState, useEffect } from "react";
import { 
  Search, 
  CheckCircle, 
  Tag, 
  CornerDownRight,
  AlertTriangle,
  AlertCircle,
  User,
  ShieldCheck,
  ShoppingBag,
  LogIn,
  LogOut,
  Receipt,
  UserPlus,
  ArrowRightLeft,
  Sparkles,
  LayoutDashboard,
  Store
} from "lucide-react";

import Metrics from "./components/Metrics";
import StockForm from "./components/StockForm";
import StockTable from "./components/StockTable";
import EditModal from "./components/EditModal";
import AuthModal from "./components/AuthModal";
import CartDrawer from "./components/CartDrawer";
import OrdersModal from "./components/OrdersModal";
import ClientCatalog from "./components/ClientCatalog";

const DEMO_STOCK = [
  {
    id: 1718318100000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Pastillas de Freno Brembo",
      categoria: "Frenos",
      cantidad: 14,
      precio: 8500.50,
    }
  },
  {
    id: 1718318200000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Amortiguador Corven Delantero",
      categoria: "Suspensión",
      cantidad: 8,
      precio: 24700.00,
    }
  },
  {
    id: 1718318300000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Pistones de Motor de Calidad",
      categoria: "Motor",
      cantidad: 4,
      precio: 52000.00,
    }
  },
  {
    id: 1718318400000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Discos de Freno Ventilados",
      categoria: "Frenos",
      cantidad: 0,
      precio: 15300.25,
    }
  },
  {
    id: 1718318500000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Kit Espirales Progresivos",
      categoria: "Suspensión",
      cantidad: 6,
      precio: 31000.90,
    }
  },
  {
    id: 1718318600000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Bujías Iridium NGK x4",
      categoria: "Motor",
      cantidad: 32,
      precio: 2100.00,
    }
  },
  {
    id: 1718318700000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Filtro de Aceite Fram Premium",
      categoria: "Motor",
      cantidad: 25,
      precio: 1500.00,
    }
  },
  {
    id: 1718318800000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Correa de Distribución Gates",
      categoria: "Motor",
      cantidad: 12,
      precio: 9800.00,
    }
  },
  {
    id: 1718318900000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Junta de Tapa de Cilindros Taranto",
      categoria: "Motor",
      cantidad: 5,
      precio: 14500.00,
    }
  },
  {
    id: 1718319000000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Extremo de Dirección Thompson",
      categoria: "Suspensión",
      cantidad: 15,
      precio: 7200.00,
    }
  },
  {
    id: 1718319100000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Parrilla de Suspensión Nakata",
      categoria: "Suspensión",
      cantidad: 7,
      precio: 18300.00,
    }
  },
  {
    id: 1718319200000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Cazoleta de Amortiguador VTH",
      categoria: "Suspensión",
      cantidad: 10,
      precio: 5400.00,
    }
  },
  {
    id: 1718319300000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Líquido de Freno Bosch DOT 4",
      categoria: "Frenos",
      cantidad: 40,
      precio: 1800.00,
    }
  },
  {
    id: 1718319400000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Caliper de Freno Brembo",
      categoria: "Frenos",
      cantidad: 3,
      precio: 34000.00,
    }
  },
  {
    id: 1718319500000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Servo Freno Doble Diafragma",
      categoria: "Frenos",
      cantidad: 2,
      precio: 45000.00,
    }
  },
  {
    id: 1718319600000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Alternador Valeo 12V 90A",
      categoria: "Motor",
      cantidad: 6,
      precio: 28500.00,
    }
  },
  {
    id: 1718319700000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Bomba de Agua Dolz",
      categoria: "Motor",
      cantidad: 9,
      precio: 16400.00,
    }
  },
  {
    id: 1718319800000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Bobina de Encendido Bosch",
      categoria: "Motor",
      cantidad: 18,
      precio: 12200.00,
    }
  },
  {
    id: 1718319900000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Kit de Bujes de Parrilla VTH",
      categoria: "Suspensión",
      cantidad: 22,
      precio: 4300.00,
    }
  },
  {
    id: 1718320000000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Rótula de Suspensión Thompson",
      categoria: "Suspensión",
      cantidad: 14,
      precio: 6850.00,
    }
  },
  {
    id: 1718320100000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Barra Estabilizadora SKF",
      categoria: "Suspensión",
      cantidad: 4,
      precio: 19200.00,
    }
  },
  {
    id: 1718320200000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Cables de Freno de Mano Fremax",
      categoria: "Frenos",
      cantidad: 11,
      precio: 3200.00,
    }
  },
  {
    id: 1718320300000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Cilindro de Rueda Trasera LPR",
      categoria: "Frenos",
      cantidad: 16,
      precio: 4900.00,
    }
  },
  {
    id: 1718320400000,
    tipo: "autoparte",
    propiedades: {
      nombre: "Sensor ABS Delantero Bosch",
      categoria: "Frenos",
      cantidad: 8,
      precio: 11400.00,
    }
  },
];

const INITIAL_USERS = [
  {
    id: "admin-default",
    nombre: "Tomás Galván",
    email: "Tomas.galvan@admin.com",
    password: "Tomasadmin123",
    rol: "admin",
    fechaRegistro: new Date().toISOString()
  },
  {
    id: "client-default",
    nombre: "Juan Comprador",
    email: "cliente@autopartes.com",
    password: "123",
    rol: "cliente",
    fechaRegistro: new Date().toISOString()
  }
];

export default function App() {
  // Stock State
  const [stock, setStock] = useState(() => {
    try {
      const stored = localStorage.getItem("stock");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const parsedNames = new Set(parsed.map(item => item.propiedades?.nombre?.toLowerCase().trim()).filter(Boolean));
          const missingDemoItems = DEMO_STOCK.filter(demo => !parsedNames.has(demo.propiedades.nombre.toLowerCase().trim()));
          if (missingDemoItems.length > 0) {
            return [...parsed, ...missingDemoItems];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error al cargar stock inicial de localStorage:", e);
    }
    return DEMO_STOCK;
  });

  // Users State
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem("autopartes_users");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Keep registered clients and update admin credentials
          const nonAdmins = parsed.filter(u => u.rol !== "admin" && u.email.toLowerCase() !== "tomas.galvan@admin.com" && u.email.toLowerCase() !== "admin@autopartes.com");
          return [INITIAL_USERS[0], ...nonAdmins];
        }
      }
    } catch (e) {
      console.error("Error cargando usuarios:", e);
    }
    return INITIAL_USERS;
  });

  // Current Authenticated User State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("autopartes_current_user");
      if (stored) {
        const parsedUser = JSON.parse(stored);
        if (parsedUser.rol === "admin" || parsedUser.email?.toLowerCase() === "tomas.galvan@admin.com" || parsedUser.email?.toLowerCase() === "admin@autopartes.com") {
          return INITIAL_USERS[0];
        }
        return parsedUser;
      }
    } catch (e) {
      console.error("Error cargando usuario actual:", e);
    }
    // Default initial user is Admin for immediate usability
    return INITIAL_USERS[0];
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("autopartes_cart");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Error cargando carrito:", e);
    }
    return [];
  });

  // Orders / Sales History State
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem("autopartes_orders");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Error cargando pedidos:", e);
    }
    return [
      {
        id: "ORD-928174",
        fecha: new Date(Date.now() - 3600000 * 24).toISOString(),
        userId: "client-default",
        userName: "Juan Comprador",
        userEmail: "cliente@autopartes.com",
        items: [
          { id: 1718318600000, nombre: "Bujías Iridium NGK x4", categoria: "Motor", precio: 2100.00, cantidad: 2 },
          { id: 1718318700000, nombre: "Filtro de Aceite Fram Premium", categoria: "Motor", precio: 1500.00, cantidad: 1 }
        ],
        total: 5700.00,
        totalUnidades: 3,
        metodoPago: "transferencia",
        metodoEnvio: "retiro"
      }
    ];
  });

  // UI Modals & Filtering State
  const [filtro, setFiltro] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("stock", JSON.stringify(stock));
  }, [stock]);

  useEffect(() => {
    localStorage.setItem("autopartes_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("autopartes_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("autopartes_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("autopartes_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("autopartes_orders", JSON.stringify(orders));
  }, [orders]);

  const triggerNotification = (type, message) => {
    setNotification({ type, message });
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);
    return () => clearTimeout(timer);
  };

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    triggerNotification("success", `Sesión iniciada como: ${user.nombre} (${user.rol === "admin" ? "ADMIN" : "CLIENTE"})`);
  };

  const handleRegister = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthModalOpen(true);
    triggerNotification("success", "Has cerrado sesión correctamente.");
  };

  // Stock Management (ADMIN ONLY)
  const handleAddAutoparte = (nombre, categoria, cantidad, precio) => {
    if (currentUser?.rol !== "admin") {
      triggerNotification("error", "Acción denegada: Solo el Administrador puede agregar autopartes.");
      return;
    }

    const newItem = {
      id: Date.now(),
      tipo: "autoparte",
      propiedades: {
        nombre,
        categoria,
        cantidad,
        precio,
      },
    };

    setStock((prev) => [...prev, newItem]);
    triggerNotification("success", `¡"${nombre}" agregada correctamente!`);
  };

  const handleEliminarAutoparte = (id) => {
    if (currentUser?.rol !== "admin") {
      triggerNotification("error", "Acción denegada: Solo el Administrador puede eliminar autopartes.");
      return;
    }

    const targetItem = stock.find(item => item.id === id);
    const itemName = targetItem ? targetItem.propiedades.nombre : "la autoparte";
    
    setStock((prev) => prev.filter((item) => item.id !== id));
    triggerNotification("success", `Se eliminó "${itemName}" del inventario.`);
  };

  const handleEditTrigger = (item) => {
    if (currentUser?.rol !== "admin") {
      triggerNotification("error", "Acción denegada: Solo el Administrador puede editar autopartes.");
      return;
    }
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (id, updatedProperties) => {
    if (currentUser?.rol !== "admin") {
      triggerNotification("error", "Acción denegada: Solo el Administrador puede modificar datos.");
      return;
    }

    setStock((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              propiedades: {
                ...item.propiedades,
                ...updatedProperties,
              },
            }
          : item
      )
    );
    triggerNotification("success", "Cambios guardados correctamente.");
  };

  const handleClearAll = () => {
    if (currentUser?.rol !== "admin") {
      triggerNotification("error", "Acción denegada: Solo el Administrador puede vaciar el stock.");
      return;
    }

    if (window.confirm("¿Seguro que desea vaciar por completo el stock de autopartes?")) {
      setStock([]);
      triggerNotification("success", "Se limpió por completo el inventario.");
    }
  };

  const handleRestock = (id, cantidadAdicional = 10) => {
    if (currentUser?.rol !== "admin") {
      triggerNotification("error", "Acción denegada: Solo el Administrador puede reponer stock.");
      return;
    }

    setStock((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              propiedades: {
                ...item.propiedades,
                cantidad: item.propiedades.cantidad + cantidadAdicional,
              },
            }
          : item
      )
    );
    const item = stock.find((i) => i.id === id);
    if (item) {
      triggerNotification("success", `Se agregaron ${cantidadAdicional} unidades a "${item.propiedades.nombre}".`);
    }
  };

  // Cart & Shopping Handlers (For Clients / Buyers)
  const handleAddToCart = (item, qtyToAdd = 1) => {
    const existingIndex = cart.findIndex((c) => c.id === item.id);
    const availableStock = item.propiedades.cantidad;

    if (availableStock <= 0) {
      triggerNotification("error", `"${item.propiedades.nombre}" no tiene stock disponible.`);
      return;
    }

    if (existingIndex >= 0) {
      const currentInCart = cart[existingIndex].cantidad;
      const newTotal = currentInCart + qtyToAdd;
      if (newTotal > availableStock) {
        triggerNotification("error", `Solo hay ${availableStock} unidades disponibles de "${item.propiedades.nombre}".`);
        return;
      }
      setCart((prev) =>
        prev.map((c, idx) =>
          idx === existingIndex ? { ...c, cantidad: newTotal } : c
        )
      );
    } else {
      if (qtyToAdd > availableStock) {
        triggerNotification("error", `Solo hay ${availableStock} unidades disponibles de "${item.propiedades.nombre}".`);
        return;
      }
      const newCartItem = {
        id: item.id,
        nombre: item.propiedades.nombre,
        categoria: item.propiedades.categoria,
        precio: item.propiedades.precio,
        cantidad: qtyToAdd
      };
      setCart((prev) => [...prev, newCartItem]);
    }

    triggerNotification("success", `Se agregó ${qtyToAdd}x "${item.propiedades.nombre}" al carrito.`);
  };

  const handleUpdateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = (orderData) => {
    // 1. Decrement stock for all items
    setStock((prevStock) =>
      prevStock.map((stockItem) => {
        const itemBought = orderData.items.find((i) => i.id === stockItem.id);
        if (itemBought) {
          const newQty = Math.max(0, stockItem.propiedades.cantidad - itemBought.cantidad);
          return {
            ...stockItem,
            propiedades: {
              ...stockItem.propiedades,
              cantidad: newQty
            }
          };
        }
        return stockItem;
      })
    );

    // 2. Attach current user details
    const fullOrder = {
      ...orderData,
      userId: currentUser?.id || "guest",
      userName: currentUser?.nombre || "Comprador",
      userEmail: currentUser?.email || "cliente@autopartes.com"
    };

    // 3. Save order
    setOrders((prev) => [fullOrder, ...prev]);

    // 4. Clear cart
    setCart([]);

    triggerNotification("success", `¡Compra confirmada! Orden #${orderData.id} procesada con éxito.`);
  };

  // Calculations for Admin Metrics
  const filteredStock = stock.filter((item) => {
    const matchesCategory = filtro === "todos" || item.propiedades.categoria === filtro;
    const matchesSearch = item.propiedades.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalItems = filteredStock.reduce((acc, el) => acc + el.propiedades.cantidad, 0);
  const valorTotal = filteredStock.reduce((acc, el) => acc + el.propiedades.cantidad * el.propiedades.precio, 0);

  const categoryTotals = stock.reduce((acc, item) => {
    const cat = item.propiedades.categoria;
    if (cat) {
      acc[cat] = (acc[cat] || 0) + (item.propiedades.cantidad || 0);
    }
    return acc;
  }, { Motor: 0, Suspensión: 0, Frenos: 0 });

  const outOfStockItems = stock.filter(item => item.propiedades.cantidad === 0);
  const criticalStockItems = stock.filter(item => item.propiedades.cantidad > 0 && item.propiedades.cantidad <= 5);
  const totalAlertsCount = outOfStockItems.length + criticalStockItems.length;

  const totalCartCount = cart.reduce((acc, el) => acc + el.cantidad, 0);
  const isAdmin = currentUser?.rol === "admin";
  const userOrdersCount = orders.filter(o => !o.userId || o.userId === currentUser?.id || o.userEmail === currentUser?.email).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans overflow-x-hidden border border-slate-200" id="main-root-container">
      {/* Toast notification banner */}
      {notification && (
        <div 
          id="toast-notification-banner"
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg bg-white shadow-xl border animate-fade-in flex items-center gap-2.5 max-w-sm ${
            notification.type === "success" 
              ? "border-emerald-200 text-emerald-800" 
              : "border-red-200 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          )}
          <span className="text-xs font-bold uppercase tracking-wider">{notification.message}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="min-h-16 py-2 shrink-0 flex flex-wrap items-center justify-between px-4 sm:px-8 bg-white border-b border-slate-200 shadow-xs gap-3">
        {/* Brand & Alumno Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg font-display shadow-xs">
            A
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-slate-900 flex items-center gap-2">
              <span>Control de Stock & Autopartes</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              Alumno: Galván Tomás. Comisión: ACM4AP
            </p>
          </div>
        </div>

        {/* User Status, Role Badge & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
              {/* Role badge */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-slate-200 shadow-3xs">
                {isAdmin ? (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-indigo-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    ADMINISTRADOR
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                    CLIENTE / COMPRADOR
                  </span>
                )}
              </div>

              {/* User Name */}
              <div className="hidden md:block text-left px-1">
                <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                  {currentUser.nombre}
                </p>
                <p className="text-[9px] text-slate-400 font-mono truncate max-w-[130px]">
                  {currentUser.email}
                </p>
              </div>

              {/* Actions for User */}
              <div className="flex items-center gap-1">
                {/* Cart Button */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer"
                  title="Ver Carrito de Compras"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white font-mono font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {totalCartCount}
                    </span>
                  )}
                </button>

                {/* Orders / Sales Button */}
                <button
                  type="button"
                  onClick={() => setIsOrdersOpen(true)}
                  className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer text-xs flex items-center gap-1"
                  title={isAdmin ? "Ver Historial de Ventas" : "Ver Mis Compras"}
                >
                  <Receipt className="w-4 h-4 text-indigo-600" />
                  <span className="text-[10px] font-bold uppercase hidden sm:inline">
                    {isAdmin ? "Ventas" : "Compras"}
                  </span>
                </button>

                {/* Switch user / Login */}
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-md transition-colors cursor-pointer text-[10px] font-bold uppercase"
                  title="Cambiar Usuario / Iniciar sesión"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                </button>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-md transition-colors cursor-pointer"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Ingresar / Registrarse</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Role Navigation & Active Mode Notification Bar */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2">
          {isAdmin ? (
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900 bg-indigo-100/80 px-2.5 py-0.5 rounded-full border border-indigo-200">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
              Modo Administrador: Tienes permisos para Crear, Editar, Eliminar y Reponer stock.
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
              Modo Cliente: Acceso para explorar el catálogo y realizar compras (la gestión de stock está restringida al Administrador).
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span>{stock.length} autopartes registradas</span>
          <span>•</span>
          <span>{orders.length} pedidos realizados</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50" id="main-scroll-container">
        <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

          {/* ========================================================= */}
          {/* 1. ADMIN VIEW (Full Stock Management & CRUD)              */}
          {/* ========================================================= */}
          {isAdmin ? (
            <>
              {/* Add Autoparte Form (Admin Only) */}
              <section id="form-section-display">
                <StockForm onAdd={handleAddAutoparte} />
              </section>

              {/* Metrics & Categories summary */}
              <Metrics 
                totalItems={totalItems} 
                valorTotal={valorTotal} 
                filteredCount={filteredStock.length}
                activeFilter={filtro}
                categoryTotals={categoryTotals}
              />

              {/* Stock Alerts (Admin Only) */}
              <section id="seccion-alertas-stock" className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${totalAlertsCount > 0 ? "text-amber-500 animate-pulse" : "text-emerald-500"}`} />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 font-sans">
                      Alertas de Inventario (Panel de Control)
                    </h3>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                    totalAlertsCount > 0 ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}>
                    {totalAlertsCount > 0 ? `${totalAlertsCount} Advertencias` : "Stock Seguro"}
                  </span>
                </div>

                {totalAlertsCount === 0 ? (
                  <div className="p-6 text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 mb-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Niveles de Stock Correctos</h4>
                    <p className="text-slate-500 text-xs max-w-md mx-auto">
                      Ninguna autoparte se encuentra sin existencias o en nivel crítico. Las reposiciones están cubiertas.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {outOfStockItems.length > 0 && (
                      <div className="p-4 bg-red-50/20">
                        <h4 className="text-[10px] uppercase font-bold tracking-wider text-red-600 flex items-center gap-1.5 mb-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                          Sin Existencias ({outOfStockItems.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {outOfStockItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between gap-3 p-2.5 bg-white border border-red-100 rounded-md shadow-xs">
                              <div className="min-w-0">
                                <span className="text-slate-900 font-bold text-xs block truncate">{item.propiedades.nombre}</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">{item.propiedades.categoria}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="px-1.5 py-0.5 bg-red-50 text-red-700 text-[9px] font-bold uppercase rounded border border-red-100">Agotado</span>
                                <button
                                  onClick={() => handleRestock(item.id, 10)}
                                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-[9px] uppercase tracking-wider rounded transition-all cursor-pointer shadow-xs"
                                >
                                  +10 Stock
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {criticalStockItems.length > 0 && (
                      <div className="p-4 bg-amber-50/20">
                        <h4 className="text-[10px] uppercase font-bold tracking-wider text-amber-700 flex items-center gap-1.5 mb-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Stock Crítico - Nivel Bajo (5 unidades o menos) ({criticalStockItems.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {criticalStockItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between gap-3 p-2.5 bg-white border border-amber-100 rounded-md shadow-xs">
                              <div className="min-w-0">
                                <span className="text-slate-900 font-bold text-xs block truncate">{item.propiedades.nombre}</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">{item.propiedades.categoria}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-extrabold uppercase rounded border border-amber-100">
                                  Bajo ({item.propiedades.cantidad})
                                </span>
                                <button
                                  onClick={() => handleRestock(item.id, 10)}
                                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-[9px] uppercase tracking-wider rounded transition-all cursor-pointer shadow-xs"
                                >
                                  +10 Stock
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* Filtering and Actions Bar */}
              <div 
                id="filtering-actions-bar"
                className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    id="buscar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre..."
                    className="w-full sm:w-64 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:bg-white focus:ring-1 focus:ring-indigo-505 focus:border-indigo-505 focus:outline-hidden transition-all text-gray-800 font-medium"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Filtrar:</span>
                  </div>
                  
                  <select
                    id="filtro"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 focus:bg-white focus:ring-1 focus:ring-indigo-505 focus:border-indigo-505 focus:outline-hidden transition-all relative cursor-pointer"
                  >
                    <option value="todos">Todas las categorías</option>
                    <option value="Motor">Motor</option>
                    <option value="Suspensión">Suspensión</option>
                    <option value="Frenos">Frenos</option>
                  </select>

                  <button
                    onClick={handleClearAll}
                    type="button"
                    className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                  >
                    Limpiar todo
                  </button>
                </div>
              </div>

              {/* Table of Records with Full Admin Controls (Editar, Eliminar) */}
              <section id="table-display-section" className="space-y-2 relative">
                <div className="flex items-center justify-between px-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 flex items-center gap-1.5">
                    <CornerDownRight className="w-3.5 h-3.5" />
                    Registros de Stock - Modo Administrador ({filteredStock.length})
                  </p>
                  {searchQuery && (
                    <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                      BÚSQUEDA ACTIVA: "{searchQuery.toUpperCase()}"
                    </span>
                  )}
                </div>
                
                <StockTable 
                  items={filteredStock} 
                  onEdit={handleEditTrigger}
                  onEliminar={handleEliminarAutoparte}
                  isAdmin={true}
                  onAddToCart={handleAddToCart}
                />
              </section>
            </>
          ) : (
            /* ========================================================= */
            /* 2. CLIENT / BUYER VIEW (Shopping Catalog & Cart)         */
            /* ========================================================= */
            <ClientCatalog
              stock={stock}
              onAddToCart={handleAddToCart}
              cartItems={cart}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenOrders={() => setIsOrdersOpen(true)}
              ordersCount={userOrdersCount}
              currentUser={currentUser}
            />
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="h-10 bg-slate-900 shrink-0 text-slate-400 px-6 flex items-center justify-between text-[11px] font-mono leading-none border-t border-slate-950 select-none">
        <div className="flex items-center gap-4">
          <span className="uppercase text-[10px] text-slate-350">
            SISTEMA DE AUTOPARTES • {isAdmin ? "PANEL ADMINISTRATIVO" : "PORTAL DEL CLIENTE"}
          </span>
        </div>
        <button
          onClick={() => {
            const container = document.getElementById("main-scroll-container");
            if (container) {
              container.scrollTo({ top: 0, behavior: "smooth" });
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-slate-400 hover:text-white hover:underline transition-all cursor-pointer font-bold uppercase text-[10px] flex items-center gap-1"
          id="btn-volver-arriba"
        >
          Volver arriba ↑
        </button>
      </footer>

      {/* Authentication Modal (Login & Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        users={users}
        onRegister={handleRegister}
      />

      {/* Shopping Cart Drawer (for Purchases) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
        stock={stock}
      />

      {/* Orders / Sales History Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        currentUser={currentUser}
      />

      {/* Edit Item Modal (Admin Only) */}
      {isAdmin && (
        <EditModal 
          isOpen={isEditModalOpen}
          item={editingItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
