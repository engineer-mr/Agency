import { Button } from '@base-ui/react/button'
import { useMemo } from 'react'
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

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none" aria-hidden="true">
      <path
        d="m5 12 5 5L19 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none" aria-hidden="true">
      <path
        d="M12 4.5 20 19H4L12 4.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 9v4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  )
}

function buildPath(points: Array<[number, number]>) {
  return points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`)
    .join(' ')
}

export default function QuantxAgentOrderPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const triggerItems = useMemo(
    () => [
      {
        title: t('quantxAgent.orderDetail.triggers.0.title'),
        desc: t('quantxAgent.orderDetail.triggers.0.desc'),
        status: t('quantxAgent.orderDetail.triggers.0.status'),
        tone: 'green' as const,
      },
      {
        title: t('quantxAgent.orderDetail.triggers.1.title'),
        desc: t('quantxAgent.orderDetail.triggers.1.desc'),
        status: t('quantxAgent.orderDetail.triggers.1.status'),
        tone: 'green' as const,
      },
      {
        title: t('quantxAgent.orderDetail.triggers.2.title'),
        desc: t('quantxAgent.orderDetail.triggers.2.desc'),
        status: t('quantxAgent.orderDetail.triggers.2.status'),
        tone: 'orange' as const,
      },
    ],
    [t],
  )

  const chartPath = buildPath([
    [16, 206],
    [78, 188],
    [122, 195],
    [170, 160],
    [214, 172],
    [268, 140],
    [315, 150],
    [364, 126],
    [420, 132],
    [470, 98],
    [520, 116],
    [572, 88],
    [628, 72],
  ])

  const supportLine = 'M 14 166 H 660'

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <button
            type="button"
            onClick={() => navigate('/quantx-agent')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#0f4cc8]"
          >
            <ArrowLeftIcon />
            {t('quantxAgent.orderDetail.back')}
          </button>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-slate-100 pb-6">
            <div>
              <p className="text-xs font-bold tracking-[0.32em] text-[#0f4cc8]">{t('quantxAgent.orderDetail.eyebrow')}</p>
              <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">{t('quantxAgent.orderDetail.title')}</h1>
              <p className="mt-4 text-sm text-slate-500">{t('quantxAgent.orderDetail.subtitle')}</p>
            </div>

            <div className="flex items-start gap-10">
              <div className="text-right flex items-end">
                <p className="text-sm text-slate-500">{t('quantxAgent.orderDetail.scoreLabel')}</p>
                <p className="ml-2 text-[42px] font-semibold leading-none tracking-tight text-slate-900">72</p>
              </div> 
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_388px]">
            <div className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('quantxAgent.orderDetail.chartTitle')}</h2>
                    <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.orderDetail.chartSubtitle')}</p>
                  </div>
                  <span className="rounded-full bg-[#eef2fb] px-3 py-1 text-sm font-semibold text-[#0f4cc8]">
                    {t('quantxAgent.orderDetail.timeframe')}
                  </span>
                </div>

                <div className="mt-6 rounded-2xl bg-[#fbfcff] p-4">
                  <svg viewBox="0 0 680 260" className="h-[260px] w-full">
                    <defs>
                      <linearGradient id="priceGrid" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#e8eefc" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#f7f9fd" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    {[32, 84, 136, 188, 240].map((y) => (
                      <line key={y} x1="16" x2="664" y1={y} y2={y} stroke="url(#priceGrid)" strokeWidth="1" />
                    ))}
                    <path d={supportLine} stroke="#f6b67a" strokeDasharray="4 4" strokeWidth="1.5" />
                    <path d={chartPath} fill="none" stroke="#0f4cc8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="572" cy="88" r="4" fill="#0f4cc8" />
                    <circle cx="628" cy="72" r="4" fill="#0f4cc8" />
                    <rect x="74" y="148" rx="10" ry="10" width="94" height="28" fill="#fff5e8" />
                    <text x="84" y="167" fill="#f28a4b" fontSize="13" fontWeight="600">
                      {t('quantxAgent.orderDetail.observation')}
                    </text>
                    <rect x="606" y="56" rx="10" ry="10" width="58" height="28" fill="#e8eefc" />
                    <text x="615" y="75" fill="#0f4cc8" fontSize="13" fontWeight="700">
                      68,420
                    </text>
                  </svg>

                  <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                    <p className="text-slate-500">
                      {t('quantxAgent.orderDetail.currentPrice')} <span className="font-semibold text-slate-900">86,420.30 USDT</span>
                    </p>
                    <p className="text-slate-500">
                      {t('quantxAgent.orderDetail.change24h')} <span className="font-semibold text-[#24b07b]">+2.84</span>
                    </p>
                    <p className="text-slate-500">
                      {t('quantxAgent.orderDetail.volume')} <span className="font-semibold text-slate-900">1.82B</span>
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('quantxAgent.orderDetail.triggersTitle')}</h2>
                    <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.orderDetail.triggersSubtitle')}</p>
                  </div>
                  <span className="rounded-full bg-[#f0fbf5] px-3 py-1 text-sm font-semibold text-[#24b07b]">
                    {t('quantxAgent.orderDetail.triggerPassed')}
                  </span>
                </div>

                <div className="mt-6 divide-y divide-slate-100">
                  {triggerItems.map((item) => (
                    <div key={item.title} className="flex items-start justify-between gap-4 py-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full ${item.tone === 'green' ? 'bg-[#edf9f3] text-[#24b07b]' : 'bg-[#fff4e8] text-[#f28a4b]'}`}>
                          {item.tone === 'green' ? <CheckIcon /> : <WarningIcon />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-slate-900">{item.title}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <span className={`shrink-0 text-sm font-semibold ${item.tone === 'green' ? 'text-[#24b07b]' : 'text-[#f28a4b]'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="rounded-2xl bg-[#eef3ff] px-5 py-4 text-sm text-slate-500 shadow-sm">
                <div className="flex items-start gap-3">
                  <WarningIcon />
                  <p>{t('quantxAgent.orderDetail.note')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('quantxAgent.orderDetail.adviceTitle')}</h2>
                    <p className="mt-2 text-sm text-slate-500">{t('quantxAgent.orderDetail.adviceSubtitle')}</p>
                  </div>
                  <span className="rounded-full bg-[#eef2fb] px-3 py-1 text-sm font-semibold text-[#0f4cc8]">
                    {t('quantxAgent.orderDetail.riskControl')}
                  </span>
                </div>

                <div className="mt-6 rounded-2xl bg-[#f1faf4] px-4 py-4">
                  <p className="text-sm text-slate-500">{t('quantxAgent.orderDetail.directionLabel')}</p>
                  <p className="mt-2 text-[28px] font-semibold tracking-tight text-[#24b07b]">
                    {t('quantxAgent.orderDetail.direction')}
                  </p>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">{t('quantxAgent.orderDetail.positionLabel')}</span>
                    <span className="font-semibold text-slate-900">100 USDT</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">{t('quantxAgent.orderDetail.stopLossLabel')}</span>
                    <span className="font-semibold text-slate-900">67,240 USDT</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">{t('quantxAgent.orderDetail.takeProfitLabel')}</span>
                    <span className="font-semibold text-slate-900">69,600 USDT</span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-[#edf1fb] px-4 py-4">
                  <div className="flex items-start gap-3">
                    <CheckIcon />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{t('quantxAgent.orderDetail.riskOk')}</p>
                      <p className="mt-1 text-sm text-slate-500">{t('quantxAgent.orderDetail.riskOkDesc')}</p>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  className="mt-6 h-12 w-full rounded-xl bg-[#0f4cc8] text-sm flex items-center justify-center font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
                >
                  {t('quantxAgent.orderDetail.confirmAction')} <span className="ml-1 inline-flex"><ChevronRightIcon /></span>
                </Button>

                <Button
                  type="button"
                  onClick={() => navigate('/quantx-agent')}
                  className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {t('quantxAgent.orderDetail.secondaryAction')}
                </Button>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold tracking-[0.32em] text-[#0f4cc8]">{t('quantxAgent.orderDetail.strategyEyebrow')}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{t('quantxAgent.orderDetail.strategyTitle')}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{t('quantxAgent.orderDetail.strategyBody')}</p>
                <button type="button" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0f4cc8]">
                  {t('quantxAgent.orderDetail.strategyLink')}
                  <ChevronRightIcon />
                </button>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
