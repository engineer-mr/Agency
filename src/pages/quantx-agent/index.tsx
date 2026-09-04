import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import { useI18n } from '../../i18n'

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SignalIcon({ label, tone }: { label: string; tone: 'orange' | 'slate' | 'violet' }) {
  const styles = {
    orange: 'bg-[#fff4e8] text-[#f28a4b]',
    slate: 'bg-[#f3f4f6] text-[#475569]',
    violet: 'bg-[#f3ecff] text-[#8c6ade]',
  }[tone]

  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold ${styles}`}>
      {label}
    </div>
  )
}

function SignalScore({
  risk,
  score,
  overallLabel,
  tone,
}: {
  risk: string
  score: string
  overallLabel: string
  tone: 'green' | 'orange'
}) {
  return (
    <div className="min-w-[88px]">
      <div className="text-sm font-medium text-slate-500">{risk}</div>
      <div className={`mt-1 text-[22px] font-semibold leading-none ${tone === 'orange' ? 'text-[#f28a4b]' : 'text-[#24a37c]'}`}>
        {score}
      </div>
      <div className="mt-1 text-xs text-slate-400">{overallLabel}</div>
    </div>
  )
}

function SwitchRow({
  title,
  desc,
  value,
  onChange,
}: {
  title: string
  desc: string
  value: boolean
  onChange: (next: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{desc}</p>
      </div>
      <button
        type="button"
        aria-pressed={value}
        onClick={() => onChange(!value)}
        className={`relative h-7 w-12 rounded-full border transition ${
          value ? 'border-[#2cb67d] bg-[#2cb67d]' : 'border-slate-200 bg-slate-100'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            value ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

function RiskBoundaryDialog({
  open,
  onOpenChange,
  limit,
  onLimitChange,
  dailyLoss,
  onDailyLossChange,
  drawdown,
  onDrawdownChange,
  withdrawAllowed,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  limit: string
  onLimitChange: (value: string) => void
  dailyLoss: string
  onDailyLossChange: (value: string) => void
  drawdown: string
  onDrawdownChange: (value: string) => void
  withdrawAllowed: boolean
}) {
  const { t } = useI18n()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px]" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[560px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.22)] outline-none"
          initialFocus={false}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-[22px] font-semibold tracking-tight text-slate-900">
                {t('quantxAgent.riskDialog.title')}
              </Dialog.Title>
              <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.riskDialog.subtitle')}</p>
            </div>
            <Dialog.Close className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              <CloseIcon />
            </Dialog.Close>
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                label: t('quantxAgent.control.limit'),
                value: limit,
                onChange: onLimitChange,
                suffix: 'USDT',
                type: 'number' as const,
              },
              {
                label: t('quantxAgent.control.dailyLoss'),
                value: dailyLoss,
                onChange: onDailyLossChange,
                suffix: 'USDT',
                type: 'number' as const,
              },
              {
                label: t('quantxAgent.control.drawdown'),
                value: drawdown,
                onChange: onDrawdownChange,
                suffix: '%',
                type: 'number' as const,
              },
            ].map((field) => (
              <label key={field.label} className="grid grid-cols-[140px_minmax(0,1fr)_48px] items-center gap-3">
                <span className="text-sm font-semibold text-slate-900">{field.label}</span>
                <input
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  type={field.type}
                  inputMode="decimal"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-300 focus:border-[#0f4cc8]"
                />
                <span className="text-sm font-medium text-slate-400">{field.suffix}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-[#f1faf4] px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#24b07b] text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none" aria-hidden="true">
                  <path
                    d="m5 12 5 5L19 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  {withdrawAllowed ? t('quantxAgent.riskDialog.withdrawEnabled') : t('quantxAgent.riskDialog.withdrawDisabled')}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {withdrawAllowed ? t('quantxAgent.riskDialog.withdrawEnabledDesc') : t('quantxAgent.riskDialog.withdrawDisabledDesc')}
                </p>
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-6 h-12 w-full rounded-xl bg-[#0f4cc8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
          >
            {t('quantxAgent.riskDialog.save')}
          </Button>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default function QuantxAgentPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [receiveSignals, setReceiveSignals] = useState(true)
  const [autoOrder, setAutoOrder] = useState(false)
  const [riskDialogOpen, setRiskDialogOpen] = useState(false)
  const [riskLimit, setRiskLimit] = useState('100')
  const [dailyLoss, setDailyLoss] = useState('30')
  const [drawdown, setDrawdown] = useState('8')
  const [withdrawAllowed] = useState(false)
  const overallScoreLabel = t('quantxAgent.signals.overallScore')

  const signals = useMemo(
    () => [
      {
        label: t('quantxAgent.signalsList.0.pair'),
        meta: t('quantxAgent.signalsList.0.market'),
        risk: t('quantxAgent.signalsList.0.risk'),
        score: t('quantxAgent.signalsList.0.score'),
        icon: 'BTC',
        tone: 'orange' as const,
        scoreTone: 'green' as const,
      },
      {
        label: t('quantxAgent.signalsList.1.pair'),
        meta: t('quantxAgent.signalsList.1.market'),
        risk: t('quantxAgent.signalsList.1.risk'),
        score: t('quantxAgent.signalsList.1.score'),
        icon: 'ETH',
        tone: 'slate' as const,
        scoreTone: 'green' as const,
      },
      {
        label: t('quantxAgent.signalsList.2.pair'),
        meta: t('quantxAgent.signalsList.2.market'),
        risk: t('quantxAgent.signalsList.2.risk'),
        score: t('quantxAgent.signalsList.2.score'),
        icon: 'SOL',
        tone: 'violet' as const,
        scoreTone: 'orange' as const,
      },
    ],
    [t],
  )

  const agents = useMemo(
    () => [
      {
        title: t('quantxAgent.agents.items.0.name'),
        summary: t('quantxAgent.agents.items.0.summary'),
        score: t('quantxAgent.agents.items.0.score'),
        stats: [t('quantxAgent.agents.items.0.stats'), t('quantxAgent.agents.items.0.risk'), t('quantxAgent.agents.items.0.quality')],
      },
      {
        title: t('quantxAgent.agents.items.1.name'),
        summary: t('quantxAgent.agents.items.1.summary'),
        score: t('quantxAgent.agents.items.1.score'),
        stats: [t('quantxAgent.agents.items.1.stats'), t('quantxAgent.agents.items.1.risk'), t('quantxAgent.agents.items.1.quality')],
      },
      {
        title: t('quantxAgent.agents.items.2.name'),
        summary: t('quantxAgent.agents.items.2.summary'),
        score: t('quantxAgent.agents.items.2.score'),
        stats: [t('quantxAgent.agents.items.2.stats'), t('quantxAgent.agents.items.2.risk'), t('quantxAgent.agents.items.2.quality')],
      },
    ],
    [t],
  )

  const queueRows = [
    {
      strategy: t('quantxAgent.queueRows.0.strategy'),
      symbol: t('quantxAgent.queueRows.0.symbol'),
      direction: t('quantxAgent.queueRows.0.direction'),
      amount: t('quantxAgent.queueRows.0.amount'),
      status: t('quantxAgent.queueRows.0.status'),
    },
    {
      strategy: t('quantxAgent.queueRows.1.strategy'),
      symbol: t('quantxAgent.queueRows.1.symbol'),
      direction: t('quantxAgent.queueRows.1.direction'),
      amount: t('quantxAgent.queueRows.1.amount'),
      status: t('quantxAgent.queueRows.1.status'),
    },
  ]

  const splitScore = (score: string) => {
    const [label, value] = score.split(/\s+/, 2)
    return {
      label,
      value: value ?? '',
    }
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <RiskBoundaryDialog
        open={riskDialogOpen}
        onOpenChange={setRiskDialogOpen}
        limit={riskLimit}
        onLimitChange={setRiskLimit}
        dailyLoss={dailyLoss}
        onDailyLossChange={setDailyLoss}
        drawdown={drawdown}
        onDrawdownChange={setDrawdown}
        withdrawAllowed={withdrawAllowed}
      />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.32em] text-[#0f4cc8]">{t('quantxAgent.eyebrow')}</p>
              <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">{t('quantxAgent.title')}</h1>
              <p className="mt-4 text-sm text-slate-500">{t('quantxAgent.subtitle')}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-start gap-2 rounded-2xl  bg-white px-4 py-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#0f4cc8]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t('quantxAgent.status.paused')}</p>
                  <p className="text-xs text-slate-500">{t('quantxAgent.status.detail')}</p>
                </div>
              </div>
              <Button type="button" className="h-11 rounded-xl bg-[#0f4cc8] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]">
                {t('quantxAgent.status.start')}
              </Button>
              <Button type="button" className="h-11 rounded-xl border border-[#0f4cc8] bg-white px-5 text-sm font-semibold text-[#0f4cc8] transition hover:bg-[#f4f7ff]">
                {t('quantxAgent.status.quickOrder')}
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_362px]">
            <div className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('quantxAgent.signals.title')}</h2>
                    <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.signals.subtitle')}</p>
                  </div>
                  <span className="mt-1 flex items-center gap-2 rounded-full bg-[#f0fbf5] px-3 py-1 text-sm font-semibold text-[#24b07b]">
                    <span className="h-2 w-2 rounded-full bg-[#24b07b]" />
                    {t('quantxAgent.signals.live')}
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {signals.map((signal) => (
                    <div
                      key={signal.label}
                      className="grid grid-cols-1 items-center gap-4 py-4 md:grid-cols-[minmax(0,1fr)_110px_110px] md:gap-6"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <SignalIcon label={signal.icon} tone={signal.tone} />
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-semibold text-slate-900">{signal.label}</h3>
                          <p className="mt-1 text-sm text-slate-500">{signal.meta}</p>
                        </div>
                      </div>
                      <SignalScore
                        risk={signal.risk}
                        score={signal.score}
                        overallLabel={overallScoreLabel}
                        tone={signal.scoreTone}
                      />
                      <Button
                        type="button"
                        onClick={() => navigate('/quantx-agent/order')}
                        className="h-10 justify-self-start rounded-xl bg-[#eef2fb] px-4 text-sm font-semibold text-[#0f4cc8] hover:bg-[#e3ebff] md:justify-self-end"
                      >
                        {t('quantxAgent.signals.order')}
                      </Button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('quantxAgent.market.title')}</h2>
                    <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.market.subtitle')}</p>
                  </div>
                  <Button type="button" className="text-sm font-semibold text-[#0f4cc8] flex justify-center items-center">
                    {t('quantxAgent.market.viewAll')} <ChevronRightIcon />
                  </Button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  {agents.map((agent) => (
                    <article key={agent.title} className="flex min-h-[230px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2fb] text-[#0f4cc8]">
                          ✦
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-semibold text-slate-500">{splitScore(agent.score).label}</span>
                          <span className="text-2xl font-semibold tracking-tight text-slate-900  relative top-[0.1rem]">{splitScore(agent.score).value}</span>
                        </div>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-slate-900">{agent.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-500">{agent.summary}</p>
                      <div className="mt-auto pt-5">
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                          {agent.stats.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                        <Button type="button"
                        onClick={() => navigate('/quantx-agent/order')}
                        className="mt-5 text-sm font-semibold text-[#0f4cc8] flex justify-center items-center">
                          {t('quantxAgent.market.cta')} <ChevronRightIcon />
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('quantxAgent.queue.title')}</h2>
                    <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.queue.subtitle')}</p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => navigate('/quantx-agent/orders')}
                    className="text-sm font-semibold text-[#0f4cc8] flex justify-center items-center"
                  >
                    {t('quantxAgent.queue.viewAll')} <ChevronRightIcon />
                  </Button>
                </div>

                <div className="overflow-hidden">
                  <table className="mt-1 w-full table-fixed border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-left text-sm font-medium text-slate-500">
                        <th className="px-0 py-4">{t('quantxAgent.queue.columns.strategy')}</th>
                        <th className="px-0 py-4">{t('quantxAgent.queue.columns.direction')}</th>
                        <th className="px-0 py-4">{t('quantxAgent.queue.columns.amount')}</th>
                        <th className="px-0 py-4 text-right">{t('quantxAgent.queue.columns.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queueRows.map((row) => (
                        <tr key={`${row.strategy}-${row.symbol}`} className="border-b border-slate-100 last:border-b-0">
                          <td className="py-5 pr-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{row.strategy}</p>
                              <p className="mt-1 text-sm text-slate-500">{row.symbol}</p>
                            </div>
                          </td>
                          <td className="py-5 text-sm font-semibold text-[#24b07b]">{row.direction}</td>
                          <td className="py-5 text-sm font-semibold text-slate-700">{row.amount}</td>
                          <td className="py-5 text-right">
                            <span className="rounded-full bg-[#eef2fb] px-3 py-1 text-sm font-semibold text-[#0f4cc8]">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="rounded-2xl bg-[#eef3ff] px-5 py-4 text-sm text-slate-500 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p>
                    自动交易不能消除市场风险。建议先使用模拟盘，API 仅开启读取与交易权限，关闭提现与转账，并随时保留暂停和撤销授权的控制权。
                  </p>
                  <Button type="button" className="text-sm font-semibold text-[#0f4cc8] flex justify-center items-center">
                    查看风险与权限说明 <ChevronRightIcon />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('quantxAgent.control.title')}</h2>
                    <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.control.mode')}</p>
                  </div>
                  <span className="rounded-full bg-[#eef2fb] px-3 py-1 text-sm font-semibold text-[#0f4cc8]">
                    {t('quantxAgent.control.mode')}
                  </span>
                </div>

                <div className="mt-5 border-y border-slate-100">
                  <SwitchRow
                    title={t('quantxAgent.control.entrySignal')}
                    desc={t('quantxAgent.control.entrySignalDesc')}
                    value={receiveSignals}
                    onChange={setReceiveSignals}
                  />
                  <SwitchRow
                    title={t('quantxAgent.control.autoOrder')}
                    desc={t('quantxAgent.control.autoOrderDesc')}
                    value={autoOrder}
                    onChange={setAutoOrder}
                  />
                </div>

                <div className="mt-4 rounded-2xl bg-[#eef3ff] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">{t('quantxAgent.control.risk')}</h3>
                    <Button
                      type="button"
                      onClick={() => setRiskDialogOpen(true)}
                      className="text-sm font-semibold text-[#0f4cc8]"
                    >
                      {t('quantxAgent.control.edit')}
                    </Button>
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">{t('quantxAgent.control.limit')}</span>
                      <span className="font-semibold text-slate-900">{riskLimit} USDT</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">{t('quantxAgent.control.dailyLoss')}</span>
                      <span className="font-semibold text-slate-900">{dailyLoss} USDT</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">{t('quantxAgent.control.drawdown')}</span>
                      <span className="font-semibold text-slate-900">{drawdown}%</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">{t('quantxAgent.control.withdraw')}</span>
                      <span className="font-semibold text-[#0f4cc8]">
                        {withdrawAllowed ? t('quantxAgent.riskDialog.withdrawEnabled') : t('quantxAgent.riskItems.withdraw')}
                      </span>
                    </div>
                  </div>
                </div>

                <Button type="button" className="mt-4 h-12 w-full rounded-xl flex justify-center items-center bg-[#0f4cc8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]">
                  {t('quantxAgent.control.saved')} <ChevronRightIcon />
                </Button>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('quantxAgent.settlement.title')}</h2>
                    <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.settlement.subtitle')}</p>
                  </div>
                  <span className="rounded-full bg-[#f0fbf5] px-3 py-1 text-sm font-semibold text-[#24b07b]">
                    {t('quantxAgent.settlement.safe')}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7bf32] text-lg font-bold text-white">
                    B
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-slate-900">Binance</p>
                    <p className="mt-1 text-sm text-slate-500">API 已连接 · 交易权限</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-[#eef3ff] px-4 py-4">
                  <p className="text-sm text-slate-500">{t('quantxAgent.settlement.balanceTitle')}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">12.4 USDT</p>
                  <p className="mt-2 text-sm text-[#0f4cc8]">{t('quantxAgent.settlement.balanceHint')}</p>
                </div>

                <Button type="button" className="mt-4 h-11 w-full rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  {t('quantxAgent.settlement.manage')}
                </Button>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
