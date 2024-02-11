type ButtonProps = {
  text: string
  onClick?: () => void
  type: 'button' | 'submit'
  className?: string
}

export const Button = ({
  text,
  onClick = () => {},
  type,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-[20px] py-[10px] font-semibold text-slate-600 rounded-xl border-2 ${className}`}
    >
      {text}
    </button>
  )
}
