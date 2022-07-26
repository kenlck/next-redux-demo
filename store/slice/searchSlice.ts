import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { addToHistory } from './historySlice'

const initialState = { search: '', placeId: '' }

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      // console.log(state)
      return { ...state, search: action.payload }
    },
    setSearchAndID(state, action: PayloadAction<{ search: string; placeId: string }>) {
      // console.log(state)
      return { ...action.payload }
    },
  },
})

export const { setSearch, setSearchAndID } = searchSlice.actions
export default searchSlice.reducer
