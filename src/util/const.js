export const DEFAULT_STORE_NAME = 'config'
export const EVENT_INIT = 'vuex:init'
export const EVENT_SYNC = 'vuex:sync'

export function getEventConst (storeName = DEFAULT_STORE_NAME) {
  return {
    EVENT_INIT: `${storeName}:${EVENT_INIT}`,
    EVENT_SYNC: `${storeName}:${EVENT_SYNC}`
  }
}

export default getEventConst
