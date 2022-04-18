import background from './background'
import vuex from './vuex'
declare module "electron-store-vuex-sync" {
    export default {
        injectStore: background,
        getVuexStoreConfig: vuex
    }
}

declare module "electron-store-vuex-sync/dist/background" {
    export default background
}

declare module "electron-store-vuex-sync/dist/vuex" {
    export default vuex
}