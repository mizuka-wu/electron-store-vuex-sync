import { getEventConst, DEFAULT_STORE_NAME } from './util/const'

/**
 *
 * @param {import('electron').ipcMain} ipcMain
 * @param {import('electron-store')} store
 * @param {string} [storeName]
 */
export default function (ipcMain, store, storeName = DEFAULT_STORE_NAME) {
  if (!ipcMain || !store) {
    throw new Error('ipcMain or store is required!')
  }

  const senderSet = new Set() // 存储所有需要同步的窗口的set
  const EVENT = getEventConst(storeName) // 事件

  /**
   * 本地store改变需要通知
   * @param {*} state
   * @param {*} ignoreSender
   */
  const storeChangeHandler = function (state, ignoreSender) {
    senderSet.forEach((sender) => {
      if (!ignoreSender || sender.id !== ignoreSender.id) {
        if (sender.isDestroyed()) {
          senderSet.delete(sender)
        } else {
          sender.send(EVENT.EVENT_SYNC, state)
        }
      }
    })
  }

  const subscribeStoreChange = function () {
    return store.onDidAnyChange((state) => {
      storeChangeHandler(state)
    })
  }

  // 解除监听用的方法
  let unsubscribeStoreChange = subscribeStoreChange()

  /**
   * 同步新加入的窗口
   */
  ipcMain.on(EVENT.EVENT_INIT, ({ sender }) => {
    senderSet.add(sender)
    sender.send(EVENT.EVENT_SYNC, store.store)
  })

  /**
   * 自动同步客户端到store
   */
  ipcMain.on(EVENT.EVENT_SYNC, ({ sender }, state) => {
    /**
     * 如果是从页面开始进行同步的化，需要先让store停止监听，整体修改之后再进行监听
     */
    if (unsubscribeStoreChange) {
      unsubscribeStoreChange()
      unsubscribeStoreChange = null
      store.store = state
      storeChangeHandler(state, sender)
      unsubscribeStoreChange = subscribeStoreChange()
    }
  })

  return store
}
