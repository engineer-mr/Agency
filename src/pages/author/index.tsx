import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'
import { Input } from '@base-ui/react/input'
import { Popover } from '@base-ui/react/popover'
import { type ReactNode, useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { useI18n } from '../../i18n'

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 12 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CardIcon({ tone }: { tone: 'blue' | 'purple' | 'orange' | 'gray' }) {
  const classes = {
    blue: 'bg-[#eff3fb] text-[#0f4cc8]',
    purple: 'bg-[#f3ecff] text-[#8c6ade]',
    orange: 'bg-[#fff1e8] text-[#f28a4b]',
    gray: 'bg-[#f3f4f6] text-[#64748b]',
  }[tone]

  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${classes}`}>
      <CheckIcon />
    </div>
  )
}

function SectionCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string
  subtitle: string
  action?: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
        {action ? (
          <Button type="button" className="text-sm font-semibold text-[#0f4cc8]">
            {action}
          </Button>
        ) : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  )
}

function SettingRow({
  iconTone,
  title,
  desc,
  right,
}: {
  iconTone: 'blue' | 'purple' | 'orange' | 'gray'
  title: string
  desc: string
  right: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl py-5">
      <div className="flex min-w-0 items-center gap-4">
        <CardIcon tone={iconTone} />
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500">{right}</div>
    </div>
  )
}

function LanguageSelector({
  language,
  onChange,
}: {
  language: 'zh' | 'en'
  onChange: (language: 'zh' | 'en') => void
}) {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  const options = [
    { value: 'zh' as const, label: t('author.languageOptions.zh'), icon: '🇨🇳' },
    { value: 'en' as const, label: t('author.languageOptions.en'), icon: '🇺🇸' },
  ]

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
        render={
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-700"
          >
            <span>{language === 'zh' ? t('author.languageSelector.zh') : t('author.languageSelector.en')}</span>
            <ChevronRightIcon />
          </button>
        }
      />
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={10}>
          <Popover.Popup className="w-[156px] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.12)] outline-none">
            {options.map((option) => {
              const active = language === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                    active ? 'bg-slate-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base leading-none">{option.icon}</span>
                  <span className="flex-1">{option.label}</span>
                  {active ? <span className="text-xs font-semibold text-[#0f4cc8]">✓</span> : null}
                </button>
              )
            })}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default function AuthorPage() {
  const { t, language, setLanguage } = useI18n()
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [name, setName] = useState(t('author.profile.name'))
  const [email, setEmail] = useState('fool87664@163.com')

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <Dialog.Root open={editProfileOpen} onOpenChange={setEditProfileOpen} modal>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-40 bg-slate-900/30" />
          <Dialog.Popup
            className="fixed left-1/2 top-1/2 z-50 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.22)] outline-none"
            initialFocus={false}
          >
            <div className="flex items-start justify-between gap-4">
              <Dialog.Title className="text-base font-semibold text-slate-900">{t('author.editProfile.title')}</Dialog.Title>
              <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </Dialog.Close>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-900">{t('author.editProfile.name')}</span>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-300 focus:border-[#0f4cc8]"
                  placeholder={t('author.editProfile.namePlaceholder')}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-900">{t('author.editProfile.email')}</span>
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-300 focus:border-[#0f4cc8]"
                  placeholder={t('author.editProfile.emailPlaceholder')}
                  type="email"
                />
              </label>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={() => setEditProfileOpen(false)}
                className="h-11 rounded-xl bg-slate-100 text-sm font-semibold text-slate-600"
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="button"
                onClick={() => setEditProfileOpen(false)}
                className="h-11 rounded-xl bg-[#0f4cc8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
              >
                {t('common.confirm')}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-[#0f4cc8]">{t('author.eyebrow')}</p>
              <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">{t('author.title')}</h1>
              <p className="mt-4 text-sm text-slate-500">{t('author.subtitle')}</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#334e7f] text-lg font-semibold text-white">
              J
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 xl:grid-cols-[1.1fr_1fr_1fr]">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef876d] text-lg font-semibold text-white">
                  J
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-slate-900">{name}</span>
                    <span className="text-sm text-slate-400">
                      {t('author.profile.workspace')} · {t('author.profile.plan')}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => setEditProfileOpen(true)}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {t('common.edit')}
              </Button>
            </div>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition hover:border-[#c9d7f8] hover:bg-[#f8faff]"
            >
              <p className="text-sm text-slate-500">通知偏好</p>
              <div className="mt-2 flex items-center gap-2 text-base font-semibold text-slate-900">
                已开启
                <ChevronRightIcon />
              </div>
            </button>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition hover:border-[#c9d7f8] hover:bg-[#f8faff]"
            >
              <p className="text-sm text-slate-500">默认模型</p>
              <div className="mt-2 flex items-center gap-2 text-base font-semibold text-slate-900">
                自动选择
                <ChevronRightIcon />
              </div>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <SectionCard title={t('author.preferences.title')} subtitle={t('author.preferences.subtitle')} action={t('common.edit')}>
              <SettingRow
                iconTone="blue"
                title={t('author.preferences.defaultModel')}
                desc={t('author.preferences.defaultModelDesc')}
                right={
                  <>
                    {t('common.all')}
                    <ChevronRightIcon />
                  </>
                }
              />
              <div className="h-px bg-slate-100" />
              <SettingRow
                iconTone="purple"
                title={t('author.preferences.language')}
                desc={t('author.preferences.languageDesc')}
                right={<LanguageSelector language={language} onChange={setLanguage} />}
              />
              <div className="h-px bg-slate-100" />
              <SettingRow
                iconTone="orange"
                title={t('author.preferences.appearance')}
                desc={t('author.preferences.appearanceDesc')}
                right={
                  <>
                    {t('author.preferences.appearanceValue')}
                    <ChevronRightIcon />
                  </>
                }
              />
            </SectionCard>

            <SectionCard title={t('author.security.title')} subtitle={t('author.security.subtitle')} action={t('common.manage')}>
              <SettingRow
                iconTone="gray"
                title={t('author.security.emailVerified')}
                desc={t('author.security.emailVerifiedDesc')}
                right={<span className="text-slate-500">{t('author.security.completed')}</span>}
              />
              <div className="h-px bg-slate-100" />
              <SettingRow
                iconTone="gray"
                title={t('author.security.loginProtection')}
                desc={t('author.security.loginProtectionDesc')}
                right={
                  <span className="font-semibold text-[#0f4cc8]">
                    {t('author.security.goSettings')}
                    <ChevronRightIcon />
                  </span>
                }
              />
              <div className="h-px bg-slate-100" />
              <SettingRow
                iconTone="gray"
                title={t('author.security.activeDevices')}
                desc={t('author.security.activeDevicesDesc')}
                right={
                  <span className="text-slate-500">
                    {t('author.security.view')}
                    <ChevronRightIcon />
                  </span>
                }
              />
            </SectionCard>
          </div>

          <section className="mt-4 rounded-2xl bg-[#eef3ff] px-5 py-5 shadow-sm">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-[0.26em] text-[#0f4cc8]">CURRENT PLAN</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{t('author.plan.title')}</h2>
                <p className="mt-2 text-sm text-slate-500">{t('author.plan.subtitle')}</p>
              </div>

              <div className="flex-1 px-6 pt-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{t('author.plan.usageLabel')}</span>
                  <span className="text-lg font-semibold text-[#0f4cc8]">{t('author.plan.usageValue')}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white">
                  <div className="h-2 w-[42%] rounded-full bg-[#0f4cc8]" />
                </div>
                <p className="mt-2 text-sm text-slate-500">{t('author.plan.usageDetail')}</p>
              </div>

              <Button
                type="button"
                className="mt-6 rounded-xl flex items-center bg-[#0f4cc8] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
              >
                {t('author.plan.manage')} <ChevronRightIcon />
              </Button>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
