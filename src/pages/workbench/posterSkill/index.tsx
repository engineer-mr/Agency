import { useMemo, useState } from 'react'
import { Button } from '@base-ui/react/button'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../../components/Sidebar'
import { useI18n } from '../../../i18n'

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
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

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12 3.2 14.5 9.5 20.8 12 14.5 14.5 12 20.8 9.5 14.5 3.2 12 9.5 9.5 12 3.2Z" />
    </svg>
  )
}

export default function PosterSkillPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState(0)
  const tabs = [0, 1, 2, 3].map((index) => t(`posterSkill.tabs.${index}`))

  const previewMeta = useMemo(
    () => [
      { label: t('posterSkill.settings.model'), value: 'ChatGPT 5.6 Sol' },
      { label: t('posterSkill.settings.ratio'), value: t('posterSkill.settings.auto') },
      { label: t('posterSkill.settings.resolution'), value: t('posterSkill.settings.standard') },
    ],
    [t],
  )

  const handleBack = () => {
    navigate('/workbench', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={handleBack}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <BackIcon />
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{t('posterSkill.title')}</h1>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-slate-200 text-base font-medium text-slate-500">
            {tabs.map((tab, index) => {
              const active = index === activeTab
              return (
                <Button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`relative -mb-px border-b-2 px-0 py-3 text-base font-medium transition ${
                    active
                      ? 'border-[#0f4cc8] text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </Button>
              )
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-4">
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{t('posterSkill.sections.model')}</p>
                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-between rounded-2xl bg-[#f4f6fb] px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-[#eef2fb]"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0f4cc8] shadow-sm">
                      <SparkIcon />
                    </span>
                    <span className="font-medium text-slate-900">ChatGPT 5.6 Sol</span>
                  </span>
                  <ChevronDownIcon />
                </button>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{t('posterSkill.sections.product')}</p>
                  <Button type="button" className="text-sm text-slate-500">
                    {t('posterSkill.chooseFromKnowledge')}
                  </Button>
                </div>
                <div className="mt-3 flex min-h-[220px] items-center justify-center rounded-2xl bg-[#f5f7fc] px-4 py-8 text-center">
                  <div>
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0f4cc8] shadow-sm">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                      >
                        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z" />
                        <path d="M8 14.5 10.5 12l2 2 3.5-4.5L18 14" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="9" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm font-medium text-slate-900">{t('posterSkill.uploadTitle')}</p>
                    <p className="mt-2 text-xs text-slate-500">{t('posterSkill.uploadDesc')}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{t('posterSkill.sections.production')}</p>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {previewMeta.slice(1).map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="flex items-center justify-between rounded-2xl bg-[#f4f6fb] px-4 py-3 text-left text-sm text-slate-700"
                    >
                      <span className="text-slate-500">
                        {item.label}
                        <span className="ml-3 font-medium text-slate-900">{item.value}</span>
                      </span>
                      <ChevronDownIcon />
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{t('posterSkill.sections.inspiration')}</p>
                <div className="mt-3 rounded-2xl bg-[#f4f6fb] px-4 py-4">
                  <textarea
                    className="h-16 w-full resize-none border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    placeholder={t('posterSkill.promptPlaceholder')}
                    defaultValue=""
                  />
                </div>
              </section>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="text-[#0f4cc8]">
                    <SparkIcon />
                  </span>
                  <span>{t('posterSkill.estimate')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  {t('posterSkill.saved')}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button type="button" className="flex-1 rounded-xl bg-[#0f4cc8] py-3 text-sm font-semibold text-white">
                  {t('posterSkill.generate')}
                </Button>
                <div className="flex items-center rounded-xl bg-[#f4f6fb] px-4 py-3 text-sm text-slate-500">
                  <button type="button" className="px-2 text-lg leading-none">
                    -
                  </button>
                  <span className="px-3 font-medium text-slate-900">1</span>
                  <button type="button" className="px-2 text-lg leading-none">
                    +
                  </button>
                  <span className="ml-2">{t('posterSkill.unit')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-3">
                  {[0, 1, 2].map((tabIndex) => {
                    const item = t(`posterSkill.resultTabs.${tabIndex}`)
                    const active = tabIndex === 0
                    return (
                      <Button
                        key={item}
                        type="button"
                        className={`rounded-full px-6 py-2 text-sm font-medium ${
                          active
                            ? 'border border-[#0f4cc8] bg-[#eef2fb] text-slate-900'
                            : 'bg-[#f5f7fc] text-slate-700'
                        }`}
                      >
                        {item}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mx-auto flex max-w-[420px] justify-center">
                  <div className="relative h-[420px] w-[300px] overflow-hidden bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f8_100%)]" />
                    <div className="absolute left-0 top-0 h-full w-[45%] bg-[linear-gradient(180deg,#f4f4f6_0%,#ffffff_100%)]" />
                    <div className="absolute left-7 top-5 text-[56px] font-black tracking-[-0.08em] text-slate-900 [writing-mode:vertical-rl] rotate-180">
                      POSTER
                    </div>
                    <div className="absolute right-4 top-4 text-[10px] font-semibold tracking-[0.2em] text-slate-900">
                      Unlock your potential
                    </div>
                    <div className="absolute left-[48%] top-[15%] h-[58%] w-[38%] rounded-[45%_45%_35%_35%/42%_42%_58%_58%] bg-[radial-gradient(circle_at_50%_32%,#f5f1ef_0%,#d9d7d8_28%,#3d3d3f_100%)] opacity-95" />
                    <div className="absolute bottom-0 left-1/2 h-[52%] w-[58%] -translate-x-1/2 rounded-t-[48%] bg-[linear-gradient(180deg,#171717_0%,#050505_100%)]" />
                    <div className="absolute left-[42%] top-[40%] h-[2px] w-[52%] bg-[#c34b4b]" />
                    <div className="absolute left-[42%] top-[40%] h-[48px] w-[48px] border border-[#c34b4b]" />
                    <div className="absolute bottom-[16%] right-[8%] rounded bg-[#c34b4b] px-2 py-1 text-[10px] font-semibold text-white">
                      {t('posterSkill.posterBadge')}
                    </div>
                    <div className="absolute bottom-[10%] right-[8%] text-right text-[10px] font-semibold leading-tight text-slate-900">
                      GORGEOUS
                      <br />
                      APPEARANCE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
