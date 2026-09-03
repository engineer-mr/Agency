import { Button } from '@base-ui/react/button'
import { useI18n } from '../../../i18n'
import { createWorkbenchData } from './workbench-data'

export function Web3Tab() {
  const { t } = useI18n()
  const { web3Connectors, web3Stats, web3Strategies } = createWorkbenchData(t)

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-[28px] font-semibold tracking-tight text-slate-900">Web3 Skills 工作台</h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-500">
          把交易所连接、市场数据和策略配置变成可直接使用的工具
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {web3Stats.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-3xl font-semibold tracking-tight text-slate-900">{item.value}</span>
              <span className="text-xs text-slate-400">{item.hint}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">交易所连接器</h3>
              <p className="mt-1 text-sm text-slate-500">查看可用交易所和链上入口</p>
            </div>
            <Button
              type="button"
              className="rounded-full border border-[#d6dff8] bg-[#eef2fb] px-4 py-2 text-sm font-medium text-[#0f4cc8]"
            >
              全部
            </Button>
          </div>

          <div className="mt-5 space-y-3">
            {web3Connectors.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-4 rounded-xl border border-slate-200 px-4 py-4 transition hover:border-[#c9d7f8] hover:bg-[#f8faff]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef2fb] text-base font-semibold text-[#0f4cc8]">
                  {item.name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-slate-900">{item.name}</h4>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                      {item.meta}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </div>
                <span className="text-lg leading-none text-slate-300">→</span>
              </div>
            ))}
          </div>

          <Button
            type="button"
            className="mt-4 text-sm font-semibold text-[#0f4cc8]"
          >
            查看全部连接器
          </Button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">策略 Skills</h3>
              <span className="rounded-md bg-[#eef2fb] px-2 py-0.5 text-[11px] font-semibold text-[#0f4cc8]">
                BETA
              </span>
            </div>
            <span className="text-sm text-slate-400">可直接调用</span>
          </div>

          <div className="mt-5 space-y-3">
            {web3Strategies.map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 px-4 py-4 transition hover:border-[#c9d7f8] hover:bg-[#f8faff]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-700">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
