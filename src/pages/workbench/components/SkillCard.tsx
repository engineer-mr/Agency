import { Button } from '@base-ui/react/button'

export function SkillCard({
  title,
  desc,
  meta,
  icon,
  tag,
  onUseSkill,
}: {
  title: string
  desc: string
  meta: string
  icon: string
  tag?: string
  onUseSkill?: () => void
}) {
  return (
    <div className="flex min-h-[236px] flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg text-[#0f4cc8]">
          {icon}
        </div>
        {tag ? (
          <span className="rounded-md bg-[#eef2fb] px-2 py-1 text-xs font-medium text-[#0f4cc8]">
            {tag}
          </span>
        ) : null}
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 max-w-[230px] text-sm leading-6 text-slate-500">{desc}</p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-sm text-slate-300">{meta}</span>
        <Button type="button" onClick={onUseSkill} className="text-sm font-semibold text-[#0f4cc8]">
          使用 Skill
        </Button>
      </div>
    </div>
  )
}
