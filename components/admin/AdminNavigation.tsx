"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, Tag, Stethoscope, ChevronRight, LogOut, Search, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/admin/actions"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const menuItems = [
    {
        title: "Tableau de Bord",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
    },
    {
        title: "Offres d'emploi",
        icon: Briefcase,
        href: "/admin/offres",
    },
    {
        title: "Spécialités",
        icon: Tag,
        href: "/admin/specialites", // We'll need to create this later or link to a placeholder
    },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 border-r border-slate-200 bg-white h-screen fixed left-0 top-0 z-20 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#124EA6] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                    <Stethoscope size={24} strokeWidth={2.5} />
                </div>
                <span className="font-black text-xl tracking-tight text-[#0F172A]">DocEmploi</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-bold text-sm",
                                isActive
                                    ? "bg-blue-50 text-[#124EA6]"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-[#124EA6]" : "text-slate-400 group-hover:text-slate-600")} />
                            <span>{item.title}</span>
                            {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">Administrateur</p>
                        <p className="text-[10px] text-slate-500 truncate">admin@docemploi.tg</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export function AdminTopbar() {
    const pathname = usePathname()

    return (
        <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Administration</h2>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className="text-sm font-bold text-slate-900">
                    {pathname === "/admin/dashboard" ? "Tableau de Bord" : "Gestion"}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-px h-6 bg-slate-200 mx-2" />



                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="text-red-600 underline hover:text-red-600" title="Déconnexion">
                            <LogOut size={20} className="mr-2" />
                            Déconnexion
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette action vous déconnectera de la plateforme d'administration.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => logout()}>Continuer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </header>
    )
}
