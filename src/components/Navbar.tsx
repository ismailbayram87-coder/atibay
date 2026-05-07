'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Globe, Factory } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import media from '@/data/media.json'
import settings from '@/data/settings.json'

export default function Navbar({ lang, dict }: { lang: string, dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => {
    const newLang = lang === 'tr' ? 'en' : 'tr'
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
    return newPath
  }

  const navLinks = [
    { href: `/${lang}`, label: dict.home },
    { href: `/${lang}/about`, label: dict.corporate },
    { href: `/${lang}/services`, label: dict.services },
    { href: `/${lang}/projects`, label: dict.projects },
    { href: `/${lang}/contact`, label: dict.contact },
  ]

  const getImagePath = (src: string) => {
    if (src && src.startsWith('/') && !src.startsWith('http')) {
      return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${src}`
    }
    return src
  }

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          {media.logoLight ? (
            <Image src={getImagePath(media.logoLight)} alt="Logo" width={240} height={80} className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <div className="bg-accent p-2 rounded-lg group-hover:bg-accent-hover transition-colors">
              <Factory className="w-8 h-8 text-white" />
            </div>
          )}
          <span className="text-xl md:text-2xl font-bold tracking-wider text-white hidden sm:block group-hover:text-accent transition-colors">
            {settings.companyName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm uppercase tracking-wider font-medium transition-colors hover:text-accent ${pathname === link.href ? 'text-accent' : 'text-slate-300'}`}
            >
              {link.label}
            </Link>
          ))}
          
          <Link href={toggleLang()} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors ml-4 border-l border-slate-700 pl-4">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-bold uppercase">{lang === 'tr' ? 'EN' : 'TR'}</span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-slate-700/50"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${pathname === link.href ? 'text-accent' : 'text-slate-300'}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href={toggleLang()} 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-slate-300 pt-4 border-t border-slate-700/50 mt-2"
              >
                <Globe className="w-5 h-5" />
                <span>{lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
