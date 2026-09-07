import { Button } from '@base-ui/react/button'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../../i18n'

type LeaderboardTabKey = 'summary' | 'users' | 'trades' | 'profits' | 'hot'
type ValueTone = 'green' | 'blue' | 'orange'
type AgentTone = 'blue' | 'violet' | 'orange'

type LeaderboardMetric = {
  label: string
  value: string
  valueTone?: ValueTone
}

type LeaderboardRow = {
  rank: number
  name: string
  desc: string
  meta: string
  tone: AgentTone
  tags: string[]
  metrics: LeaderboardMetric[]
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon({ tone }: { tone: AgentTone }) {
  const classes = {
    blue: 'bg-[#eef2fb] text-[#0f4cc8]',
    violet: 'bg-[#f3ecff] text-[#8c6ade]',
    orange: 'bg-[#fff4e8] text-[#f28a4b]',
  }[tone]

  return (
    <div className={`flex h-10 w-10 min-w-10 items-center justify-center rounded-xl ${classes}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 3.2 14.5 9.5 20.8 12 14.5 14.5 12 20.8 9.5 14.5 3.2 12 9.5 9.5 12 3.2Z" />
      </svg>
    </div>
  )
}

function RankBadge({ rank }: { rank: number }) {
  const base = 'flex h-8 w-8 items-center justify-center font-semibold'

  if (rank === 1) {
    return <div className={`${base} rounded-full border border-[#f5c36d] bg-[#fff7e4] text-[#f7a300]`}>1</div>
  }
  if (rank === 2) {
    return <div className={`${base} rounded-full border border-[#9eb8e9] bg-[#eef4ff] text-[#7c98d5]`}>2</div>
  }
  if (rank === 3) {
    return <div className={`${base} rounded-full border border-[#f2aa7a] bg-[#fff1e7] text-[#ef8347]`}>3</div>
  }

  return <div className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-slate-700">{rank}</div>
}

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
      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? 'border-[#d7e2ff] bg-[#eef2fb] text-[#0f4cc8] shadow-sm'
          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  )
}

function valueToneClass(tone?: ValueTone) {
  if (tone === 'orange') return 'text-[#f28a4b]'
  if (tone === 'blue') return 'text-[#6d8fe8]'
  return 'text-[#24b07b]'
}

function MetricCell({ metric }: { metric: LeaderboardMetric }) {
  return (
    <div className="min-w-0 text-left">
      <p className="text-sm text-slate-500">{metric.label}</p>
      <p className={`mt-2 text-[17px] font-semibold tracking-tight text-slate-900 ${metric.valueTone ? valueToneClass(metric.valueTone) : ''}`}>
        {metric.value}
      </p>
    </div>
  )
}

function buildRows(
  t: ReturnType<typeof useI18n>['t'],
  kind: LeaderboardTabKey,
): LeaderboardRow[] {
  const agentPool: Array<{ tone: AgentTone; name: string; desc: string; meta: string; tags: string[] }> = [
    {
      tone: 'blue',
      name: t('quantxAgent.marketplace.items.0.name'),
      desc: t('quantxAgent.marketplace.items.0.desc'),
      meta: t('quantxAgent.marketplace.items.0.meta'),
      tags: ['BTC / ETH', '15m - 4h', t('quantxAgent.marketplace.risk.medium')],
    },
    {
      tone: 'violet',
      name: t('quantxAgent.marketplace.items.1.name'),
      desc: t('quantxAgent.marketplace.items.1.desc'),
      meta: t('quantxAgent.marketplace.items.1.meta'),
      tags: ['Binance / Hyperliquid', '1h', t('quantxAgent.marketplace.risk.medium')],
    },
    {
      tone: 'orange',
      name: t('quantxAgent.marketplace.items.2.name'),
      desc: t('quantxAgent.marketplace.items.2.desc'),
      meta: t('quantxAgent.marketplace.items.2.meta'),
      tags: ['SOL / BTC', '5m - 15m', t('quantxAgent.marketplace.risk.high')],
    },
  ]

  const summaryScores = [84, 82, 81, 79, 78, 76, 74, 72, 70, 68]

  return Array.from({ length: 10 }, (_, index) => {
    const rank = index + 1
    const agent = agentPool[index % agentPool.length]

    if (kind === 'summary') {
      const users = 128 - index * 528
      const orders = 184 - index * 614
      const profit = 2189.05 - index * 1245.32
      const views = 2579 - index * 842
      const score = summaryScores[index]

      return {
        rank,
        name: agent.name,
        desc: agent.desc,
        meta: agent.meta,
        tone: agent.tone,
        tags: agent.tags,
        metrics: [
          { label: t('quantxAgent.leaderboard.columns.users'), value: users.toLocaleString('en-US'), valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.orders'), value: orders.toLocaleString('en-US'), valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.profit'), value: `${profit.toLocaleString('en-US', { maximumFractionDigits: 2 })} USDT`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.views'), value: views.toLocaleString('en-US'), valueTone: 'green' },
          {
            label: t('quantxAgent.leaderboard.columns.score'),
            value: score.toString(),
            valueTone: score >= 80 ? 'green' : score >= 72 ? 'blue' : 'orange',
          },
        ],
      }
    }

    if (kind === 'users') {
      const newUsers = 1624 - index * 83
      const growth = 18.7 - index * 0.7
      const retention = 68.4 - index * 1.1
      const usage = 5.8 - index * 0.12

      return {
        rank,
        name: agent.name,
        desc: agent.desc,
        meta: agent.meta,
        tone: agent.tone,
        tags: agent.tags,
        metrics: [
          { label: t('quantxAgent.leaderboard.columns.users'), value: (12843 - index * 402).toLocaleString('en-US'), valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.newUsers'), value: `+${newUsers.toLocaleString('en-US')}`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.growth'), value: `+${growth.toFixed(1)}%`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.retention'), value: `${retention.toFixed(1)}%`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.usagePerUser'), value: `${usage.toFixed(1)} 次`, valueTone: 'green' },
        ],
      }
    }

    if (kind === 'trades') {
      const orderCount = 18843 - index * 598
      const validOrders = 1624 - index * 54
      const growth = 18.7 - index * 0.8
      const fillRate = 68.4 - index * 1.2
      const perUserOrder = 3.8 - index * 0.14

      return {
        rank,
        name: agent.name,
        desc: agent.desc,
        meta: agent.meta,
        tone: agent.tone,
        tags: agent.tags,
        metrics: [
          { label: t('quantxAgent.leaderboard.columns.orderCount'), value: orderCount.toLocaleString('en-US'), valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.validOrders'), value: `+${validOrders.toLocaleString('en-US')}`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.growth'), value: `+${growth.toFixed(1)}%`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.fillRate'), value: `${fillRate.toFixed(1)}%`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.perUserOrder'), value: perUserOrder.toFixed(1), valueTone: 'green' },
        ],
      }
    }

    if (kind === 'profits') {
      const totalProfit = 12843 - index * 762
      const roi = 18.7 - index * 0.6
      const winRate = 68.4 - index * 0.9
      const maxDrawdown = -8.4 - index * 0.6

      return {
        rank,
        name: agent.name,
        desc: agent.desc,
        meta: agent.meta,
        tone: agent.tone,
        tags: agent.tags,
        metrics: [
          { label: t('quantxAgent.leaderboard.columns.totalProfit'), value: `${totalProfit.toLocaleString('en-US')} USDT`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.roi'), value: `+${roi.toFixed(1)}%`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.winRate'), value: `${winRate.toFixed(1)}%`, valueTone: 'green' },
          { label: t('quantxAgent.leaderboard.columns.maxDrawdown'), value: `${maxDrawdown.toFixed(1)}%`, valueTone: 'orange' },
        ],
      }
    }

    const views = 12843 - index * 548
    const uniqueVisitors = 1624 - index * 59
    const favorites = 1624 - index * 44
    const conversion = 18.7 - index * 0.65
    const hotGrowth = 18.7 - index * 0.42

    return {
      rank,
      name: agent.name,
      desc: agent.desc,
      meta: agent.meta,
      tone: agent.tone,
      tags: agent.tags,
      metrics: [
        { label: t('quantxAgent.leaderboard.columns.views'), value: views.toLocaleString('en-US'), valueTone: 'green' },
        { label: t('quantxAgent.leaderboard.columns.uniqueVisitors'), value: uniqueVisitors.toLocaleString('en-US'), valueTone: 'green' },
        { label: t('quantxAgent.leaderboard.columns.favorites'), value: favorites.toLocaleString('en-US'), valueTone: 'green' },
        { label: t('quantxAgent.leaderboard.columns.conversion'), value: `+${conversion.toFixed(1)}%`, valueTone: 'green' },
        { label: t('quantxAgent.leaderboard.columns.hotGrowth'), value: `+${hotGrowth.toFixed(1)}%`, valueTone: 'green' },
      ],
    }
  })
}

