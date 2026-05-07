import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getDictionary, Locale } from '../dictionaries'
import settings from '@/data/settings.json'

export const metadata: Metadata = {
  title: settings.companyName,
  description: 'Industrial engineering solutions and projects.',
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return (
    <html lang={resolvedParams.lang} className="dark">
      <body className="antialiased min-h-screen flex flex-col bg-slate-900 text-slate-100">
        <Navbar lang={resolvedParams.lang} dict={dict.nav} />
        <main className="flex-1">
          {children}
        </main>
        <Footer dict={dict.footer} />
        <WhatsAppButton phone={settings.whatsapp} />
      </body>
    </html>
  )
}
