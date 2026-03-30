'use client'

import { useState } from 'react'
import { Plus, Trash2, Loader2, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { createCategory, deleteCategory, updateCategory } from '@/app/actions/jobs'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AddCategoryDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const result = await createCategory(formData)
    
    setLoading(false)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Catégorie ajoutée avec succès")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#124EA6] hover:bg-blue-800 text-white font-bold gap-2">
          <Plus size={18} strokeWidth={3} />
          Ajouter une spécialité
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-[#0F172A] uppercase tracking-tight">Nouvelle Spécialité</DialogTitle>
            <DialogDescription className="font-medium text-slate-500">
              Entrez le nom de la nouvelle spécialité pour les offres d'emploi.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="space-y-2">
              <label htmlFor="nom" className="text-sm font-black text-slate-700 uppercase tracking-widest text-[10px]">Nom de la catégorie</label>
              <Input
                id="nom"
                name="nom"
                placeholder="Ex: Médecine Interne, Cardiologie..."
                className="rounded-lg border-slate-200 focus:ring-blue-100"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#124EA6] hover:bg-blue-800 text-white font-bold h-11"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer la spécialité
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function EditCategoryDialog({ id, initialNom }: { id: string; initialNom: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const result = await updateCategory(id, formData)
    
    setLoading(false)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Catégorie mise à jour")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#124EA6] hover:bg-blue-50 rounded-lg">
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-[#0F172A] uppercase tracking-tight">Modifier la Spécialité</DialogTitle>
            <DialogDescription className="font-medium text-slate-500">
              Changez le nom de cette catégorie.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="space-y-2">
              <label htmlFor="nom" className="text-sm font-black text-slate-700 uppercase tracking-widest text-[10px]">Nom de la catégorie</label>
              <Input
                id="nom"
                name="nom"
                defaultValue={initialNom}
                className="rounded-lg border-slate-200 focus:ring-blue-100"
                required
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#124EA6] hover:bg-blue-800 text-white font-bold h-11"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Mettre à jour
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteCategoryButton({ id, nom }: { id: string; nom: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const result = await deleteCategory(id)
    setLoading(false)
    
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success(`La catégorie "${nom}" a été supprimée`)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
          <Trash2 size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl border-slate-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black text-[#0F172A] uppercase tracking-tight">Supprimer la spécialité ?</AlertDialogTitle>
          <AlertDialogDescription className="font-medium text-slate-500">
            Êtes-vous certain de vouloir supprimer la spécialité <span className="text-red-600 font-bold">"{nom}"</span> ? 
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-lg font-bold border-slate-200">Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Oui, supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
