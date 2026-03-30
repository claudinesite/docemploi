"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar, AdminTopbar } from "./AdminNavigation"
import { cn } from "@/lib/utils"

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAuthPage = pathname === "/admin/login"

    if (isAuthPage) {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar />
            <div className="flex-1 min-w-0 md:ml-64">
                <AdminTopbar />
                <main className="p-4 md:p-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
