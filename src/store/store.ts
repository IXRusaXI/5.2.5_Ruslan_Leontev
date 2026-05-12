import { configureStore } from '@reduxjs/toolkit'
import vacancyReducer from './slices/vacancies/vacanciesSlice'
import filterReducer from './slices/filter/filterSlice'
import pageReducer from './slices/page/pageSlice'

export interface Item {
    id: number,
    name: string,
    price: number,
    image: string,
}

export const store = configureStore({
  reducer: {
    vacancy: vacancyReducer,
    filter: filterReducer,
    page: pageReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch