import { IpcRenderer } from 'electron'
import { Schema } from 'electron-store'
import { StoreOptions, MutationTree } from 'vuex'
export function renderer<S=Schema<T>, T=any>(ipcRenderer: IpcRenderer, schema: Schema<T>, storeName?: string, defaultStore?: T): {
    state: {
        [key: keyof Schema<T>]: Schema<T>[key]
    },
    mutations: {
        [key: `set:${keyof Schema[T]}`]: MutationTree<Schema<T>>
    }
}

export default renderer