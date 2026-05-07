import { getDictionary, Locale } from '../../dictionaries'
import Image from 'next/image'
import media from '@/data/media.json'

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  const projects = [
    { image: media.project1, name: "Alpha Facility" },
    { image: media.project2, name: "Beta Complex" },
    { image: media.project3, name: "Gamma Plant" },
    { image: media.project4, name: "Delta Station" },
    { image: media.project5, name: "Epsilon Hub" },
    { image: media.project6, name: "Zeta Factory" }
  ]

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="heading-primary mb-12">{dict.projects.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative rounded-xl overflow-hidden aspect-video bg-slate-800">
              <Image 
                src={project.image || "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800"}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{project.name}</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  {dict.projects.viewDetails} &rarr;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
