import { IpcRenderer } from 'electron'
import { Schema } from 'electron-store'
import { StoreOptions, MutationTree } from 'vuex'
export function renderer<S=Schema<T>>(ipcRenderer: IpcRenderer, schema: Schema<T>, storeName?: string): {
    state: {
        [key: keyof Schema<T>]: Schema<T>[key]
    },
    mutations: {
        [key: `set:${keyof Schema[T]}`]: MutationTree<Schema<T>>
    }
}

export default renderer