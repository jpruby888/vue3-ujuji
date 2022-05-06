import type { ISite_config } from '@/api/siteApi'

const useStorage = () => {
  const setItem = <T>(key: string, val: T) => {
    const sVal = JSON.stringify(val)
    localStorage.setItem(key, sVal)
  }
  const getItem = (key: string): Partial<ISite_config> | null => {
    const item = localStorage.getItem(key)
    if (item) {
      return JSON.parse(item) as ISite_config
    }
    return null
  }
  const delItem = (key: string) => {
    localStorage.removeItem(key)
  }
  return {
    setItem,
    getItem,
    delItem,
  }
}

export default useStorage
