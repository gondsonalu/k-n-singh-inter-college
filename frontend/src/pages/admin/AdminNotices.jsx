import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ConfirmDialog, PageHeader, SearchBar, Pagination } from '../../components/admin/AdminComponents'
import API from '../../utils/api'

const categories = ['General', 'Exam', 'Admission', 'Event', 'Holiday', 'Result']
const catColors = { General: 'bg-gray-100 text-gray-600', Exam: 'bg-blue-100 text-blue-700', Admission: 'bg-green-100 text-green-700', Event: 'bg-purple-100 text-purple-700', Holiday: 'bg-red-100 text-red-700', Result: 'bg-amber-100 text-amber-700' }

const empty = { title: '', content: '', category: 'General', isImportant: false }

export default function AdminNotices() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 10 })
      if (search) params.set('search', search)
      const r = await API.get(`/notices?${params}`)
      setNotices(r.data.data)
      setPages(r.data.pages)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [page, search])

  const openAdd = () => { setForm(empty); setEditId(null); setModalOpen(true) }
  const openEdit = n => { setForm({ title: n.title, content: n.content, category: n.category, isImportant: n.isImportant }); setEditId(n._id); setModalOpen(true) }

  const handleSave = async e => {
    e.preventDefault()
    if (!form.title || !form.content) return toast.error('Title and content are required')
    setSaving(true)
    try {
      if (editId) { await API.put(`/notices/${editId}`, form); toast.success('Notice updated') }
      else { await API.post('/notices', form); toast.success('Notice created') }
      setModalOpen(false)
      fetch()
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving') } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await API.delete(`/notices/${deleteId}`); toast.success('Notice deleted'); setDeleteId(null); fetch() }
    catch { toast.error('Failed to delete') } finally { setDeleting(false) }
  }

  return (
    <div>
      <PageHeader title="Notices" onAdd={openAdd} addLabel="Add Notice" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search notices..." />
        {loading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
        ) : notices.length === 0 ? (
          <div className="text-center py-12 text-gray-400">📋 No notices found</div>
        ) : (
          <div className="space-y-2">
            {notices.map(n => (
              <div key={n._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-gray-100">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-gray-800 truncate">{n.title}</span>
                    {n.isImportant && <span className="badge bg-red-100 text-red-600 text-xs">Important</span>}
                    <span className={`badge text-xs ${catColors[n.category]}`}>{n.category}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(n)} className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-college-gold hover:text-college-navy transition">Edit</button>
                  <button onClick={() => setDeleteId(n._id)} className="text-xs px-3 py-1.5 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Pagination page={page} pages={pages} onChange={setPage} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Notice' : 'Add Notice'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input id="important" type="checkbox" checked={form.isImportant} onChange={e => setForm({ ...form, isImportant: e.target.checked })}
                className="w-4 h-4 accent-college-gold" />
              <label htmlFor="important" className="text-sm text-gray-700 cursor-pointer">Mark as Important</label>
            </div>
          </div>
          <div>
            <label className="label">Content *</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={8}
              className="input-field resize-none font-mono text-sm" placeholder="Enter notice content (HTML supported)..." required />
            <p className="text-xs text-gray-400 mt-1">HTML tags like &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt; are supported.</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-50">
              {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
