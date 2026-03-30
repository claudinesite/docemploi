import { getCategories } from '@/app/actions/jobs'
import Link from 'next/link'
import { ArrowLeft, Stethoscope, BriefcaseBusiness } from 'lucide-react'
import NewJobForm from './NewJobForm'
import { Button } from "@/components/ui/button"

export default async function NewJobPage() {
    const categories = await getCategories()
    const villes = ['Lomé', 'Kara', 'Sokodé', 'Atakpamé', 'Kpalimé', 'Dapaong']
    const contrats = ['CDI', 'CDD', 'Stage', 'Garde']

    return (
        <div className="animate-fade-in-up">
            {/* Header Section */}
            <div className="mb-10 flex flex-col items-start gap-6">
                <Button variant="ghost" asChild className="text-slate-500 hover:text-[#124EA6] font-bold p-0 bg-transparent hover:bg-transparent -ml-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> 
                        Retour au tableau de bord
                    </Link>
                </Button>

                <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 text-[#124EA6]">
                        <BriefcaseBusiness size={28} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none uppercase">Nouvelle Offre</h1>
                        <p className="text-slate-500 font-medium mt-3">Créez et publiez une nouvelle opportunité professionnelle sur DocEmploi.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-full animate-fade-in-up delay-100">
                <NewJobForm categories={categories} villes={villes} contrats={contrats} />
            </div>
        </div>
    )
}
