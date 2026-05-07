'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Globe, CheckCircle2 } from 'lucide-react'

export default function ContentEditor() {
  const [lang, setLang] = useState('tr')
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchContent(lang)
  }, [lang])

  const fetchContent = async (selectedLang: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/content?lang=${selectedLang}`)
      const data = await res.json()
      setContent(data)
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
      const res = await fetch(`/api/content?lang=${lang}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        setMessage('İçerik başarıyla güncellendi!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (err) {
      setMessage('Hata oluştu.')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (section: string, key: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  if (loading) return <div className="p-8 flex items-center gap-2 text-white"><Loader2 className="animate-spin w-5 h-5" /> Yükleniyor...</div>

  return (
    <div className="p-8 pb-32">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">İçerik Yönetimi (CMS)</h2>
          <p className="text-slate-400 mt-2">Sitedeki metinleri anlık olarak düzenleyin.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-lg border border-slate-700">
          <Globe className="w-5 h-5 text-slate-400 ml-2" />
          <select 
            className="bg-transparent text-white outline-none font-medium pr-2"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="tr" className="text-black">Türkçe (TR)</option>
            <option value="en" className="text-black">İngilizce (EN)</option>
          </select>
        </div>
      </header>

      {message && (
        <div className="mb-6 bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-4 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          {message}
        </div>
      )}

      {content && Object.keys(content).map((section) => (
        <div key={section} className="mb-8 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white capitalize">{section}</h3>
          </div>
          <div className="p-6 space-y-6">
            {Object.keys(content[section]).map((key) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">{key}</label>
                {content[section][key].length > 50 ? (
                  <textarea 
                    rows={4}
                    value={content[section][key]}
                    onChange={(e) => handleInputChange(section, key, e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                ) : (
                  <input 
                    type="text"
                    value={content[section][key]}
                    onChange={(e) => handleInputChange(section, key, e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-8 py-4 rounded-xl shadow-lg shadow-accent/20 flex items-center gap-3 font-bold text-lg transition-colors"
        >
          {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>
    </div>
  )
}
