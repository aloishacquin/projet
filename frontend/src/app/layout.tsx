import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

// Métadonnées du site
export const metadata = {
  title: 'JasonDerulo (nom temporaire)',
  description: 'Personnalise ton voyage',
};

// Typage des props
interface RootLayoutProps {
  children: ReactNode;
}

// Layout global du site avec le menu de navigation
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body>
        {/* Menu de navigation en haut de toutes les pages */}
        <nav className="bg-gray-100 p-4 flex gap-4">
          <Link href="/">🏠 Accueil</Link>
          <Link href="/itineraire">🗺️ Itinéraire</Link>
          <Link href="/conseils">💡 Conseils</Link>
          <Link href="/checklist">✅ Checklist</Link>
          <Link href="/vocabulaire">📚 Vocabulaire</Link>
          <Link href="/quiz">📝 Quiz</Link>
        </nav>

        {/* Contenu principal de la page */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
