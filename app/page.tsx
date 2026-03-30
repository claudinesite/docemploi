import Link from 'next/link'
import { getJobs, getTopCategories, getVilles } from './actions/jobs'
import {
    Search, 
    MapPin, 
    ArrowUpRight,
    Building2, 
    Mail, 
    Briefcase, 
    Clock, 
    ChevronDown, 
    ChevronLeft, 
    ChevronRight, 
    X,
    ArrowRight, 
    MessageSquare, 
    HeartPulse, 
    Baby, 
    Eye, 
    Activity, 
    Syringe, 
    Bone, 
    Brain, 
    Stethoscope
} from 'lucide-react'
import SearchFilters from '@/components/SearchFilters'
import { FadeIn, FadeInStagger, FadeInItem, RevealOnScroll, ScaleIn } from '@/components/Animated'

export const revalidate = 0 // On désactive le cache pour que la recherche soit instantanée

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string; ville?: string; categorie_id?: string }>
}) {
    // 1. Récupération des paramètres (Page, Recherche, Ville...)
    const params = await searchParams
    const currentPage = Number(params.page) || 1

    // 2. On récupère TOUS les jobs correspondant aux filtres (q, ville, categorie_id)
    // Note: Idéalement, getJobs devrait gérer la pagination SQL, mais ici on simule pour l'UI
    const filteredJobs = await getJobs(params)
    const topCategories = await getTopCategories()
    const villes = await getVilles()

    // 3. Logique de Pagination
    const ITEMS_PER_PAGE = 12
    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentJobs = filteredJobs.slice(startIndex, endIndex)

    // Helper pour générer les liens de pagination en gardant les filtres actuels
    const buildPaginationLink = (page: number) => {
        const query = new URLSearchParams()
        if (params.q) query.set('q', params.q)
        if (params.ville) query.set('ville', params.ville)
        if (params.categorie_id) query.set('categorie_id', params.categorie_id)
        query.set('page', page.toString())
        return `/?${query.toString()}#offres` // Le #offres permet de scroller automatiquement
    }

    return (
        <main className="min-h-screen bg-[#F0F5FD] font-sans text-slate-800">

            {/* =========================================
                1. HERO SECTION (Style Image: Grid + Cards)
            ========================================= */}
            <section className="relative w-full pt-6 pb-2 overflow-hidden bg-white">

                {/* Grille de fond */}
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

                {/* Contenu Hero */}
                <div className="container mx-auto px-4 relative z-10 text-center pt-32">

                    {/* Badge Togo */}
                    <FadeIn delay={0.1} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#124EA6]/10 border border-[#124EA6]/20 mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#124EA6] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#124EA6]"></span>
                        </span>
                        <span className="text-xs font-bold text-[#124EA6] uppercase tracking-wider">
                            🇹🇬 100% Focused Togo
                        </span>
                    </FadeIn>

                    {/* Titre Principal */}
                    <FadeIn delay={0.2}>
                        <h1 className="max-w-4xl mx-auto text-4xl md:text-6xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
                            Votre carrière médicale <br />
                            <span className="text-[#124EA6]">commence ici</span>
                        </h1>
                    </FadeIn>

                    {/* Sous-titre */}
                    <FadeIn delay={0.3}>
                        <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-lg font-medium mb-6 leading-relaxed">
                            DocEmploi connecte les professionnels de santé aux meilleures opportunités au Togo.
                            Médecins, infirmiers, pharmaciens : trouvez le poste qui vous correspond.
                        </p>
                    </FadeIn>
                    {/* Rangée de Cartes Personnages */}
                    <FadeInStagger delay={0.4} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-6">
                        {/* Carte 1 - Médecine */}
                        <FadeInItem className="aspect-3/4 rounded-[3rem] bg-[#124EA6] overflow-hidden relative group shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
                            <div className="absolute top-10 left-0 w-full px-6 text-center z-20">
                                <h3 className="text-white font-black text-2xl tracking-tighter leading-none mb-2">Médecine</h3>
                                <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.2em]">Pôle Généraliste</p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[55%] z-10 flex items-end justify-center">
                                <img
                                    src="/images/elbatro.jpg"
                                    alt="Médecine"
                                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </FadeInItem>
                        {/* Carte 2 - Soins */}
                        <FadeInItem className="aspect-3/4 rounded-[3rem] bg-[#124EA6] overflow-hidden relative group translate-y-6 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
                            <div className="absolute top-10 left-0 w-full px-6 text-center z-20">
                                <h3 className="text-white font-black text-2xl tracking-tighter leading-none mb-2">Infirmerie</h3>
                                <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.2em]">Soins & Dévouement</p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[60%] z-10 flex items-end">
                                <img
                                    src="/images/inf.jpg"
                                    alt="Soins"
                                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </FadeInItem>

                        {/* Carte 3 - Spécialité */}
                        <FadeInItem className="aspect-3/4 rounded-[3rem] bg-[#124EA6] overflow-hidden relative group translate-y-6 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
                            <div className="absolute top-10 left-0 w-full px-6 text-center z-20">
                                <h3 className="text-white font-black text-2xl tracking-tighter leading-none mb-2">Chirurgie</h3>
                                <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.2em]">Précision & Excellence</p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[55%] z-10 flex items-end justify-center">
                                <img
                                    src="/images/woman.jpg"
                                    alt="Lab"
                                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </FadeInItem>

                        {/* Carte 4 - Maternité */}
                        <FadeInItem className="aspect-3/4 rounded-[3rem] bg-[#124EA6] overflow-hidden relative group shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
                            <div className="absolute top-10 left-0 w-full px-6 text-center z-20">
                                <h3 className="text-white font-black text-2xl tracking-tighter leading-none mb-2">Maternité</h3>
                                <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.2em]">Vie & Accompagnement</p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[60%] z-10 flex items-end">
                                <img
                                    src="/images/maternite.jpg"
                                    alt="Sage-Femme"
                                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </FadeInItem>
                    </FadeInStagger>

                    {/* Marquee des catégories */}
                    <div className="w-full max-w-6xl mx-auto pt-4 border-t border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                            Spécialités les plus recherchées
                        </p>

                        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                            <div className="flex animate-scroll gap-12 w-max py-4 items-center">
                                {/* Liste statique avec icônes de spécialités */}
                                {(() => {
                                    const staticSpecialties = [
                                        { nom: "Gynécologie", icon: Activity, color: "text-rose-500" },
                                        { nom: "Pédiatrie", icon: Baby, color: "text-amber-500" },
                                        { nom: "Cardiologie", icon: HeartPulse, color: "text-red-500" },
                                        { nom: "Ophtalmologie", icon: Eye, color: "text-blue-500" },
                                        { nom: "Soins infirmiers", icon: Syringe, color: "text-emerald-500" },
                                        { nom: "Orthopédie", icon: Bone, color: "text-orange-500" },
                                        { nom: "Neurologie", icon: Brain, color: "text-violet-500" },
                                        { nom: "Médecine Générale", icon: Stethoscope, color: "text-[#124EA6]" },
                                    ];

                                    // Tripler la liste pour un défilement infini sans coupure
                                    return [...staticSpecialties, ...staticSpecialties, ...staticSpecialties].map((spec, i) => (
                                        <div
                                            key={`${spec.nom}-${i}`}
                                            className="inline-flex items-center gap-4 group cursor-default"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                                                <spec.icon className={`w-6 h-6 ${spec.color} transition-transform group-hover:scale-110`} />
                                            </div>
                                            <span className="text-xl md:text-3xl font-black text-slate-300 group-hover:text-slate-900 transition-all uppercase tracking-tight">
                                                {spec.nom}
                                            </span>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* =========================================
                2. OFFRES D'EMPLOI + PAGINATION
            ========================================= */}
            <section id="offres" className="w-full py-16 bg-slate-50 border-b border-gray-200 scroll-mt-20">
                <div className="container mx-auto max-w-6xl px-4">

                    {/* EN-TÊTE & FILTRES */}
                    <RevealOnScroll className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                        <div className="max-w-md">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black mb-2">
                                {params.q || params.ville || params.categorie_id ? 'Résultats de recherche' : 'Dernières opportunités'}
                            </h2>
                            <p className="text-gray-500 font-medium text-base">
                                {filteredJobs.length} postes trouvés {params.ville && `à ${params.ville}`}.
                            </p>
                        </div>

                        {/* SearchFilters Component */}
                        <SearchFilters villes={villes} />
                    </RevealOnScroll>

                    {/* GRILLE DES OFFRES */}
                    {currentJobs.length === 0 ? (
                        <div className="text-center py-16 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 border border-slate-100">
                                <Search className="w-6 h-6 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Aucun résultat trouvé</h3>
                            <p className="text-slate-500 font-medium mb-6 max-w-xs mx-auto text-sm">
                                Nous n'avons pas trouvé d'offres correspondant à vos critères actuels.
                            </p>
                            <Link
                                href="/#offres"
                                className="inline-flex items-center gap-2 bg-[#124EA6] text-white font-bold px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
                            >
                                <X size={16} />
                                Effacer les filtres
                            </Link>
                        </div>
                    ) : (
                        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentJobs.map((job) => (
                                <FadeInItem key={job.id}>
                                    <Link
                                        href={`/emploi/${job.slug}`}
                                        className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl p-4 hover:border-[#124EA6]/20 transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(18,78,166,0.12)] hover:-translate-y-1 h-full overflow-hidden"
                                    >
                                        {/* Décoration de coin subtile sur hover */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#124EA6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none"></div>

                                        {/* 1. EN-TÊTE : LOGO + TITRE */}
                                        <div className="flex flex-col gap-2 mb-3">
                                            {/* Logo Container */}
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-[#124EA6]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="relative w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-white bg-[#124EA6] shadow-md group-hover:scale-110 transition-transform duration-300">
                                                    <Building2 size={20} strokeWidth={1.5} />
                                                </div>
                                            </div>

                                            {/* Titre du poste */}
                                            <div className="space-y-0.5">
                                                <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-[#124EA6] transition-colors line-clamp-2">
                                                    {job.titre}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-slate-400 font-medium text-sm">
                                                    <span className="text-[#124EA6] font-bold">@</span>
                                                    <span className="truncate">{job.nom_etablissement}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. CORPS : DESCRIPTION COURTE */}
                                        <div className="mb-3">
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                                                {job.description ? job.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : `Rejoignez ${job.nom_etablissement} en tant que ${job.titre}. Une opportunité exceptionnelle à ${job.ville_togolaise}.`}
                                            </p>
                                        </div>

                                        {/* 3. PIED DE PAGE : TAGS & ACTION */}
                                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-50">
                                            <div className="flex flex-wrap gap-1.5">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 group-hover:bg-[#124EA6]/10 group-hover:text-[#124EA6] transition-colors">
                                                    {job.type_contrat}
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                                                    <MapPin size={9} />
                                                    {job.ville_togolaise}
                                                </span>
                                            </div>
                                            <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#124EA6] group-hover:text-white transition-all transform group-hover:rotate-45">
                                                <ArrowUpRight size={14} />
                                            </div>
                                        </div>
                                    </Link>
                                </FadeInItem>
                            ))}
                        </FadeInStagger>
                    )}

                    {/* PAGINATION MODERNE */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex flex-col items-center">
                            <div className="inline-flex items-center bg-white p-1.5 border border-slate-100 rounded-xl shadow-sm gap-1">
                                <Link
                                    href={currentPage > 1 ? buildPaginationLink(currentPage - 1) : '#offres'}
                                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${currentPage > 1
                                        ? 'text-slate-600 hover:bg-[#124EA6]/5 hover:text-[#124EA6]'
                                        : 'text-slate-200 pointer-events-none'
                                        }`}
                                >
                                    <ChevronLeft size={18} />
                                </Link>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={buildPaginationLink(page)}
                                            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${currentPage === page
                                                ? 'bg-[#124EA6] text-white shadow-lg'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>

                                <Link
                                    href={currentPage < totalPages ? buildPaginationLink(currentPage + 1) : '#offres'}
                                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${currentPage < totalPages
                                        ? 'text-slate-600 hover:bg-[#124EA6]/5 hover:text-[#124EA6]'
                                        : 'text-slate-200 pointer-events-none'
                                        }`}
                                >
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-4">
                                Page {currentPage} sur {totalPages}
                            </p>
                        </div>
                    )}

                </div>
            </section>

            {/* =========================================
                3. SECTION NEWSLETTER (CTA)
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
                                Prêt à rejoindre l'équipe de vos rêves ?
                            </h2>

                            <p className="text-blue-100/90 mb-10 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                                Des centaines d'opportunités vous attendent dans les meilleurs établissements de santé au Togo.
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