import { getDictionary, Locale } from '../../dictionaries'
import { Target, Compass } from 'lucide-react'
import Image from 'next/image'
import media from '@/data/media.json'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <Image 
            src={media.aboutBanner}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="heading-primary mb-6">{dict.corporate.title}</h1>
          <div className="w-24 h-1 bg-accent"></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="glass p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <Target className="w-12 h-12 text-accent mb-6 relative z-10" />
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">{dict.corporate.mission}</h2>
              <p className="text-lg text-slate-300 leading-relaxed relative z-10">
                {dict.corporate.missionText}
              </p>
            </div>
            
            <div className="glass p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-metal/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <Compass className="w-12 h-12 text-blue-400 mb-6 relative z-10" />
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">{dict.corporate.vision}</h2>
              <p className="text-lg text-slate-300 leading-relaxed relative z-10">
                {dict.corporate.visionText}
              </p>
            </div>
          </div>
          
          <div className="mt-20">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/50">
              <Image 
                src={media.aboutOffice}
                alt="Corporate Office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Engineering Excellence</h3>
                <p className="text-slate-300 max-w-xl">
                  {resolvedParams.lang === 'tr' 
                    ? "Sektördeki 20 yıllık tecrübemizle yenilikçi projelere imza atmaya devam ediyoruz."
                    : "With 20 years of experience in the sector, we continue to put our signature on innovative projects."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
