import { Button } from '@base-ui/react/button'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../../i18n'

export default function MarketplaceTab() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const filters = [t('quantxAgent.marketplace.filters.all'), t('quantxAgent.marketplace.filters.cex'), t('quantxAgent.marketplace.filters.dex'), t('quantxAgent.marketplace.filters.strategy')]
  const agents = useMemo(
    () => [
      {
        name: t('quantxAgent.marketplace.items.0.name'),
        desc: t('quantxAgent.marketplace.items.0.desc'),
        meta: t('quantxAgent.marketplace.items.0.meta'),
        score: 84,
        tone: 'green' as const,
        badge: 'blue' as const,
        tags: ['BTC / ETH', '15m - 4h', t('quantxAgent.marketplace.risk.medium')],
        stats: [
          { label: t('quantxAgent.marketplace.stats.overall'), value: '84', valueTone: 'green' as const },
          { label: t('quantxAgent.marketplace.stats.stability'), value: '8.2' },
          { label: t('quantxAgent.marketplace.stats.risk'), value: '9.1' },
        ],
      },
      {
        name: t('quantxAgent.marketplace.items.1.name'),
        desc: t('quantxAgent.marketplace.items.1.desc'),
        meta: t('quantxAgent.marketplace.items.1.meta'),
        score: 81,
        tone: 'green' as const,
        badge: 'violet' as const,
        tags: ['Binance / Hyperliquid', '1h', t('quantxAgent.marketplace.risk.medium')],
        stats: [
          { label: t('quantxAgent.marketplace.stats.overall'), value: '81', valueTone: 'green' as const },
          { label: t('quantxAgent.marketplace.stats.stability'), value: '8.2' },
          { label: t('quantxAgent.marketplace.stats.risk'), value: '9.1' },
        ],
      },
      {
        name: t('quantxAgent.marketplace.items.2.name'),
        desc: t('quantxAgent.marketplace.items.2.desc'),
        meta: t('quantxAgent.marketplace.items.2.meta'),
        score: 74,
        tone: 'orange' as const,
        badge: 'orange' as const,
        tags: ['SOL / BTC', '5m - 15m', t('quantxAgent.marketplace.risk.high')],
        stats: [
          { label: t('quantxAgent.marketplace.stats.overall'), value: '74', valueTone: 'orange' as const },
          { label: t('quantxAgent.marketplace.stats.stability'), value: '8.2' },
          { label: t('quantxAgent.marketplace.stats.risk'), value: '9.1' },
        ],
      },
      {
        name: t('quantxAgent.marketplace.items.3.name'),
        desc: t('quantxAgent.marketplace.items.3.desc'),
        meta: t('quantxAgent.marketplace.items.3.meta'),
        score: 81,
        tone: 'green' as const,
        badge: 'violet' as const,
        tags: ['Binance / Hyperliquid', '1h', t('quantxAgent.marketplace.risk.medium')],
        stats: [
          { label: t('quantxAgent.marketplace.stats.overall'), value: '81', valueTone: 'green' as const },
          { label: t('quantxAgent.marketplace.stats.stability'), value: '8.2' },
          { label: t('quantxAgent.marketplace.stats.risk'), value: '9.1' },
        ],
      },
      {
        name: t('quantxAgent.marketplace.items.4.name'),
        desc: t('quantxAgent.marketplace.items.4.desc'),
        meta: t('quantxAgent.marketplace.items.4.meta'),
        score: 74,
        tone: 'orange' as const,
        badge: 'orange' as const,
        tags: ['SOL / BTC', '5m - 15m', t('quantxAgent.marketplace.risk.high')],
        stats: [
          { label: t('quantxAgent.marketplace.stats.overall'), value: '74', valueTone: 'orange' as const },
          { label: t('quantxAgent.marketplace.stats.stability'), value: '8.2' },
          { label: t('quantxAgent.marketplace.stats.risk'), value: '9.1' },
        ],
      },
      {
        name: t('quantxAgent.marketplace.items.5.name'),
        desc: t('quantxAgent.marketplace.items.5.desc'),
        meta: t('quantxAgent.marketplace.items.5.meta'),
        score: 74,
        tone: 'orange' as const,
        badge: 'orange' as const,
        tags: ['SOL / BTC', '5m - 15m', t('quantxAgent.marketplace.risk.high')],
        stats: [
          { label: t('quantxAgent.marketplace.stats.overall'), value: '74', valueTone: 'orange' as const },
          { label: t('quantxAgent.marketplace.stats.stability'), value: '8.2' },
          { label: t('quantxAgent.marketplace.stats.risk'), value: '9.1' },
        ],
      },
    ],
    [t],
  )

  const badgeStyles = {
    blue: 'bg-[#eef2fb] text-[#0f4cc8]',
    violet: 'bg-[#f3ecff] text-[#8c6ade]',
    orange: 'bg-[#fff4e8] text-[#f28a4b]',
  } as const

  return (
    <section className="space-y-5 mx-auto w-full max-w-[1250px]">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-bold tracking-[0.32em] text-[#0f4cc8]">{t('quantxAgent.marketplace.eyebrow')}</p>
          <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">{t('quantxAgent.market.title')}</h1>
          <p className="mt-4 text-sm text-slate-500">{t('quantxAgent.market.subtitle')}</p>
        </div>

        <div className="pt-14 text-right">
          <p className="text-sm font-semibold text-[#24b07b]">{t('quantxAgent.marketplace.summary')}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-slate-500">{t('quantxAgent.marketplace.filterLabel')}</span>
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                index === 0 ? 'border-[#d7e2ff] bg-[#eef2fb] text-[#0f4cc8]' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
          {t('quantxAgent.marketplace.sort')}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {agents.map((agent) => (
          <article key={agent.name} className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
            <div className="grid grid-cols-1 items-center gap-5 xl:grid-cols-[minmax(0,1.2fr)_260px_140px]">
              <div className="flex min-w-0 items-start gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${badgeStyles[agent.badge]}`}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M12 3.2 14.5 9.5 20.8 12 14.5 14.5 12 20.8 9.5 14.5 3.2 12 9.5 9.5 12 3.2Z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className="text-[18px] font-semibold text-slate-900">{agent.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{agent.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {agent.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#f3f5fb] px-3 py-1 text-xs font-medium text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-left xl:border-l xl:border-slate-100 xl:pl-8">
                {agent.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className={`mt-2 text-2xl font-semibold tracking-tight ${stat.valueTone === 'orange' ? 'text-[#f28a4b]' : stat.valueTone === 'green' ? 'text-[#24b07b]' : 'text-slate-900'}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-start xl:justify-end">
                <Button
                  type="button"
                  onClick={() => navigate('/quantx-agent/order')}
                  className="h-11 rounded-xl bg-[#eef2fb] px-5 text-sm flex items-center justify-center font-semibold text-[#0f4cc8] transition hover:bg-[#e3ebff]"
                >
                  {t('quantxAgent.market.cta')}
                  <span className="ml-1 inline-flex">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-2xl bg-[#eef3ff] px-5 py-4 text-sm text-slate-500 shadow-sm">
        <div className="flex flex-wrap items-start gap-3">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m12 4-8.5 15h17L12 4Z" strokeLinejoin="round" />
            <path d="M12 9v4.5" strokeLinecap="round" />
            <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          <p>{t('quantxAgent.marketplace.note')}</p>
        </div>
      </div>
    </section>
  )
}
