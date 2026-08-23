
function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary:
      'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:-translate-y-0.5',

    secondary:
      'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5',

    ghost:
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button