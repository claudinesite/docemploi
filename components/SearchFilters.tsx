"use client"

import { Search, MapPin, ChevronDown, X } from "lucide-react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce" // Si tu n'as pas cette lib, voir note plus bas*

export default function SearchFilters({ villes }: { villes: string[] }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    // Récupération des valeurs actuelles de l'URL
    const currentQ = searchParams.get('q')?.toString()
    const currentVille = searchParams.get('ville')?.toString()

    // Fonction pour mettre à jour l'URL
    const updateURL = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)

        // On remet la page à 1 à chaque nouvelle recherche
        params.set('page', '1')

        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }

        // On remplace l'URL sans recharger la page, et on garde le scroll (#offres)
        replace(`${pathname}?${params.toString()}#offres`, { scroll: false })
    }

    // Debounce : On attend 300ms après la frappe avant de lancer la recherche
    // (Pour éviter de recharger la page à chaque lettre tapée)
    // NOTE: Si tu n'as pas 'use-debounce', installe-la : npm install use-debounce
    // OU utilise la version sans lib ci-dessous.
    const handleSearch = useDebouncedCallback((term: string) => {
        updateURL('q', term)
    }, 300)

    const handleCity = (city: string) => {
        updateURL('ville', city)
    }

    const hasFilters = currentQ || currentVille

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">

            {/* Input Recherche */}
            <div className="relative group w-full sm:w-72">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <Search className="w-4.5 h-4.5 text-slate-400 group-focus-within:text-[#124EA6] transition-colors duration-200" />
                </div>
                <input
                    type="text"
                    defaultValue={currentQ}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Poste, clinique..."
                    className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 placeholder:text-slate-400 placeholder:font-medium outline-none shadow-sm hover:border-slate-300 focus:border-[#124EA6] focus:ring-4 focus:ring-[#124EA6]/5 transition-all duration-200"
                />
            </div>

            {/* Select Ville */}
            <div className="relative group w-full sm:w-56">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <MapPin className="w-4.5 h-4.5 text-slate-400 group-focus-within:text-[#124EA6] transition-colors duration-200" />
                </div>
                <select
                    defaultValue={currentVille || ""}
                    onChange={(e) => handleCity(e.target.value)}
                    className="w-full h-12 pl-11 pr-10 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none shadow-sm hover:border-slate-300 focus:border-[#124EA6] focus:ring-4 focus:ring-[#124EA6]/5 transition-all duration-200 appearance-none cursor-pointer"
                >
                    <option value="">Toute la région</option>
                    {villes.map((ville) => (
                        <option key={ville} value={ville}>{ville}</option>
                    ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#124EA6] transition-colors duration-200">
                    <ChevronDown size={16} />
                </div>
            </div>

            {/* Bouton Reset (Apparaît seulement si filtre actif) */}
            {hasFilters && (
                <button
                    onClick={() => replace(`${pathname}#offres`)}
                    className="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-slate-200 hover:border-red-200 bg-white shadow-sm transition-all duration-200"
                    title="Effacer les filtres"
                >
                    <X size={20} />
                </button>
            )}
        </div>
    )
}