import { getDictionary, Locale } from '../../dictionaries'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import settings from '@/data/settings.json'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-16">
        <h1 className="heading-primary mb-12">{dict.contact.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass p-8 rounded-2xl">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{dict.contact.formName}</label>
                <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{dict.contact.formEmail}</label>
                <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{dict.contact.formMessage}</label>
                <textarea rows={5} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Send className="w-5 h-5" />
                {dict.contact.submit}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl flex items-start gap-6">
              <div className="bg-slate-800 p-4 rounded-full text-accent shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{dict.contact.address}</h3>
                <p className="text-slate-400 whitespace-pre-line">{settings.address.replace(/\\n/g, '\n')}</p>
              </div>
            </div>
            
            <div className="glass p-8 rounded-2xl flex items-start gap-6">
              <div className="bg-slate-800 p-4 rounded-full text-blue-400 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{dict.contact.phone}</h3>
                <p className="text-slate-400">{settings.phone}</p>
              </div>
            </div>
            
            <div className="glass p-8 rounded-2xl flex items-start gap-6">
              <div className="bg-slate-800 p-4 rounded-full text-emerald-400 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{dict.contact.email}</h3>
                <p className="text-slate-400">{settings.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
