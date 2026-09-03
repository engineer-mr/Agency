import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'
import { useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { useI18n } from '../../i18n'

type IMCard = {
  name: string
  desc: string
  badge?: string
  action: string
  tone: 'green' | 'blue' | 'purple'
}

function ToolIcon({ tone }: { tone: IMCard['tone'] }) {
  const classes = {
    green: 'bg-[#ebf9f0] text-[#22a45d]',
    blue: 'bg-[#edf5ff] text-[#3b82f6]',
    purple: 'bg-[#f1edff] text-[#6d5efc]',
  }[tone]

  return (
    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${classes}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5 8.5 8.5 0 0 0-8.5-8.5Zm-4 7.4a1 1 0 1 1 1.4-1.4 1 1 0 0 1-1.4 1.4Zm3.4 0a1 1 0 1 1 1.4-1.4 1 1 0 0 1-1.4 1.4Zm3.4 0a1 1 0 1 1 1.4-1.4 1 1 0 0 1-1.4 1.4Z" />
      </svg>
    </div>
  )
}

function QrCode() {
  const cells = [
    '111111100100111',
    '100000101000001',
    '101110101011101',
    '101110100010101',
    '101110101110101',
    '100000100100001',
    '111111101010111',
    '000000000100000',
    '101110100111101',
    '001000001000000',
    '111001111010111',
    '000100000100100',
    '110111101011011',
    '100000001000001',
    '111111101111111',
  ]

  return (
    <div
      className="grid h-[112px] w-[112px] gap-[2px] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
      style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}
    >
      {cells.flatMap((row, rowIndex) =>
        row.split('').map((cell, colIndex) => (
          <span
            key={`${rowIndex}-${colIndex}`}
            className={`block rounded-[1px] ${cell === '1' ? 'bg-slate-900' : 'bg-transparent'}`}
          />
        ))
      )}
    </div>
  )
}

function ConnectDialog({
  open,
  onOpenChange,
  title,
  actionLabel,
  toolName,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  actionLabel: string
  toolName: string
}) {
  const { t } = useI18n()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-slate-900/30" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.22)] outline-none"
          initialFocus={false}
        >
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="text-base font-semibold text-slate-900">{title}</Dialog.Title>
            <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>

          <div className="mt-6 flex flex-col items-center text-center">
            <QrCode />
            <p className="mt-5 text-sm font-medium text-slate-500">{t('connectionCenter.dialog.subtitle')}</p>
            <p className="mt-4 text-sm leading-7 text-slate-700">{t('connectionCenter.dialog.body', { toolName })}</p>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-left">
            <p className="text-sm font-medium text-slate-900">{actionLabel}</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">{t('connectionCenter.dialog.action')}</p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function IMCardItem({
  name,
  desc,
  badge,
  action,
  tone,
  onAction,
}: IMCard & { onAction: (name: string, action: string) => void }) {
  const { t } = useI18n()
  return (
    <article className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <ToolIcon tone={tone} />
        <Button
          type="button"
          onClick={() => onAction(name, action)}
          className="shrink-0 rounded-lg bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          {t(action)}
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[17px] font-semibold leading-6 text-slate-900">{t(name)}</h3>
          {badge ? (
            <span className="rounded-md bg-[#e9efff] px-1.5 py-0.5 text-[10px] font-semibold text-[#2d59d1]">
              {t(badge)}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-500">{t(desc)}</p>
      </div>
    </article>
  )
}

const imTools: IMCard[] = [
  {
    name: 'connectionCenter.tools.wechat.name',
    desc: 'connectionCenter.tools.wechat.desc',
    action: 'connectionCenter.tools.wechat.action',
    tone: 'green',
  },
  {
    name: 'connectionCenter.tools.whatsapp.name',
    desc: 'connectionCenter.tools.whatsapp.desc',
    badge: 'connectionCenter.tools.whatsapp.badge',
    action: 'connectionCenter.tools.whatsapp.action',
    tone: 'green',
  },
  {
    name: 'connectionCenter.tools.telegram.name',
    desc: 'connectionCenter.tools.telegram.desc',
    badge: 'connectionCenter.tools.telegram.badge',
    action: 'connectionCenter.tools.telegram.action',
    tone: 'blue',
  },
  {
    name: 'connectionCenter.tools.discord.name',
    desc: 'connectionCenter.tools.discord.desc',
    badge: 'connectionCenter.tools.discord.badge',
    action: 'connectionCenter.tools.discord.action',
    tone: 'purple',
  },
  {
    name: 'connectionCenter.tools.slack.name',
    desc: 'connectionCenter.tools.slack.desc',
    badge: 'connectionCenter.tools.slack.badge',
    action: 'connectionCenter.tools.slack.action',
    tone: 'blue',
  },
  {
    name: 'connectionCenter.tools.line.name',
    desc: 'connectionCenter.tools.line.desc',
    action: 'connectionCenter.tools.line.action',
    tone: 'green',
  },
  {
    name: 'connectionCenter.tools.lark.name',
    desc: 'connectionCenter.tools.lark.desc',
    badge: 'connectionCenter.tools.lark.badge',
    action: 'connectionCenter.tools.lark.action',
    tone: 'blue',
  },
]

export default function ConnectionCenterPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState('connectionCenter.tools.wechat.name')
  const [selectedAction, setSelectedAction] = useState('connectionCenter.tools.wechat.action')
  const { t } = useI18n()

  const handleAction = (name: string, action: string) => {
    setSelectedTool(name)
    setSelectedAction(action)
    setDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <ConnectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={t('connectionCenter.dialog.title')}
        actionLabel={t(selectedAction)}
        toolName={t(selectedTool)}
      />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#0f4cc8]">CONNECTION CENTER</p>
            <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">{t('connectionCenter.title')}</h1>
            <p className="mt-4 text-sm text-slate-500">{t('connectionCenter.subtitle')}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
            {imTools.map((item) => (
              <IMCardItem key={item.name} {...item} onAction={handleAction} />
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500">{t('connectionCenter.footer')}</p>
        </section>
      </main>
    </div>
  )
}
