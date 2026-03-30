"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Stethoscope, Mail, Twitter, Linkedin, Facebook } from 'lucide-react'
import { RevealOnScroll } from '@/components/Animated'

export default function Footer() {
    const pathname = usePathname()

    // On cache le footer sur les pages admin
    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="bg-[#0A1E3F] text-white pt-24 pb-12 font-sans overflow-hidden relative">
            <RevealOnScroll fraction={0.1}>

            {/* Effet de Lumière de Fond */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#124EA6]/20 blur-[150px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto max-w-7xl px-4 relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">

                    {/* COLONNE 1 : MARQUE (Span 4) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center gap-2.5 group w-fit">
                            <div className="w-11 h-11 bg-[#124EA6] rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-blue-600/30">
                                <Stethoscope size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter leading-tight">
                                    <span className="text-[#124EA6]">Doc</span>Emploi
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Santé Togo</span>
                            </div>
                        </Link>

                        <p className="text-white/60 font-medium leading-relaxed max-w-sm">
                            La plateforme de référence pour le recrutement médical au Togo. Nous connectons les talents de demain aux opportunités d'aujourd'hui.
                        </p>
                    </div>

                    {/* COLONNE 2 : CANDIDATS (Span 2) */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[#124EA6] font-black uppercase tracking-widest text-xs mb-8">Candidats</h4>
                        <ul className="space-y-4">
                            <li><Link href="/?#offres" className="text-white/60 hover:text-white font-bold transition-colors">Rechercher</Link></li>
                            <li><Link href="/a-propos" className="text-white/60 hover:text-white font-bold transition-colors">À propos</Link></li>
                            <li><Link href="/contact" className="text-white/60 hover:text-white font-bold transition-colors">Aide & Support</Link></li>
                        </ul>
                    </div>

                    {/* COLONNE 3 : RECRUTEURS (Span 3) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[#124EA6] font-black uppercase tracking-widest text-xs mb-8">Établissements</h4>
                        <ul className="space-y-4">
                            <li><Link href="/contact" className="text-white/60 hover:text-white font-bold transition-colors">Publier une annonce</Link></li>
                            <li><Link href="#" className="flex items-center gap-2 text-white/30 font-bold cursor-not-allowed">
                                Partenariats <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded-full">Bientôt</span>
                            </Link></li>
                        </ul>
                    </div>

                    {/* COLONNE 4 : CONTACT (Span 3) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
                            <h4 className="text-white font-black text-lg">Prêt à nous rejoindre ?</h4>
                            <p className="text-white/40 text-xs font-bold leading-relaxed">
                                Pour toute question, notre équipe est disponible 5j/7 à Lomé.
                            </p>
                            <a
                                href="mailto:docemplois@gmail.com"
                                className="flex items-center gap-3 text-[#D9F99D] font-black text-sm hover:underline"
                            >
                                <Mail size={16} />
                                docemplois@gmail.com
                            </a>
                        </div>
                    </div>

                </div>

                {/* LIGNE DU BAS (Copyright) */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest flex items-center gap-1">
                        © {new Date().getFullYear()} DocEmploi • Made with
                        <span className="inline-block hover:scale-125 transition-transform duration-300 cursor-default animate-pulse text-red-500/60">
                            ❤️
                        </span>
                        by
                        <a
                            href="https://claudineportofolio.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-all ml-1 underline decoration-white/20 underline-offset-4"
                        >
                            Claudine Aboki
                        </a>
                    </p>

                    <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                        <Link href="#" className="hover:text-white transition-colors">Confidentialité</Link>
                        <Link href="#" className="hover:text-white transition-colors">Mentions légales</Link>
                    </div>
                </div>

            </div>
            </RevealOnScroll>
        </footer>
    )
}