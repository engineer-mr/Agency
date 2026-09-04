import { Button } from '@base-ui/react/button'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../../components/Sidebar'
import { useI18n } from '../../../i18n'

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
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

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 15 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TokenBadge({ token, tone }: { token: string; tone: 'orange' | 'slate' | 'pink' }) {
  const styles = {
    orange: 'bg-[#fff3e8] text-[#f28a4b]',
    slate: 'bg-[#f3f4f6] text-[#475569]',
    pink: 'bg-[#f7ebff] text-[#cc59ef]',
  }[tone]

  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold ${styles}`}>
      {token}
    </div>
  )
}

function StatCard({ label, value, hint, valueTone = 'slate' }: { label: string; value: string; hint: string; valueTone?: 'slate' | 'green' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 text-[28px] font-semibold tracking-tight ${valueTone === 'green' ? 'text-[#24b07b]' : 'text-slate-900'}`}>
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
    </div>
  )
}

function OrdersTab({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
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
      {label}
    </button>
  )
}

type OrderRow = {
  token: string
  tone: 'orange' | 'slate' | 'pink'
  pair: string
  source: string
  type: string
  time: string
  orderKind: string
  side: string
  status: string
  profitTone: 'green' | 'orange'
  fields: Array<{ label: string; value: string; valueTone?: 'green' | 'slate' }>
  skill: string
}

