/* eslint-disable */
import {IpcMain} from 'electron'
import Store from 'electron-store'
export function background(ipcMain:IpcMain, store:Store, storeName?: string): void

export default background