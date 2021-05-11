/**
 * 将electron-store的转为schema
 * @param {import('electron-store').Schema} targetSchema
 * @returns
 */
export function getState (targetSchema = {}) {
  return Object.keys(targetSchema).reduce((state, key) => {
    const { type, properties } = targetSchema[key]

    switch (type) {
      case 'object': {
        state[key] = getState(properties)
        break
      }
      case 'boolean': {
        state[key] = false
        break
      }
      case 'number': {
        state[key] = 0
        break
      }
      case 'array': {
        state[key] = []
        break
      }
      default: {
        state[key] = ''
        break
      }
    }

    return state
  }, {})
}

export default {
  getState
}