export default function QuantxAgentOrdersPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'all' | 'auto' | 'manual'>('all')
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1, 2])

  const stats = [
    { label: t('quantxAgent.orderPage.stats.todayOrders'), value: '08', hint: t('quantxAgent.orderPage.stats.yesterday', { count: 2 }) },
    { label: t('quantxAgent.orderPage.stats.autoExecuted'), value: '08', hint: t('quantxAgent.orderPage.stats.queue') },
    { label: t('quantxAgent.orderPage.stats.pendingConfirm'), value: '02', hint: t('quantxAgent.orderPage.stats.needConfirm') },
    { label: t('quantxAgent.orderPage.stats.realizedPnl'), value: '+42.80', hint: t('quantxAgent.orderPage.stats.todayUnit'), valueTone: 'green' as const },
  ]

  const rows: OrderRow[] = useMemo(
    () => [
      {
        token: '₿',
        tone: 'orange',
        pair: 'BTC / USDT · 突破观察',
        source: 'Binance · 15m · 2 分钟前',
        type: '自动下单',
        time: 'BUY',
        orderKind: '待确认',
        side: '查看详情',
        status: 'realized',
        profitTone: 'green',
        fields: [
          { label: '下单金额', value: '100.00 USDT' },
          { label: '数量', value: '0.02 BTC' },
          { label: '开仓价格', value: '68,120.40 USDT' },
          { label: '平仓价格', value: '68,120.40 USDT' },
          { label: '手续费', value: '0.068 USDT' },
          { label: '止盈 / 止损', value: '69,600 / 67,240' },
          { label: '已实现盈亏', value: '+5.98 USDT', valueTone: 'green' },
          { label: '交易哈希', value: '0x8f2a...91c4' },
          { label: '成交时间', value: '2026-09-02 14:42:18' },
        ],
        skill: '趋势跟随 Pro',
      },
      {
        token: '◇',
        tone: 'slate',
        pair: 'ETH / USDT · 价差观察',
        source: 'Binance / Hyperliquid · 1 小时前',
        type: '自动下单',
        time: 'BUY',
        orderKind: '待确认',
        side: '查看详情',
        status: 'realized',
        profitTone: 'green',
        fields: [
          { label: '下单金额', value: '100.00 USDT' },
          { label: '数量', value: '0.02 BTC' },
          { label: '开仓价格', value: '68,120.40 USDT' },
          { label: '平仓价格', value: '68,120.40 USDT' },
          { label: '手续费', value: '0.068 USDT' },
          { label: '止盈 / 止损', value: '69,600 / 67,240' },
          { label: '已实现盈亏', value: '+5.98 USDT', valueTone: 'green' },
          { label: '交易哈希', value: '0x8f2a...91c4' },
          { label: '成交时间', value: '2026-09-02 14:42:18' },
        ],
        skill: '跨市场价差',
      },
      {
        token: '≡',
        tone: 'pink',
        pair: 'SOL / USDT · 自主确认',
        source: 'Hyperliquid · 50 USDT · 昨天 18:42',
        type: '自主下单',
        time: 'BUY',
        orderKind: '待确认',
        side: '查看详情',
        status: 'realized',
        profitTone: 'green',
        fields: [
          { label: '下单金额', value: '100.00 USDT' },
          { label: '数量', value: '0.02 BTC' },
          { label: '开仓价格', value: '68,120.40 USDT' },
          { label: '平仓价格', value: '68,120.40 USDT' },
          { label: '手续费', value: '0.068 USDT' },
          { label: '止盈 / 止损', value: '69,600 / 67,240' },
          { label: '已实现盈亏', value: '+5.98 USDT', valueTone: 'green' },
          { label: '交易哈希', value: '0x8f2a...91c4' },
          { label: '成交时间', value: '2026-09-02 14:42:18' },
        ],
        skill: '波动突破观察',
      },
    ],
    [],
  )

  const visibleRows = rows.filter((row) => {
    if (activeTab === 'all') return true
    if (activeTab === 'auto') return row.type === '自动下单'
    return row.type === '自主下单'
  })

  const toggleExpanded = (index: number) => {
    setExpandedIndices((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]))
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <button
                type="button"
                onClick={() => navigate('/quantx-agent')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#0f4cc8]"
              >
                <ArrowLeftIcon />
                {t('quantxAgent.orderPage.back')}
              </button>
              <p className="mt-6 text-xs font-bold tracking-[0.32em] text-[#0f4cc8]">{t('quantxAgent.orderPage.eyebrow')}</p>
              <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">{t('quantxAgent.orderPage.title')}</h1>
              <p className="mt-4 text-sm text-slate-500">{t('quantxAgent.orderPage.subtitle')}</p>
            </div>

            <Button
              type="button"
              className="h-11 rounded-xl bg-[#0f4cc8] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
            >
              <span className="mr-2 inline-flex">
                <PlusIcon />
              </span>
              {t('quantxAgent.orderPage.newOrder')}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} valueTone={item.valueTone} />
            ))}
          </div>

          <div className="mt-7 flex items-end justify-between gap-4 border-b border-slate-200">
            <div className="flex gap-6">
              <OrdersTab active={activeTab === 'all'} label={t('quantxAgent.orderPage.tabs.all')} onClick={() => setActiveTab('all')} />
              <OrdersTab active={activeTab === 'auto'} label={t('quantxAgent.orderPage.tabs.auto')} onClick={() => setActiveTab('auto')} />
              <OrdersTab active={activeTab === 'manual'} label={t('quantxAgent.orderPage.tabs.manual')} onClick={() => setActiveTab('manual')} />
            </div>
            <button type="button" className="pb-3 text-sm font-medium text-slate-500 transition hover:text-slate-900">
              {t('quantxAgent.orderPage.range')}
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {visibleRows.map((row, index) => {
              const isOpen = expandedIndices.includes(index)
              return (
                <article key={`${row.pair}-${index}`} className="border-b border-slate-100 last:border-b-0">
                  <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5">
                    <div className="flex min-w-0 items-center gap-4">
                      <TokenBadge token={row.token} tone={row.tone} />
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-slate-900">{row.pair}</h2>
                        <p className="mt-1 text-sm text-slate-500">{row.source}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-10 text-sm">
                      <span className="text-slate-500">{row.type}</span>
                      <span className="font-semibold text-[#24b07b]">{row.time}</span>
                      <span className="font-semibold text-[#f28a4b]">{row.orderKind}</span>
                      <button
                        type="button"
                        onClick={() => toggleExpanded(index)}
                        className="inline-flex items-center gap-1 font-semibold text-[#0f4cc8]"
                      >
                        {t('quantxAgent.orderPage.viewDetail')}
                        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </button>
                    </div>
                  </div>

                  {isOpen ? (
                    <div className="border-t border-slate-100 px-5 py-6">
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {row.fields.map((field) => (
                          <div key={field.label}>
                            <p className="text-sm text-slate-500">{field.label}</p>
                            <p
                              className={`mt-2 text-sm font-semibold ${
                                field.valueTone === 'green' ? 'text-[#24b07b]' : 'text-slate-700'
                              }`}
                            >
                              {field.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                        <div>
                          <p className="text-sm text-slate-500">{t('quantxAgent.orderPage.skill')}</p>
                          <p className="mt-1 text-sm font-semibold text-[#0f4cc8]">{row.skill}</p>
                        </div>
                        <Button type="button" className="h-10 rounded-xl bg-[#eef2fb] px-4 text-sm font-semibold text-[#0f4cc8]">
                          {t('quantxAgent.orderPage.secondaryAction')}
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-[#eef3ff] px-5 py-4 text-sm text-slate-500 shadow-sm">
            {t('quantxAgent.orderPage.note')}
          </div>
        </section>
      </main>
    </div>
  )
}
