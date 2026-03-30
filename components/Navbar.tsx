"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Stethoscope, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Navbar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    if (pathname?.startsWith("/admin")) return null;

    const navLinks = [
        { href: "/", label: "Accueil" },
        { href: "/a-propos", label: "À propos" },
    ]

    return (
        <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300"
        >
            {/* Conteneur principal avec effet Glassmorphism */}
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                <nav className="relative flex items-center justify-between h-20 px-6 bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">
                    
                    {/* GAUCHE : Logo */}
                    <div className="flex-1 lg:flex-none">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-11 h-11 bg-[#124EA6] rounded-2xl flex items-center justify-center transform group-hover:rotate-15 transition-all duration-500 shadow-lg shadow-blue-600/20">
                                <Stethoscope size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col -gap-1">
                                <span className="text-xl font-black text-[#0A1E3F] tracking-tighter leading-tight">
                                    <span className="text-[#124EA6]">Doc</span>Emploi
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#124EA6]/50">Santé Togo</span>
                            </div>
                        </Link>
                    </div>

                    {/* CENTRE : Menu (Desktop) */}
                    <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className={`
                                        px-6 py-2.5 rounded-full text-sm font-black transition-all duration-300
                                        ${isActive 
                                            ? "bg-white text-[#124EA6] shadow-[0_4px_12px_rgba(18,78,166,0.12)] border border-slate-100" 
                                            : "text-[#0A1E3F]/60 hover:text-[#124EA6] hover:bg-white/50"
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* DROITE : Action & Mobile Toggle */}
                    <div className="flex-1 lg:flex-none flex items-center justify-end gap-3">
                        <Link
                            href="/contact"
                            className="hidden sm:inline-flex items-center justify-center text-sm font-black text-[#0A1E3F] bg-[#D9F99D] px-8 h-12 rounded-full hover:shadow-[0_15px_30px_-10px_rgba(217,249,157,0.6)] hover:scale-105 transition-all active:scale-95 border border-[#D9F99D]/20"
                        >
                            Nous contacter
                        </Link>

                        {/* Burger Menu Button (Mobile) */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-[#0A1E3F] hover:bg-slate-100 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div className={`
                lg:hidden absolute top-[110%] left-4 right-4 bg-white rounded-[2rem] border border-slate-200 p-6 shadow-2xl transition-all duration-500 transform
                ${isMenuOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95 pointer-events-none"}
            `}>
                <div className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`
                                p-4 rounded-2xl text-base font-black transition-all
                                ${pathname === link.href 
                                    ? "bg-[#124EA6]/5 text-[#124EA6] border border-[#124EA6]/10" 
                                    : "text-slate-600 hover:bg-slate-50"
                                }
                            `}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-4 w-full h-14 flex items-center justify-center bg-[#D9F99D] text-[#0A1E3F] font-black rounded-2xl shadow-lg shadow-[#D9F99D]/30"
                    >
                        Contactez-nous
                    </Link>
                </div>
            </div>
        </motion.header>
    )
}