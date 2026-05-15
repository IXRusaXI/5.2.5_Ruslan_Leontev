import { configureStore } from '@reduxjs/toolkit'
import vacancyReducer from './slices/vacancies/vacanciesSlice'
import filterReducer from './slices/filter/filterSlice'
import pageReducer from './slices/page/pageSlice'
import errorReducer from './slices/error/errorSlice'

export const store = configureStore({
  reducer: {
    vacancy: vacancyReducer,
    filter: filterReducer,
    page: pageReducer,
    error: errorReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch