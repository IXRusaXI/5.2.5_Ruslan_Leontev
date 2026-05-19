// src/pages/VacancyListPage/VacancyListPage.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../test-utils/render'
import VacancyListPage from './vacancyListPage'
import * as vacanciesSlice from '../../store/slices/vacancies/vacanciesSlice'
import * as pageSlice from '../../store/slices/page/pageSlice'
import * as ParamTool from '../../tools/params/ParamTool'
import type { Vacancy } from '../types/types'

// Мокируем useQueryParams
vi.mock('../../tools/params/ParamTool', () => ({
  useQueryParams: vi.fn(),
}))

// Helper для рендера с Router
function renderVacancyListPage(preloadedState = {}) {
  return renderWithProviders(
    <BrowserRouter>
      <VacancyListPage />
    </BrowserRouter>,
    { preloadedState }
  )
}

// Мок-данные вакансий
const mockVacancies: Vacancy[] = [
  {
    id: '1',
    name: 'Frontend разработчик',
    salary: { from: 150000, to: 250000, currency: 'RUR' },
    experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
    employer: { id: 'employer1', name: 'ООО "Технологии"' },
    schedule: { id: 'fullDay', name: 'Полный день' },
    area: { id: 'area1', name: 'Москва' },
    snippet: { requirement: 'React, TypeScript' },
  },
  {
    id: '2',
    name: 'React разработчик',
    salary: { from: 100000, to: 200000, currency: 'RUR' },
    experience: { id: 'noExperience', name: 'Без опыта' },
    employer: { id: 'employer2', name: 'Стартап' },
    schedule: { id: 'remote', name: 'Удаленная работа' },
    area: { id: 'area2', name: 'Санкт-Петербург' },
    snippet: { requirement: 'Vue, JavaScript' },
  },
] as Vacancy[]

