'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle2, UserPlus, Trash2 } from 'lucide-react'

export default function UsersEditor() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
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
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users),
      })
      if (res.ok) {
        setMessage('Kullanıcılar başarıyla güncellendi!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (err) {
      setMessage('Hata oluştu.')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (index: number, key: string, value: string) => {
    const newUsers = [...users]
    newUsers[index] = { ...newUsers[index], [key]: value }
    setUsers(newUsers)
  }

  const addUser = () => {
    setUsers([...users, { id: Date.now().toString(), username: '', password: '', role: 'admin', name: '' }])
  }

  const removeUser = (index: number) => {
    if (users.length <= 1) {
      alert("En az 1 yönetici kalmak zorundadır!")
      return
    }
    const newUsers = [...users]
    newUsers.splice(index, 1)
    setUsers(newUsers)
  }

  if (loading) return <div className="p-8 flex items-center gap-2 text-white"><Loader2 className="animate-spin w-5 h-5" /> Yükleniyor...</div>

  return (
    <div className="p-8 pb-32">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Yöneticiler</h2>
          <p className="text-slate-400 mt-2">Admin paneline erişebilecek kullanıcıları yönetin.</p>
        </div>
        <button 
          onClick={addUser}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Yeni Kullanıcı Ekle
        </button>
      </header>

      {message && (
        <div className="mb-6 bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-4 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          {message}
        </div>
      )}

      <div className="space-y-6">
        {users.map((user, idx) => (
          <div key={user.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 relative">
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => removeUser(idx)}
                className="text-slate-500 hover:text-red-400 transition-colors p-2"
                title="Kullanıcıyı Sil"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-6">Kullanıcı #{idx + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Ad Soyad</label>
                <input type="text" value={user.name} onChange={(e) => handleInputChange(idx, 'name', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Örn: Ahmet Yılmaz" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Yetki Rolü</label>
                <select value={user.role} onChange={(e) => handleInputChange(idx, 'role', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors">
                  <option value="admin">Admin</option>
                  <option value="editor">Editör</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Kullanıcı Adı (Giriş için)</label>
                <input type="text" value={user.username} onChange={(e) => handleInputChange(idx, 'username', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Kullanıcı adı (boşluksuz)" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Şifre</label>
                <input type="text" value={user.password} onChange={(e) => handleInputChange(idx, 'password', e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Güçlü bir şifre girin" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8 z-50">
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
