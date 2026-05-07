import { getDictionary, Locale } from '../../dictionaries'
import { Factory, Cog, ClipboardCheck } from 'lucide-react'

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  const services = [
    {
      title: dict.services.service1,
      desc: dict.services.service1Desc,
      icon: <Factory className="w-10 h-10 text-accent" />
    },
    {
      title: dict.services.service2,
      desc: dict.services.service2Desc,
      icon: <ClipboardCheck className="w-10 h-10 text-blue-400" />
    },
    {
      title: dict.services.service3,
      desc: dict.services.service3Desc,
      icon: <Cog className="w-10 h-10 text-emerald-400" />
    }
  ]

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-16">
        <h1 className="heading-primary mb-12 text-center">{dict.services.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-t-transparent hover:border-t-accent">
              <div className="bg-slate-800 w-20 h-20 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
              <p className="text-slate-400 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
