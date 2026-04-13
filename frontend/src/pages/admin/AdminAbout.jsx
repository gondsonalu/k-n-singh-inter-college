import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ImageUploadField } from '../../components/admin/AdminComponents'
import API from '../../utils/api'

export default function AdminAbout() {
  const [form, setForm] = useState({
    vision: '', mission: '', history: '', principalMessage: '', principalName: '',
    stats: { established: '', students: '', faculty: '', courses: '' },
    contactInfo: { address: '', phone: '', email: '', website: '' },
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    API.get('/about').then(r => {
      const d = r.data.data
      setForm({
        vision: d.vision || '',
        mission: d.mission || '',
        history: d.history || '',
        principalMessage: d.principalMessage || '',
        principalName: d.principalName || '',
        stats: d.stats || { established: '', students: '', faculty: '', courses: '' },
        contactInfo: d.contactInfo || { address: '', phone: '', email: '', website: '' },
      })
      if (d.principalImage) setImagePreview(d.principalImage)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('vision', form.vision)
      fd.append('mission', form.mission)
      fd.append('history', form.history)
      fd.append('principalMessage', form.principalMessage)
      fd.append('principalName', form.principalName)
      fd.append('stats', JSON.stringify(form.stats))
      fd.append('contactInfo', JSON.stringify(form.contactInfo))
      if (imageFile) fd.append('principalImage', imageFile)
      await API.put('/about', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('About content updated successfully')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update')
    } finally { setSaving(false) }
  }

  const tabs = ['general', 'principal', 'stats', 'contact']

  if (loading) return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-64 rounded-2xl" />
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-college-navy">About Content</h1>
        <p className="text-gray-500 text-sm mt-1">Edit the about page content displayed on the public website</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-college-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-college-gold'}`}>
            {tab === 'general' ? 'Vision & History' : tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          {activeTab === 'general' && (
            <div className="space-y-5">
              <div>
                <label className="label">Vision</label>
                <textarea value={form.vision} onChange={e => setForm({ ...form, vision: e.target.value })} rows={4}
                  className="input-field resize-none" placeholder="Enter the college vision statement..." />
              </div>
              <div>
                <label className="label">Mission</label>
                <textarea value={form.mission} onChange={e => setForm({ ...form, mission: e.target.value })} rows={4}
                  className="input-field resize-none" placeholder="Enter the college mission statement..." />
              </div>
              <div>
                <label className="label">History / About College</label>
                <textarea value={form.history} onChange={e => setForm({ ...form, history: e.target.value })} rows={8}
                  className="input-field resize-none font-mono text-sm" placeholder="College history... (HTML supported)" />
                <p className="text-xs text-gray-400 mt-1">HTML tags like &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt; are supported.</p>
              </div>
            </div>
          )}

          {activeTab === 'principal' && (
            <div className="space-y-5">
              <div>
                <label className="label">Principal's Name</label>
                <input value={form.principalName} onChange={e => setForm({ ...form, principalName: e.target.value })}
                  className="input-field" placeholder="e.g. Dr. Ramesh Kumar Singh" />
              </div>
              <div>
                <label className="label">Principal's Message</label>
                <textarea value={form.principalMessage} onChange={e => setForm({ ...form, principalMessage: e.target.value })} rows={8}
                  className="input-field resize-none font-mono text-sm" placeholder="Message from the principal... (HTML supported)" />
              </div>
              <ImageUploadField
                value={imageFile} onChange={setImageFile}
                preview={imagePreview} setPreview={setImagePreview}
                label="Principal's Photo"
              />
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-5">
              <p className="text-sm text-gray-500 mb-2">These stats appear in the hero stats bar on the About page.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['established', 'Year Established', 'e.g. 1985'],
                  ['students', 'Total Students', 'e.g. 2500+'],
                  ['faculty', 'Faculty Members', 'e.g. 45+'],
                  ['courses', 'Courses Offered', 'e.g. 12+'],
                ].map(([key, label, placeholder]) => (
                  <div key={key}>
                    <label className="label">{label}</label>
                    <input value={form.stats[key] || ''} onChange={e => setForm({ ...form, stats: { ...form.stats, [key]: e.target.value } })}
                      className="input-field" placeholder={placeholder} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-5">
              <p className="text-sm text-gray-500 mb-2">Contact information displayed on the About and Contact pages.</p>
              <div>
                <label className="label">Address</label>
                <textarea value={form.contactInfo.address || ''} onChange={e => setForm({ ...form, contactInfo: { ...form.contactInfo, address: e.target.value } })}
                  rows={2} className="input-field resize-none" />
              </div>
              {[
                ['phone', 'Phone Number', 'tel'],
                ['email', 'Email Address', 'email'],
                ['website', 'Website URL', 'url'],
              ].map(([key, label, type]) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  <input type={type} value={form.contactInfo[key] || ''} onChange={e => setForm({ ...form, contactInfo: { ...form.contactInfo, [key]: e.target.value } })}
                    className="input-field" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" disabled={saving} className="btn-primary px-8 py-3 disabled:opacity-50">
            {saving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-college-navy border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
