import { Button } from '@base-ui/react/button'
import { useState } from 'react'
import { Sidebar } from '../../components/Sidebar' 
import { useI18n } from '../../i18n'
import Icon4 from '../../assets/plan/icon4.png'
import Icon3 from '../../assets/plan/icon3.png'
import Icon1 from '../../assets/plan/icon1.png'
import Icon2 from '../../assets/plan/icon2.png'

type Plan = {
  name: string
  tone: 'violet' | 'purple' | 'orange'
  priceMode: 'standard' | 'trial'
  primaryPrice: string
  primaryNote?: string
  monthlyOriginal?: string
  monthlyOriginalSuffix?: string
  annualPrice: string
  annualOriginal: string
  annualNote: string
  discount: string
  description: string
  monthlyPoints: string
  badge: string
  ctaType: 'outline' | 'trial'
  ctaLabel: string
  ctaSecondary?: {
    leftPrice: string
    leftOriginal: string
    rightLabel: string
  }
  borderClass: string
  accentClass: string
  titleClass: string
  perks: string[]
  sectionTitle: string
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrownIcon({ tone }: { tone: Plan['tone'] }) {
  const fills = {
    violet: 'text-[#7c5cff]',
    purple: 'text-[#b85cff]',
    orange: 'text-[#f6a23b]',
  }[tone]

  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 fill-current ${fills}`} aria-hidden="true">
      <path d="m4 8 4 3 4-7 4 7 4-3-2 11H6L4 8Zm3 11h10" />
    </svg>
  )
}

function DotBullet() {
  return <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-slate-400" />
}

function PlanCard({ plan }: { plan: Plan }) {
  const { t } = useI18n()

  return (
    <section className={`rounded-[28px] border bg-white px-5 py-5 shadow-sm ${plan.borderClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <CrownIcon tone={plan.tone} />
          <h2 className={`text-[32px] font-semibold tracking-tight ${plan.titleClass}`}>{plan.name}</h2>
        </div>
        <span className="rounded-full bg-[#e8faf2] px-2.5 py-1 text-xs font-semibold text-[#22a45d]">{plan.badge}</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">{plan.description}</p>

      <div className="mt-10">
        <div className={`flex items-end gap-1 leading-none tracking-tight text-slate-900`}>
          <span className="pb-1 text-[18px] font-semibold">$</span>
          <span className="text-[42px] font-semibold">{plan.primaryPrice}</span>
          {plan.priceMode === 'trial' ? (
            <span className="pb-1 text-[18px] font-semibold text-slate-900">{plan.primaryNote}</span>
          ) : (
            <>
              <span className="pb-1 text-sm font-semibold text-slate-500 line-through decoration-slate-400 decoration-1">
                {plan.monthlyOriginal}
              </span>
              <span className="pb-1 text-sm font-semibold text-slate-500">{plan.monthlyOriginalSuffix}</span>
            </>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <span>{plan.annualPrice}</span>
          <span className="font-medium line-through decoration-slate-400 decoration-1">{plan.annualOriginal}</span>
          <span>{plan.annualNote}</span>
        </div>
        <p className="mt-3 text-sm font-medium text-[#31b089]">{plan.discount}</p>
      </div>

      {plan.ctaType === 'trial' ? (
        <>
          <Button type="button" className={`mt-4 h-11 w-full rounded-2xl border text-sm font-semibold transition ${plan.accentClass}`}>
            {plan.ctaLabel}
          </Button>
          {plan.ctaSecondary ? (
            <Button
              type="button"
              className="mt-2 flex h-11 w-full items-center justify-between rounded-2xl border border-[#bf90ff] px-4 text-sm font-semibold text-[#7c5cff] transition hover:bg-[#faf5ff]"
            >
              <span>
                {plan.ctaSecondary.leftPrice} <span className="font-medium line-through decoration-slate-400 decoration-1">{plan.ctaSecondary.leftOriginal}</span> {t('planPage.plans.basic.monthlySuffix')}
              </span>
              <span>{plan.ctaSecondary.rightLabel}</span>
            </Button>
          ) : null}
        </>
      ) : (
        <Button
          type="button"
          className={`mt-4 h-11 w-full rounded-2xl border text-sm font-semibold transition ${plan.accentClass}`}
        >
          {plan.ctaLabel}
        </Button>
      )}

      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ffb11b] text-[10px] text-white">◔</span>
            {plan.monthlyPoints}
          </div>
          <ChevronRightIcon />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {plan.perks.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            <DotBullet />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="text-sm font-semibold text-slate-900">{plan.sectionTitle}</p>
        <div className="mt-3 space-y-3">
          {plan.perks.slice(0, 4).map((item) => (
            <div key={`${plan.name}-${item}`} className="flex gap-3 text-sm leading-6 text-slate-600">
              <DotBullet />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">{t('planPage.planContain', { name: plan.name })}</p>
    </section>
  )
}

function createPlans(t: (key: string, vars?: Record<string, string | number>) => string): Plan[] {
  return [
  {
    name: t('planPage.plans.basic.name'),
    tone: 'violet',
    priceMode: 'standard',
    primaryPrice: t('planPage.plans.basic.monthlyPrice'),
    monthlyOriginal: t('planPage.plans.basic.monthlyOriginal'),
    monthlyOriginalSuffix: t('planPage.plans.basic.monthlySuffix'),
    annualPrice: t('planPage.plans.basic.annualPrice'),
    annualOriginal: t('planPage.plans.basic.annualOriginal'),
    annualNote: t('planPage.plans.basic.annualNote'),
    discount: t('planPage.plans.basic.discount'),
    description: t('planPage.plans.basic.description'),
    monthlyPoints: t('planPage.plans.basic.monthlyPoints'),
    badge: t('planPage.plans.basic.badge'),
    ctaType: 'outline',
    ctaLabel: t('planPage.plans.basic.upgrade'),
    borderClass: 'border-slate-200',
    accentClass: 'border-[#b9a7ff] text-[#7c5cff] hover:bg-[#f8f4ff]',
    titleClass: 'text-slate-900',
    sectionTitle: t('planPage.plans.basic.sections.main'),
    perks: [0, 1, 2, 3, 4, 5].map((index) => t(`planPage.plans.basic.features.${index}`)),
  },
  {
    name: t('planPage.plans.plus.name'),
    tone: 'purple',
    priceMode: 'trial',
    primaryPrice: t('planPage.plans.plus.trialPrice'),
    primaryNote: t('planPage.plans.plus.trialNote'),
    annualPrice: t('planPage.plans.plus.annualPrice'),
    annualOriginal: t('planPage.plans.plus.annualOriginal'),
    annualNote: t('planPage.plans.plus.annualNote'),
    discount: t('planPage.plans.plus.discount'),
    description: t('planPage.plans.plus.description'),
    monthlyPoints: t('planPage.plans.plus.monthlyPoints'),
    badge: t('planPage.plans.plus.badge'),
    ctaType: 'trial',
    ctaLabel: t('planPage.plans.plus.trialCta'),
    ctaSecondary: {
      leftPrice: t('planPage.plans.plus.secondaryPrice'),
      leftOriginal: t('planPage.plans.plus.secondaryOriginal'),
      rightLabel: t('planPage.plans.plus.upgrade'),
    },
    borderClass: 'border-[#d9b8ff] bg-[linear-gradient(180deg,rgba(245,235,255,0.55)_0%,rgba(255,255,255,1)_72%)]',
    accentClass: 'border-[#b76bff] bg-[linear-gradient(180deg,#c67cff_0%,#a95cff_100%)] text-white shadow-[0_8px_24px_rgba(169,92,255,0.32)] hover:brightness-95',
    titleClass: 'text-slate-900',
    sectionTitle: t('planPage.plans.plus.sections.main'),
    perks: [0, 1, 2, 3, 4, 5].map((index) => t(`planPage.plans.plus.features.${index}`)),
  },
  {
    name: t('planPage.plans.ultra.name'),
    tone: 'orange',
    priceMode: 'standard',
    primaryPrice: t('planPage.plans.ultra.monthlyPrice'),
    monthlyOriginal: t('planPage.plans.ultra.monthlyOriginal'),
    monthlyOriginalSuffix: t('planPage.plans.ultra.monthlySuffix'),
    annualPrice: t('planPage.plans.ultra.annualPrice'),
    annualOriginal: t('planPage.plans.ultra.annualOriginal'),
    annualNote: t('planPage.plans.ultra.annualNote'),
    discount: t('planPage.plans.ultra.discount'),
    description: t('planPage.plans.ultra.description'),
    monthlyPoints: t('planPage.plans.ultra.monthlyPoints'),
    badge: t('planPage.plans.ultra.badge'),
    ctaType: 'outline',
    ctaLabel: t('planPage.plans.ultra.upgrade'),
    borderClass: 'border-[#ffd79c] bg-[linear-gradient(180deg,rgba(255,248,235,0.65)_0%,rgba(255,255,255,1)_72%)]',
    accentClass: 'border-[#ffb24b] text-[#ff9a1f] hover:bg-[#fff5e5]',
    titleClass: 'text-slate-900',
    sectionTitle: t('planPage.plans.ultra.sections.main'),
    perks: [0, 1, 2, 3, 4, 5, 6].map((index) => t(`planPage.plans.ultra.features.${index}`)),
  },
]
}

export default function PlanPage() {
  const { t } = useI18n()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const plans = createPlans(t)

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-slate-900 flex items-centers">
              {t('planPage.eyebrow')}
               <img src={Icon4} className='w-[20px] h-[20px] mx-1' alt="" />
              <span className="text-[#ff9a1f]">{t('planPage.coin')}</span>
            </p>

            <div className="mt-4 flex w-[380px] items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`h-10 flex-1 rounded-xl text-base font-semibold transition ${
                  billing === 'monthly' ? 'bg-[#eef1f6] text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t('planPage.monthly')}
              </button>
              <button
                type="button"
                onClick={() => setBilling('yearly')}
                className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-base font-semibold transition ${
                  billing === 'yearly' ? 'bg-[#eef1f6] text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t('planPage.yearly')} <span className="rounded-md bg-[#31b089] px-1.5 py-0.5 text-[10px] font-semibold text-white">{t('planPage.yearlyBadge')}</span>
              </button>
            </div>

            <div className="mt-8 flex w-full items-center justify-center gap-4 text-sm text-slate-500">
              <span>{t('planPage.paymentMethod')}</span>
              <button type="button" className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-slate-900 text-[10px] text-white">▣</span>
                {t('planPage.cardOrBank')} <ChevronRightIcon />
              </button>
            </div>

            <div className="mt-6 grid w-full grid-cols-1 gap-5 xl:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>

            <section className="mt-12 flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-sm">
              <div>
                <p className="text-lg font-semibold text-slate-900">{t('planPage.safetyTitle')}</p>
                <p className="mt-2 text-sm text-slate-500">{t('planPage.safetySubtitle')}</p>
              </div>
              <div className="flex items-center gap-8 text-center">
                <div className="text-xs text-[#333B46]"> 
                  <img src={Icon1} className='mx-auto h-12 w-12 rounded-full mr-2' alt="" />
                  <p className="mt-2">SOC 2 Type I</p>
                </div>
                <div className="text-xs text-[#333B46]">
                  <img src={Icon2} className='mx-auto h-12 w-12 rounded-full mr-2' alt="" />
                  <p className="mt-2">ISO 27001</p>
                </div>
                <div className="text-xs text-[#333B46]"> 
                  <img src={Icon2} className='mx-auto h-12 w-12 rounded-full mr-2' alt="" />
                  <p className="mt-2">ISO 27701</p>
                </div>
              </div>
              <Button type="button" className="rounded-2xl border flex items-center border-slate-200 px-4 py-3 text-sm font-semibold text-[#7c5cff]">
                {t('planPage.learnMore')} <ChevronRightIcon />
              </Button>
            </section>

            <Button type="button" className="mt-10 text-base font-semibold text-[#7c5cff] flex items-center">
              <img src={Icon3} className='w-[20px] h-[20px] mr-2' alt="" />
              {t('planPage.promo')}
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
