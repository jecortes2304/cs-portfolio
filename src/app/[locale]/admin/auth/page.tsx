"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative min-h-screen flex items-center justify-center py-12 normal-background overflow-hidden">
            {/* Adornos SVG grandes */}
            <svg
                className="absolute -top-10 -left-10 w-60 h-60 text-blue-500/10"
                viewBox="0 0 200 200"
            >
                <path
                    fill="currentColor"
                    d="M45.5,-61.5C59.2,-55.7,72.5,-45.4,77.8,-31.7C83.2,-18,80.5,-0.8,72.8,11.3C65.1,23.5,52.4,30.6,40.7,40.7C29,50.9,18.5,64.1,4.3,68.7C-10,73.2,-20,68.9,-31.6,62.1C-43.1,55.4,-56.2,46.2,-64.2,33.4C-72.2,20.6,-74.9,4.1,-72.1,-11.5C-69.2,-27,-60.8,-41.6,-48.1,-49.2C-35.3,-56.7,-17.6,-57.1,-1.4,-55.4C14.7,-53.6,29.5,-49.1,45.5,-61.5Z"
                    transform="translate(100 100)"
                />
            </svg>

            <svg
                className="absolute bottom-0 right-0 w-72 h-72 text-purple-500/10"
                viewBox="0 0 200 200"
            >
                <path
                    fill="currentColor"
                    d="M47.5,-69.6C61.2,-62.8,73.3,-51.2,77.5,-37.2C81.7,-23.2,77.9,-6.8,74.1,9.9C70.4,26.6,66.7,43.6,55.2,55.9C43.6,68.3,24.2,75.9,5.7,69.5C-12.8,63.1,-25.6,42.6,-37.7,26.1C-49.9,9.6,-61.4,-3,-63.6,-17.7C-65.9,-32.4,-58.9,-49.2,-45.4,-56.7C-32,-64.2,-16,-62.4,-0.5,-61.8C15,-61.3,30.1,-61.9,47.5,-69.6Z"
                    transform="translate(100 100)"
                />
            </svg>

            {/* Círculos detrás del card */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="absolute w-80 h-80 rounded-full bg-blue-500/30 blur-3xl -translate-x-48 translate-y-12" />
                <div className="absolute w-72 h-72 rounded-full bg-purple-500/30 blur-3xl translate-x-48 -translate-y-12" />
            </div>

            {/* Card de login */}
            <div className="relative w-full max-w-md p-8 rounded-2xl shadow-lg glassy border border-white/20 z-10">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/logo.webp"
                        alt="logo"
                        width={35}
                        height={35}
                        priority
                        style={{ width: "auto", height: "auto" }}
                    />
                </div>

                {/* Título */}
                <h1 className="text-2xl font-bold text-center text-white mb-6">
                    Admin Login
                </h1>

                {/* Formulario */}
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contraseña con ojito */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* Enlaces */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
                    <a href="#" className="hover:text-blue-400">
                        ¿Olvidaste la contraseña?
                    </a>
                    <a href="/" className="hover:text-blue-400">
                        ← Volver al sitio
                    </a>
                </div>
            </div>
        </div>
    );
}
