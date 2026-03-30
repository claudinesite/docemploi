"use client"

import { useState, useTransition } from "react"
import { Trash2, Eye, EyeOff, Loader2, Pencil } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
import { toast } from "sonner"
import { deleteJob, toggleJobPublish } from "@/app/actions/jobs"

export function DeleteJobButton({ id, title }: { id: string, title: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteJob(id)
      if (result?.success) {
        toast.success(`L'offre "${title}" a été supprimée avec succès.`)
      } else {
        toast.error("Erreur lors de la suppression de l'offre.")
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" disabled={isPending}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 size={18} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl border-slate-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold text-slate-900">Supprimer cette offre ?</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 font-medium">
            Cette action est irréversible. L'offre "{title}" sera définitivement supprimée de la base de données.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-lg font-bold">Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function TogglePublishButton({ id, isPublished, title }: { id: string, isPublished: boolean, title: string }) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleJobPublish(id, isPublished)
      if (result?.success) {
        toast.success(isPublished ? `"${title}" est maintenant en brouillon.` : `"${title}" est maintenant en ligne !`)
      } else {
        toast.error("Erreur lors de la mise à jour du statut.")
      }
    })
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleToggle} 
      disabled={isPending}
      className={isPublished ? "text-amber-500 hover:bg-amber-50" : "text-green-600 hover:bg-green-50"}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        isPublished ? <EyeOff size={18} /> : <Eye size={18} />
      )}
    </Button>
  )
}

export function EditJobButton({ id }: { id: string }) {
  return (
    <Link href={`/admin/offres/${id}/editer`}>
      <Button variant="ghost" size="icon" className="text-[#124EA6] hover:bg-blue-50">
        <Pencil size={18} />
      </Button>
    </Link>
  )
}
