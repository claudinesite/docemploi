// components/HeroSvg.tsx
export default function HeroSvg() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl"
            >
                <defs>
                    {/* Dégradé bleu clair pour le coeur */}
                    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#71D6FF" />
                        <stop offset="100%" stopColor="#3A82F7" />
                    </linearGradient>

                    {/* Dégradé Rose/Rouge néon pour le battement */}
                    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF4B8C" />
                        <stop offset="50%" stopColor="#FF0055" />
                        <stop offset="100%" stopColor="#FF4B8C" />
                    </linearGradient>

                    {/* Effet de lueur (Glow) pour faire "Néon" */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Cœur en arrière-plan (Style Glassmorphism / Contour épais) */}
                <path
                    d="M200 340 C80 240 40 160 40 100 C40 50 80 20 130 20 C170 20 190 40 200 70 C210 40 230 20 270 20 C320 20 360 50 360 100 C360 160 320 240 200 340 Z"
                    fill="url(#heartGrad)"
                    fillOpacity="0.15"
                    stroke="url(#heartGrad)"
                    strokeWidth="12"
                    strokeLinejoin="round"
                />

                {/* Ligne de battement de coeur (ECG) avec lueur */}
                <path
                    d="M30 180 L120 180 L145 100 L185 280 L220 120 L250 180 L370 180"
                    stroke="url(#pulseGrad)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    // Petite animation sur la ligne pour simuler le battement
                    className="animate-[pulse_2s_ease-in-out_infinite]"
                />

                {/* Petites sphères décoratives flottantes autour */}
                <circle cx="60" cy="80" r="8" fill="#71D6FF" filter="url(#glow)" />
                <circle cx="340" cy="260" r="12" fill="#FF4B8C" filter="url(#glow)" />
                <circle cx="320" cy="60" r="6" fill="#3A82F7" />
            </svg>
        </div>
    )
}