import { getAdminJobs } from '@/app/actions/jobs'
import Link from 'next/link'
import { Plus, MapPin, Building2 } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DeleteJobButton, TogglePublishButton, EditJobButton } from "@/components/admin/DashboardActions"
import PaginationControls from "@/components/PaginationControls"

export const revalidate = 0

export default async function AdminJobsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const sp = await searchParams
    const currentPage = Number(sp?.page) || 1
    const ITEMS_PER_PAGE = 10

    const { data: jobs, count: totalJobs } = await getAdminJobs(currentPage, ITEMS_PER_PAGE);
    const totalPages = Math.ceil((totalJobs || 0) / ITEMS_PER_PAGE);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* =========================================
                EN-TÊTE
            ========================================= */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none uppercase">Toutes les offres</h2>
                    <p className="text-slate-500 font-medium mt-3">
                        Gérez l'ensemble des annonces publiées sur la plateforme.
                    </p>
                </div>

                <Button asChild className="bg-[#124EA6] hover:bg-blue-800 text-white font-bold h-11 px-8 rounded-lg shadow-lg shadow-blue-900/10 transition-all active:scale-95">
                    <Link href="/admin/offres/nouvelle" className="flex items-center gap-2">
                        <Plus size={18} strokeWidth={3} />
                        Nouvelle offre
                    </Link>
                </Button>
            </div>

            {/* =========================================
                TABLEAU DES OFFRES
            ========================================= */}
            <Card className="border-slate-200/60 shadow-xl shadow-blue-900/5 bg-white overflow-hidden rounded-xl">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Titre & Localisation</th>
                                    <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Établissement</th>
                                    <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Date</th>
                                    <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Statut</th>
                                    <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px] text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-50">
                                {jobs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-slate-400 font-medium">
                                            Aucune offre trouvée. Commencez par en créer une !
                                        </td>
                                    </tr>
                                ) : jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-[#0F172A] text-[15px] group-hover:text-[#124EA6] transition-colors">{job.titre}</div>
                                            <div className="flex items-center gap-3 text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">
                                                <Badge variant="outline" className="bg-white font-black text-[10px] rounded-sm py-0 h-4 border-slate-200 uppercase tracking-tighter">{(job.categories as any)?.nom}</Badge>
                                                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-slate-300" /> {job.ville_togolaise}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2.5 text-slate-700 font-bold">
                                                <div className="bg-[#F0F5FD] p-2 rounded-md text-[#124EA6]">
                                                    <Building2 size={16} />
                                                </div>
                                                {job.nom_etablissement}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-slate-500 font-semibold text-xs">
                                            {new Date(job.created_at).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>

                                        <td className="px-6 py-5">
                                            {job.est_publie ? (
                                                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[10px] uppercase tracking-wider">
                                                    En Ligne
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-slate-100 text-slate-400 border-slate-200/50 font-black text-[10px] uppercase tracking-wider">
                                                    Brouillon
                                                </Badge>
                                            )}
                                        </td>

                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end items-center gap-1">
                                                <EditJobButton id={job.id} />
                                                <TogglePublishButton id={job.id} isPublished={job.est_publie} title={job.titre} />
                                                <DeleteJobButton id={job.id} title={job.titre} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>

                {totalPages > 1 && (
                    <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 border-t border-slate-100 px-6 py-4 gap-4">
                        <div className="text-slate-500 font-medium text-sm">
                            Affichage de la page <span className="font-bold text-[#124EA6]">{currentPage}</span> sur <span className="font-bold">{totalPages}</span>
                        </div>
                        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
