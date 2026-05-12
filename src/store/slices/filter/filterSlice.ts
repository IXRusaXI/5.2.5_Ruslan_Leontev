import { createSlice, type PayloadAction } from '@reduxjs/toolkit';// предполагаем, что интерфейс Vacancy лежит в types.ts


// Начальное состояние
interface FilterState {
    skills: string[],
    searchString: string,
    city: string
}

const initialState: FilterState = {
    searchString: '',
    skills: ['TypeScript', 'React', 'Redux'],
    city: 'Все города'
};

// Создание slice
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<string[]>) => {
        state.skills = action.payload
    },
    addSkill: (state, action: PayloadAction<string>) => {
        if (action.payload.length === 0) return
        if (!state.skills.includes(action.payload)) state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<string>) => {
        state.skills = state.skills.filter((skill) => skill !== action.payload);
    },
    updateCity: (state, action: PayloadAction<string>) => {
        state.city = action.payload
    },
    setSearchString: (state, action: PayloadAction<string>) => {
        state.searchString = action.payload
    }
  }
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;