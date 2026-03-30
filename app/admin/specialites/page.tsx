import { getCategories } from '@/app/actions/jobs'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tag, Trash2, Edit2, LayoutDashboard, Stethoscope, Pencil } from 'lucide-react'
import { AddCategoryDialog, DeleteCategoryButton, EditCategoryDialog } from '@/components/admin/CategoryActions'
import { Separator } from "@/components/ui/separator"

export const revalidate = 0

export default async function SpecialitesPage() {
    const categories = await getCategories()

    return (
        <div className="animate-fade-in-up">
            {/* =========================================
                EN-TÊTE
            ========================================= */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none uppercase">Spécialités médicales</h2>
                    <p className="text-slate-500 font-medium mt-3">
                        Gérez les <span className="text-[#124EA6] font-bold">{categories.length}</span> catégories disponibles pour les offres.
                    </p>
                </div>

                <AddCategoryDialog />
            </div>

            {/* =========================================
                LISTE DES CATÉGORIES
            ========================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up delay-100">
                {categories.length === 0 ? (
                    <Card className="col-span-full border-dashed border-slate-200 p-12 text-center text-slate-400 font-medium bg-white/50">
                        Aucune spécialité n'a été créée pour le moment.
                    </Card>
                ) : (
                    categories.map((cat) => (
                        <Card 
                            key={cat.id} 
                            className="p-5 border-slate-200/60 shadow-lg shadow-blue-900/5 bg-white hover:border-[#124EA6]/30 transition-all group rounded-xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#124EA6] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Tag size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-[#0F172A] uppercase tracking-tight text-sm">{cat.nom}</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">ID: {cat.id.slice(0, 8)}...</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <EditCategoryDialog id={cat.id} initialNom={cat.nom} />
                                    <DeleteCategoryButton id={cat.id} nom={cat.nom} />
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* =========================================
                INFORMATION SECTION
            ========================================= */}
            <div className="mt-12 p-6 bg-[#124EA6]/5 border border-[#124EA6]/10 rounded-xl flex items-start gap-4">
                <div className="bg-[#124EA6] p-2 rounded-lg text-white">
                    <Stethoscope size={20} />
                </div>
                <div className="space-y-1">
                    <h4 className="font-black text-[#0F172A] text-sm uppercase tracking-tight">Conseils de gestion</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Ces catégories apparaissent dans le formulaire de création d'offre et dans les filtres de recherche du site public. 
                        Nommez-les clairement pour faciliter la recherche des candidats. 
                        <span className="block mt-1 text-red-600/70 font-bold">Note : Vous ne pouvez pas supprimer une catégorie utilisée par une offre existante.</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
