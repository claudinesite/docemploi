"use client"

import { useTransition, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
    Building2, MapPin, FileSignature, CalendarDays, Mail, FileText, 
    Save, BriefcaseBusiness, CheckCircle2, AlertCircle, Sparkles, ChevronLeft
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { updateJob } from "@/app/actions/jobs"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import Link from "next/link"

interface FormProps {
  job: any
  categories: { id: string, nom: string }[]
  villes: string[]
  contrats: string[]
}

export default function EditJobForm({ job, categories, villes, contrats }: FormProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [description, setDescription] = useState(job.description || "")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    if (description !== job.description) {
      const timer = setTimeout(() => setLastSaved(new Date()), 500)
      return () => clearTimeout(timer)
    }
  }, [description, job.description])

  async function handleSubmit(formData: FormData) {
    formData.set('description', description)
    
    startTransition(async () => {
      try {
        await updateJob(job.id, formData)
        toast.success("✨ L'offre a été mise à jour avec succès !", {
          description: "Les modifications sont visibles immédiatement.",
        })
        router.refresh()
      } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
          throw error
        }
        toast.error("Erreur : " + error.message)
      }
    })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10 pt-2">
      <form action={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* === LEFT COLUMN: FORM DETAILS === */}
          <div className="xl:col-span-5 space-y-6 xl:sticky xl:top-24">
            <Card className="border-slate-200 shadow-xl shadow-slate-900/5 bg-white/95 rounded-2xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-5 px-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#124EA6]/10 rounded-xl text-[#124EA6]">
                            <BriefcaseBusiness size={20} />
                        </div>
                        <div>
                            <CardTitle className="text-base font-bold text-slate-800">Détails de l'offre</CardTitle>
                            <CardDescription className="text-xs">Champs administratifs</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                    
                    <div className="space-y-2">
                        <Label htmlFor="titre" className="text-slate-700 font-semibold flex items-center gap-1.5">
                            Titre du poste <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative group">
                            <FileSignature className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#124EA6] transition-colors pointer-events-none" />
                            <Input
                                id="titre"
                                name="titre"
                                defaultValue={job.titre}
                                required
                                className="h-12 pl-11 border-slate-200 rounded-xl focus-visible:ring-[#124EA6]/10 focus-visible:border-[#124EA6] font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="nom_etablissement" className="text-slate-700 font-semibold flex items-center gap-1.5">
                            Établissement <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#124EA6] transition-colors pointer-events-none" />
                            <Input
                                id="nom_etablissement"
                                name="nom_etablissement"
                                defaultValue={job.nom_etablissement}
                                required
                                className="h-12 pl-11 border-slate-200 rounded-xl focus-visible:ring-[#124EA6]/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="categorie_id" className="text-slate-700 font-semibold">Spécialité <span className="text-red-500">*</span></Label>
                    <select
                      id="categorie_id"
                      name="categorie_id"
                      defaultValue={job.categorie_id}
                      required
                      className="h-12 w-full border border-slate-200 rounded-xl bg-white px-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#124EA6]/10 focus:border-[#124EA6] transition-all"
                    >
                      <option value="">Choisir une spécialité...</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.nom}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type_contrat" className="text-slate-700 font-semibold">Type de Contrat <span className="text-red-500">*</span></Label>
                    <select
                      id="type_contrat"
                      name="type_contrat"
                      defaultValue={job.type_contrat}
                      required
                      className="h-12 w-full border border-slate-200 rounded-xl bg-white px-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#124EA6]/10 focus:border-[#124EA6] transition-all"
                    >
                      <option value="">Choisir le type de contrat...</option>
                      {contrats.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ville_togolaise" className="text-slate-700 font-semibold">Localisation <span className="text-red-500">*</span></Label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#124EA6]" />
                      <Input 
                        id="ville_togolaise" 
                        name="ville_togolaise" 
                        defaultValue={job.ville_togolaise} 
                        placeholder="Ex: Lomé, Kara..." 
                        required 
                        className="h-12 pl-11 border-slate-200 rounded-xl bg-white focus-visible:ring-[#124EA6]/10" 
                        list="villes-list"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_postulation" className="text-slate-700 font-semibold">Contact pour postuler <span className="text-red-500">*</span></Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#124EA6]" />
                      <Input 
                        id="contact_postulation" 
                        name="contact_postulation" 
                        defaultValue={job.contact_postulation} 
                        placeholder="Email ou téléphone..." 
                        required 
                        className="h-12 pl-11 border-slate-200 rounded-xl bg-white focus-visible:ring-[#124EA6]/10" 
                      />
                    </div>
                  </div>
                </div>

                    <div className="space-y-2">
                        <Label htmlFor="date_limite_candidature" className="text-slate-700 font-semibold flex items-center gap-1.5">
                            <CalendarDays size={14} className="text-[#124EA6]" />
                            Date limite (optionnelle)
                        </Label>
                        <Input 
                            type="date" 
                            id="date_limite_candidature" 
                            name="date_limite_candidature" 
                            defaultValue={job.date_limite_candidature ? job.date_limite_candidature.split('T')[0] : ''}
                            className="h-12 border-slate-200 rounded-xl bg-white text-slate-700 focus:ring-[#124EA6]/10" 
                        />
                    </div>
                    <datalist id="villes-list">
                        {villes.map((v) => <option key={v} value={v} />)}
                    </datalist>
                </CardContent>
            </Card>

            {/* Save Button Desktop */}
            <div className="hidden xl:block">
              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-14 bg-[#124EA6] hover:bg-blue-800 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] group flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* === RIGHT COLUMN: RICH TEXT EDITOR === */}
          <div className="xl:col-span-7">
            <Card className="border-slate-200 shadow-xl shadow-slate-900/5 bg-white h-full flex flex-col rounded-2xl overflow-hidden min-h-[700px]">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-5 px-6 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#124EA6]/10 rounded-xl text-[#124EA6]">
                            <FileText size={20} />
                        </div>
                        <div>
                            <CardTitle className="text-base font-bold text-slate-800">Mission & Profil</CardTitle>
                            <CardDescription className="text-xs">Rédigez le texte détaillé de l'offre</CardDescription>
                        </div>
                    </div>
                    {lastSaved && (
                        <div className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-1">
                            <Sparkles size={10} />
                            MODIFICATIONS NON SAUVÉES
                        </div>
                    )}
                </CardHeader>
                <CardContent className="p-0 grow flex flex-col">
                    <RichTextEditor
                        value={description}
                        onChange={setDescription}
                    />
                    <input type="hidden" name="description" value={description} />
                    
                    <div className="p-5 bg-slate-50/50 border-t border-slate-100">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-[#124EA6] mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-700">Qualité de l'offre :</p>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Une description d'au moins 200 mots permet un meilleur référencement et aide les candidats à mieux se projeter.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {/* Mobile Save Button */}
            <div className="xl:hidden mt-8">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-14 bg-[#124EA6] text-white font-bold rounded-2xl shadow-lg"
              >
                {isPending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
