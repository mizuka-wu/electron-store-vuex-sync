# Electron-store-vuex-sync

自动同步`electron-store`和`vuex`

## 使用方法

### 在background.js中（node进程）

```javascript
const { ipcMain } = require('electron')
const Store = require('electron-store');
const { injectStore } = require('electron-store-vuex-sync')
const store = new Store();

injectStore(ipcMain, store)
```

### 在创建vuex的地方

```javascript
import Vuex from 'vuex'
import { getVuexStoreConfig } from 'electron-store-vuex-sync'
import { ipcRenderer } from 'electron'

const store = new Vuex.Store(getVuexStoreConfig(ipcRenderer))
return store
```

#### 如果需要可以update

如果需要vuex可以同步回store

```javascript
import Vuex from 'vuex'
import { getVuexStoreConfig } from 'electron-store-vuex-sync'
import { ipcRenderer } from 'electron'

const schema = {
    a: {
        type: 'array'
    }
}

const store = new Vuex.Store(getVuexStoreConfig(ipcRenderer, schema))
return store
```

这样，会根据你schema的key，自动添加`mutation`,名字类似于`set:key名`

#### 初始化的vuex state和store同步

默认情况下，state根据schema推导，但是可以通过传入第四个参数defaultStore，让state中每个属性就为defaultStore对应的值

默认同步会在加载成功后通过对应事件同步

```javascript
import Vuex from 'vuex'
import { getVuexStoreConfig } from 'electron-store-vuex-sync'
import { ipcRenderer } from 'electron'
import store from '../store' // 导出的electron store

const schema = {
    a: {
        type: 'array'
    }
}

const store = new Vuex.Store(getVuexStoreConfig(ipcRenderer, schema, null, store))
return store
```

这样，会根据你schema的key，自动添加`mutation`,名字类似于`set:key名`

## 参数

### injectStore

- **ipcMain** `electron`的`ipcMain`用来注入监听事件
- **store** `electron-store`创建的`store`
- [**storeName**] 当前这个`store`的名字需要不同页面同步不同`store`的时候需要，可选

返回传入的store

### getVuexStoreConfig

- **ipcRenderer** `electron`的`ipcRenderer`用来注入监听事件
- [**schema**] `electron-store`的`schema`可以根据这个自动初始化，省去手动的问题
- [**storeName**] 当前这个`store`的名字需要不同页面同步不同`store`的时候需要，可选

## 其他的事

1. 如果使用`schema`来初始化的话，`vuex`的`mutation`为`set:schema的key`

2. 只会生成对应的`vuex`配置，像是`state`,`action`这些你可以通过解构等方法把自己的方法注入进去

3. 因为`electron-store`默认名字为`config`,所以`vuex`用来初始化和同步的事件前缀也默认为`config:`

4. `background`的注入请放在最顶上
