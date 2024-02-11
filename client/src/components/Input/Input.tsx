type InputProps = {
  label: string
  value: string
  type: 'text' | 'password'
  placeholder?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  className?: string
  onChange: (value: string) => void
}

export const Input = ({
  label,
  value,
  type,
  placeholder,
  disabled,
  error,
  errorMessage,
  className,
  onChange,
}: InputProps) => {
  return (
    <label className={`flex flex-col relative ${className}`}>
      <span className="text-[14px] text-slate-600 font-semibold">{label}</span>
      <input
        className={`rounded-xl border-2 border-slate-400 bg-slate-300 text-slate-600 font-semibold px-[10px] py-[5px] outline-none ${className}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
      {error && errorMessage && (
        <span className="font-inter text-system-error text-[12px] mt-[3px]">
          {errorMessage}
        </span>
      )}
    </label>
  )
}
