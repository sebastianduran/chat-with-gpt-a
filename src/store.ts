import { writable } from  'svelte/store'

export const APP_STATUS = {
    INIT: 0,
    LOADING: 1,
    CHAT_MODE: 2,
    ERROR: -1
}

export const appStatus = writable(APP_STATUS.CHAT_MODE)
export const appStatusInfo = writable({ 
    id: '8f2b3c4f700a503b0883c8c868bdda8b', 
    url:'', 
    pages: 4
})

export const setAppStatusLoading = () =>  {
    appStatus.set(APP_STATUS.LOADING)
}

export const setAppStatusError = () => {
    appStatus.set(APP_STATUS.ERROR)
}

export const setAppStatusChatMode = ({id, url, pages}: {id: string, url: string, pages: number }) => {
    appStatus.set(APP_STATUS.CHAT_MODE)
    appStatusInfo.set({id, url, pages})
}