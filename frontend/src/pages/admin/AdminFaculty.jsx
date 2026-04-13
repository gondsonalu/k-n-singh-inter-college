import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ConfirmDialog, PageHeader, SearchBar, ImageUploadField } from '../../components/admin/AdminComponents'
import API from '../../utils/api'

const empty = { name: '', designation: '', subject: '', qualification: '', experience: '', email: '', order: 0 }

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const q = search ? `?search=${search}` : ''
      const r = await API.get(`/faculty${q}`)
      setFaculty(r.data.data)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => {
    const t = setTimeout(fetch, 350)
    return () => clearTimeout(t)
  }, [search])

  const openAdd = () => { setForm(empty); setEditId(null); setImageFile(null); setImagePreview(null); setModalOpen(true) }
  const openEdit = f => {
    setForm({ name: f.name, designation: f.designation, subject: f.subject, qualification: f.qualification || '', experience: f.experience || '', email: f.email || '', order: f.order || 0 })
    setEditId(f._id)
    setImageFile(null)
    setImagePreview(f.image || null)
    setModalOpen(true)
  }

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (imageFile) fd.append('image', imageFile)
      if (editId) { await API.put(`/faculty/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Faculty updated') }
      else { await API.post('/faculty', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Faculty added') }
      setModalOpen(false)
      fetch()
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving') } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await API.delete(`/faculty/${deleteId}`); toast.success('Faculty deleted'); setDeleteId(null); fetch() }
    catch { toast.error('Failed to delete') } finally { setDeleting(false) }
  }

  return (
    <div>
      <PageHeader title="Faculty" onAdd={openAdd} addLabel="Add Faculty" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or subject..." />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-32 rounded-xl" />)}</div>
        ) : faculty.length === 0 ? (
          <div className="text-center py-12 text-gray-400">👨‍🏫 No faculty found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {faculty.map(f => (
              <div key={f._id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-college-navy overflow-hidden flex-shrink-0">
                    {f.image ? <img src={f.image} alt={f.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-college-gold font-bold">{f.name?.charAt(0)}</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{f.name}</p>
                    <p className="text-xs text-college-gold">{f.designation}</p>
                    <p className="text-xs text-gray-500">{f.subject}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                  <button onClick={() => openEdit(f)} className="flex-1 text-xs py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-college-gold transition">Edit</button>
                  <button onClick={() => setDeleteId(f._id)} className="flex-1 text-xs py-1.5 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Faculty' : 'Add Faculty'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Full Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="label">Designation *</label>
              <input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="input-field" required placeholder="e.g. Senior Lecturer" />
            </div>
            <div>
              <label className="label">Subject *</label>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="label">Qualification</label>
              <input value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} className="input-field" placeholder="e.g. M.Sc, B.Ed" />
            </div>
            <div>
              <label className="label">Experience</label>
              <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} className="input-field" placeholder="e.g. 10 years" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label">Display Order</label>
              <input type="number" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} className="input-field" />
            </div>
          </div>
          <ImageUploadField value={imageFile} onChange={setImageFile} preview={imagePreview} setPreview={setImagePreview} label="Faculty Photo" />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-50">
              {saving ? 'Saving...' : editId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
