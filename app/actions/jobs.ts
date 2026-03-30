'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getJobs(searchParams?: {
    ville?: string;
    categorie_id?: string;
    q?: string;
    limit?: number;
}) {
    const supabase = await createClient()

    let query = supabase
        .from('jobs')
        .select('*, categories(nom)', { count: 'exact' })
        .eq('est_publie', true)
        .order('created_at', { ascending: false })

    // Si une limite est fournie, on applique le range
    if (searchParams?.limit) {
        query = query.range(0, searchParams.limit - 1)
    }

    // 2. LOGIQUE DE RECHERCHE TEXTUELLE
    if (searchParams?.q) {
        const term = searchParams.q
        query = query.or(`titre.ilike.%${term}%,nom_etablissement.ilike.%${term}%`)
    }

    // Logique pour la ville
    if (searchParams?.ville && searchParams.ville !== 'all') {
        query = query.eq('ville_togolaise', searchParams.ville)
    }

    // Logique pour la catégorie
    if (searchParams?.categorie_id && searchParams.categorie_id !== 'all') {
        query = query.eq('categorie_id', searchParams.categorie_id)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching jobs:', error)
        return []
    }

    return data || []
}

export async function getAdminJobs(page: number = 1, limit: number = 10) {
    const supabase = await createClient()

    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
        .from('jobs')
        .select('*, categories(nom)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        console.error('Error fetching admin jobs:', error)
        return { data: [], count: 0 }
    }

    return { data, count }
}

export async function toggleJobPublish(id: string, currentStatus: boolean) {
    const supabase = await createClient()

    const { error } = await supabase.from('jobs').update({ est_publie: !currentStatus }).eq('id', id)

    if (error) {
        console.error('Error toggling publish status:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/dashboard')
    revalidatePath('/')
    revalidatePath('/recherche')
    return { success: true }
}

export async function deleteJob(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('jobs').delete().eq('id', id)

    if (error) {
        console.error('Error deleting job:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/dashboard')
    revalidatePath('/')
    revalidatePath('/recherche')
    return { success: true }
}

export async function createJob(formData: FormData) {
    const supabase = await createClient()

    const titre = formData.get('titre') as string
    const nom_etablissement = formData.get('nom_etablissement') as string
    const ville_togolaise = formData.get('ville_togolaise') as string
    const type_contrat = formData.get('type_contrat') as string
    const description = formData.get('description') as string
    const contact_postulation = formData.get('contact_postulation') as string
    const categorie_id = formData.get('categorie_id') as string
    const date_limite_candidature = formData.get('date_limite_candidature') as string || null
    const slug = `${titre}-${nom_etablissement}-${Math.random().toString(36).substring(2, 7)}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const { error } = await supabase.from('jobs').insert({
        titre,
        nom_etablissement,
        ville_togolaise,
        type_contrat,
        description,
        contact_postulation,
        categorie_id,
        date_limite_candidature,
        slug,
        est_publie: false
    })

    if (error) {
        console.error('Error creating job:', error)
        throw new Error(error.message)
    }

    revalidatePath('/admin/dashboard')
    redirect('/admin/dashboard')
}

export async function getJobById(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single()

    if (error) {
        console.error('Error fetching job:', error)
        return null
    }

    return data
}

export async function updateJob(id: string, formData: FormData) {
    const supabase = await createClient()

    const titre = formData.get('titre') as string
    const nom_etablissement = formData.get('nom_etablissement') as string
    const ville_togolaise = formData.get('ville_togolaise') as string
    const type_contrat = formData.get('type_contrat') as string
    const description = formData.get('description') as string
    const contact_postulation = formData.get('contact_postulation') as string
    const categorie_id = formData.get('categorie_id') as string
    const date_limite_candidature = formData.get('date_limite_candidature') as string || null

    const { error } = await supabase.from('jobs').update({
        titre,
        nom_etablissement,
        ville_togolaise,
        type_contrat,
        description,
        contact_postulation,
        categorie_id,
        date_limite_candidature,
    }).eq('id', id)

    if (error) {
        console.error('Error updating job:', error)
        throw new Error(error.message)
    }

    revalidatePath('/admin/dashboard')
    revalidatePath(`/offres/${id}`)
    redirect('/admin/dashboard')
}

export async function getTopCategories() {
    const supabase = await createClient()

    // Fetch categories with job counts
    const { data, error } = await supabase
        .from('categories')
        .select('id, nom, jobs(id)')
        .eq('jobs.est_publie', true)

    if (error) {
        console.error('Error fetching top categories:', error)
        return []
    }

    // Calculate job counts and format data
    const categoriesWithCounts = data.map(cat => ({
        id: cat.id,
        nom: cat.nom,
        jobCount: (cat.jobs as any[]).length
    }))

    // Sort by count descending and take top 6
    return categoriesWithCounts
        .sort((a, b) => b.jobCount - a.jobCount)
        .slice(0, 6)
}

export async function getCategories() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('categories').select('*').order('nom')
    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }
    return data
}

export async function getVilles() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('jobs').select('ville_togolaise').eq('est_publie', true)

    if (error) {
        console.error('Error fetching villes:', error)
        return []
    }

    // Extract unique cities, remove nulls/undefined, and sort alphabetically
    const uniqueVilles = Array.from(new Set(data.map(job => job.ville_togolaise))).filter(Boolean).sort()
    return uniqueVilles
}

export async function createCategory(formData: FormData) {
    const supabase = await createClient()
    const nom = formData.get('nom') as string

    if (!nom) return { error: "Le nom est requis" }

    const { error } = await supabase.from('categories').insert({ nom })

    if (error) {
        console.error('Error creating category:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/specialites')
    revalidatePath('/admin/offres/nouvelle')
    revalidatePath('/recherche')
    return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = await createClient()
    const nom = formData.get('nom') as string

    if (!nom) return { error: "Le nom est requis" }

    const { error } = await supabase.from('categories').update({ nom }).eq('id', id)

    if (error) {
        console.error('Error updating category:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/specialites')
    revalidatePath('/admin/offres/nouvelle')
    revalidatePath('/recherche')
    return { success: true }
}

export async function deleteCategory(id: string) {
    const supabase = await createClient()

    // First check if there are any jobs using this category
    const { data: jobs, error: countError } = await supabase
        .from('jobs')
        .select('id')
        .eq('categorie_id', id)
        .limit(1)

    if (jobs && jobs.length > 0) {
        return { error: "Impossible de supprimer cette catégorie car des offres y sont encore rattachées." }
    }

    const { error } = await supabase.from('categories').delete().eq('id', id)

    if (error) {
        console.error('Error deleting category:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/specialites')
    revalidatePath('/admin/offres/nouvelle')
    revalidatePath('/recherche')
    return { success: true }
}
