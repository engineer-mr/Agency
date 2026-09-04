import { type ReactElement, useEffect, useState } from 'react'
import { Button } from '@base-ui/react/button'
import { Sidebar } from '../../components/Sidebar'
import { useI18n } from '../../i18n'
import { useLocation } from 'react-router-dom'
import {
  DailyWorkTab,
  SkillsMarketTab,
  TaskReminderTab,
  ToolsTab,
  Web3Tab,
} from './components'

type TabKey = 'daily' | 'web3' | 'agent' | 'skills' | 'task' | 'tools'

const tabViews = {
  daily: DailyWorkTab,
  web3: Web3Tab,
  agent: () => <SkillsMarketTab market="agent" />,
  skills: () => <SkillsMarketTab market="skills" />,
  task: TaskReminderTab,
  tools: ToolsTab,
} satisfies Record<TabKey, () => ReactElement>

export default function WorkbenchPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<TabKey>('daily')
  const { t } = useI18n()
  const ActiveView = tabViews[activeTab]
  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: 'daily', label: t('workbench.tabs.daily') },
    { key: 'web3', label: t('workbench.tabs.web3') },
    { key: 'agent', label: t('workbench.tabs.agent') },
    { key: 'skills', label: t('workbench.tabs.skills') },
    { key: 'task', label: t('workbench.tabs.task') },
    { key: 'tools', label: t('workbench.tabs.tools') },
  ]

  useEffect(() => {
    const nextTab = (location.state as { activeTab?: TabKey } | null)?.activeTab
    if (nextTab) {
      setActiveTab(nextTab)
    }
  }, [location.state])

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex items-center gap-8 border-b border-slate-200 text-base font-medium text-slate-500">
            {tabs.map((tab) => {
              const active = tab.key === activeTab
              return (
                <Button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative -mb-px border-b-2 px-0 py-3 text-base font-medium transition ${
                    active
                      ? 'border-[#0f4cc8] text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </Button>
              )
            })}
          </div>

          <div className="pt-8">
            <ActiveView />
          </div>
        </section>
      </main>
    </div>
  )
}
