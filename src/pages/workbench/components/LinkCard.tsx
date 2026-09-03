function colorStyle(bg: string, text: string) {
  return { backgroundColor: bg, color: text }
}

export function LinkCard({
  title,
  desc,
  icon,
  bg,
  text,
}: {
  title: string
  desc: string
  icon: string
  bg: string
  text: string
}) {
  return (
    <div className="flex min-h-[76px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-semibold"
        style={colorStyle(bg, text)}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{desc}</p>
      </div>
      <span className="text-2xl leading-none text-[#0f4cc8]">→</span>
    </div>
  )
}

