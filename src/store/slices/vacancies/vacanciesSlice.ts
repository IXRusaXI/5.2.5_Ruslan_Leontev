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
            
            let skillMatch = false
            let cityMatch = false
            let searchMatch = false

            if (skills.length > 0) {
              skillMatch = skills.every((skill) => vacancy.snippet?.requirement?.toLowerCase().includes(skill.toLowerCase()))
            } else {
              skillMatch = true
            }

            if (searchString.length > 0) {
              searchMatch = vacancy.name.toLowerCase().includes(searchString.toLowerCase())
            } else {
              searchMatch = true  
            }
            
            if (city !== 'Все города') {
              cityMatch = vacancy.area.name.toLowerCase().includes(city.toLowerCase())
            } else if (city === 'Все города') {
              cityMatch = true
            }
            
            return skillMatch && cityMatch && searchMatch
        })
    },
  }
});

export const vacanciesActions = vacanciesSlice.actions;
export default vacanciesSlice.reducer;