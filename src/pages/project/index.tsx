import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'
import { Popover } from '@base-ui/react/popover'
import { useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { useI18n } from '../../i18n'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12 3.2 14.5 9.5 20.8 12 14.5 14.5 12 20.8 9.5 14.5 3.2 12 9.5 9.5 12 3.2Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
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

function ProjectCard({
  title,
  desc,
  badge,
  tone,
}: {
  title: string
  desc: string
  badge: string
  tone: 'dark' | 'light'
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-lg text-xs font-semibold ${
          tone === 'dark' ? 'bg-[#1f2937] text-[#f6d15f]' : 'bg-[#eff3fb] text-[#0f4cc8]'
        }`}
      >
        {badge}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{desc}</p>
      </div>
      <Button type="button" className="text-slate-400 hover:text-[#0f4cc8]">
        <ArrowRightIcon />
      </Button>
    </div>
  )
}

const projectTones = ['dark', 'light'] as const
const templateColors = [
  'bg-[#eff3fb] text-[#0f4cc8]',
  'bg-[#fef0e6] text-[#f28a4b]',
  'bg-[#f3ecff] text-[#8c6ade]',
  'bg-[#f9f0d1] text-[#b89b22]',
] as const

function CreateProjectDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useI18n()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-slate-900/30 backdrop-blur-[1px]" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.22)] outline-none"
          initialFocus={false}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-slate-900">{t('project.createDialog.title')}</Dialog.Title>
            <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              <CloseIcon />
            </Dialog.Close>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <label className="font-medium text-slate-900">{t('project.createDialog.name')}</label>
                <span className="text-slate-400">0/15</span>
              </div>
              <input
                type="text"
                placeholder={t('project.createDialog.namePlaceholder')}
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-300 focus:border-[#0f4cc8]"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <label className="font-medium text-slate-900">{t('project.createDialog.instruction')}</label>
                <Button type="button" className="h-7 rounded-full bg-slate-100 px-3 text-xs text-slate-500 flex items-center justify-center">
                  {t('project.createDialog.template')}
                  <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
  <path d="M4.50053 3.00053L1.49982 -8.94387e-08L5.36651e-08 1.49974L4.49947 6L9 1.49974L7.50018 -1.78852e-08L4.49947 3.00053L4.50053 3.00053Z" fill="#68717D"/>
</svg>
                </Button>
              </div>
              <textarea
                className="h-24 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm leading-6 outline-none placeholder:text-slate-300 focus:border-[#0f4cc8]"
                placeholder={t('project.instructionPlaceholder')}
              />
            </div>

            {[
              { label: t('project.createDialog.connectors') },
              { label: t('project.createDialog.experts') },
              { label: t('project.createDialog.skills') },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <span className="font-medium text-slate-900">{item.label}</span>
                <button type="button" className="flex items-center gap-1 text-slate-500">
                  <PlusIcon />
                  {t('project.createDialog.add')}
                </button>
              </div>
            ))}

            <p className="text-xs text-slate-400">{t('project.createDialog.warning')}</p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-10 rounded-xl bg-slate-100 text-sm font-medium text-slate-600"
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-10 rounded-xl bg-[#0f4cc8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
              >
                {t('common.confirm')}
              </Button>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function TemplateSelectionDialog({
  open,
  onOpenChange,
  title,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
}) {
  const { t } = useI18n()
  const options = Array.from({ length: 5 }, () => t('project.templateDialog.optionName'))

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-slate-900/30 backdrop-blur-[1px]" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.22)] outline-none"
          initialFocus={false}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-slate-900">{t('project.templateDialog.title')}</Dialog.Title>
            <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              <CloseIcon />
            </Dialog.Close>
          </div>

          <p className="mt-2 rounded-md border border-[#0f4cc8] px-3 py-2 text-sm text-slate-500">
            {t('project.templateDialog.body')}
          </p>
          <p className="mt-2 text-xs text-slate-400">{t('project.templateDialog.currentTemplate', { title })}</p>

          <div className="mt-4 space-y-2">
            {options.map((option, index) => (
              <button
                key={`${option}-${index}`}
                type="button"
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                  index === 0 ? 'border-slate-200 bg-slate-50' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="flex min-w-0 items-center gap-3 pr-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                    K
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-900">{option}</span>
                    <span className="block truncate text-xs text-slate-500">
                      {t('project.templateDialog.optionDesc')}
                    </span>
                  </span>
                </span>
                <span
                  className={`flex h-5 w-5 min-w-5 items-center justify-center rounded-full border ${
                    index === 0 ? 'border-[#0f4cc8] bg-[#0f4cc8] text-white' : 'border-slate-300 bg-white text-transparent'
                  }`}
                >
                  ✓
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-10 w-full rounded-xl bg-[#0f4cc8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
            >
              {t('project.templateDialog.complete')}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function TemplateCard({
  title,
  desc,
  color,
  onClick,
}: {
  title: string
  desc: string
  color: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[72px] items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#c9d7f8] hover:bg-[#f8faff]"
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          <StarIcon />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{desc}</p>
        </div>
      </div>
      <ArrowRightIcon />
    </button>
  )
}

export default function ProjectPage() {
  const { t } = useI18n()
  const projectItems = projectTones.map((tone, index) => ({
    title: t(`project.projectItems.${index}.title`),
    desc: t(`project.projectItems.${index}.desc`),
    badge: t(`project.projectItems.${index}.badge`),
    tone,
    status: t(`project.projectItems.${index}.status`),
  }))
  const templateItems = templateColors.map((color, index) => ({
    title: t(`project.templateItems.${index}.title`),
    desc: t(`project.templateItems.${index}.desc`),
    color,
  }))
  const [menuOpen, setMenuOpen] = useState(false)
  const [createProjectOpen, setCreateProjectOpen] = useState(false)
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<string>(t('project.templateItems.0.title'))

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />
      <CreateProjectDialog open={createProjectOpen} onOpenChange={setCreateProjectOpen} />
      <TemplateSelectionDialog
        open={templateDialogOpen}
        onOpenChange={setTemplateDialogOpen}
        title={activeTemplate}
      />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-[#0f4cc8]">PROJECT SPACE</p>
              <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">{t('project.title')}</h1>
              <p className="mt-4 text-sm text-slate-500">{t('project.subtitle')}</p>
            </div>

            <Button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f6fd] text-[#0f4cc8] shadow-sm"
            >
              <StarIcon />
            </Button>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-100 bg-[#eef3ff] px-6 py-6 shadow-sm">
            <div className="flex items-start justify-between gap-8">
              <div className="max-w-[620px]">
                <p className="text-xs font-bold tracking-[0.26em] text-[#0f4cc8]">{t('project.tipTag')}</p>
                <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-slate-900">
                  {t('project.tipTitle')}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {t('project.tipBody')}
                </p>
                <Button
                  type="button"
                  onClick={() => setCreateProjectOpen(true)}
                  className="mt-5 rounded-xl bg-[#0f4cc8] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
                >
                  {t('project.createProject')}
                </Button>
              </div>

              <div className="relative hidden h-[156px] w-[220px] shrink-0 xl:block">
                <div className="absolute left-10 top-0 h-[118px] w-[118px] rounded-full border border-[#b5ccff]" />
                <div className="absolute right-6 top-4 h-[112px] w-[112px] rounded-full border border-[#b5ccff]" />
                <div className="absolute left-16 top-8 h-[92px] w-[92px] rounded-full border border-[#b5ccff]" />
                <div className="absolute left-[88px] top-[46px] flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white">
                  S
                </div>
                <div className="absolute left-3 top-6 flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#0f4cc8] shadow-sm">
                  <StarIcon />
                </div>
                <div className="absolute right-2 top-[52px] flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#0f4cc8] shadow-sm">
                  <ArrowRightIcon />
                </div>
                <div className="absolute bottom-4 left-8 flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#f4a56d] shadow-sm">
                  ◫
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('project.myProjectsTitle')}</h2>
              <p className="mt-2 text-sm text-slate-500">{t('project.myProjectsSubtitle')}</p>
            </div>

            <label className="flex h-11 w-[180px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-500 shadow-sm">
              <SearchIcon />
              <input
                type="text"
                placeholder={t('project.searchPlaceholder')}
                className="w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-slate-400"
              />
            </label>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {projectItems.map((item, index) => (
              <div
                key={item.title}
                className={`relative px-5 py-5 ${index === 0 ? 'border-b border-slate-100' : ''}`}
              >
                <ProjectCard {...item} />

                {index === 0 ? (
                  <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
                    <Popover.Trigger
                      render={
                        <button
                          type="button"
                          className="absolute right-4 top-16 h-9 w-9 rounded-full text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                          aria-label={t('project.moreActions')}
                        >
                          ⋯
                        </button>
                      }
                    />
                    <Popover.Portal>
                      <Popover.Positioner side="bottom" align="end" sideOffset={10} alignOffset={0}>
                        <Popover.Popup className="w-[124px] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.12)] outline-none">
                          {[
                            t('project.menuItems.top'),
                            t('project.menuItems.share'),
                            t('project.menuItems.rename'),
                            t('project.menuItems.delete'),
                          ].map((menuItem, menuIndex) => (
                            <button
                              key={menuItem}
                              type="button"
                              onClick={() => setMenuOpen(false)}
                              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm ${
                                menuIndex === 3 ? 'text-red-500' : 'text-slate-600'
                              } hover:bg-slate-50`}
                            >
                              <span className="text-base">
                                {menuIndex === 0 ? '✦' : menuIndex === 1 ? '↗' : menuIndex === 2 ? '✎' : '🗑'}
                              </span>
                              {menuItem}
                            </button>
                          ))}
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('project.templatesTitle')}</h2>
              <p className="mt-2 text-sm text-slate-500">{t('project.templatesSubtitle')}</p>
            </div>

            <label className="flex h-11 w-[180px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-500 shadow-sm">
              <SearchIcon />
              <input
                type="text"
                placeholder={t('project.searchPlaceholder')}
                className="w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-slate-400"
              />
            </label>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-2">
            {templateItems.map((item) => (
              <TemplateCard
                key={item.title}
                title={item.title}
                desc={item.desc}
                color={item.color}
                onClick={() => {
                  setActiveTemplate(item.title)
                  setTemplateDialogOpen(true)
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
