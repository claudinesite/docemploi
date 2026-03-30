-- Migration SQL pour le nouveau projet Supabase
-- Exécuter ce script dans l'Éditeur SQL de votre nouveau tableau de bord Supabase.

-- 1. Création de la table CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL UNIQUE
);

-- 2. Activation de la RLS sur CATEGORIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 3. Création de la table JOBS
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    titre TEXT NOT NULL,
    nom_etablissement TEXT NOT NULL,
    ville_togolaise TEXT NOT NULL CHECK (ville_togolaise = ANY (ARRAY['Lomé'::text, 'Kara'::text, 'Sokodé'::text, 'Atakpamé'::text, 'Kpalimé'::text, 'Dapaong'::text])),
    type_contrat TEXT NOT NULL CHECK (type_contrat = ANY (ARRAY['CDI'::text, 'CDD'::text, 'Stage'::text, 'Garde'::text])),
    description TEXT NOT NULL,
    contact_postulation TEXT NOT NULL,
    date_limite_candidature DATE,
    categorie_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    est_publie BOOLEAN DEFAULT false,
    slug TEXT NOT NULL UNIQUE
);

-- 4. Activation de la RLS sur JOBS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- 5. Création de politiques RLS de base (Lecture publique par défaut si besoin)
-- Note: Modifiez ces politiques selon vos besoins spécifiques.
CREATE POLICY "Lecture publique des catégories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Lecture publique des offres publiées" ON public.jobs FOR SELECT USING (est_publie = true);

-- 6. Insertion des catégories par défaut
INSERT INTO public.categories (nom) VALUES 
('Médecin'), ('Infirmier / Sage-femme'), ('Pharmacien / Technicien de labo'), 
('Gestion / Administration'), ('Kiné / Rééducation'), ('Autre')
ON CONFLICT (nom) DO NOTHING;
