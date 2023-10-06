import React from 'react'

import { fetchChannels } from './fetchEvents'

import { theme } from '@/app/theme'
import { Channel, Program, useEpg } from '@acmuta/planby'

export function useSched(startDate: Date, endDate: Date, events: Program[]) {
	const [channels, setChannels] = React.useState<Channel[]>([])
	const [epg, setEpg] = React.useState<Program[]>([])
	const [isLoading, setIsLoading] = React.useState<boolean>(false)

	const channelsData = React.useMemo(() => channels, [channels])
	const epgData = React.useMemo(() => epg, [epg])

	const getFormattedDate = (date: Date) => {
		const newDate = new Date(new Date(date).getTime())
		return newDate.toISOString()
	}

	const globalStyles = `
  .planby {
    display: grid;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    // Code below is redundant, can be replaced with loader component
    // see: https://github.com/karolkozer/planby#:~:text=optional-,loader,-Component

    [aria-label="loading"] {
      background-image: url("./images/hackuta-logo-small.png");
      background-repeat: no-repeat;
      background-position: center;
      animation: spin 1s linear infinite;
      background-color: transparent;
      scale: .5;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }

    [aria-label="loading"] > div {
      display: none;
    }

    // /* Channel */
    .planby-channel-box {
      max-width: none;
      padding: 0 .5rem;
    }
    .playby-channel-logo {
      max-width: none!important;
    }

    // .planby-area-annotation-left, .planby-area-annotation-right {
    // }

    // /* Program */
    .planby-program-content {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;

    }
    .planby-program-content:hover {
      background: linear-gradient(to right, #7A1D18, #AF2922);
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  `

	const areas = [
		{
			startDate: '2023-10-07T12:00:00',
			endDate: '2023-10-08T12:00:00',
			styles: {
				background: '#C5303005',
				borderLeft: '2px dotted #C53030',
				borderRight: '2px dotted #C53030',
			},
			annotations: {
				styles: {
					background: '#C53030',
					color: 'white',
				},
				textStart: 'Hacking Start',
				textEnd: 'Hacking End',
			},
			className: 'quiet-period',
		},
		{
			startDate: '2023-10-08T00:00:00',
			endDate: '2023-10-08T07:00:00',
			styles: {
				background: '#ffffff07',
				borderLeft: '2px dotted #262626',
				borderRight: '2px dotted #262626',
			},
			annotations: {
				styles: {
					background: '#262626',
					color: 'white',
				},
				textStart: 'Quiet Period',
			},
		},
		{
			startDate: '2023-10-08T10:00:00',
			styles: {
				borderLeft: '2px dotted #1e3a8a',
			},
			annotations: {
				styles: {
					background: '#1e3a8a',
					color: 'white',
				},
				textEnd: 'Devpost Deadline',
			},
		},
		{
			startDate: '2023-10-08T13:00:00',
			endDate: '2023-10-08T15:00:00',
			styles: {
				background: '#10b98109',
				borderLeft: '2px dotted #10b981',
				borderRight: '2px dotted #10b981',
			},
			annotations: {
				styles: {
					background: '#10b981',
					color: 'white',
					className: 'quiet-period',
				},
				textStart: 'Judging',
			},
		},
	]

	const { getEpgProps, getLayoutProps } = useEpg({
		channels: channelsData,
		epg: epgData,
		dayWidth: 7200,
		sidebarWidth: 100,
		itemHeight: 90,
		isSidebar: true,
		isTimeline: true,
		isLine: true,
		startDate: getFormattedDate(startDate),
		endDate: getFormattedDate(endDate),
		isBaseTimeFormat: true,
		height: 535,
		globalStyles: globalStyles,
		isCurrentTime: true,
		liveRefreshTime: 120,
		isInitialScrollToNow: true,
		theme,
		areas,
	})

	const handleFetchResources = React.useCallback(async () => {
		if (!events) { return }
		setIsLoading(true)
		const channels = await fetchChannels()
		setEpg(events as Program[])
		setChannels(channels as Channel[])
		setIsLoading(false)
	}, [events])

	React.useEffect(() => {
		handleFetchResources()
	}, [handleFetchResources])

	return { getEpgProps, getLayoutProps, isLoading }
}
