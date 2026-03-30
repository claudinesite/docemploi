import { login } from '../actions'
import Link from 'next/link'
import { Stethoscope, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const params = await searchParams;

    return (
        // CHANGEMENT 1 : h-screen au lieu de min-h-screen + overflow-hidden
        <div className="h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden">

            {/* Back Button */}
            <div className="absolute top-8 left-4 md:left-8 animate-fade-in-up z-20">
                <Button variant="ghost" asChild className="text-slate-500 hover:text-[#124EA6] font-semibold">
                    <Link href="/" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Retour
                    </Link>
                </Button>
            </div>

            <div className="w-full max-w-[400px] animate-fade-in-up delay-100 relative z-10 flex-shrink-0">
                {/* CHANGEMENT 2 : Ajout de flex-shrink-0 pour éviter que la carte ne s'écrase */}

                {/* Logo Area */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-[#124EA6] mb-4">
                        <Stethoscope size={32} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">DocEmploi Admin</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Gestionnaire du portail médical</p>
                </div>

                <Card className="border-slate-200/60 shadow-xl shadow-blue-900/5 bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl">
                    <CardHeader className="pb-2 pt-8">
                        <CardTitle className="text-xl font-bold text-slate-800">Connexion</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">
                            Entrez vos identifiants pour accéder au tableau de bord.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form action={login} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-bold ml-1">Email professionnel</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#124EA6] transition-colors pointer-events-none" />
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="admin@letibia.tg"
                                        className="h-11 pl-10 bg-slate-50/50 border-slate-200 rounded-lg font-medium text-slate-900 focus-visible:ring-[#124EA6]/10 focus-visible:border-[#124EA6] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label htmlFor="password" className="text-slate-700 font-bold">Mot de passe</Label>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#124EA6] transition-colors pointer-events-none" />
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        className="h-11 pl-10 bg-slate-50/50 border-slate-200 rounded-lg font-medium text-slate-900 focus-visible:ring-[#124EA6]/10 focus-visible:border-[#124EA6] transition-all"
                                    />
                                </div>
                            </div>

                            {params?.error && (
                                <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-start gap-3 animate-head-shake">
                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-[13px] font-semibold text-red-700">
                                        Identifiants incorrects.
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 bg-[#124EA6] hover:bg-blue-800 text-white font-bold rounded-lg shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98] mt-2"
                            >
                                Se connecter
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="pt-2 pb-8 flex justify-center border-none bg-transparent">
                        <p className="text-xs text-slate-400 font-medium italic">
                            Accès réservé aux administrateurs autorisés.
                        </p>
                    </CardFooter>
                </Card>

                {/* Footer Link */}
                <div className="text-center mt-8">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                        © 2026 DocEmploi Togo
                    </p>
                </div>
            </div>
        </div>
    )
}