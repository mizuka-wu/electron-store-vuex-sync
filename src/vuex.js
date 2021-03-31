import { getState } from './util/schema'
import { DEFAULT_STORE_NAME, getEventConst } from './util/const'
import throttle from 'lodash/throttle'

/**
 * 创建vuex创建参数的配置
 * @param {import('electron').ipcRenderer} ipcRenderer
 * @param {import('electron-store').Schema} schema 后台store的结构
 * @param {string} [storeName]
 */
export default function (ipcRenderer, schema = {}, storeName = DEFAULT_STORE_NAME) {
  const EVENT = getEventConst(storeName)

  const syncToBackground = throttle(function (state) {
    ipcRenderer.send(EVENT.EVENT_SYNC, state)
  }, 500)

  return {
    state: getState(schema),
    mutations: {
      [EVENT.EVENT_SYNC]: function (state, electronStoreState) {
        Object.assign(state, electronStoreState)
      },
      ...Object.fromEntries(Object.keys(schema).map(key => [`set:${key}`, function (state, payload) {
        state[key] = payload
      }]))
    },
    plugins: [(store) => {
      ipcRenderer.send(EVENT.EVENT_INIT)
      ipcRenderer.on(EVENT.EVENT_SYNC, (e, state) => {
        store.commit(EVENT.EVENT_SYNC, state)
      })

      /**
       * 推送变化
       */
      store.subscribe((mutation, state) => {
        if (mutation.type === EVENT.EVENT_SYNC) {
          return
        }

        syncToBackground(state)
      })
    }]
  }
}
