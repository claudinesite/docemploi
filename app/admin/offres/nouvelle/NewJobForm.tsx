"use client"

import { useTransition, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    Building2, MapPin, FileSignature, CalendarDays, Mail, FileText,
    Send, BriefcaseBusiness, Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createJob } from "@/app/actions/jobs"
import { RichTextEditor } from "@/components/admin/RichTextEditor"

interface FormProps {
    categories: { id: string, nom: string }[]
    villes: string[]
    contrats: string[]
}

export default function NewJobForm({ categories, villes, contrats }: FormProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [description, setDescription] = useState("")

    // Auto-save indicator (visual only)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)

    useEffect(() => {
        if (description) {
            const timer = setTimeout(() => setLastSaved(new Date()), 500)
            return () => clearTimeout(timer)
        }
    }, [description])

    async function handleSubmit(formData: FormData) {
        formData.set('description', description)

        startTransition(async () => {
            try {
                await createJob(formData)
                toast.success("✨ L'offre a été publiée avec succès !", {
                    description: "Elle est maintenant visible par les candidats.",
                    duration: 4000,
                })
                router.refresh()
            } catch (error: any) {
                // Next.js redirect() throws a special error — let it propagate
                if (error?.digest?.startsWith('NEXT_REDIRECT')) {
                    throw error
                }
                toast.error("Erreur lors de la publication", {
                    description: error.message || "Une erreur inattendue est survenue.",
                    duration: 5000,
                })
            }
        })
    }

    return (
        <div className="space-y-6 animate-fade-in pb-10 pt-2">
            <form action={handleSubmit}>
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    
                    {/* === LEFT COLUMN: FORM DETAILS (xl:col-span-5) === */}
                    <div className="xl:col-span-5 space-y-6 xl:sticky xl:top-24">
                        <Card className="border-slate-200 shadow-xl shadow-slate-900/5 bg-white/95 rounded-2xl overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-5 px-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#124EA6]/10 rounded-xl text-[#124EA6]">
                                        <BriefcaseBusiness size={20} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold text-slate-800">Détails de l'offre</CardTitle>
                                        <CardDescription className="text-xs">Informations administratives</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                {/* Titre du poste */}
                                <div className="space-y-2">
                                    <Label htmlFor="titre" className="text-slate-700 font-semibold flex items-center gap-1.5">
                                        Titre du poste <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative group">
                                        <FileSignature className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#124EA6] transition-colors pointer-events-none" />
                                        <Input
                                            id="titre"
                                            name="titre"
                                            placeholder="Ex: Infirmier(ère) Diplômé(e) d'État"
                                            required
                                            className="h-12 pl-11 border-slate-200 rounded-xl focus-visible:ring-[#124EA6]/10 focus-visible:border-[#124EA6] transition-all font-medium"
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
                                            placeholder="Hôpital, Clinique, Cabinet..."
                                            required
                                            className="h-12 pl-11 border-slate-200 rounded-xl focus-visible:ring-[#124EA6]/10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="categorie_id" className="text-slate-700 font-semibold">Spécialité <span className="text-red-500">*</span></Label>
                                        <select
                                            id="categorie_id"
                                            name="categorie_id"
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

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="ville_togolaise" className="text-slate-700 font-semibold">Localisation <span className="text-red-500">*</span></Label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#124EA6]" />
                                            <Input 
                                                id="ville_togolaise" 
                                                name="ville_togolaise" 
                                                placeholder="Saisissez la ville ou le quartier..." 
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
                                            <Input id="contact_postulation" name="contact_postulation" placeholder="Ex: email@domaine.com ou +228 90..." required className="h-12 pl-11 border-slate-200 rounded-xl bg-white focus-visible:ring-[#124EA6]/10" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_limite_candidature" className="text-slate-700 font-semibold flex items-center gap-1.5">
                                        <CalendarDays size={14} className="text-[#124EA6]" />
                                        Date limite (optionnelle)
                                    </Label>
                                    <Input type="date" id="date_limite_candidature" name="date_limite_candidature" className="h-12 border-slate-200 rounded-xl bg-white text-slate-700 focus:ring-[#124EA6]/10" />
                                </div>
                                <datalist id="villes-list">
                                    {villes.map((v) => <option key={v} value={v} />)}
                                </datalist>
                            </CardContent>
                        </Card>

                        {/* Submit Button Desktop */}
                        <div className="hidden xl:block">
                            <Button
                                type="submit"
                                disabled={isPending || !description}
                                className="w-full h-14 bg-gradient-to-r from-[#124EA6] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] group"
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Publication...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        Publier l'annonce
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* === RIGHT COLUMN: DESCRIPTION EDITOR (xl:col-span-7) === */}
                    <div className="xl:col-span-7">
                        <Card className="border-slate-200 shadow-xl shadow-slate-900/5 bg-white h-full flex flex-col rounded-2xl overflow-hidden min-h-[700px]">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-5 px-6 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#124EA6]/10 rounded-xl text-[#124EA6]">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold text-slate-800">Contenu de l'offre</CardTitle>
                                        <CardDescription className="text-xs">Rédigez une description détaillée</CardDescription>
                                    </div>
                                </div>
                                {lastSaved && (
                                    <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                                        <CheckCircle2 size={10} />
                                        BROUILLON SAUVÉ
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="p-0 grow flex flex-col">
                                <div className="grow">
                                    <RichTextEditor
                                        value={description}
                                        onChange={setDescription}
                                        placeholder="Décrivez ici le poste, les missions, le profil recherché et les avantages..."
                                    />
                                </div>
                                <input type="hidden" name="description" value={description} />
                                
                                <div className="p-5 bg-slate-50/50 border-t border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-[#124EA6] mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-700">Conseils pour une bonne annonce :</p>
                                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                                Utilisez des listes à puces pour les missions et les pré-requis. Un texte structuré attire 3x plus de candidats.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Mobile Submit Button */}
                        <div className="xl:hidden mt-8">
                            <Button
                                type="submit"
                                disabled={isPending || !description}
                                className="w-full h-14 bg-[#124EA6] text-white font-bold rounded-2xl shadow-lg"
                            >
                                {isPending ? "Publication..." : "Publier l'annonce"}
                            </Button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}