import { Button } from '@base-ui/react/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'

function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const className =
    size === 'sm'
      ? 'flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f4cc8] text-white'
      : 'flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f4cc8] text-white'

  return (
    <div className={className}>
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 3.2 14.5 9.5 20.8 12 14.5 14.5 12 20.8 9.5 14.5 3.2 12 9.5 9.5 12 3.2Z" />
      </svg>
    </div>
  )
}

function Icon({ name }: { name: 'spark' | 'chart' | 'book' | 'grid' | 'cube' | 'user' | 'link' }) {
  const paths = {
    spark: <path d="m12 3 2.2 6 5.8 2-5.8 2-2.2 6-2.2-6-5.8-2 5.8-2L12 3Z" />,
    chart: <path d="M4 17h16M6 13l3-3 3 2 5-6M6 7h2v2H6zM16 15h2v2h-2z" />,
    book: <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H19v17H8.5A3.5 3.5 0 0 0 5 22V5.5Zm0 0A3.5 3.5 0 0 1 8.5 9H19" />,
    grid: <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />,
    cube: <path d="m12 3 7 4v8l-7 4-7-4V7l7-4Zm0 0v8m7-4-7 4-7-4" />,
    user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
    link: <path d="M10 13a5 5 0 0 0 7.1 0l1.4-1.4a5 5 0 1 0-7.1-7.1L10.6 5M14 11a5 5 0 0 0-7.1 0l-1.4 1.4a5 5 0 1 0 7.1 7.1l.8-.8" />,
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const primaryNav = [
  { label: 'sidebar.nav.smartAssistant', icon: 'spark', path: '/' },
  { label: 'sidebar.nav.workbench', icon: 'chart', path: '/workbench' },
  { label: 'sidebar.nav.knowledgeBase', icon: 'book', path: '/knowledge-base' },
  { label: 'sidebar.nav.project', icon: 'grid', path: '/project' },
  { label: 'sidebar.nav.quantxAgent', icon: 'cube', path: '/quantx-agent' },
] as const

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const isActivePath = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path))

  return (
    <aside className="flex h-screen w-[248px] shrink-0 flex-col border-r border-slate-200 bg-white px-[18px] py-7">
      <div className="flex items-center gap-3 px-3">
        <BrandMark size="sm" />
        <span className="text-xl font-semibold tracking-tight text-slate-900">{t('common.appName')}</span>
      </div>

      <Button
        type="button"
        onClick={() => navigate('/plan')}
        className={`mt-8 flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition ${
          isActivePath('/plan') ? 'border-[#cfd7f7] bg-[#f0f4fc]' : 'hover:bg-slate-50'
        }`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ef876d] text-sm font-semibold text-white">
          S
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-slate-900">{t('sidebar.workspaceTitle')}</span>
          <span className="block text-xs text-slate-500">{t('sidebar.workspaceSubtitle')}</span>
        </span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>

      <nav className="mt-7 space-y-2">
        {primaryNav.map((item) => (
          <Button
            key={item.label}
          type="button"
          onClick={() => {
            if (item.path) navigate(item.path)
            }}
            className={`flex h-12 w-full items-center gap-3 rounded-lg px-4 text-sm font-medium transition ${
              item.path && isActivePath(item.path)
                ? 'bg-[#f0f4fc] text-[#0f4cc8]'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
            >
            <Icon name={item.icon} />
            {t(item.label)}
          </Button>
        ))}
      </nav>

      <div className="mt-auto space-y-3 pb-7">
        <Button
          type="button"
          onClick={() => navigate('/author')}
          className={`flex h-11 w-full items-center gap-3 rounded-lg px-4 text-sm font-medium transition ${
            isActivePath('/author')
              ? 'bg-[#f0f4fc] text-[#0f4cc8]'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Icon name="user" />
          {t('sidebar.nav.personalCenter')}
        </Button>
        <Button
          type="button"
          onClick={() => navigate('/connection-center')}
          className={`flex h-11 w-full items-center gap-3 rounded-lg px-4 text-sm font-medium transition ${
            isActivePath('/connection-center')
              ? 'bg-[#f0f4fc] text-[#0f4cc8]'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Icon name="link" />
          {t('sidebar.nav.connectionCenter')}
        </Button>

        <div className="border-t border-slate-200 pt-5">
          <Button
            type="button"
            onClick={() => navigate('/plan')}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition ${
              isActivePath('/plan') ? 'bg-[#f0f4fc]' : 'hover:bg-slate-50'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#0f4cc8]" />
            <span className="min-w-0 flex-1">
              <span className={`block text-sm font-semibold ${isActivePath('/plan') ? 'text-[#0f4cc8]' : 'text-slate-900'}`}>
                {t('sidebar.planCard.title')}
              </span>
              <span className="block text-xs text-slate-500">{t('sidebar.planCard.usage')}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      </div>
    </aside>
  )
}
