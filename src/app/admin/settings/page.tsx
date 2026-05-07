'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle2 } from 'lucide-react'

export default function SettingsEditor() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/data?type=settings')
      const data = await res.json()
      setSettings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/data?type=settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setMessage('Ayarlar başarıyla güncellendi!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (err) {
      setMessage('Hata oluştu.')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSocialChange = (network: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [network]: value
      }
    }))
  }

  if (loading) return <div className="p-8 flex items-center gap-2 text-white"><Loader2 className="animate-spin w-5 h-5" /> Yükleniyor...</div>

  return (
    <div className="p-8 pb-32">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white">Genel Ayarlar</h2>
        <p className="text-slate-400 mt-2">Şirket bilgileri, iletişim ve sosyal medya ayarları.</p>
      </header>

      {message && (
        <div className="mb-6 bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-4 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          {message}
        </div>
      )}

      {settings && (
        <div className="space-y-8">
          {/* Company Info */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Firma Bilgileri</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Şirket Adı</label>
                <input type="text" value={settings.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Adres</label>
                <textarea rows={3} value={settings.address.replace(/\\n/g, '\n')} onChange={(e) => handleInputChange('address', e.target.value.replace(/\n/g, '\\n'))} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">İletişim</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Telefon</label>
                <input type="text" value={settings.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">E-posta</label>
                <input type="email" value={settings.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">WhatsApp Numarası (Sadece rakamlarla, ülke kodu dahil. Örn: 905551234567)</label>
                <input type="text" value={settings.whatsapp} onChange={(e) => handleInputChange('whatsapp', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Sosyal Medya Bağlantıları</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">LinkedIn URL</label>
                <input type="text" value={settings.socials?.linkedin || ''} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Twitter URL</label>
                <input type="text" value={settings.socials?.twitter || ''} onChange={(e) => handleSocialChange('twitter', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Instagram URL</label>
                <input type="text" value={settings.socials?.instagram || ''} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-8 py-4 rounded-xl shadow-lg shadow-accent/20 flex items-center gap-3 font-bold text-lg transition-colors"
        >
          {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
          {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </button>
      </div>
    </div>
  )
}
