import { Button } from '@base-ui/react/button'
import { useI18n } from '../../../i18n'
import { SkillCard } from './SkillCard'
import { createWorkbenchData } from './workbench-data'

export function SkillsMarketTab() {
  const { t } = useI18n()
  const { skillsMarketItems } = createWorkbenchData(t)
  const chips = ['全部', 'CEX', 'DEX', '策略工具']

  return (
    <div className="space-y-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">技能广场</h2>
          <p className="mt-2 text-sm text-slate-500">从 Hummingbot 连接器体系提炼的 Web3 可视化 Skills</p>
        </div>
        <div className="text-sm text-slate-500">50+ 连接器 · 18 个精选 Skills</div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">按类型浏览</span>
        {chips.map((chip, index) => (
          <Button
            key={chip}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm ${
              index === 0
                ? 'border-[#d6dff8] bg-[#eef2fb] font-semibold text-[#0f4cc8]'
                : 'border-slate-200 text-slate-600'
            }`}
          >
            {chip}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {skillsMarketItems.map((item) => (
          <SkillCard
            key={item.title}
            title={item.title}
            desc={item.desc}
            meta="CLOB CEX"
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  )
}
