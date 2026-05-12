import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Vacancy, SearchParams } from './../../../pages/types/types';

// Начальное состояние
interface VacanciesState {
  all: Vacancy[];
  filtered: Vacancy[];
}

const initialState: VacanciesState = {
  all: [],
  filtered: [],
};

// Создание slice
const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setAllVacancies: (state, action: PayloadAction<Vacancy[]>) => {
        state.all = action.payload;
    },

    filterVacancies: (state, action: PayloadAction<SearchParams>) => {
        state.filtered = state.all.filter((vacancy) => {
            const { skills, searchString, city } = action.payload

            if (skills.length > 0 && !skills.every((skill) => vacancy.snippet?.requirement?.toLowerCase().includes(skill.toLowerCase()))) return false
            if (searchString.length > 0 && !vacancy.name.toLowerCase().includes(searchString.toLowerCase())) return false
            if (city.length > 0 && city !== 'Все города') {
              return vacancy.area.name.toLowerCase().includes(city.toLowerCase())
            }
              
            return true
        })
    },
  }
});

export const vacanciesActions = vacanciesSlice.actions;
export default vacanciesSlice.reducer;