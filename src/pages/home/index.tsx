import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Button } from '@base-ui/react/button'
import { Sidebar } from '../../components/Sidebar'
import { ChatPage } from './components/chat'

type Screen = 'home' | 'chat'

function SparkIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3.2 14.5 9.5 20.8 12 14.5 14.5 12 20.8 9.5 14.5 3.2 12 9.5 9.5 12 3.2Z" />
    </svg>
  )
}

function MenuIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const menuItems = [
  {
    label: '添加文件',
    icon: (
      <MenuIcon>
        <path d="m21.4 11.6-8.5 8.5a5 5 0 0 1-7.1-7.1l9.2-9.2a3.2 3.2 0 0 1 4.5 4.5l-9.1 9.1a1.4 1.4 0 0 1-2-2l8.5-8.5" />
      </MenuIcon>
    ),
  },
  {
    label: '目标',
    icon: (
      <MenuIcon>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M17 7 20 4M20 4h-3M20 4v3" />
      </MenuIcon>
    ),
  },
  {
    label: '计划',
    icon: (
      <MenuIcon>
        <path d="M5 4h14v16H5z" />
        <path d="m8 13 2 2 5-6M8 7h8" />
      </MenuIcon>
    ),
  },
  {
    label: '工具',
    icon: (
      <MenuIcon>
        <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.5 2.5-3-3 2.5-2.5Z" />
      </MenuIcon>
    ),
  },
  {
    label: '专家',
    icon: (
      <MenuIcon>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
      </MenuIcon>
    ),
  },
  {
    label: '我的预设提示词',
    icon: (
      <MenuIcon>
        <path d="M5 4h14v16H5zM9 8h6M12 8v8" />
      </MenuIcon>
    ),
  },
]

const modelItems = [
  { label: '智选模型', description: '智能组合最佳AI模型完成任务', icon: <SparkIcon className="h-5 w-5 text-[#0f4cc8]" /> },
  {
    label: 'ChatGPT 5.6 Sol',
    description: '',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700" fill="none" aria-hidden="true">
        <path
          d="M12.3 3.2c1.5-.1 2.7.5 3.6 1.7.7 1 .9 2.3.6 3.4 1.1.2 2.1.8 2.8 1.7 1.1 1.4 1.3 3.4.6 5-.7 1.6-2.2 2.8-4 3.1-.4 1.1-1.2 2.1-2.4 2.7-1.4.7-3.1.7-4.5 0-1.2-.6-2-1.6-2.4-2.7-1.8-.3-3.3-1.5-4-3.1-.7-1.6-.5-3.6.6-5 .7-.9 1.7-1.5 2.8-1.7-.3-1.1-.1-2.4.6-3.4.9-1.2 2.1-1.8 3.6-1.7 1.1 0 2.1.4 2.9 1.1.8-.7 1.8-1.1 2.9-1.1Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
  },
  {
    label: 'ChatGPT 5.6 Terra',
    description: '',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700" fill="none" aria-hidden="true">
        <path
          d="M12.3 3.2c1.5-.1 2.7.5 3.6 1.7.7 1 .9 2.3.6 3.4 1.1.2 2.1.8 2.8 1.7 1.1 1.4 1.3 3.4.6 5-.7 1.6-2.2 2.8-4 3.1-.4 1.1-1.2 2.1-2.4 2.7-1.4.7-3.1.7-4.5 0-1.2-.6-2-1.6-2.4-2.7-1.8-.3-3.3-1.5-4-3.1-.7-1.6-.5-3.6.6-5 .7-.9 1.7-1.5 2.8-1.7-.3-1.1-.1-2.4.6-3.4.9-1.2 2.1-1.8 3.6-1.7 1.1 0 2.1.4 2.9 1.1.8-.7 1.8-1.1 2.9-1.1Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
  },
  {
    label: 'ChatGPT 5.6 Luna',
    description: '',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700" fill="none" aria-hidden="true">
        <path
          d="M12.3 3.2c1.5-.1 2.7.5 3.6 1.7.7 1 .9 2.3.6 3.4 1.1.2 2.1.8 2.8 1.7 1.1 1.4 1.3 3.4.6 5-.7 1.6-2.2 2.8-4 3.1-.4 1.1-1.2 2.1-2.4 2.7-1.4.7-3.1.7-4.5 0-1.2-.6-2-1.6-2.4-2.7-1.8-.3-3.3-1.5-4-3.1-.7-1.6-.5-3.6.6-5 .7-.9 1.7-1.5 2.8-1.7-.3-1.1-.1-2.4.6-3.4.9-1.2 2.1-1.8 3.6-1.7 1.1 0 2.1.4 2.9 1.1.8-.7 1.8-1.1 2.9-1.1Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
  },
  {
    label: 'Gemini 3.1 Pro',
    description: '',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-7.8 4.5L12 12l7.8-4.5A9 9 0 0 0 12 3Z" fill="#ea4335" />
        <path d="M4.2 7.5A9 9 0 0 0 12 21l-2.2-6.6-5.6-6.9Z" fill="#fbbc05" />
        <path d="M19.8 7.5 12 12l2.2 6.6A9 9 0 0 0 19.8 7.5Z" fill="#34a853" />
        <path d="M12 12 4.2 7.5A9 9 0 0 1 12 3l2.2 6.6L12 12Z" fill="#4285f4" />
      </svg>
    ),
  },
  {
    label: 'Gemini 3.1 Flash',
    description: '',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-7.8 4.5L12 12l7.8-4.5A9 9 0 0 0 12 3Z" fill="#ea4335" />
        <path d="M4.2 7.5A9 9 0 0 0 12 21l-2.2-6.6-5.6-6.9Z" fill="#fbbc05" />
        <path d="M19.8 7.5 12 12l2.2 6.6A9 9 0 0 0 19.8 7.5Z" fill="#34a853" />
        <path d="M12 12 4.2 7.5A9 9 0 0 1 12 3l2.2 6.6L12 12Z" fill="#4285f4" />
      </svg>
    ),
  },
  {
    label: 'DeepSeek V4 Flash',
    description: '',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M4 13.2c0-4.6 3.7-8.3 8.3-8.3 2.6 0 4.9 1.2 6.4 3.1l1.4-1.4.8 4.8-4.8-.8 1.5-1.5A7 7 0 1 0 19 16"
          fill="none"
          stroke="#4f6df5"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

function HomeWorkspace({ onOpenChat }: { onOpenChat: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modelMenuOpen, setModelMenuOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(modelItems[0].label)
  const modelMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!modelMenuRef.current?.contains(event.target as Node)) {
        setModelMenuOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 px-8 py-[60px]">
        <section className="mx-auto w-full max-w-[800px]">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf0ff] text-[#0f4cc8]">
              <SparkIcon />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.28em] text-[#0f4cc8]">你的 AI 工作伙伴</p>
              <h1 className="mt-3 text-[28px] font-semibold leading-tight tracking-normal text-slate-900 sm:text-[34px]">
                你好，我来帮你完成今天的工作
              </h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            告诉我你的目标、想法或遇到的问题，我会帮你找到合适的 Skill，一起把事情做好。
          </p>

          <div className="mt-8 overflow-visible rounded-lg border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="min-h-[160px] px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <SparkIcon className="h-5 w-5 text-[#0f4cc8]" />
                  <span>告诉我你想完成什么，我会推荐合适的 Skill</span>
                </div>

                <div ref={modelMenuRef} className="relative">
                  <Button
                    type="button"
                    onClick={() => setModelMenuOpen((open) => !open)}
                    className="flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-800"
                  >
                    自动选择模型
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 transition ${modelMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Button>

                  {modelMenuOpen ? (
                    <div className="absolute right-0 top-10 z-20 w-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
                      <p className="px-1 py-2 text-sm font-medium text-slate-500">切换模型</p>
                      <div className="mt-1 space-y-1">
                        {modelItems.map((item) => {
                          const isSelected = selectedModel === item.label

                          return (
                            <Button
                              key={item.label}
                              type="button"
                              onClick={() => {
                                setSelectedModel(item.label)
                                setModelMenuOpen(false)
                              }}
                              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                                isSelected ? 'bg-[#eef2fb]' : 'hover:bg-slate-50'
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                <span className="shrink-0">{item.icon}</span>
                                <span className="min-w-0">
                                  <span className="block text-base font-semibold text-slate-900">
                                    {item.label}
                                  </span>
                                  {item.description ? (
                                    <span className="mt-1 block text-sm text-slate-500">
                                      {item.description}
                                    </span>
                                  ) : null}
                                </span>
                              </span>

                              {isSelected ? (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0f4cc8] text-white">
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="m6 12 4 4 8-8" />
                                  </svg>
                                </span>
                              ) : null}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <textarea
                className="mt-4 h-20 w-full resize-none border-0 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-300"
                placeholder="例如：为一家精品咖啡店制作一个春季活动网站..."
              />
            </div>

            <div className="relative flex min-h-[70px] items-center justify-between border-t border-slate-200 px-5">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#0f4cc8] transition hover:bg-blue-50"
                  aria-label="添加上下文"
                >
                  <span className="text-[34px] font-light leading-none">+</span>
                </Button>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                onClick={onOpenChat}
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                  >
                    制作一个活动网站
                  </Button>
                  <Button
                    type="button"
                onClick={onOpenChat}
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                  >
                    设计一张社媒海报
                  </Button>
                </div>
              </div>

              <Button
                type="button"
                onClick={onOpenChat}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f4cc8] text-white shadow-sm transition hover:bg-[#123fa4]"
                aria-label="发送"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M20.5 3.5 3.8 10.3c-1.1.5-1 2.1.2 2.4l6.6 1.7 1.7 6.6c.3 1.2 1.9 1.3 2.4.2l6.8-16.7c.3-.7-.3-1.3-1-1Z" />
                </svg>
              </Button>

              {menuOpen ? (
                <div className="absolute left-5 top-[56px] z-10 w-[250px] overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
                  {menuItems.map((item, index) => (
                    <Button
                      key={item.label}
                      type="button"
                      className={`flex h-11 w-full items-center gap-3 px-4 text-left text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 ${
                        index === 0 ? '' : 'border-t border-slate-100'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>('home')

  return screen === 'chat' ? (
    <ChatPage onBack={() => setScreen('home')} />
  ) : (
    <HomeWorkspace onOpenChat={() => setScreen('chat')} />
  )
}
