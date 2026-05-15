import { createSlice, type PayloadAction } from '@reduxjs/toolkit';// предполагаем, что интерфейс Vacancy лежит в types.ts


// Начальное состояние
interface ErrorState {
    showErrorModal: boolean,
}

const initialState: ErrorState = {
    showErrorModal: false
};

// Создание slice
const errorSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    showError: (state) => {
        state.showErrorModal = true
    },
    hideError: (state) => {
        state.showErrorModal = false
    }
  }
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;