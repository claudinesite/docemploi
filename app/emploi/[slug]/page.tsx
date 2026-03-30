import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
    ChevronLeft,
    MapPin,
    Building2,
    Clock,
    FileText,
    Briefcase,
    ArrowRight,
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    Share2
} from 'lucide-react'
import { FadeIn, FadeInStagger, FadeInItem, RevealOnScroll } from '@/components/Animated'
import { headers } from 'next/headers'
import ShareButtons from '@/components/ShareButtons'

export const revalidate = 60

type Props = {
    params: Promise<{ slug: string }>
}

export default async function JobDetailsPage({ params }: Props) {
    const { slug } = await params
    const supabase = await createClient()

    // On récupère l'adresse actuelle pour les boutons de partage
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = host?.includes('localhost') ? 'http' : 'https'
    const fullUrl = `${protocol}://${host}/emploi/${slug}`

    const { data: job, error } = await supabase
        .from('jobs')
        .select('*, categories(nom)')
        .eq('slug', slug)
        .single()

    if (error || !job) {
        notFound()
    }

    const reference = `EMP-${job.id.toString().substring(0, 8).toUpperCase()}`

    return (
        <main className="min-h-screen bg-[#F8FAFC] font-sans pb-20">

            {/* =========================================
                1. EN-TÊTE - EXACTEMENT MEME STYLE QUE L'ACCUEIL
            ========================================= */}
            <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-white border-b border-gray-200">

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


                <div className="container mx-auto px-4 max-w-6xl relative z-20">

                    {/* Bouton Retour */}
                    <FadeIn delay={0.1}>
                        <Link
                            href="/#offres"
                            className="inline-flex items-center gap-3 text-[#124EA6] hover:text-blue-800 transition-colors mb-10 font-black text-sm group"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-[#124EA6] group-hover:shadow-md transition-all">
                                <ChevronLeft className="w-5 h-5" />
                            </div>
                            Retour aux offres
                        </Link>
                    </FadeIn>

                    <FadeInStagger delay={0.2} className="space-y-6">
                        {/* Badges supérieurs */}
                        <FadeInItem className="flex flex-wrap items-center gap-3">
                            <span className="bg-[#124EA6] text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg shadow-blue-600/20">
                                {job.type_contrat}
                            </span>
                            <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border border-slate-200">
                                Réf: {reference}
                            </span>
                            {job.categories && (
                                <span className="bg-white text-[#124EA6] text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border border-blue-100 shadow-sm">
                                    {job.categories.nom}
                                </span>
                            )}
                        </FadeInItem>

                        {/* Titre du poste */}
                        <FadeInItem>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A1E3F] tracking-tight leading-[1.05] max-w-4xl">
                                {job.titre}
                            </h1>
                        </FadeInItem>

                        {/* Métadonnées */}
                        <FadeInItem className="flex flex-wrap items-center gap-8 text-[11px] font-black uppercase tracking-wider text-slate-400">
                            <span className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#124EA6]">
                                    <Building2 size={16} />
                                </div>
                                <span className="text-[#0A1E3F]">{job.nom_etablissement}</span>
                            </span>
                            <span className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#124EA6]">
                                    <MapPin size={16} />
                                </div>
                                <span>{job.ville_togolaise}</span>
                            </span>
                            <span className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#124EA6]">
                                    <Clock size={16} />
                                </div>
                                <span>Il y a 2 jours</span>
                            </span>
                        </FadeInItem>
                    </FadeInStagger>

                </div>
            </section>

            {/* =========================================
                2. CONTENU PRINCIPAL
            ========================================= */}
            <div className="container mx-auto px-4 max-w-6xl mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    <div className="lg:col-span-2">
                        <RevealOnScroll>
                            <div className="group bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 relative overflow-hidden">

                                {/* Accent top line */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#124EA6] to-[#124EA6]" />

                                {/* En-tête de section */}
                                <div className="flex items-center gap-5 mb-10 relative z-10">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#124EA6]">
                                        <FileText size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-2xl font-black text-[#0A1E3F] tracking-tight">
                                            Description du poste
                                        </h2>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#124EA6]/50">Détails et exigences</span>
                                    </div>
                                </div>

                                {/* Contenu description */}
                                <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium prose-headings:text-[#0A1E3F] prose-li:text-slate-600 prose-li:font-medium prose-li:marker:text-[#124EA6] prose-strong:text-[#0A1E3F] relative z-10">
                                    <div dangerouslySetInnerHTML={{ __html: job.description }} className="text-sm md:text-base" />
                                </div>

                            </div>
                        </RevealOnScroll>
                    </div>

                    <div className="lg:col-span-1">
                        <RevealOnScroll delay={0.2} className="sticky top-32 space-y-8">

                            {/* Widget Résumé */}
                            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-6 bg-[#124EA6] rounded-full" />
                                    <h3 className="text-xl font-black text-[#0A1E3F] tracking-tight">Résumé de l'offre</h3>
                                </div>

                                {/* Liste des infos */}
                                <ul className="space-y-6 mb-10">
                                    <li className="flex items-center gap-4 group">
                                        <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center text-[#124EA6] shrink-0 group-hover:bg-[#124EA6] group-hover:text-white transition-all duration-300">
                                            <Building2 size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Établissement</p>
                                            <p className="font-black text-sm text-[#0A1E3F] leading-tight">{job.nom_etablissement}</p>
                                        </div>
                                    </li>

                                    <li className="flex items-center gap-4 group">
                                        <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center text-[#124EA6] shrink-0 group-hover:bg-[#124EA6] group-hover:text-white transition-all duration-300">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Localisation</p>
                                            <p className="font-black text-sm text-[#0A1E3F] leading-tight">{job.ville_togolaise}</p>
                                        </div>
                                    </li>

                                    <li className="flex items-center gap-4 group">
                                        <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center text-[#124EA6] shrink-0 group-hover:bg-[#124EA6] group-hover:text-white transition-all duration-300">
                                            <Briefcase size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Type de contrat</p>
                                            <p className="font-black text-sm text-[#124EA6] leading-tight">{job.type_contrat}</p>
                                        </div>
                                    </li>
                                </ul>

                                {/* Bloc Date Limite */}
                                <div className="bg-[#D9F99D]/20 border border-[#D9F99D]/50 rounded-3xl p-6 mb-8 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Clock size={14} className="text-[#124EA6]" />
                                        <p className="text-[9px] text-[#0A1E3F] font-black uppercase tracking-widest">Date limite</p>
                                    </div>
                                    <p className="text-2xl font-black text-[#0A1E3F] tracking-tighter">
                                        {job.date_limite_candidature
                                            ? new Date(job.date_limite_candidature).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
                                            : "Aujourd'hui"
                                        }
                                    </p>
                                </div>

                                {/* Bouton de postulation (Rétabli) */}
                                <a
                                    href={job.contact_postulation.includes('@') ? `mailto:${job.contact_postulation}` : `tel:${job.contact_postulation}`}
                                    className="group w-full relative bg-[#124EA6] text-white font-black px-6 h-16 rounded-2xl hover:shadow-2xl hover:shadow-[#124EA6]/25 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Postuler maintenant
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a>

                            </div>

                            {/* Section Partager (Fonctionnelle) */}
                            <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center gap-5">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Partager l'offre</p>
                                <ShareButtons url={fullUrl} title={job.titre} />
                            </div>

                        </RevealOnScroll>
                    </div>

                </div>
            </div>

        </main>
    )
}