export default function LeaderboardTab() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<LeaderboardTabKey>('summary')

  const tabs = useMemo(
    () => [
      { key: 'summary' as const, label: t('quantxAgent.leaderboard.tabs.summary') },
      { key: 'users' as const, label: t('quantxAgent.leaderboard.tabs.users') },
      { key: 'trades' as const, label: t('quantxAgent.leaderboard.tabs.trades') },
      { key: 'profits' as const, label: t('quantxAgent.leaderboard.tabs.profits') },
      { key: 'hot' as const, label: t('quantxAgent.leaderboard.tabs.hot') },
    ],
    [t],
  )

  const data = useMemo(() => {
    const columns = {
      summary: [
        t('quantxAgent.leaderboard.columns.rank'),
        t('quantxAgent.leaderboard.columns.agent'),
        t('quantxAgent.leaderboard.columns.users'),
        t('quantxAgent.leaderboard.columns.orders'),
        t('quantxAgent.leaderboard.columns.profit'),
        t('quantxAgent.leaderboard.columns.views'),
        t('quantxAgent.leaderboard.columns.score'),
      ],
      users: [
        t('quantxAgent.leaderboard.columns.rank'),
        t('quantxAgent.leaderboard.columns.agent'),
        t('quantxAgent.leaderboard.columns.users'),
        t('quantxAgent.leaderboard.columns.newUsers'),
        t('quantxAgent.leaderboard.columns.growth'),
        t('quantxAgent.leaderboard.columns.retention'),
        t('quantxAgent.leaderboard.columns.usagePerUser'),
      ],
      trades: [
        t('quantxAgent.leaderboard.columns.rank'),
        t('quantxAgent.leaderboard.columns.agent'),
        t('quantxAgent.leaderboard.columns.orderCount'),
        t('quantxAgent.leaderboard.columns.validOrders'),
        t('quantxAgent.leaderboard.columns.growth'),
        t('quantxAgent.leaderboard.columns.fillRate'),
        t('quantxAgent.leaderboard.columns.perUserOrder'),
      ],
      profits: [
        t('quantxAgent.leaderboard.columns.rank'),
        t('quantxAgent.leaderboard.columns.agent'),
        t('quantxAgent.leaderboard.columns.totalProfit'),
        t('quantxAgent.leaderboard.columns.roi'),
        t('quantxAgent.leaderboard.columns.winRate'),
        t('quantxAgent.leaderboard.columns.maxDrawdown'),
      ],
      hot: [
        t('quantxAgent.leaderboard.columns.rank'),
        t('quantxAgent.leaderboard.columns.agent'),
        t('quantxAgent.leaderboard.columns.views'),
        t('quantxAgent.leaderboard.columns.uniqueVisitors'),
        t('quantxAgent.leaderboard.columns.favorites'),
        t('quantxAgent.leaderboard.columns.conversion'),
        t('quantxAgent.leaderboard.columns.hotGrowth'),
      ],
    } satisfies Record<LeaderboardTabKey, string[]>
  
    const gridClasses: Record<LeaderboardTabKey, string[]> = {
        summary: ['grid-cols-[56px_minmax(0,1.72fr)_120px_120px_132px_112px_92px_128px]'],
        users: ['grid-cols-[56px_minmax(0,1.72fr)_112px_112px_112px_112px_120px_128px]'],
        trades: ['grid-cols-[56px_minmax(0,1.72fr)_120px_120px_112px_112px_112px_128px]'],
        profits: ['grid-cols-[56px_minmax(0,1.72fr)_132px_104px_104px_118px_128px]'],
        hot: ['grid-cols-[56px_minmax(0,1.72fr)_112px_112px_112px_112px_112px_128px]'],
    };

    return {
      columns,
      gridClasses,
      rows: {
        summary: buildRows(t, 'summary'),
        users: buildRows(t, 'users'),
        trades: buildRows(t, 'trades'),
        profits: buildRows(t, 'profits'),
        hot: buildRows(t, 'hot'),
      } satisfies Record<LeaderboardTabKey, LeaderboardRow[]>,
    }
  }, [t])

  const activeRows = data.rows[activeTab]
  const columns = data.columns[activeTab]
  const gridClasses = data.gridClasses[activeTab]

  return (
    <div className="mx-auto w-full max-w-[1250px]">
      <section className="space-y-5 ">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.32em] text-[#0f4cc8]">RANKING</p>
            <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">{t('quantxAgent.leaderboard.title')}</h1>
            <p className="mt-4 text-sm text-slate-500">{t('quantxAgent.leaderboard.subtitle')}</p>
          </div>

          <div className="pt-14 text-right">
            <p className="text-sm text-slate-500">{t('quantxAgent.leaderboard.updatedAt')}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-500">{t('quantxAgent.leaderboard.filterLabel')}</span>
            {tabs.map((tab) => (
              <TabButton key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </TabButton>
            ))}
          </div>

          <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
            {t('quantxAgent.leaderboard.sort')}
            <ChevronDownIcon />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className={`grid items-center gap-2 border-b border-slate-100 px-5 py-4 text-sm font-medium text-slate-500 ${gridClasses}`}>
            {columns.map((column, index) => (
              <div key={column} className={index === 0 ? 'text-left' : ''}>
                {column}
              </div>
            ))}
            <div />
          </div>

          <div className="divide-y divide-slate-100">
            {activeRows.map((row) => (
              <div key={`${activeTab}-${row.rank}`} className={`grid items-start gap-2 px-5 py-4 ${gridClasses}`}>
                <div className="flex items-center justify-start">
                  <RankBadge rank={row.rank} />
                </div>

                <div className="flex min-w-0 items-start gap-2">
                  <StarIcon tone={row.tone} />
                  <div className="min-w-0">
                    <h2 className="truncate text-[18px] font-semibold text-slate-900">{row.name}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500 line-clamp-1 pr-1">{row.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {row.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[#f3f5fb] px-3 py-1 text-xs font-medium text-slate-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{row.meta}</p>
                  </div>
                </div>

                {row.metrics.map((metric) => (
                  <MetricCell key={`${row.rank}-${metric.label}`} metric={metric} />
                ))}

                <div className="flex justify-start xl:justify-end">
                  <Button
                    type="button"
                    onClick={() => navigate('/quantx-agent/order')}
                    className="h-11 rounded-xl bg-[#eef2fb] px-5 text-sm font-semibold 
                    flex items-center justify-center
                    text-[#0f4cc8] transition hover:bg-[#e3ebff]"
                  >
                    {t('quantxAgent.market.cta')}
                    <span className="ml-1 inline-flex">
                      <ArrowRightIcon />
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#eef3ff] px-5 py-4 text-sm text-slate-500 shadow-sm">
          <div className="flex flex-wrap items-start gap-3">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m12 4-8.5 15h17L12 4Z" strokeLinejoin="round" />
              <path d="M12 9v4.5" strokeLinecap="round" />
              <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <p>{t('quantxAgent.leaderboard.note')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
