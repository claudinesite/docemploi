import { getAdminJobs, getCategories } from '@/app/actions/jobs'
import Link from 'next/link'
import { Plus, LayoutDashboard, Briefcase, Tag, TrendingUp, Users, Activity, ExternalLink, ArrowRight, Pencil, ChevronRight, CalendarOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DeleteJobButton, EditJobButton } from '@/components/admin/DashboardActions'

export const revalidate = 0

export default async function AdminDashboardPage() {
    const [{ data: jobs, count }, categories] = await Promise.all([
        getAdminJobs(1, 100),
        getCategories()
    ])

    const totalJobs = count || 0
    const publishedJobs = jobs.filter(j => j.est_publie).length
    const draftJobs = totalJobs - publishedJobs

    // On récupère le nombre total de catégories (spécialités)
    const totalSpecialties = categories.length

    const now = new Date()
    const expiredJobs = jobs.filter(j =>
        j.date_limite_candidature && new Date(j.date_limite_candidature) < now
    ).slice(0, 4)

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* =========================================
                EN-TÊTE
            ========================================= */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none uppercase">Tableau de bord</h2>
                    <p className="text-slate-500 font-medium mt-3">
                        Bienvenue dans votre espace d'administration DocEmploi.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" asChild className="h-11 px-6 rounded-lg font-bold border-slate-200">
                        <Link href="/" target="_blank" className="flex items-center gap-2">
                            <ExternalLink size={16} />
                            Voir le site
                        </Link>
                    </Button>
                    <Button asChild className="bg-[#124EA6] hover:bg-blue-800 text-white font-bold h-11 px-8 rounded-lg shadow-lg shadow-blue-900/10 transition-all active:scale-95">
                        <Link href="/admin/offres/nouvelle" className="flex items-center gap-2">
                            <Plus size={18} strokeWidth={3} />
                            Poster une offre
                        </Link>
                    </Button>
                </div>
            </div>

            {/* =========================================
                STATS GRID
            ========================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <Card className="border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white group">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124EA6] flex items-center justify-center group-hover:bg-[#124EA6] group-hover:text-white transition-colors duration-300">
                                <Briefcase size={24} />
                            </div>
                            <Activity size={18} className="text-blue-200" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Offres</p>
                        <h3 className="text-3xl font-black text-[#0F172A]">{totalJobs}</h3>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white group">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                <TrendingUp size={24} />
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">En Ligne</p>
                        <h3 className="text-3xl font-black text-[#0F172A]">{publishedJobs}</h3>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white group">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                                <Users size={24} />
                            </div>
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Brouillons</p>
                        <h3 className="text-3xl font-black text-[#0F172A]">{draftJobs}</h3>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white group">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <Tag size={24} />
                            </div>
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Spécialités</p>
                        <h3 className="text-3xl font-black text-[#0F172A]">{totalSpecialties}</h3>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* OFFRES EXPIRÉES */}
                <div className="lg:col-span-2">
                    <Card className="border-slate-200/60 shadow-xl shadow-blue-900/5 bg-white rounded-2xl overflow-hidden">
                        <CardHeader className="p-6 flex flex-row items-center justify-between border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                                    <CalendarOff size={20} />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black text-[#0F172A]">Offres expirées</CardTitle>
                                    <CardDescription className="font-medium">Annonces dont la date limite est dépassée.</CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" asChild className="text-[#124EA6] font-bold">
                                <Link href="/admin/offres" className="flex items-center gap-2">
                                    Tout voir
                                    <ArrowRight size={16} />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-50">
                                {expiredJobs.length === 0 ? (
                                    <div className="p-10 text-center text-slate-400 font-medium">
                                        Aucune offre expirée pour le moment.
                                    </div>
                                ) : expiredJobs.map((job) => (
                                    <div key={job.id} className="p-5 hover:bg-red-50/30 transition-colors flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                                                {job.nom_etablissement.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-[#0F172A] group-hover:text-red-700 transition-colors line-clamp-1">{job.titre}</h4>
                                                <p className="text-xs text-red-500 font-bold uppercase tracking-wider mt-0.5">
                                                    Expiré le {new Date(job.date_limite_candidature!).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <EditJobButton id={job.id} />
                                            <DeleteJobButton id={job.id} title={job.titre} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* LIENS RAPIDES / ACTIONS */}
                <div className="space-y-6">
                    <Card className="border-slate-200/60 shadow-xl shadow-blue-900/5 bg-[#124EA6] text-white rounded-2xl overflow-hidden">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                                <LayoutDashboard size={32} />
                            </div>
                            <h3 className="text-xl font-black mb-3">Besoin d'aide ?</h3>
                            <p className="text-sm text-blue-100 font-medium mb-8 leading-relaxed">
                                Consultez la documentation ou contactez le support technique si vous rencontrez des difficultés.
                            </p>
                            <Button asChild className="w-full bg-white text-[#124EA6] hover:bg-white/90 font-black h-12 rounded-xl transition-all active:scale-95 shadow-lg">
                                <Link href="https://claudineportofolio.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    Support Technique
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/60 shadow-xl shadow-blue-900/5 bg-white rounded-2xl p-2">
                        <nav className="flex flex-col gap-1">
                            <Link href="/admin/offres/nouvelle" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#124EA6] flex items-center justify-center group-hover:bg-[#124EA6] group-hover:text-white transition-colors duration-200">
                                    <Plus size={20} />
                                </div>
                                <span className="font-bold text-slate-700">Publier une offre</span>
                                <ChevronRight size={16} className="ml-auto text-slate-300" />
                            </Link>
                            <Link href="/admin/specialites" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
                                    <Tag size={20} />
                                </div>
                                <span className="font-bold text-slate-700">Gérer les spécialités</span>
                                <ChevronRight size={16} className="ml-auto text-slate-300" />
                            </Link>
                        </nav>
                    </Card>
                </div>
            </div>
        </div>
    )
}