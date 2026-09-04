import { useI18n } from '../../../i18n'
import { LinkCard } from './LinkCard'
import { SkillCard } from './SkillCard'
import { createWorkbenchData } from './workbench-data'

export function ToolsTab() {
  const { t } = useI18n()
  const { dailyWorkCards, toolCards } = createWorkbenchData(t)
  const skills = dailyWorkCards.slice(0, 3)

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{t('workbench.tools.title')}</h2>
          <p className="mt-2 text-sm text-slate-500">{t('workbench.tools.subtitle')}</p>
        </div>
        <div className="text-sm text-slate-500">{t('workbench.tools.hint')}</div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {toolCards.map((tool) => (
          <LinkCard key={tool.title} {...tool} />
        ))}
      </div>

      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{t('workbench.tools.workbenchTitle')}</h2>
            <p className="mt-2 text-sm text-slate-500">{t('workbench.tools.workbenchSubtitle')}</p>
          </div>
          <div className="text-sm text-slate-500">{t('workbench.tools.hint')}</div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.title} title={skill.title} desc={skill.desc} meta="" icon={skill.icon} />
          ))}
        </div>
      </div>
    </div>
  )
}
