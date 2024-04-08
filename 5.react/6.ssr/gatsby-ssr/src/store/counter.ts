import { create } from "zustand"

const useCountStore = create<{
  count: number
  increment: () => void
  decrement: () => void
}>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}))

export { useCountStore }
