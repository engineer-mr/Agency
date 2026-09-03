import { Button } from '@base-ui/react/button'
import { Sidebar } from '../../../components/Sidebar'

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
            网页制作
          </Button>

          <div className="mt-8 flex flex-col gap-6 px-4">
            <ChatBubble align="right">我已经成功部署了在线商店和经营后台，下一步应该干什么呢</ChatBubble>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f4cc8] text-white">
                <SparkIcon />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">Agency</span>
                  <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                    智选模型
                  </span>
                </div>
                <div className="mt-3 max-w-[690px] space-y-3 text-[15px] leading-7 text-slate-500">
                  <p>
                    我先帮你做一次“上线后差距检查”：看商店当前部署状态、尚未完成的经营环节和已有业务记录，然后只给你一个最优先的下一步建议。
                    我会使用业务工作区流程，因为这不是泛泛的开店建议，而是要基于你这家 BAUHAUSE 商店的实际状态来判断。
                  </p>
                  <p className="text-sm text-slate-400">已加载工具</p>
                  <h3 className="text-lg font-semibold text-slate-900">1.安装完成</h3>
                  <p>BAUHAUSE 的商店模板已安装完成，在线商店的前后端均已成功部署。</p>
                  <h3 className="text-lg font-semibold text-slate-900">2.已就绪的应用</h3>
                  <p>• FORMA Store（网站）：面向顾客的 BAUHAUSE 在线商店及受保护的店主订单管理页面。</p>
                  <h3 className="text-lg font-semibold text-slate-900">3.已包含的能力 / 当前限制</h3>
                  <ul className="space-y-1">
                    <li>• 首页、商品目录和商品详情页</li> 
                    <li>• 购物车、订单提交和订单确认流程</li>
                    <li>• 真实订单记录，订单初始状态为 “等待付款”</li>
                    <li>• 用户登录及受保护的店主订单管理功能</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-lg border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <textarea
              className="h-28 w-full resize-none rounded-t-lg border-0 bg-transparent px-5 py-4 text-base text-slate-800 outline-none placeholder:text-slate-300"
              placeholder="例如：为一家精品咖啡店制作一个春季活动网站..."
            />
            <div className="flex min-h-[70px] items-center justify-between border-t border-slate-200 px-5">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#0f4cc8] transition hover:bg-blue-50"
                  aria-label="添加上下文"
                >
                  <span className="text-[34px] font-light leading-none">+</span>
                </Button>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                  >
                    制作一个活动网站
                  </Button>
                  <Button
                    type="button"
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                  >
                    设计一张社媒海报
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  className="flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-800"
                >
                  自动选择模型
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
                <Button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f4cc8] text-white shadow-sm transition hover:bg-[#123fa4]"
                  aria-label="发送"
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
