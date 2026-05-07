import { Activity, Users, Eye, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: "Toplam Ziyaretçi", value: "12,450", icon: <Users className="w-6 h-6 text-blue-400" /> },
    { label: "Aktif Projeler", value: "8", icon: <Activity className="w-6 h-6 text-emerald-400" /> },
    { label: "Sayfa Görüntülenmesi", value: "45,200", icon: <Eye className="w-6 h-6 text-purple-400" /> },
    { label: "Dönüşüm Oranı", value: "%4.2", icon: <BarChart3 className="w-6 h-6 text-accent" /> },
  ]

  return (
    <div className="p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white">Dashboard Özeti</h2>
        <p className="text-slate-400 mt-2">Sitenizin genel istatistikleri ve durumu.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-900 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Sistem Durumu</h3>
        <p className="text-slate-400 mb-6">Supabase bağlantısı ve Next.js önbelleği sorunsuz çalışıyor.</p>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg border border-emerald-900/50">
            <span className="text-slate-300">Veritabanı (Supabase)</span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">Aktif</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg border border-emerald-900/50">
            <span className="text-slate-300">Resim Optimizasyon Servisi (WebP)</span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">Aktif</span>
          </div>
        </div>
      </div>
    </div>
  )
}
