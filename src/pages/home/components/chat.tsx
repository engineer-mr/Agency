import { Button } from '@base-ui/react/button'
import { Sidebar } from '../../../components/Sidebar'
import { useI18n } from '../../../i18n'

function SparkIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3.2 14.5 9.5 20.8 12 14.5 14.5 12 20.8 9.5 14.5 3.2 12 9.5 9.5 12 3.2Z" />
    </svg>
  )
}

function ChatBubble({ children, align = 'left' }: { children: string; align?: 'left' | 'right' }) {
  const wrapper =
    align === 'right' ? 'ml-auto rounded-2xl border border-slate-200 bg-white' : 'rounded-2xl bg-transparent'

  return <div className={`${wrapper} max-w-[620px] px-4 py-2 text-sm leading-6 text-slate-500`}>{children}</div>
}

export function ChatPage({ onBack }: { onBack: () => void }) {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />
      <main className="min-w-0 flex-1 px-8 py-[40px]">
        <div className="mx-auto flex w-full max-w-[880px] flex-col">
          <Button
            type="button"
            onClick={onBack}
            className="flex w-fit items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-slate-950"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            {t('home.chatBack')}
          </Button>

          <div className="mt-8 flex flex-col gap-6 px-4">
            <ChatBubble align="right">{t('home.chat.user')}</ChatBubble>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f4cc8] text-white">
                <SparkIcon />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{t('home.chat.assistantName')}</span>
                  <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                    {t('home.chat.assistantBadge')}
                  </span>
                </div>
                <div className="mt-3 max-w-[690px] space-y-3 text-[15px] leading-7 text-slate-500">
                  <p>
                    {t('home.chat.intro')}
                  </p>
                  <p className="text-sm text-slate-400">{t('home.chat.loadedTools')}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{t('home.chat.h1')}</h3>
                  <p>{t('home.chat.h1Body')}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{t('home.chat.h2')}</h3>
                  <p>{t('home.chat.h2Body')}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{t('home.chat.h3')}</h3>
                  <ul className="space-y-1">
                    {[0, 1, 2, 3].map((index) => (
                      <li key={index}>{t(`home.chat.list.${index}`)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-lg border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <textarea
              className="h-28 w-full resize-none rounded-t-lg border-0 bg-transparent px-5 py-4 text-base text-slate-800 outline-none placeholder:text-slate-300"
              placeholder={t('home.chat.placeholder')}
            />
            <div className="flex min-h-[70px] items-center justify-between border-t border-slate-200 px-5">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#0f4cc8] transition hover:bg-blue-50"
                  aria-label={t('home.chat.context')}
                >
                  <span className="text-[34px] font-light leading-none">+</span>
                </Button>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                  >
                    {t('home.chat.suggestions.site')}
                  </Button>
                  <Button
                    type="button"
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                  >
                    {t('home.chat.suggestions.poster')}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  className="flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-800"
                >
                  {t('home.modelSelect')}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
                <Button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f4cc8] text-white shadow-sm transition hover:bg-[#123fa4]"
                  aria-label={t('home.chat.send')}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M20.5 3.5 3.8 10.3c-1.1.5-1 2.1.2 2.4l6.6 1.7 1.7 6.6c.3 1.2 1.9 1.3 2.4.2l6.8-16.7c.3-.7-.3-1.3-1-1Z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
