import { Button } from '@base-ui/react/button'
import { useI18n } from '../../../i18n'
import { createWorkbenchData } from './workbench-data'

export function TaskReminderTab() {
  const { t } = useI18n()
  const { taskReminderItems } = createWorkbenchData(t)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">任务提醒</h2>
          <p className="mt-2 text-sm text-slate-500">今天需要关注的工作和截止时间</p>
        </div>
        <Button type="button" className="rounded-xl bg-[#0f4cc8] px-4 py-3 text-sm font-semibold text-white">
          + 新建提醒
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {taskReminderItems.map((task, index) => (
          <div
            key={task.title}
            className={`flex items-center justify-between gap-4 px-5 py-5 ${
              index > 0 ? 'border-t border-slate-200' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#0f4cc8]">
                ◇
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{task.time}</p>
              </div>
            </div>
            <span
              className="rounded-xl px-4 py-2 text-sm font-medium"
              style={{ color: task.statusBg, backgroundColor: task.statusColor }}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
