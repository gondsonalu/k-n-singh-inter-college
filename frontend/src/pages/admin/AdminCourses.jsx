import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ConfirmDialog, PageHeader, SearchBar } from '../../components/admin/AdminComponents'
import API from '../../utils/api'

const cats = ['Arts', 'Science', 'Commerce', 'Vocational']
const empty = { title: '', description: '', duration: '', eligibility: '', seats: '', category: 'Arts', subjects: '' }
const catColors = { Science: 'bg-blue-100 text-blue-700', Arts: 'bg-amber-100 text-amber-700', Commerce: 'bg-green-100 text-green-700', Vocational: 'bg-purple-100 text-purple-700' }

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const q = search ? `?search=${search}` : ''
      const r = await API.get(`/courses${q}`)
      setCourses(r.data.data)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { const t = setTimeout(fetch, 350); return () => clearTimeout(t) }, [search])

  const openAdd = () => { setForm(empty); setEditId(null); setModalOpen(true) }
  const openEdit = c => {
    setForm({ title: c.title, description: c.description, duration: c.duration || '', eligibility: c.eligibility || '', seats: c.seats || '', category: c.category, subjects: (c.subjects || []).join(', ') })
    setEditId(c._id); setModalOpen(true)
  }

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) { await API.put(`/courses/${editId}`, form); toast.success('Course updated') }
      else { await API.post('/courses', form); toast.success('Course created') }
      setModalOpen(false); fetch()
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving') } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await API.delete(`/courses/${deleteId}`); toast.success('Course deleted'); setDeleteId(null); fetch() }
    catch { toast.error('Failed to delete') } finally { setDeleting(false) }
  }

  return (
    <div>
      <PageHeader title="Courses" onAdd={openAdd} addLabel="Add Course" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." />
        {loading ? <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}</div> :
          courses.length === 0 ? <div className="text-center py-12 text-gray-400">📚 No courses found</div> :
          <div className="space-y-2">
            {courses.map(c => (
              <div key={c._id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:bg-gray-50">
                <span className={`badge flex-shrink-0 ${catColors[c.category]}`}>{c.category}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800">{c.title}</p>
                  <p className="text-xs text-gray-400 truncate">{c.description}</p>
                </div>
                {c.duration && <span className="text-xs text-gray-400 hidden sm:block">{c.duration}</span>}
                <div className="flex gap-2">
                  <button onClick={() => openEdit(c)} className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-college-gold transition">Edit</button>
                  <button onClick={() => setDeleteId(c._id)} className="text-xs px-3 py-1.5 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Course' : 'Add Course'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Course Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" required />
          </div>
          <div>
            <label className="label">Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="input-field resize-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Duration</label>
              <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="input-field" placeholder="e.g. 2 Years" />
            </div>
            <div>
              <label className="label">Eligibility</label>
              <input value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} className="input-field" placeholder="e.g. Class 10 pass" />
            </div>
            <div>
              <label className="label">Total Seats</label>
              <input type="number" value={form.seats} onChange={e => setForm({ ...form, seats: e.target.value })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Subjects (comma-separated)</label>
            <input value={form.subjects} onChange={e => setForm({ ...form, subjects: e.target.value })} className="input-field" placeholder="Physics, Chemistry, Mathematics" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-50">{saving ? 'Saving...' : editId ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
