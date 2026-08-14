function Button({ children, variant = 'primary' }) {
  const baseStyles =
    'rounded-lg px-5 py-2.5 text-sm font-medium transition'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500',
    secondary:
      'border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white',
    ghost: 'text-slate-300 hover:text-white',
  }

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  )
}

export default Button