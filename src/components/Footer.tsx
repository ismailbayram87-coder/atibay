import { Factory, Mail, MapPin, Phone } from "lucide-react";
import settings from '@/data/settings.json';
import media from '@/data/media.json';

export default function Footer({ dict }: { dict: any }) {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              {media.logoLight ? (
                <img src={media.logoLight} alt="Logo" className="h-14 w-auto object-contain" />
              ) : (
                <div className="bg-accent p-2 rounded-lg">
                  <Factory className="w-6 h-6 text-white" />
                </div>
              )}
              <span className="text-xl font-bold tracking-wider text-white">{settings.companyName.toUpperCase()}</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Industrial standards, reliable engineering, and sustainable solutions for the future.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{settings.address.replace(/\\n/g, '\n')}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Social</h3>
            <div className="flex gap-4">
              {settings.socials.linkedin && (
                <a href={settings.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-colors">
                  <span className="text-xs font-bold">in</span>
                </a>
              )}
              {settings.socials.twitter && (
                <a href={settings.socials.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-colors">
                  <span className="text-xs font-bold">X</span>
                </a>
              )}
              {settings.socials.instagram && (
                <a href={settings.socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-colors">
                  <span className="text-xs font-bold">ig</span>
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {settings.companyName}. {dict.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
