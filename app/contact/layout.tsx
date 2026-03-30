// app/contact/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact | DocEmploi',
    description: 'Contactez l\'équipe DocEmploi. Nous sommes là pour répondre à toutes vos questions.',
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
