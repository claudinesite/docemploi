'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    Mail, Phone, MapPin, Clock, Send,
    ChevronRight, Sparkles, MessageSquare,
    Building2, ArrowRight, ExternalLink,
    CheckCircle2, AlertCircle, Loader2
} from 'lucide-react'
import { FadeIn, FadeInStagger, FadeInItem, RevealOnScroll } from '@/components/Animated'

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        const formData = new FormData(e.currentTarget)
        // Remplacez par votre clé Web3Forms réelle
        formData.append('access_key', 'c9e28428-3efe-4a64-8852-750b7caa466a')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (data.success) {
                setSubmitStatus('success')
                setStatusMessage('Merci ! Votre message a été envoyé avec succès.')
                    ; (e.target as HTMLFormElement).reset()
            } else {
                setSubmitStatus('error')
                setStatusMessage(data.message || 'Une erreur est survenue lors de l\'envoi.')
            }
        } catch (error) {
            setSubmitStatus('error')
            setStatusMessage('Impossible de contacter le serveur. Veuillez réessayer plus tard.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-white font-sans text-slate-800">

            {/* =========================================
                1. HERO SECTION
            ========================================= */}
            <section className="relative w-full pt-32 pb-16 bg-white overflow-hidden border-b border-slate-100">
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
                    <FadeIn delay={0.1} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#124EA6]/5 border border-[#124EA6]/10 mb-6 font-sans">
                        <MessageSquare size={12} className="text-[#124EA6]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#124EA6]">Assistance & Support</span>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h1 className="text-2xl md:text-3xl font-black text-[#0A1E3F] tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
                            Besoin d'aide ? <br /><span className="text-[#124EA6]">Discutons ensemble</span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto leading-relaxed">
                            Notre équipe est à votre écoute pour répondre à vos questions sur DocEmploi.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* =========================================
                2. FORMULAIRE + INFOS CONTACT
            ========================================= */}
            <section className="w-full py-20 bg-slate-50/30 overflow-hidden">
                <div className="container mx-auto max-w-6xl px-4">

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

                        {/* ====== COLONNE GAUCHE : INFOS ====== */}
                        <RevealOnScroll className="lg:col-span-2 relative z-20">

                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1 w-10 rounded-full bg-[#124EA6]" />
                                <span className="text-xs font-black text-[#124EA6] uppercase tracking-widest">Coordonnées</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-[#0A1E3F] tracking-tight mb-4">
                                Comment nous joindre
                            </h2>
                            <p className="text-slate-500 font-medium mb-10 leading-relaxed text-sm md:text-base">
                                N'hésitez pas à nous contacter par le moyen qui vous convient le mieux.
                                Nous répondons généralement sous 24 heures.
                            </p>

                            {/* Cartes Contact */}
                            <FadeInStagger className="space-y-4">
                                {[
                                    {
                                        icon: Mail,
                                        title: 'Email',
                                        value: 'docemplois@gmail.com',
                                        subtitle: 'Réponse sous 24h',
                                        href: 'mailto:docemplois@gmail.com',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'Horaires',
                                        value: 'Lun - Ven',
                                        subtitle: '08:00 - 18:00 GMT',
                                        href: '#',
                                    },
                                ].map((info, i) => (
                                    <FadeInItem key={i}>
                                        <a
                                            href={info.href}
                                            className="group flex items-start gap-4 p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#124EA6]/20 hover:shadow-[0_20px_40px_-15px_rgba(18,78,166,0.1)] transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-[#124EA6] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <info.icon size={22} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{info.title}</p>
                                                <p className="text-[#0A1E3F] font-black text-base">{info.value}</p>
                                                <p className="text-slate-400 text-xs font-bold">{info.subtitle}</p>
                                            </div>
                                            <ArrowRight size={14} className="text-slate-200 group-hover:text-[#124EA6] shrink-0 mt-1 transition-all group-hover:translate-x-1" />
                                        </a>
                                    </FadeInItem>
                                ))}
                            </FadeInStagger>

                            {/* Message Info Box */}
                            <div className="p-6 rounded-3xl bg-[#D9F99D]/20 border border-[#D9F99D]/30 mt-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <Sparkles size={18} className="text-[#124EA6]" />
                                    <p className="text-[#0A1E3F] font-black text-sm">Le saviez-vous ?</p>
                                </div>
                                <p className="text-[#0A1E3F]/70 text-xs font-bold leading-relaxed">
                                    DocEmploi est la plateforme n°1 au Togo dédiée exclusivement au secteur de la santé.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* ====== COLONNE DROITE : FORMULAIRE ====== */}
                        <RevealOnScroll className="lg:col-span-3">

                            <div className="bg-white rounded-[3rem] border border-slate-200 p-8 md:p-12 relative shadow-2xl shadow-slate-200/50">

                                <div className="relative z-10">
                                    {/* En-tête formulaire */}
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-black text-[#0A1E3F] mb-2 tracking-tight">
                                            Envoyez un message
                                        </h3>
                                        <p className="text-slate-400 font-bold text-sm uppercase tracking-wide">
                                            Directement via ce formulaire
                                        </p>
                                    </div>

                                    {/* Formulaire */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* ... (inputs) */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                                                    Nom *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nom"
                                                    placeholder="Votre nom"
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-sm text-[#0A1E3F] font-bold focus:bg-white focus:border-[#124EA6] focus:ring-4 focus:ring-[#124EA6]/5 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                                                    Prénom *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="prenom"
                                                    placeholder="Votre prénom"
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-sm text-[#0A1E3F] font-bold focus:bg-white focus:border-[#124EA6] focus:ring-4 focus:ring-[#124EA6]/5 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="votre@email.com"
                                                required
                                                className="w-full h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-sm text-[#0A1E3F] font-bold focus:bg-white focus:border-[#124EA6] focus:ring-4 focus:ring-[#124EA6]/5 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                                                Sujet *
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="sujet"
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-sm text-[#0A1E3F] font-bold focus:bg-white focus:border-[#124EA6] focus:ring-4 focus:ring-[#124EA6]/5 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="">Sélectionnez un sujet</option>
                                                    <option value="candidat">Je suis candidat</option>
                                                    <option value="recruteur">Je suis recruteur / établissement</option>
                                                    <option value="partenariat">Proposition de partenariat</option>
                                                    <option value="bug">Signaler un problème technique</option>
                                                    <option value="autre">Autre demande</option>
                                                </select>
                                                <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                rows={5}
                                                placeholder="Votre message ici..."
                                                required
                                                className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none text-sm text-[#0A1E3F] font-bold focus:bg-white focus:border-[#124EA6] focus:ring-4 focus:ring-[#124EA6]/5 transition-all resize-none"
                                            />
                                        </div>

                                        {/* Status Messages */}
                                        {submitStatus === 'success' && (
                                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <CheckCircle2 size={20} className="shrink-0" />
                                                <p className="text-sm font-bold">{statusMessage}</p>
                                            </div>
                                        )}

                                        {submitStatus === 'error' && (
                                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <AlertCircle size={20} className="shrink-0" />
                                                <p className="text-sm font-bold">{statusMessage}</p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group w-full relative bg-[#124EA6] text-white text-base font-black px-8 h-16 rounded-[2rem] hover:shadow-2xl hover:shadow-[#124EA6]/25 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                                        >
                                            <span className="relative z-10 flex items-center gap-3 tracking-wide">
                                                {isSubmitting ? (
                                                    <>
                                                        Envoi en cours...
                                                        <Loader2 size={18} className="animate-spin" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Envoyer mon message
                                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                                    </>
                                                )}
                                            </span>
                                        </button>

                                        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                            Nous respectons votre <span className="text-[#124EA6]">vie privée</span>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* =========================================
                3. FAQ 
            ========================================= */}
            <section className="w-full py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto max-w-4xl px-4">

                    <div className="text-center mb-16">
                        <FadeIn delay={0.1} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9F99D] mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#124EA6]">Aide rapide</span>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <h2 className="text-3xl md:text-4xl font-black text-[#0A1E3F] tracking-tight mb-4 leading-tight">
                                Questions fréquentes
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                                Tout ce que vous devez savoir
                            </p>
                        </FadeIn>
                    </div>

                    <FadeInStagger className="space-y-4">
                        {[
                            {
                                q: "Est-ce que la plateforme est gratuite ?",
                                a: "Oui, DocEmploi est 100% gratuit pour tous les candidats. Consultez les offres et recevez des alertes sans aucun frais.",
                            },
                            {
                                q: "Comment postuler à une offre ?",
                                a: "Cliquez sur l'offre d'intérêt, consultez les instructions de candidature indiquées dans l'annonce et contactez directement l'établissement.",
                            },
                            {
                                q: "Comment publier une offre ?",
                                a: "Pour les établissements de santé, il suffit de nous contacter via le formulaire ci-dessus ou par email pour obtenir un accès recruteur.",
                            },
                        ].map((faq, i) => (
                            <FadeInItem key={i}>
                                <details
                                    className="group bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden hover:border-[#124EA6]/20 transition-all duration-300"
                                >
                                    <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none select-none">
                                        <span className="text-base md:text-lg font-black text-[#0A1E3F] pr-4 tracking-tight">{faq.q}</span>
                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm group-open:bg-[#124EA6] flex items-center justify-center shrink-0 transition-all duration-300">
                                            <ChevronRight size={18} className="text-[#124EA6] group-open:text-white group-open:rotate-90 transition-all duration-300" />
                                        </div>
                                    </summary>
                                    <div className="px-8 pb-8 -mt-2">
                                        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-bold border-t border-slate-100/50 pt-5">
                                            {faq.a}
                                        </p>
                                    </div>
                                </details>
                            </FadeInItem>
                        ))}
                    </FadeInStagger>
                </div>
            </section>

        </main>
    )
}