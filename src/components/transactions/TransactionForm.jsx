import { useState, useEffect } from 'react'
import Button from '../ui/Button'
import { CATEGORIES } from '../../data/mockTransactions'

const EMPTY = {
  title: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'Food',
  type: 'expense',
  amount: '',
  note: '',
}

const TransactionForm = ({ initial = null, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initial || EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initial || EMPTY)
    setErrors({})
  }, [initial])

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.date) e.date = 'Date is required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid positive amount'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({ ...form, amount: Number(form.amount) })
  }

  const field = (label, id, children, error) => (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-600 dark:text-gray-400 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  )

  const inputCls = `w-full px-3 py-2 text-sm bg-slate-50 dark:bg-gray-800 border rounded-xl text-slate-800 dark:text-slate-200
    focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {field('Title *', 'form-title',
        <input id="form-title" type="text" value={form.title} onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. Grocery Run"
          className={`${inputCls} ${errors.title ? 'border-red-400' : 'border-slate-200 dark:border-gray-700'}`}
        />, errors.title
      )}

      <div className="grid grid-cols-2 gap-3">
        {field('Date *', 'form-date',
          <input id="form-date" type="date" value={form.date} onChange={(e) => set('date', e.target.value)}
            className={`${inputCls} ${errors.date ? 'border-red-400' : 'border-slate-200 dark:border-gray-700'}`}
          />, errors.date
        )}
        {field('Amount (₹) *', 'form-amount',
          <input id="form-amount" type="number" min="1" value={form.amount} onChange={(e) => set('amount', e.target.value)}
            placeholder="0"
            className={`${inputCls} ${errors.amount ? 'border-red-400' : 'border-slate-200 dark:border-gray-700'}`}
          />, errors.amount
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {field('Category', 'form-category',
          <select id="form-category" value={form.category} onChange={(e) => set('category', e.target.value)}
            className={`${inputCls} border-slate-200 dark:border-gray-700`}
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
        {field('Type', 'form-type',
          <select id="form-type" value={form.type} onChange={(e) => set('type', e.target.value)}
            className={`${inputCls} border-slate-200 dark:border-gray-700`}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        )}
      </div>

      {field('Note (optional)', 'form-note',
        <input id="form-note" type="text" value={form.note} onChange={(e) => set('note', e.target.value)}
          placeholder="Add a note..."
          className={`${inputCls} border-slate-200 dark:border-gray-700`}
        />
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" variant="primary" className="flex-1">
          {initial ? 'Save Changes' : 'Add Transaction'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}

export default TransactionForm
