import { useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { useI18n } from '../../i18n'
import LeaderboardTab from './tabs/LeaderboardTab'
import MarketplaceTab from './tabs/MarketplaceTab'
import SignalsTab from './tabs/SignalsTab'

type QuantxAgentTab = 'signals' | 'marketplace' | 'leaderboard'

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 px-1 pb-3 text-sm font-semibold transition ${
        active ? 'border-[#0f4cc8] text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  )
}

export default function QuantxAgentPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<QuantxAgentTab>('signals')

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex items-center gap-8 border-b border-slate-200">
            <TabButton active={activeTab === 'signals'} onClick={() => setActiveTab('signals')}>
              {t('quantxAgent.tabs.signals')}
            </TabButton>
            <TabButton active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')}>
              {t('quantxAgent.tabs.marketplace')}
            </TabButton>
            <TabButton active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')}>
              {t('quantxAgent.tabs.leaderboard')}
            </TabButton>
          </div>
        </section>

        <div className="mt-8">
          {activeTab === 'signals' ? <SignalsTab /> : null}
          {activeTab === 'marketplace' ? <MarketplaceTab /> : null}
          {activeTab === 'leaderboard' ? <LeaderboardTab /> : null}
        </div>
      </main>
    </div>
  )
}
