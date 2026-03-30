'use client'

import React, { useState } from 'react'
import { Facebook, Twitter, Linkedin, Share2, Check } from 'lucide-react'

interface ShareButtonsProps {
    url: string
    title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
            name: 'Twitter',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Offre d'emploi : ${title}`)}`,
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        },
    ]

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <div className="flex items-center gap-4">
            {shareLinks.map((social) => (
                <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#0A1E3F] hover:bg-[#124EA6] hover:text-white hover:border-[#124EA6] transition-all duration-300 flex items-center justify-center shadow-sm"
                    title={`Partager sur ${social.name}`}
                >
                    <social.icon size={18} />
                </a>
            ))}
            <button
                onClick={handleCopy}
                className={`w-12 h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center shadow-sm ${
                    copied 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'bg-white border-slate-200 text-[#0A1E3F] hover:bg-[#124EA6] hover:text-white hover:border-[#124EA6]'
                }`}
                title="Copier le lien"
            >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
            </button>
        </div>
    )
}
