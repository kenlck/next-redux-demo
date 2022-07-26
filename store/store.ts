import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import logger from 'redux-logger'
import { IS_DEV } from '../utils/env'
import historySlice from './slice/historySlice'
import { gmapApi } from './services/gmap'
import searchSlice from './slice/searchSlice'

export const store = configureStore({
  reducer: {
    history: historySlice,
    search: searchSlice,
    [gmapApi.reducerPath]: gmapApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware().concat(gmapApi.middleware)
    if (IS_DEV) {
      return middleware.concat(logger)
    }
    return middleware
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
