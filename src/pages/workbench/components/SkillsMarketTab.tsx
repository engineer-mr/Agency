import { Button } from '@base-ui/react/button'
import { useI18n } from '../../../i18n'
import { SkillCard } from './SkillCard'
import { createWorkbenchData } from './workbench-data'

export function SkillsMarketTab() {
  const { t } = useI18n()
  const { skillsMarketItems } = createWorkbenchData(t)
  const chips = [0, 1, 2, 3].map((index) => t(`workbench.skillsMarket.filters.${index}`))

  return (
    <div className="space-y-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{t('workbench.skillsMarket.title')}</h2>
          <p className="mt-2 text-sm text-slate-500">{t('workbench.skillsMarket.subtitle')}</p>
        </div>
        <div className="text-sm text-slate-500">{t('workbench.skillsMarket.summary')}</div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">{t('knowledgeBase.browseByType')}</span>
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
