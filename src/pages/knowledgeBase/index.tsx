import { useState } from 'react'
import { Button } from '@base-ui/react/button'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'

type ViewKey = 'recent' | 'mine' | 'team' | 'shared'
type RowKind = 'folder' | 'doc' | 'img' | 'pdf' | 'page' | 'sheet'

const topTabs: Array<{ key: ViewKey; label: string }> = [
  { key: 'recent', label: '最近' },
  { key: 'mine', label: '我的资料' },
  { key: 'team', label: '团队资料' },
  { key: 'shared', label: '与我共享' },
]

const recentFilters = ['最近访问', '我分享的', '与我共享'] as const
const myFilters = ['全部', '文档', '网页', '数据库'] as const

const recentRows: Array<{ name: string; owner: string; location: string; recent: string; icon: RowKind }> = [
  { name: '🤓🚗和 Agent 一起用资料库...', owner: 'vickymzzhou', location: '团队空间', recent: '12分钟前', icon: 'folder' },
  { name: '🤓🚗和 Agent 一起用资料库...', owner: 'vickymzzhou', location: '团队空间', recent: '12分钟前', icon: 'doc' },
  { name: '背景', owner: 'vickymzzhou', location: '我的资料', recent: '40分钟前', icon: 'img' },
  { name: '💗使用资料库搭建个人和团...', owner: 'vickymzzhou', location: '团队空间', recent: '40分钟前', icon: 'pdf' },
  { name: '资料库新手教程', owner: 'vickymzzhou', location: '我的资料', recent: '40分钟前', icon: 'page' },
  { name: '让人和 AI 在同一份文档里自...', owner: 'vickymzzhou', location: '我的资料', recent: '1小时前', icon: 'sheet' },
] as const

const libraryRows: Array<{ name: string; owner: string; location: string; recent: string; icon: RowKind }> = [
  { name: '品牌手册', owner: 'vickymzzhou', location: '我的资料', recent: '12分钟前', icon: 'folder' },
  { name: '产品发布说明', owner: 'vickymzzhou', location: '我的资料', recent: '12分钟前', icon: 'doc' },
  { name: '视觉素材', owner: 'vickymzzhou', location: '我的资料', recent: '40分钟前', icon: 'img' },
  { name: '团队协作指南', owner: 'vickymzzhou', location: '我的资料', recent: '40分钟前', icon: 'pdf' },
  { name: '知识库新手教程', owner: 'vickymzzhou', location: '我的资料', recent: '40分钟前', icon: 'page' },
  { name: '项目清单', owner: 'vickymzzhou', location: '我的资料', recent: '1小时前', icon: 'sheet' },
] as const

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
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

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 16V4" strokeLinecap="round" />
      <path d="m7 9 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20h14" strokeLinecap="round" />
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

function TableFrame({
  title,
  showUpload,
  actionLabel,
  actionIcon,
  filters,
  rows,
  activeFilter,
  onFilterChange,
  onRowClick,
}: {
  title: string
  showUpload: boolean
  actionLabel: string
  actionIcon: 'upload' | 'plus'
  filters: readonly string[]
  rows: readonly { name: string; owner: string; location: string; recent: string; icon: RowKind }[]
  activeFilter: string
  onFilterChange: (value: string) => void
  onRowClick: (row: { name: string; owner: string; location: string; recent: string; icon: RowKind }) => void
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {showUpload ? (
          <Button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-[#0f4cc8] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123fa4]"
          >
            {actionIcon === 'upload' ? <UploadIcon /> : <PlusIcon />}
            {actionLabel}
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-500">按类型浏览</span>
        {filters.map((item) => {
          const active = item === activeFilter
          return (
            <Button
              key={item}
              type="button"
              onClick={() => onFilterChange(item)}
              className={`rounded-full border px-4 py-2 text-sm ${
                active
                  ? 'border-[#d6dff8] bg-[#eef2fb] font-semibold text-[#0f4cc8]'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              {item}
            </Button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left text-sm font-medium text-slate-500">
              <th className="px-5 py-4">名称</th>
              <th className="px-5 py-4">所有者</th>
              <th className="px-5 py-4">位置</th>
              <th className="px-5 py-4 text-right">最近访问</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                onClick={() => onRowClick(row)}
                className="cursor-pointer border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <FileBadge kind={row.icon} />
                    <span className="truncate text-sm font-medium text-slate-900">{row.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">{row.owner}</td>
                <td className="px-5 py-4 text-sm text-slate-500">{row.location}</td>
                <td className="px-5 py-4 text-right text-sm text-slate-500">{row.recent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function KnowledgeBasePage() {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState<ViewKey>('recent')
  const [recentFilter, setRecentFilter] = useState('最近访问')
  const [libraryFilter, setLibraryFilter] = useState('全部')

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-8">
        <section className="mx-auto w-full max-w-[1250px]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-[#0f4cc8]">KNOWLEDGE BASE</p>
              <h1 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-900">知识库</h1>
            </div>

            <label className="flex h-11 w-[180px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-500 shadow-sm">
              <SearchIcon />
              <input
                type="text"
                placeholder="搜索项目"
                className="w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-slate-400"
              />
            </label>
          </div>

          <div className="mt-8 flex items-center gap-8 border-b border-slate-200 text-base font-medium text-slate-500">
            {topTabs.map((tab) => {
              const active = tab.key === activeView
              return (
                <Button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveView(tab.key)}
                  className={`relative -mb-px border-b-2 px-0 py-3 text-base font-medium transition ${
                    active
                      ? 'border-[#0f4cc8] text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </Button>
              )
            })}
          </div>

          <div className="pt-8">
            {activeView === 'recent' ? (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">最近访问</h2>
                  <button type="button" className="flex items-center gap-1 text-sm text-slate-500">
                    全部类型
                    <ChevronDownIcon />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-slate-500">按类型浏览</span>
                  {recentFilters.map((item) => {
                    const active = item === recentFilter
                    return (
                      <Button
                        key={item}
                        type="button"
                        onClick={() => setRecentFilter(item)}
                        className={`rounded-full border px-4 py-2 text-sm ${
                          active
                            ? 'border-[#d6dff8] bg-[#eef2fb] font-semibold text-[#0f4cc8]'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {item}
                      </Button>
                    )
                  })}
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <table className="w-full table-fixed border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-left text-sm font-medium text-slate-500">
                        <th className="px-5 py-4">名称</th>
                        <th className="px-5 py-4">所有者</th>
                        <th className="px-5 py-4">位置</th>
                        <th className="px-5 py-4 text-right">最近访问</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRows.map((row) => (
                        <tr
                          key={row.name}
                          onClick={() => navigate('/knowledge-base/detail', { state: { item: row } })}
                          className="cursor-pointer border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                        >
                          <td className="px-5 py-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <FileBadge kind={row.icon} />
                              <span className="truncate text-sm font-medium text-slate-900">{row.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-500">{row.owner}</td>
                          <td className="px-5 py-4 text-sm text-slate-500">{row.location}</td>
                          <td className="px-5 py-4 text-right text-sm text-slate-500">{row.recent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : (
              <TableFrame
                title={topTabs.find((tab) => tab.key === activeView)?.label ?? '我的资料'}
                showUpload
                actionLabel={activeView === 'mine' ? '上传文件' : '新建空间'}
                actionIcon={activeView === 'mine' ? 'upload' : 'plus'}
                filters={myFilters}
                rows={libraryRows}
                activeFilter={libraryFilter}
                onFilterChange={setLibraryFilter}
                onRowClick={(row) => navigate('/knowledge-base/detail', { state: { item: row } })}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
