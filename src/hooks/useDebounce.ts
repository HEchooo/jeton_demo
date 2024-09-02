import { useState, useEffect } from 'react'

export default function useDebounce<T>(value:T, delay:number,depencyList:any[]) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [...depencyList])

  return debouncedValue
}