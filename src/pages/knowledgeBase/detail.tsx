import { Button } from '@base-ui/react/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'

type RowKind = 'folder' | 'doc' | 'img' | 'pdf' | 'page' | 'sheet'

type KnowledgeRow = {
  name: string
  owner: string
  location: string
  recent: string
  icon: RowKind
}

const rows: KnowledgeRow[] = [
  { name: '🤓🚗和 Agent 一起用资料库...', owner: 'vickymzzhou', location: '团队空间', recent: '12分钟前', icon: 'folder' },
  { name: '🤓🚗和 Agent 一起用资料库...', owner: 'vickymzzhou', location: '团队空间', recent: '12分钟前', icon: 'doc' },
  { name: '背景', owner: 'vickymzzhou', location: '我的资料', recent: '40分钟前', icon: 'img' },
  { name: '💗使用资料库搭建个人和团...', owner: 'vickymzzhou', location: '团队空间', recent: '40分钟前', icon: 'pdf' },
  { name: '资料库新手教程', owner: 'vickymzzhou', location: '我的资料', recent: '40分钟前', icon: 'page' },
  { name: '让人和 AI 在同一份文档里自...', owner: 'vickymzzhou', location: '我的资料', recent: '1小时前', icon: 'sheet' },
]

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FileBadge({ kind }: { kind: RowKind }) {
  const styles: Record<RowKind, string> = {
    folder: 'bg-[#169bff] text-white',
    doc: 'bg-[#4d86ff] text-white',
    img: 'bg-[#5b8def] text-white',
    pdf: 'bg-[#ff9c9c] text-white',
    page: 'bg-[#35c1d8] text-white',
    sheet: 'bg-[#18c26b] text-white',
  }

  const labels: Record<RowKind, string> = {
    folder: '▣',
    doc: 'W',
    img: '▣',
    pdf: 'PDF',
    page: '◫',
    sheet: 'XLS',
  }

  return (
    <span className={`flex h-5 w-5 items-center justify-center rounded-sm text-[9px] font-semibold ${styles[kind]}`}>
      {labels[kind]}
    </span>
  )
}

function DetailBanner() {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl border border-slate-100 bg-[linear-gradient(135deg,#f0e8ff_0%,#eef2ff_40%,#f2fff4_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.78),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.65),transparent_20%),radial-gradient(circle_at_10%_90%,rgba(255,255,255,0.55),transparent_18%)]" />
      <div className="absolute left-8 top-7 max-w-[520px]">
        <h3 className="text-5xl font-black tracking-tight text-slate-900">从超级个体到超级团队</h3>
        <p className="mt-3 text-xl text-slate-700">让每次产出，都成为下一次协作的开始</p>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-end gap-5">
        {[
          '任务里的产物',
          '存进资料库',
          '和 Agent 持续协同',
          '团队协作和复用',
        ].map((label, index) => (
          <div
            key={label}
            className="flex h-[150px] w-[160px] flex-col items-center justify-between rounded-2xl border border-white/80 bg-white/75 p-4 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur"
          >
            <div className="flex h-24 w-full items-center justify-center rounded-xl bg-[linear-gradient(180deg,#f7f8ff_0%,#eef2ff_100%)]">
              <span className="text-4xl">{index + 1}</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function KnowledgeBaseDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedItem = (location.state as { item?: KnowledgeRow } | null)?.item ?? rows[0]

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <BackIcon />
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">知识库</h1>
          </div>

          <div className="mt-8 grid grid-cols-[340px_minmax(0,1fr)] gap-8">
            <div className="space-y-2">
              {rows.map((row) => {
                const active = row.name === selectedItem.name
                return (
                  <button
                    key={`${row.name}-${row.icon}`}
                    type="button"
                    onClick={() => navigate('/knowledge-base/detail', { state: { item: row } })}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                      active ? 'bg-slate-100' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-slate-400">⌄</span>
                    <FileBadge kind={row.icon} />
                    <span className="min-w-0 truncate text-sm font-medium text-slate-900">{row.name}</span>
                  </button>
                )
              })}
            </div>

            <article className="space-y-7">
              <div>
                <h2 className="text-[34px] font-semibold tracking-tight text-slate-900">{selectedItem.name.replace('...', '') || '🤓🚗和 Agent 一起用知识库'}</h2>
                <div className="mt-5 space-y-3 text-base leading-8 text-slate-600">
                  <p className="font-semibold text-slate-900">🎉Agency 知识库全新升级 🎉</p>
                  <p>这一次，知识库不只是“存得下”。</p>
                  <p>你和 Agent 一起做的产物存进来，然后和 Agent 一起协同编辑；</p>
                  <p>挪进团队空间，同事和 Agent 也能在同一份内容上持续协同。</p>
                </div>
              </div>

              <DetailBanner />

              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900">第一步｜把成果存下来</h3>
                <div className="mt-4 space-y-3 text-base leading-8 text-slate-600">
                  <p>知识库里的「我的文档」，是你的个人空间，也是你和 Agent 共同产物的默认落脚点。</p>
                  <p>你可以自己新建、整理内容，也可以让 Agent 把会话里的成果直接存进来。</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      <span className="font-semibold text-slate-900">和 Agent 一起完成的文档或网页：</span>
                      直接说“把刚才这份内容存到资料库”。
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">已经生成、准备发给别人看的内容：</span>
                      点击“分享 → 以链接形式分享”，分享和保存一次完成。
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}
