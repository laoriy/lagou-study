import { useState } from "react"

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  return {
    input: {
      value,
      onChange(e: any) {
        setValue(e.target?.value)
      },
    },
    setValue,
  }
}
export default useInput
