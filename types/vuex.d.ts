import { IpcRenderer } from 'electron'
import { Schema } from 'electron-store'
import { StoreOptions } from 'vuex'
export function renderer<S=Schema>(ipcRenderer: IpcRenderer, schema: Schema, storeName?: string): StoreOptions<S>

export default renderer