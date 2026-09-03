import { Button } from '@base-ui/react/button'
import { useState } from 'react'
import { Sidebar } from '../../components/Sidebar' 
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
                {plan.ctaSecondary.leftPrice} <span className="font-medium line-through decoration-slate-400 decoration-1">{plan.ctaSecondary.leftOriginal}</span> /月
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

      <p className="mt-6 text-center text-sm text-slate-400">包含所有 {plan.name} 用户权益</p>
    </section>
  )
}

const plans: Plan[] = [
  {
    name: 'Basic',
    tone: 'violet',
    priceMode: 'standard',
    primaryPrice: '16.67',
    monthlyOriginal: '$24.99',
    monthlyOriginalSuffix: '/月',
    annualPrice: '$199.99',
    annualOriginal: '$299.88',
    annualNote: '/年，按年计费',
    discount: '低至67折，立省 $99.89',
    description: '探索AI生产力工具的理想起点，覆盖高频使用场景',
    monthlyPoints: '12,500 积分/月',
    badge: '67折',
    ctaType: 'outline',
    ctaLabel: '立即升级',
    borderClass: 'border-slate-200',
    accentClass: 'border-[#b9a7ff] text-[#7c5cff] hover:bg-[#f8f4ff]',
    titleClass: 'text-slate-900',
    sectionTitle: '核心 AI 功能',
    perks: [
      '120积分/日，登录赠礼',
      '共享SkyClaw智能助手',
      '3台设备同时在线',
      '50GB 知识库容量',
      'AI 搜索增强（含联网实时搜索）',
      'AI 编辑能力（文档/PPT/图片/网页/视频）',
    ],
  },
  {
    name: 'Plus',
    tone: 'purple',
    priceMode: 'trial',
    primaryPrice: '1',
    primaryNote: '试用7天',
    annualPrice: '$399.90',
    annualOriginal: '$599.88',
    annualNote: '/年，按年计费',
    discount: '低至67折，立省 $199.98',
    description: '专业用户首选，Beta功能抢先体验，顶级模型优先访问',
    monthlyPoints: '800积分/日，订阅后 28,000积分/月',
    badge: '67折',
    ctaType: 'trial',
    ctaLabel: '$1 开始7日试用',
    ctaSecondary: {
      leftPrice: '$33.32',
      leftOriginal: '$49.99',
      rightLabel: '立即升级',
    },
    borderClass: 'border-[#d9b8ff] bg-[linear-gradient(180deg,rgba(245,235,255,0.55)_0%,rgba(255,255,255,1)_72%)]',
    accentClass: 'border-[#b76bff] bg-[linear-gradient(180deg,#c67cff_0%,#a95cff_100%)] text-white shadow-[0_8px_24px_rgba(169,92,255,0.32)] hover:brightness-95',
    titleClass: 'text-slate-900',
    sectionTitle: '核心 AI 功能',
    perks: [
      '专属自定义 7*24小时在线 SkyClaw 智能助手',
      '优先使用顶级 AI 模型（优先队列）',
      '自选顶级模型（Claude, ChatGPT, Gemini, DeepSeek, Kimi）',
      'Beta 功能抢先体验',
      '4台设备同时在线',
      '1T 知识库容量',
    ],
  },
  {
    name: 'Ultra',
    tone: 'orange',
    priceMode: 'standard',
    primaryPrice: '166.66',
    monthlyOriginal: '$249.99',
    monthlyOriginalSuffix: '/月',
    annualPrice: '$1,999.90',
    annualOriginal: '$2,999.88',
    annualNote: '/年，按年计费',
    discount: '低至67折，立省 $999.98',
    description: '每日一杯拿铁的价格，拥有私有化 AI Agent 顶级体验与速度',
    monthlyPoints: '150,000 积分/月',
    badge: '67折',
    ctaType: 'outline',
    ctaLabel: '立即升级',
    borderClass: 'border-[#ffd79c] bg-[linear-gradient(180deg,rgba(255,248,235,0.65)_0%,rgba(255,255,255,1)_72%)]',
    accentClass: 'border-[#ffb24b] text-[#ff9a1f] hover:bg-[#fff5e5]',
    titleClass: 'text-slate-900',
    sectionTitle: '核心 AI 功能',
    perks: [
      '120积分/日，登录赠礼',
      '专属自定义 7*24小时在线 SkyClaw 智能助手',
      '不限速使用顶级 AI 模型（专属通道）',
      '自选顶级模型（Claude, ChatGPT, Gemini, DeepSeek, Kimi）',
      '全量 Beta 功能首批解锁',
      '8台设备同时在线',
      '3T 知识库容量',
    ],
  },
]

export default function PlanPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-slate-900 flex items-centers">
              选择想要订阅的会员 或 
               <img src={Icon4} className='w-[20px] h-[20px] mx-1' alt="" />
              <span className="text-[#ff9a1f]">购买积分</span>
            </p>

            <div className="mt-4 flex w-[380px] items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`h-10 flex-1 rounded-xl text-base font-semibold transition ${
                  billing === 'monthly' ? 'bg-[#eef1f6] text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                每月
              </button>
              <button
                type="button"
                onClick={() => setBilling('yearly')}
                className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-base font-semibold transition ${
                  billing === 'yearly' ? 'bg-[#eef1f6] text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                每年 <span className="rounded-md bg-[#31b089] px-1.5 py-0.5 text-[10px] font-semibold text-white">64折</span>
              </button>
            </div>

            <div className="mt-8 flex w-full items-center justify-center gap-4 text-sm text-slate-500">
              <span>支付方式:</span>
              <button type="button" className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-slate-900 text-[10px] text-white">▣</span>
                信用卡 / 银行卡 <ChevronRightIcon />
              </button>
            </div>

            <div className="mt-6 grid w-full grid-cols-1 gap-5 xl:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>

            <section className="mt-12 flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-sm">
              <div>
                <p className="text-lg font-semibold text-slate-900">安全与合规</p>
                <p className="mt-2 text-sm text-slate-500">信任中心</p>
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
                了解更多 <ChevronRightIcon />
              </Button>
            </section>

            <Button type="button" className="mt-10 text-base font-semibold text-[#7c5cff] flex items-center">
              <img src={Icon3} className='w-[20px] h-[20px] mr-2' alt="" />
              使用优惠码，立享折扣
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
