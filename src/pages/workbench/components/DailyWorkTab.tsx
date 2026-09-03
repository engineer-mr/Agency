import { useNavigate } from 'react-router-dom'
import { Button } from '@base-ui/react/button'
import { useI18n } from '../../../i18n'
import { SkillCard } from './SkillCard'
import { createWorkbenchData } from './workbench-data'

export function DailyWorkTab() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { dailyWorkCards, web3Cards } = createWorkbenchData(t)

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">精选 Skills</h2>
            <p className="mt-2 text-sm text-slate-500">把复杂工作变成一步到位的专业工具</p>
          </div>
          <Button type="button" className="text-sm font-semibold text-[#0f4cc8]">
            查看全部
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          {dailyWorkCards.map((card, index) => (
            <SkillCard
              key={card.title}
              {...card}
              onUseSkill={index === 1 ? () => navigate('/workbench/poster-skill') : undefined}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Web3 工作台</h2>
            <p className="mt-2 text-sm text-slate-500">面向链上项目、社区和数字资产的专业 Skills</p>
          </div>
          <span className="text-sm text-slate-300">Beta</span>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {web3Cards.map((card) => (
            <SkillCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </div>
  )
}
