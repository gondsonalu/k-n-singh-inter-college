import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { ConfirmDialog, PageHeader, SearchBar, Pagination } from '../../components/admin/AdminComponents'
import API from '../../utils/api'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 10 })
      if (search) params.set('search', search)
      if (filter === 'unread') params.set('isRead', 'false')
      if (filter === 'read') params.set('isRead', 'true')
      const r = await API.get(`/contact?${params}`)
      setMessages(r.data.data)
      setPages(r.data.pages)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [page, search, filter])

  const markRead = async (id) => {
    try {
      await API.put(`/contact/${id}/read`)
      setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m))
    } catch { toast.error('Failed to mark as read') }
  }

  const handleExpand = async (msg) => {
    if (expanded === msg._id) { setExpanded(null); return }
    setExpanded(msg._id)
    if (!msg.isRead) markRead(msg._id)
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await API.delete(`/contact/${deleteId}`)
      toast.success('Message deleted')
      setDeleteId(null)
      fetch()
    } catch { toast.error('Failed to delete') } finally { setDeleting(false) }
  }

  return (
    <div>
      <PageHeader title="Contact Messages" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search by name or email..." />
          </div>
          <div className="flex gap-2">
            {['all', 'unread', 'read'].map(f => (
              <button key={f} onClick={() => { setFilter(f); setPage(1) }}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? 'bg-college-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">📬 No messages found</div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg, i) => (
              <motion.div key={msg._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className={`rounded-xl border overflow-hidden transition-all ${!msg.isRead ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-white'}`}>
                <button className="w-full text-left p-4 flex items-center gap-3" onClick={() => handleExpand(msg)}>
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${!msg.isRead ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  <div className="w-10 h-10 bg-college-navy rounded-full flex items-center justify-center text-college-gold font-heading font-bold text-sm flex-shrink-0">
                    {msg.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-gray-800">{msg.name}</span>
                      {!msg.isRead && <span className="badge bg-blue-100 text-blue-700 text-xs">New</span>}
                      {msg.subject && <span className="text-xs text-gray-500 hidden sm:block">— {msg.subject}</span>}
                    </div>
                    <p className="text-xs text-gray-400">{msg.email} {msg.phone && `• ${msg.phone}`}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    <span className="text-gray-400 text-xs">{expanded === msg._id ? '▲' : '▼'}</span>
                  </div>
                </button>

                {expanded === msg._id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="bg-gray-50 rounded-xl p-4 mt-3">
                        <p className="text-sm text-gray-700 leading-relaxed">{msg.message}</p>
                      </div>
                      <div className="flex gap-3 mt-3">
                        <a href={`mailto:${msg.email}`} className="text-xs px-4 py-2 bg-college-navy text-white rounded-lg hover:bg-college-dark transition">
                          Reply via Email
                        </a>
                        <button onClick={() => setDeleteId(msg._id)} className="text-xs px-4 py-2 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition">
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
        <Pagination page={page} pages={pages} onChange={setPage} />
      </div>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
