const useStorage = () => {
  const setItem = <T>(key: string, val: T) => {
    const sVal = JSON.stringify(val)
    localStorage.setItem(key, sVal)
  }
  const getItem = <T>(key: string): Partial<T> | null => {
    const item = localStorage.getItem(key)
    if (item) {
      return JSON.parse(item) as T
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
