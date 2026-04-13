import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaCloudUploadAlt, FaTrash } from 'react-icons/fa'

export const Modal = ({ open, onClose, title, children, maxW = 'max-w-2xl' }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
          className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxW} max-h-[90vh] overflow-hidden flex flex-col z-10`}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-college-navy text-lg">{title}</h2>
            <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"><FaTimes /></button>
          </div>
          <div className="overflow-y-auto flex-1 p-6">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
)

export const ConfirmDialog = ({ open, onClose, onConfirm, title = 'Confirm Delete', message = 'Are you sure you want to delete this item? This action cannot be undone.', loading }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTrash className="text-red-600" />
          </div>
          <h3 className="font-heading font-bold text-center text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm text-center mb-6">{message}</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">Cancel</button>
            <button onClick={onConfirm} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition">
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
)

export const ImageUploadField = ({ value, onChange, preview, setPreview, label = 'Upload Image' }) => {
  const ref = useRef()
  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    onChange(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }
  const handleDrop = e => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    onChange(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }
  return (
    <div>
      <label className="label">{label}</label>
      <div
        onDrop={handleDrop} onDragOver={e => e.preventDefault()}
        onClick={() => ref.current.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-college-gold transition-colors"
      >
        {preview ? (
          <div className="relative inline-block">
            <img src={preview} alt="preview" className="max-h-40 rounded-lg mx-auto object-cover" />
            <button type="button" onClick={e => { e.stopPropagation(); setPreview(null); onChange(null) }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
              <FaTimes />
            </button>
          </div>
        ) : (
          <div>
            <FaCloudUploadAlt className="text-gray-400 text-4xl mx-auto mb-2" />
            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB</p>
          </div>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  )
}

export const PageHeader = ({ title, onAdd, addLabel = 'Add New' }) => (
  <div className="flex items-center justify-between mb-6">
    <h1 className="font-heading text-2xl font-bold text-college-navy">{title}</h1>
    {onAdd && (
      <button onClick={onAdd} className="btn-primary text-sm py-2.5 px-5">+ {addLabel}</button>
    )}
  </div>
)

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <div className="relative mb-4">
    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="input-field pl-10 text-sm" />
  </div>
)

export const Pagination = ({ page, pages, onChange }) => {
  if (pages <= 1) return null
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${page === p ? 'bg-college-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-college-gold'}`}>
          {p}
        </button>
      ))}
    </div>
  )
}
