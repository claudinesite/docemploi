import { getCategories, getJobById } from '@/app/actions/jobs'
import { notFound } from 'next/navigation'
import EditJobForm from './EditJobForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const VILLES_TOGO = [
  "Lomé", "Atakpamé", "Kpalimé", "Sokodé", "Kara", "Dapaong", "Tsévié", "Aného"
]

const TYPES_CONTRAT = [
  "CDI", "CDD", "Stage", "Freelance", "Alternance", "Remplacement", "Internat"
]

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const [job, categories] = await Promise.all([
    getJobById(id),
    getCategories()
  ])

  if (!job) {
    notFound()
  }

  return (
    <div className="animate-fade-in-up">
      {/* =========================================
          EN-TÊTE
      ========================================= */}
      <div className="flex flex-col gap-6 mb-10">
        <Link href="/admin/dashboard">
          <Button variant="ghost" className="text-slate-500 hover:text-[#124EA6] -ml-4 font-bold flex items-center gap-2">
            <ArrowLeft size={18} />
            Retour au tableau de bord
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none uppercase">Modifier une offre</h2>
          <p className="text-slate-500 font-medium mt-3">
            Mettez à jour les informations de l'annonce <span className="text-[#124EA6] font-black underline">{job.titre}</span>.
          </p>
        </div>
      </div>

      <div className="max-w-full">
        <EditJobForm 
          job={job}
          categories={categories} 
          villes={VILLES_TOGO} 
          contrats={TYPES_CONTRAT} 
        />
      </div>
    </div>
  )
}
