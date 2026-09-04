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
      <span className="text-sm leading-none text-[#0f4cc8] flex items-center">
        使用
      <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="6" height="9" viewBox="0 0 6 9" fill="none">
  <path d="M3.00053 4.49947L0 7.50018L1.49974 9L6 4.50053L1.49974 0L0 1.49982L3.00053 4.50053V4.49947Z" fill="#003CB1"/>
</svg>
</span>
    </div>
  )
}

