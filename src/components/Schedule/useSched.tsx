import React from 'react';

import { fetchChannels } from './fetchEvents';

import { Channel, Program, useEpg } from 'planby';

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

	const { getEpgProps, getLayoutProps } = useEpg({
		channels: channelsData,
		epg: epgData,
		dayWidth: 7200,
		sidebarWidth: 100,
		itemHeight: 80,
		isSidebar: true,
		isTimeline: true,
		isLine: true,
		startDate: getFormattedDate(startDate),
		endDate: getFormattedDate(endDate),
		isBaseTimeFormat: true,
		height: 485,
		globalStyles: globalStyles,
	})

	//   export interface Program {
	//     channelUuid: string;
	//     id: string;
	//     title: string;
	//     description: string;
	//     since: string | number | Date;
	//     till: string | number | Date;
	//     image: string;
	//     [key: string]: any;
	// }

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
