import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'
import { useI18n } from '../../../i18n'
import { SkillCard } from './SkillCard'
import { createWorkbenchData } from './workbench-data'

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
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

function WebsiteSkillDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const prompts = [0, 1].map((index) => ({
    label: t(`workbench.websiteDialog.prompts.${index}.label`),
    body: t(`workbench.websiteDialog.prompts.${index}.body`),
  }))

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px]" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[560px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.22)] outline-none"
          initialFocus={false}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef3ff] text-xl text-[#0f4cc8]">
                🌐
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-slate-900">
                  {t('workbench.websiteDialog.title')}
                </Dialog.Title>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <UserIcon />
                    {t('workbench.websiteDialog.author')}
                  </span>
                  <span className="h-4 w-px bg-slate-200" />
                  <span className="flex items-center gap-1.5">
                    <ClockIcon />
                    {t('workbench.websiteDialog.date')}
                  </span>
                </div>
              </div>
            </div>
            <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              <CloseIcon />
            </Dialog.Close>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-600">{t('workbench.websiteDialog.desc')}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-900">{t('workbench.websiteDialog.examplesTitle')}</p>
            <div className="mt-3 space-y-3">
              {prompts.map((prompt, index) => (
                <button
                  key={prompt.body}
                  type="button"
                  onClick={() => {
                    if(index === 0) {
                    navigate('/home')
                      return
                    }
                    navigate('/workbench', { state: { activeTab: 'agent' } })
                  }}
                  className="flex w-full items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white px-3 py-3 text-left transition hover:border-[#c9d7f8] hover:bg-[#f8faff]"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-700">{prompt.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-400">{prompt.body}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-slate-500">
                    {t('workbench.websiteDialog.try')}
                    <ChevronRightIcon />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <Button
              type="button"
              onClick={() => {
                onOpenChange(false)
                navigate('/home')}}
              className="h-12 rounded-xl bg-slate-100 text-sm font-medium text-slate-600"
            >
              {t('workbench.websiteDialog.chooseConversation')}
            </Button>
            <Button
              type="button"
              onClick={() => {
                onOpenChange(false) 
                    navigate('/workbench', { state: { activeTab: 'agent' } })
              }}
              className="h-12 rounded-xl bg-[#0f4cc8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
            >
              {t('workbench.websiteDialog.useAgent')}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function MarketingCopyDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const prompts = [0, 1].map((index) => ({
    label: t(`workbench.marketingDialog.prompts.${index}.label`),
    body: t(`workbench.marketingDialog.prompts.${index}.body`),
  }))

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px]" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[560px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.22)] outline-none"
          initialFocus={false}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3efff] text-xl text-[#8c6ade]">
                T
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-slate-900">
                  {t('workbench.marketingDialog.title')}
                </Dialog.Title>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <UserIcon />
                    {t('workbench.marketingDialog.author')}
                  </span>
                  <span className="h-4 w-px bg-slate-200" />
                  <span className="flex items-center gap-1.5">
                    <ClockIcon />
                    {t('workbench.marketingDialog.date')}
                  </span>
                </div>
              </div>
            </div>
            <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              <CloseIcon />
            </Dialog.Close>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-600">{t('workbench.marketingDialog.desc')}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-900">{t('workbench.marketingDialog.examplesTitle')}</p>
            <div className="mt-3 space-y-3">
              {prompts.map((prompt, index) => (
                <button
                  key={prompt.body}
                  type="button"
                  onClick={() => {
                    if (index === 0) {
                      navigate('/home')
                      return
                    }
                    navigate('/workbench', { state: { activeTab: 'agent' } })
                  }}
                  className="flex w-full items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white px-3 py-3 text-left transition hover:border-[#c9d7f8] hover:bg-[#f8faff]"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-700">{prompt.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-400">{prompt.body}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-slate-500">
                    {t('workbench.marketingDialog.try')}
                    <ChevronRightIcon />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <Button
              type="button"
              onClick={() => {
                onOpenChange(false)
                navigate('/home')
              }}
              className="h-12 rounded-xl bg-slate-100 text-sm font-medium text-slate-600"
            >
              {t('workbench.marketingDialog.chooseConversation')}
            </Button>
            <Button
              type="button"
              onClick={() => {
                onOpenChange(false)
                navigate('/workbench', { state: { activeTab: 'agent' } })
              }}
              className="h-12 rounded-xl bg-[#0f4cc8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
            >
              {t('workbench.marketingDialog.useAgent')}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function DataAnalysisDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const prompts = [0, 1].map((index) => ({
    label: t(`workbench.dataAnalysisDialog.prompts.${index}.label`),
    body: t(`workbench.dataAnalysisDialog.prompts.${index}.body`),
  }))

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px]" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[560px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.22)] outline-none"
          initialFocus={false}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f9f4de] text-xl text-[#b89b22]">
                📈
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-slate-900">
                  {t('workbench.dataAnalysisDialog.title')}
                </Dialog.Title>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <UserIcon />
                    {t('workbench.dataAnalysisDialog.author')}
                  </span>
                  <span className="h-4 w-px bg-slate-200" />
                  <span className="flex items-center gap-1.5">
                    <ClockIcon />
                    {t('workbench.dataAnalysisDialog.date')}
                  </span>
                </div>
              </div>
            </div>
            <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              <CloseIcon />
            </Dialog.Close>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-600">{t('workbench.dataAnalysisDialog.desc')}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-900">{t('workbench.dataAnalysisDialog.examplesTitle')}</p>
            <div className="mt-3 space-y-3">
              {prompts.map((prompt, index) => (
                <button
                  key={prompt.body}
                  type="button"
                  onClick={() => {
                    if (index === 0) {
                      navigate('/home')
                      return
                    }
                    navigate('/workbench', { state: { activeTab: 'agent' } })
                  }}
                  className="flex w-full items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white px-3 py-3 text-left transition hover:border-[#c9d7f8] hover:bg-[#f8faff]"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-700">{prompt.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-400">{prompt.body}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-slate-500">
                    {t('workbench.dataAnalysisDialog.try')}
                    <ChevronRightIcon />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <Button
              type="button"
              onClick={() => {
                onOpenChange(false)
                navigate('/home')
              }}
              className="h-12 rounded-xl bg-slate-100 text-sm font-medium text-slate-600"
            >
              {t('workbench.dataAnalysisDialog.chooseConversation')}
            </Button>
            <Button
              type="button"
              onClick={() => {
                onOpenChange(false)
                navigate('/workbench', { state: { activeTab: 'agent' } })
              }}
              className="h-12 rounded-xl bg-[#0f4cc8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
            >
              {t('workbench.dataAnalysisDialog.useAgent')}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function DailyWorkTab() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { dailyWorkCards, web3Cards } = createWorkbenchData(t)
  const [websiteDialogOpen, setWebsiteDialogOpen] = useState(false)
  const [marketingDialogOpen, setMarketingDialogOpen] = useState(false)
  const [dataAnalysisDialogOpen, setDataAnalysisDialogOpen] = useState(false)

  return (
    <div className="space-y-12">
      <WebsiteSkillDialog open={websiteDialogOpen} onOpenChange={setWebsiteDialogOpen} />
      <MarketingCopyDialog open={marketingDialogOpen} onOpenChange={setMarketingDialogOpen} />
      <DataAnalysisDialog open={dataAnalysisDialogOpen} onOpenChange={setDataAnalysisDialogOpen} />

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{t('workbench.daily.title')}</h2>
            <p className="mt-2 text-sm text-slate-500">{t('workbench.daily.subtitle')}</p>
          </div>
          <Button type="button" className="text-sm font-semibold text-[#0f4cc8]">
            {t('workbench.daily.viewAll')}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          {dailyWorkCards.map((card, index) => (
                <SkillCard
                  key={card.title}
                  {...card}
                  onUseSkill={
                    index === 0
                      ? () => setWebsiteDialogOpen(true)
                      : index === 1
                        ? () => navigate('/workbench/poster-skill')
                      : index === 2
                        ? () => setMarketingDialogOpen(true)
                      : index === 3
                        ? () => setDataAnalysisDialogOpen(true)
                        : undefined
                  }
                />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{t('workbench.daily.web3Title')}</h2>
            <p className="mt-2 text-sm text-slate-500">{t('workbench.daily.web3Subtitle')}</p>
          </div>
          <span className="text-sm text-slate-300">{t('workbench.daily.beta')}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {web3Cards.map((card) => (
            <SkillCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </div>
  )
}
