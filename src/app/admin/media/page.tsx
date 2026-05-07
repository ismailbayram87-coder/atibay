'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function MediaEditor() {
  const [media, setMedia] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)

  const handleFileUpload = async (key: string, file: File) => {
    if (!file) return;
    setUploadingKey(key);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        handleInputChange(key, data.url);
      } else {
        alert('Dosya yükleme hatası: ' + (data.error || 'Bilinmeyen hata'));
      }
    } catch (err) {
      alert('Dosya yüklenirken bir hata oluştu.');
    } finally {
      setUploadingKey(null);
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/data?type=media')
      const data = await res.json()
      setMedia(data)
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
      const res = await fetch('/api/data?type=media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(media),
      })
      if (res.ok) {
        setMessage('Medya URL leri başarıyla güncellendi!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (err) {
      setMessage('Hata oluştu.')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setMedia((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  const mediaLabels: Record<string, string> = {
    logoLight: "Açık Tema Logosu (Tavsiye edilen: PNG)",
    logoDark: "Koyu Tema Logosu (Tavsiye edilen: PNG)",
    homeHero: "Ana Sayfa - Kahraman Banner",
    aboutBanner: "Hakkımızda - Üst Banner",
    aboutOffice: "Hakkımızda - Ofis Resmi",
    project1: "Proje 1 Resmi",
    project2: "Proje 2 Resmi",
    project3: "Proje 3 Resmi",
    project4: "Proje 4 Resmi",
    project5: "Proje 5 Resmi",
    project6: "Proje 6 Resmi",
  }

  if (loading) return <div className="p-8 flex items-center gap-2 text-white"><Loader2 className="animate-spin w-5 h-5" /> Yükleniyor...</div>

  return (
    <div className="p-8 pb-32">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white">Medya Yönetimi</h2>
        <p className="text-slate-400 mt-2">Sitedeki görsellerin (Unsplash vb.) URL'lerini düzenleyin.</p>
      </header>

      {message && (
        <div className="mb-6 bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-4 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          {message}
        </div>
      )}

      {media && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.keys(media).map((key) => (
            <div key={key} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
              <div className="bg-slate-900 relative aspect-video flex items-center justify-center overflow-hidden">
                {media[key] ? (
                  <Image src={media[key]} alt={key} fill className="object-cover" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-slate-700" />
                )}
              </div>
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white mb-2">{mediaLabels[key] || key}</h3>
                  
                  <label className="text-xs font-medium text-slate-400 block mb-1">Bilgisayardan Yükle</label>
                  <div className="flex items-center gap-3 mb-3">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(key, e.target.files[0])
                        }
                      }} 
                      disabled={uploadingKey === key}
                      className="block w-full text-sm text-slate-300
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-accent file:text-white
                        hover:file:bg-accent-hover
                        cursor-pointer disabled:opacity-50
                      "
                    />
                    {uploadingKey === key && <Loader2 className="w-5 h-5 text-accent animate-spin flex-shrink-0" />}
                  </div>

                  <label className="text-xs font-medium text-slate-400 mt-2 block">Veya Resim URL'si girin</label>
                  <input 
                    type="text" 
                    value={media[key]} 
                    onChange={(e) => handleInputChange(key, e.target.value)} 
                    className="w-full mt-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-8 py-4 rounded-xl shadow-lg shadow-accent/20 flex items-center gap-3 font-bold text-lg transition-colors"
        >
          {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
          {saving ? 'Kaydediliyor...' : 'Görselleri Kaydet'}
        </button>
      </div>
    </div>
  )
}
