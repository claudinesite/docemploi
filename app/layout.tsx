import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
    title: "DocEmploi | Offres d'emploi médical",
    description: "La plateforme simple pour les professionnels de la santé.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="scroll-smooth">
            {/* 
                On utilise "font-sans" par défaut de Tailwind 
                (qui est déjà très proche de Inter sur la plupart des OS)
            */}
            <body className="min-h-screen bg-white font-sans text-gray-900 antialiased selection:bg-black selection:text-white">

                <Navbar />

                <TooltipProvider>
                    <main className="flex flex-col min-h-screen">
                        {children}
                    </main>
                </TooltipProvider>

                <Toaster position="bottom-right" richColors theme="light" />

                <Footer />
            </body>
        </html>
    );
}