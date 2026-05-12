import { createSlice, type PayloadAction } from '@reduxjs/toolkit';// предполагаем, что интерфейс Vacancy лежит в types.ts
import type { Vacancy } from '../../../pages/types/types';


// Начальное состояние
interface PaginationState {
    activePageNumber: number,
    activePageList: Vacancy[],
    total: number
    pageLimit: number
}

const initialState: PaginationState = {
    activePageNumber: 1,
    total: 0,
    pageLimit: 4,
    activePageList: []
};

// Создание slice
const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setTotalPages: (state, action: PayloadAction<number>) => {
        state.total = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
        state.activePageNumber = action.payload
    },
    setActivePageList: (state, action: PayloadAction<{filtered: Vacancy[], page: number}>) => {
        state.activePageList = action.payload.filtered.slice(
            (action.payload.page - 1) * state.pageLimit, 
            action.payload.page * state.pageLimit
        )
    }
  }
});

export const pageActions = pageSlice.actions;
export default pageSlice.reducer;