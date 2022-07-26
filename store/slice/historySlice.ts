import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type HistoryState = {
  history: { description: string; placeId: string }[]
}

const initialState = { history: [] } as HistoryState

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<{ description: string; placeId: string }>) {
      state.history.push(action.payload)
    },
    removeFromHistory(state, action: PayloadAction<number>) {
      state.history.splice(action.payload, 1)
    },
  },
})

export const { addToHistory, removeFromHistory } = historySlice.actions
export default historySlice.reducer
