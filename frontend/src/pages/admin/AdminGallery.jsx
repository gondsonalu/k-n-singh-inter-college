import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ConfirmDialog, PageHeader, ImageUploadField } from '../../components/admin/AdminComponents'
import API from '../../utils/api'

const galCats = ['Campus', 'Events', 'Sports', 'Cultural', 'Labs', 'Library', 'Other']

export default function AdminGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Campus' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const q = filter !== 'All' ? `?category=${filter}&limit=50` : '?limit=50'
      const r = await API.get(`/gallery${q}`)
      setItems(r.data.data)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [filter])

  const openAdd = () => { setForm({ title: '', category: 'Campus' }); setEditId(null); setImageFile(null); setImagePreview(null); setModalOpen(true) }
  const openEdit = item => { setForm({ title: item.title, category: item.category }); setEditId(item._id); setImageFile(null); setImagePreview(item.image); setModalOpen(true) }

  const handleSave = async e => {
    e.preventDefault()
    if (!editId && !imageFile) return toast.error('Please select an image')
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('category', form.category)
      if (imageFile) fd.append('image', imageFile)
      if (editId) { await API.put(`/gallery/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Updated') }
      else { await API.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Added to gallery') }
      setModalOpen(false); fetch()
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving') } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await API.delete(`/gallery/${deleteId}`); toast.success('Image deleted'); setDeleteId(null); fetch() }
    catch { toast.error('Failed to delete') } finally { setDeleting(false) }
  }

  return (
    <div>
      <PageHeader title="Gallery" onAdd={openAdd} addLabel="Add Photo" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['All', ...galCats].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filter === cat ? 'bg-college-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[...Array(10)].map((_, i) => <div key={i} className="skeleton aspect-square rounded-xl" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-400">🖼️ No images found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {items.map(item => (
              <div key={item._id} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100">
                <img src={item.image} alt={item.title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openEdit(item)} className="bg-white text-gray-700 text-xs px-2 py-1 rounded-lg hover:bg-college-gold transition">Edit</button>
                  <button onClick={() => setDeleteId(item._id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 transition">Del</button>
                </div>
                {item.title && <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2"><p className="text-white text-xs truncate">{item.title}</p></div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Photo' : 'Add Photo'} maxW="max-w-md">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Title (optional)</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="e.g. Annual Sports Day 2024" />
          </div>
          <div>
            <label className="label">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
              {galCats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <ImageUploadField value={imageFile} onChange={setImageFile} preview={imagePreview} setPreview={setImagePreview} />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-50">{saving ? 'Uploading...' : editId ? 'Update' : 'Upload'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
