import React, { useState } from "react";
import { 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ShoppingBag, 
  LogIn, 
  UserPlus, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  KeyRound
} from "lucide-react";

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLogin, 
  users, 
  onRegister 
}) {
  const [activeTab, setActiveTab] = useState("login"); // "login" | "register"
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  
  // Feedback
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const emailClean = loginEmail.trim().toLowerCase();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === emailClean && u.password === loginPassword
    );

    if (!foundUser) {
      setError("Correo electrónico o contraseña incorrectos.");
      return;
    }

    setSuccessMsg(`¡Bienvenido de nuevo, ${foundUser.nombre}!`);
    setTimeout(() => {
      onLogin(foundUser);
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!regName.trim()) {
      setError("Por favor ingresa tu nombre completo.");
      return;
    }

    const emailClean = regEmail.trim().toLowerCase();
    if (!emailClean || !emailClean.includes("@")) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    // Check if user already exists
    const exists = users.some((u) => u.email.toLowerCase() === emailClean);
    if (exists) {
      setError("Ya existe una cuenta registrada con este correo electrónico.");
      return;
    }

    if (regPassword.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Create client user (All newly registered users are role 'cliente')
    const newUser = {
      id: "user-" + Date.now(),
      nombre: regName.trim(),
      email: emailClean,
      password: regPassword,
      rol: "cliente", // Explicitly restricted to client/buyer role
      fechaRegistro: new Date().toISOString()
    };

    onRegister(newUser);
    setSuccessMsg("¡Cuenta creada exitosamente! Has iniciado sesión como Cliente.");
    setTimeout(() => {
      onLogin(newUser);
      onClose();
    }, 700);
  };

  return (
    <div 
      id="auth-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in"
    >
      <div 
        id="auth-modal-card"
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden transition-all"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-white">
                Acceso al Sistema
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Autenticación y Gestión de Permisos
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setError("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "login"
                ? "border-indigo-600 text-indigo-600 bg-white shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/60"
            }`}
          >
            <LogIn className="w-4 h-4" />
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              setError("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "register"
                ? "border-indigo-600 text-indigo-600 bg-white shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/60"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Registrarse
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === "login" ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Tomas.galvan@admin.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Ingresar al Sistema
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-[11px] text-indigo-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Nota de permisos:</strong> Los nuevos usuarios registrados se crean con rol de <strong>Cliente</strong> (acceso exclusivo para explorar catálogo, comprar y ver sus pedidos).
                </span>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="juan@email.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                    Confirmar
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Completar Registro
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
