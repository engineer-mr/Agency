import { useI18n } from '../../../i18n'
import { LinkCard } from './LinkCard'
import { SkillCard } from './SkillCard'
import { createWorkbenchData } from './workbench-data'

export function ToolsTab() {
  const { t } = useI18n()
  const { toolCards } = createWorkbenchData(t)
  const skills = [
    { title: '网站制作', desc: '从一句描述生成完整的网站，包含页面、文案与响应式布局。', icon: '🌐' },
    { title: '海报制作', desc: '快速生成适合社交媒体、活动与推广的视觉海报。', icon: '🖼' },
    { title: '营销文案', desc: '为产品、活动和社交媒体生成有转化力的内容。', icon: 'T' },
  ]

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">快捷工具</h2>
          <p className="mt-2 text-sm text-slate-500">常用能力都集中在这里</p>
        </div>
        <div className="text-sm text-slate-500">点击即可开始</div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {toolCards.map((tool) => (
          <LinkCard key={tool.title} {...tool} />
        ))}
      </div>

      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">常用工具工作台</h2>
            <p className="mt-2 text-sm text-slate-500">面向内容创作和日常运营的专业 Skills</p>
          </div>
          <div className="text-sm text-slate-500">随时开始</div>
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
