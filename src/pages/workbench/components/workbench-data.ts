export type TFunction = (key: string, vars?: Record<string, string | number>) => string

export function createWorkbenchData(t: TFunction) {
  return {
    dailyWorkCards: [
      {
        title: t('workbench.data.dailyWorkCards.0.title'),
        tag: t('workbench.data.dailyWorkCards.0.tag'),
        desc: t('workbench.data.dailyWorkCards.0.desc'),
        meta: t('workbench.data.dailyWorkCards.0.meta'),
        icon: '🌐',
      },
      {
        title: t('workbench.data.dailyWorkCards.1.title'),
        tag: t('workbench.data.dailyWorkCards.1.tag'),
        desc: t('workbench.data.dailyWorkCards.1.desc'),
        meta: t('workbench.data.dailyWorkCards.1.meta'),
        icon: '🖼',
      },
      {
        title: t('workbench.data.dailyWorkCards.2.title'),
        tag: t('workbench.data.dailyWorkCards.2.tag'),
        desc: t('workbench.data.dailyWorkCards.2.desc'),
        meta: t('workbench.data.dailyWorkCards.2.meta'),
        icon: 'T',
      },
      {
        title: t('workbench.data.dailyWorkCards.3.title'),
        tag: t('workbench.data.dailyWorkCards.3.tag'),
        desc: t('workbench.data.dailyWorkCards.3.desc'),
        meta: t('workbench.data.dailyWorkCards.3.meta'),
        icon: '📈',
      },
    ] as const,
    web3Cards: [
      {
        title: t('workbench.data.web3Cards.0.title'),
        desc: t('workbench.data.web3Cards.0.desc'),
        meta: t('workbench.data.web3Cards.0.meta'),
        icon: '◎',
      },
      {
        title: t('workbench.data.web3Cards.1.title'),
        desc: t('workbench.data.web3Cards.1.desc'),
        meta: t('workbench.data.web3Cards.1.meta'),
        icon: '⌘',
      },
      {
        title: t('workbench.data.web3Cards.2.title'),
        desc: t('workbench.data.web3Cards.2.desc'),
        meta: t('workbench.data.web3Cards.2.meta'),
        icon: '◉',
      },
    ] as const,
    web3Stats: [
      {
        label: t('workbench.data.web3Stats.0.label'),
        value: t('workbench.data.web3Stats.0.value'),
        hint: t('workbench.data.web3Stats.0.hint'),
      },
      {
        label: t('workbench.data.web3Stats.1.label'),
        value: t('workbench.data.web3Stats.1.value'),
        hint: t('workbench.data.web3Stats.1.hint'),
      },
      {
        label: t('workbench.data.web3Stats.2.label'),
        value: t('workbench.data.web3Stats.2.value'),
        hint: t('workbench.data.web3Stats.2.hint'),
      },
    ] as const,
    web3Connectors: [
      {
        name: t('workbench.data.web3Connectors.0.name'),
        desc: t('workbench.data.web3Connectors.0.desc'),
        meta: t('workbench.data.web3Connectors.0.meta'),
      },
      {
        name: t('workbench.data.web3Connectors.1.name'),
        desc: t('workbench.data.web3Connectors.1.desc'),
        meta: t('workbench.data.web3Connectors.1.meta'),
      },
      {
        name: t('workbench.data.web3Connectors.2.name'),
        desc: t('workbench.data.web3Connectors.2.desc'),
        meta: t('workbench.data.web3Connectors.2.meta'),
      },
      {
        name: t('workbench.data.web3Connectors.3.name'),
        desc: t('workbench.data.web3Connectors.3.desc'),
        meta: t('workbench.data.web3Connectors.3.meta'),
      },
    ] as const,
    web3Strategies: [
      {
        title: t('workbench.data.web3Strategies.0.title'),
        desc: t('workbench.data.web3Strategies.0.desc'),
      },
      {
        title: t('workbench.data.web3Strategies.1.title'),
        desc: t('workbench.data.web3Strategies.1.desc'),
      },
      {
        title: t('workbench.data.web3Strategies.2.title'),
        desc: t('workbench.data.web3Strategies.2.desc'),
      },
    ] as const,
    skillsMarketItems: [
      {
        title: t('workbench.data.skillsMarketItems.0.title'),
        desc: t('workbench.data.skillsMarketItems.0.desc'),
        icon: 'B',
      },
      {
        title: t('workbench.data.skillsMarketItems.1.title'),
        desc: t('workbench.data.skillsMarketItems.1.desc'),
        icon: 'B',
      },
      {
        title: t('workbench.data.skillsMarketItems.2.title'),
        desc: t('workbench.data.skillsMarketItems.2.desc'),
        icon: 'X',
      },
      {
        title: t('workbench.data.skillsMarketItems.3.title'),
        desc: t('workbench.data.skillsMarketItems.3.desc'),
        icon: 'Y',
      },
      {
        title: t('workbench.data.skillsMarketItems.4.title'),
        desc: t('workbench.data.skillsMarketItems.4.desc'),
        icon: 'C',
      },
      {
        title: t('workbench.data.skillsMarketItems.5.title'),
        desc: t('workbench.data.skillsMarketItems.5.desc'),
        icon: 'K',
      },
    ] as const,
    taskReminderItems: [
      {
        title: t('workbench.data.taskReminderItems.0.title'),
        time: t('workbench.data.taskReminderItems.0.time'),
        status: t('workbench.data.taskReminderItems.0.status'),
        statusBg: '#C67E4B',
        statusColor: '#C67E4B1A',
      },
      {
        title: t('workbench.data.taskReminderItems.1.title'),
        time: t('workbench.data.taskReminderItems.1.time'),
        status: t('workbench.data.taskReminderItems.1.status'),
        statusBg: '#003CB1',
        statusColor: '#003CB10F',
      },
      {
        title: t('workbench.data.taskReminderItems.2.title'),
        time: t('workbench.data.taskReminderItems.2.time'),
        status: t('workbench.data.taskReminderItems.2.status'),
        statusBg: '#003CB1',
        statusColor: '#003CB10F',
      },
    ] as const,
    toolCards: [
      {
        title: t('workbench.data.toolCards.0.title'),
        desc: t('workbench.data.toolCards.0.desc'),
        icon: '◆',
        bg: '#003CB10F',
        text: '#003CB1',
      },
      {
        title: t('workbench.data.toolCards.1.title'),
        desc: t('workbench.data.toolCards.1.desc'),
        icon: '◇',
        bg: '#63E68E1A',
        text: '#63E68E',
      },
      {
        title: t('workbench.data.toolCards.2.title'),
        desc: t('workbench.data.toolCards.2.desc'),
        icon: '◈',
        bg: '#8A72CA1A',
        text: '#8A72CA',
      },
      {
        title: t('workbench.data.toolCards.3.title'),
        desc: t('workbench.data.toolCards.3.desc'),
        icon: '◇',
        bg: '#DF83611A',
        text: '#DF8361',
      },
    ] as const,
  }
}
