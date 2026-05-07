import { getDictionary, Locale } from '../dictionaries'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import media from '@/data/media.json'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)
  const lang = resolvedParams.lang

  const getImagePath = (src: string) => {
    if (src && src.startsWith('/') && !src.startsWith('http')) {
      return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${src}`
    }
    return src
  }

  const projectImages = [media.project1, media.project2, media.project3]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/70 z-10" />
          <Image 
            src={getImagePath(media.homeHero)}
            alt="Industrial Engineering" 
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 z-20 pt-20">
          <div className="max-w-4xl">
            <h1 className="heading-primary mb-6 animate-fade-in-up">
              {dict.home.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl animate-fade-in-up animation-delay-200">
              {dict.home.heroSubtitle}
            </p>
            <div className="animate-fade-in-up animation-delay-400">
              <Link 
                href={`/${lang}/projects`}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:pr-6 hover:pl-10"
              >
                {dict.home.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent z-10" />
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title">{dict.home.whyUsTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[dict.home.whyUsDesc1, dict.home.whyUsDesc2, dict.home.whyUsDesc3].map((desc, i) => (
              <div key={i} className="glass p-8 rounded-xl hover:bg-slate-800 transition-colors group">
                <CheckCircle2 className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-4">{desc}</h3>
                <p className="text-slate-400">
                  {lang === 'tr' 
                    ? "Endüstriyel standartlarda yenilikçi çözümler sunarak projelerinizi en üst seviyeye taşıyoruz."
                    : "We elevate your projects to the highest level by providing innovative solutions at industrial standards."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-4 m-0">
              {dict.home.featuredProjects}
            </h2>
            <Link href={`/${lang}/projects`} className="hidden md:flex items-center gap-2 text-accent hover:text-accent-hover font-medium">
              {dict.nav.projects} <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item, idx) => (
              <div key={item} className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer">
                <Image 
                  src={getImagePath(projectImages[idx])}
                  alt={`Project ${item}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="text-accent text-sm font-bold tracking-wider uppercase mb-2 block">
                    {lang === 'tr' ? 'Endüstriyel Tesis' : 'Industrial Facility'}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Project Alpha {item}</h3>
                  <div className="flex items-center gap-2 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <span className="text-sm">{dict.projects.viewDetails}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 md:hidden">
            <Link href={`/${lang}/projects`} className="flex items-center justify-center gap-2 w-full py-4 glass text-white font-medium rounded-lg">
              {dict.nav.projects} <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