describe('VacancyListPage', () => {
  const mockUpdateSearchString = vi.fn()
  const mockUpdateSkills = vi.fn()
  const mockUpdateCity = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.mocked(ParamTool.useQueryParams).mockReturnValue({
      updateSearchString: mockUpdateSearchString,
      updateSkills: mockUpdateSkills,
      updateCity: mockUpdateCity,
    } as any)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('базовый рендер', () => {
    // Проверяет, что PageTitle отображается
    it('отображает компонент PageTitle', () => {
      renderVacancyListPage()

      expect(screen.getByRole('heading', { name: 'Список вакансий' })).toBeInTheDocument()
      expect(screen.getByText('По професии Frontend-разработчик')).toBeInTheDocument()
    })

    // Проверяет, что SkillSettings отображается
    it('отображает компонент SkillSettings', () => {
      renderVacancyListPage()

      expect(screen.getByText('Ключевые навыки')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument()
    })

    // Проверяет, что CitySelector отображается
    it('отображает компонент CitySelector', () => {
        renderVacancyListPage()

        // CitySelector содержит Select с value "Все города"
        expect(screen.getByText('Все города')).toBeInTheDocument()
    })

    // Проверяет, что Divider отображается
    it('отображает разделитель между PageTitle и фильтрами', () => {
      const { container } = renderVacancyListPage()

      const divider = container.querySelector('[class*="mantine-Divider"]')
      expect(divider).toBeInTheDocument()
    })
  })

  describe('отображение вакансий', () => {
    // Проверяет, что вакансии отображаются при наличии фильтрованного списка
    it('отображает список вакансий', () => {
      renderVacancyListPage({
        vacancy: {
          all: mockVacancies,
          filtered: mockVacancies,
        },
        page: {
          activePageNumber: 1,
          activePageList: mockVacancies,
          total: 1,
          pageLimit: 4,
        },
      })

      expect(screen.getByRole('heading', { name: 'Frontend разработчик' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'React разработчик' })).toBeInTheDocument()
    })

    // Проверяет, что пагинация отображается при наличии вакансий
    it('отображает пагинацию при наличии вакансий', () => {
      renderVacancyListPage({
        vacancy: {
          all: mockVacancies,
          filtered: mockVacancies,
        },
        page: {
          activePageNumber: 1,
          activePageList: mockVacancies,
          total: 2,
          pageLimit: 4,
        },
      })

      // Проверяем наличие кнопки активной страницы "1"
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    })

    // Проверяет, что сообщение "не найдены" отображается при пустом списке
    it('отображает сообщение "Вакансии по данному запросу не найдены" при пустом filteredList', () => {
      renderVacancyListPage({
        vacancy: {
          all: [],
          filtered: [],
        },
        page: {
          activePageNumber: 1,
          activePageList: [],
          total: 0,
          pageLimit: 4,
        },
      })

      expect(screen.getByText('Вакансии по данному запросу не найдены')).toBeInTheDocument()
    })
  })

  describe('интеграция с Redux', () => {
    // Проверяет, что фильтрация вызывается при изменении фильтров
    it('диспатчит filterVacancies при изменении фильтров', () => {
      const filterVacanciesSpy = vi.spyOn(vacanciesSlice.vacanciesActions, 'filterVacancies')

      renderVacancyListPage({
        vacancy: {
          all: mockVacancies,
          filtered: mockVacancies,
        },
        filter: {
          searchString: 'React',
          skills: ['TypeScript'],
          city: 'Москва',
        },
      })

      expect(filterVacanciesSpy).toHaveBeenCalledWith({
        searchString: 'React',
        skills: ['TypeScript'],
        city: 'Москва',
      })
    })

    // Проверяет, что setTotalPages вызывается при изменении filteredList
    it('диспатчит setTotalPages при изменении filteredList', () => {
      const setTotalPagesSpy = vi.spyOn(pageSlice.pageActions, 'setTotalPages')

      renderVacancyListPage({
        vacancy: {
          all: mockVacancies,
          filtered: mockVacancies,
        },
        page: {
          activePageNumber: 1,
          activePageList: [],
          total: 0,
          pageLimit: 4,
        },
      })

      expect(setTotalPagesSpy).toHaveBeenCalled()
    })

    // Проверяет, что setActivePageList вызывается при изменении activePageNumber
    it('диспатчит setActivePageList при изменении activePageNumber', () => {
      const setActivePageListSpy = vi.spyOn(pageSlice.pageActions, 'setActivePageList')

      renderVacancyListPage({
        vacancy: {
          all: mockVacancies,
          filtered: mockVacancies,
        },
        page: {
          activePageNumber: 1,
          activePageList: [],
          total: 1,
          pageLimit: 4,
        },
      })

      expect(setActivePageListSpy).toHaveBeenCalledWith({
        filtered: mockVacancies,
        page: 1,
      })
    })
  })

  describe('инициализация query params', () => {
    // Проверяет, что при монтировании вызываются updateSearchString, updateCity, updateSkills
    it('вызывает updateSearchString, updateCity, updateSkills при монтировании', () => {
      renderVacancyListPage()

      expect(mockUpdateSearchString).toHaveBeenCalled()
      expect(mockUpdateCity).toHaveBeenCalled()
      expect(mockUpdateSkills).toHaveBeenCalled()
    })
  })

  describe('граничные случаи', () => {
    // Проверяет, что не фильтрует при пустом all
    it('не вызывает filterVacancies при пустом all', () => {
      const filterVacanciesSpy = vi.spyOn(vacanciesSlice.vacanciesActions, 'filterVacancies')

      renderVacancyListPage({
        vacancy: {
          all: [],
          filtered: [],
        },
        filter: {
          searchString: 'React',
          skills: [],
          city: 'Все города',
        },
      })

      expect(filterVacanciesSpy).not.toHaveBeenCalled()
    })

    // Проверяет, что не устанавливает total при пустом all
    it('не вызывает setTotalPages при пустом all', () => {
      const setTotalPagesSpy = vi.spyOn(pageSlice.pageActions, 'setTotalPages')

      renderVacancyListPage({
        vacancy: {
          all: [],
          filtered: [],
        },
        page: {
          activePageNumber: 1,
          activePageList: [],
          total: 0,
          pageLimit: 4,
        },
      })

      expect(setTotalPagesSpy).not.toHaveBeenCalled()
    })
  })
})