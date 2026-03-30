// app/a-propos/page.tsx
import Link from 'next/link'
import {
    Heart, Shield, Users, Target, Award, Clock,
    ArrowRight, CheckCircle2, Building2, Stethoscope,
    TrendingUp, Sparkles, ChevronRight
} from 'lucide-react'
import { FadeIn, FadeInStagger, FadeInItem, RevealOnScroll } from '@/components/Animated'

export const metadata = {
    title: 'À Propos | DocEmploi',
    description: 'Découvrez DocEmploi, la plateforme de référence pour l\'emploi médical au Togo.',
}

export default function AProposPage() {
    return (
        <main className="min-h-screen bg-white font-sans text-slate-800">

            {/* =========================================
                1. HERO SECTION
            ========================================= */}
            <section className="relative w-full pt-32 pb-20 bg-white overflow-hidden border-b border-slate-100">
                {/* Grille de fond (Style DocEmploi) */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #E2E8F0 1px, transparent 1px),
                            linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
                        `,
                        backgroundSize: '100px 100px',
                    }}
                ></div>

                <div className="container mx-auto max-w-6xl px-4 relative z-10 text-center pt-12">
                    <FadeIn delay={0.1} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#124EA6]/5 border border-[#124EA6]/10 mb-6 font-sans">
                        <Sparkles size={16} className="text-[#124EA6]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#124EA6]">Découvrez notre mission</span>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h1 className="text-3xl md:text-5xl font-black text-[#0A1E3F] tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
                            Connecter les talents médicaux aux <span className="text-[#124EA6]">meilleurs</span> établissements.
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="text-slate-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                            DocEmploi est né d'une volonté simple : moderniser le recrutement médical au Togo pour améliorer la qualité des soins.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* =========================================
                2. NOTRE HISTOIRE
            ========================================= */}
            <section className="w-full py-20 md:py-28 bg-slate-50/50">
                <div className="container mx-auto max-w-6xl px-4">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Texte */}
                        <RevealOnScroll className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1 w-10 rounded-full bg-[#124EA6]" />
                                <span className="text-xs font-black text-[#124EA6] uppercase tracking-widest">Notre histoire</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-[#0A1E3F] tracking-tight mb-8 leading-tight">
                                Pourquoi nous avons
                                <br />créé <span className="text-[#124EA6]">DocEmploi</span>
                            </h2>

                            <div className="space-y-4 text-slate-500 leading-relaxed font-medium">
                                <p>
                                    Au Togo, le secteur de la santé fait face à un défi majeur : connecter efficacement
                                    les professionnels qualifiés aux établissements qui en ont besoin.
                                </p>
                                <p>
                                    Trop souvent, les offres d'emploi sont dispersées, peu visibles, et les processus
                                    de recrutement sont longs et complexes.
                                    <span className="text-[#0A1E3F] font-semibold"> Nous avons décidé de changer cela.</span>
                                </p>
                                <p>
                                    <span className="text-[#124EA6] font-bold">DocEmploi</span> centralise toutes les opportunités médicales en un seul endroit,
                                    avec une interface simple, rapide et accessible à tous.
                                </p>
                            </div>

                            {/* Points clés */}
                            <FadeInStagger className="mt-10 space-y-4">
                                {[
                                    'Plateforme 100% dédiée au secteur médical',
                                    'Offres vérifiées et mises à jour régulièrement',
                                    'Accès simple et rapide pour tous les candidats',
                                ].map((point, i) => (
                                    <FadeInItem key={i} className="flex items-center gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-[#124EA6]/10 flex items-center justify-center group-hover:bg-[#124EA6] transition-colors">
                                            <CheckCircle2 size={14} className="text-[#124EA6] group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-sm font-bold text-[#0A1E3F]">{point}</span>
                                    </FadeInItem>
                                ))}
                            </FadeInStagger>
                        </RevealOnScroll>

                        {/* Grille de caractéristiques moderne */}
                        <RevealOnScroll className="relative">
                            <div className="absolute inset-0 bg-[#124EA6]/5 rounded-[3rem] -rotate-3 scale-105"></div>
                            <div className="relative bg-white border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50">
                                <FadeInStagger className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: Stethoscope, title: 'Médical', text: 'Spécialisé santé' },
                                        { icon: Users, title: 'Réseau', text: 'Professionnels' },
                                        { icon: Building2, title: 'Élite', text: 'Établissements' },
                                        { icon: TrendingUp, title: 'Impact', text: 'Carrières' },
                                    ].map((item, i) => (
                                        <FadeInItem
                                            key={i}
                                            className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:border-[#124EA6]/20 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:bg-[#124EA6] group-hover:scale-110 transition-all duration-300">
                                                <item.icon size={22} className="text-[#124EA6] group-hover:text-white" />
                                            </div>
                                            <p className="text-sm font-black text-[#0A1E3F]">{item.title}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{item.text}</p>
                                        </FadeInItem>
                                    ))}
                                </FadeInStagger>
                            </div>
                        </RevealOnScroll>

                    </div>
                </div>
            </section>

            {/* =========================================
                3. SECTION CTA (Newsletter Style)
            ========================================= */}

            <section className="relative w-full py-16 bg-white overflow-hidden">
                {/* Grille de fond étendue (Fond blanc de la section) */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                linear-gradient(to right, #E2E8F0 1px, transparent 1px),
                linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
            `,
                        backgroundSize: '100px 100px',
                    }}
                ></div>

                <div className="container mx-auto max-w-6xl px-4 relative z-10">
                    <RevealOnScroll className="relative overflow-hidden bg-gradient-to-br from-[#124EA6] to-[#0d3a7a] rounded-3xl p-12 md:p-20 text-center shadow-2xl">

                        {/* Grille interne supprimée ici */}

                        {/* Cercles décoratifs internes */}
                        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>

                        {/* Contenu */}
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Prêt à trouver votre <br />prochain défi ?
                            </h2>

                            <p className="text-blue-100/90 mb-10 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
                                Rejoignez <span className="text-white font-bold">DocEmploi</span> aujourd'hui et donnez un nouvel élan à votre carrière médicale.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/#offres"
                                    className="bg-white text-[#124EA6] font-black px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl active:scale-95 text-base"
                                >
                                    Voir les offres
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-transparent border-2 border-white/30 text-white font-black px-8 py-4 rounded-2xl hover:bg-white/10 transition-all active:scale-95 text-base"
                                >
                                    Nous contacter
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </main>
    )
}