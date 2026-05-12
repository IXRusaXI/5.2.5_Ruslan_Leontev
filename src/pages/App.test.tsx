import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import { renderWithProviders } from './../test-utils/render'
import { useAppDispatch, useAppSelector } from './../store/typedHooks'
import { vacanciesActions } from './../store/slices/vacancies/vacanciesSlice'
import { pageActions } from './../store/slices/page/pageSlice'
import VacanciesData from './../pages/data/vacancies'
import type { Vacancy as VacancyType } from './../pages/types/types'

vi.mock('./../store/typedHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}))

vi.mock('./../pages/data/vacancies', () => ({
  default: [] as VacancyType[],
}))

const mockedUseAppDispatch = vi.mocked(useAppDispatch)
const mockedUseAppSelector = vi.mocked(useAppSelector)

describe('App', () => {
  it('рендерит базовый каркас приложения и сообщение об отсутствии вакансий', () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockImplementation(() => dispatch)

    // Порядок вызовов useAppSelector в App:
    //  city, activePageNumber, activePageList, total, filteredList, searchString, skills
    mockedUseAppSelector.mockReturnValueOnce('Все города') // city
    mockedUseAppSelector.mockReturnValueOnce(1)            // activePageNumber
    mockedUseAppSelector.mockReturnValueOnce([])           // activePageList
    mockedUseAppSelector.mockReturnValueOnce(0)            // total
    mockedUseAppSelector.mockReturnValueOnce([])           // filteredList
    mockedUseAppSelector.mockReturnValueOnce('')           // searchString
    mockedUseAppSelector.mockReturnValueOnce([])           // skills

    renderWithProviders(<App />)

    expect(screen.getByText('Список вакансий')).toBeInTheDocument()
    expect(screen.getByText('По професии Frontend-разработчик')).toBeInTheDocument()
    expect(screen.getByText('Ключевые навыки')).toBeInTheDocument()
    expect(screen.getByText('Вакансии по данному запросу не найдены')).toBeInTheDocument()
  })

  it('диспатчит установку всех вакансий при монтировании', () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockImplementation(() => dispatch)

    mockedUseAppSelector.mockReturnValueOnce('Все города') // city
    mockedUseAppSelector.mockReturnValueOnce(1)            // activePageNumber
    mockedUseAppSelector.mockReturnValueOnce([])           // activePageList
    mockedUseAppSelector.mockReturnValueOnce(0)            // total
    mockedUseAppSelector.mockReturnValueOnce([])           // filteredList
    mockedUseAppSelector.mockReturnValueOnce('')           // searchString
    mockedUseAppSelector.mockReturnValueOnce([])           // skills

    const setAllVacanciesSpy = vi.spyOn(vacanciesActions, 'setAllVacancies')

    renderWithProviders(<App />)

    expect(setAllVacanciesSpy).toHaveBeenCalledWith(VacanciesData)
    expect(dispatch).toHaveBeenCalledWith(setAllVacanciesSpy.mock.results[0].value)
  })

  it('отображает список вакансий и пагинацию, и позволяет менять страницу', async () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockImplementation(() => dispatch)

    const vacancies: VacancyType[] = [
      {
        id: '1',
        name: 'Frontend разработчик',
        url: 'https://example.com/vacancy/1',
        salary: {
          from: 100000,
          to: 150000,
          currency: 'RUR',
          gross: false,
        },
        area: {
          id: 'spb',
          name: 'Санкт-Петербург',
        },
        experience: {
          id: 'exp-3',
          name: 'Опыт от 3 лет',
        },
        schedule: {
          id: 'full-day',
          name: 'Полный день',
        },
        employer: {
          id: 'emp-1',
          name: 'Компания 1',
          logo_urls: {},
        },
        snippet: {},
        alternate_url: 'https://example.com/vacancy/1/alt',
        description: 'Описание 1',
      },
      {
        id: '2',
        name: 'React разработчик',
        url: 'https://example.com/vacancy/2',
        salary: {
          from: 150000,
          to: 200000,
          currency: 'RUR',
          gross: false,
        },
        area: {
          id: 'msk',
          name: 'Москва',
        },
        experience: {
          id: 'exp-5',
          name: 'Опыт от 5 лет',
        },
        schedule: {
          id: 'remote',
          name: 'Удаленная работа',
        },
        employer: {
          id: 'emp-2',
          name: 'Компания 2',
          logo_urls: {},
        },
        snippet: {},
        alternate_url: 'https://example.com/vacancy/2/alt',
        description: 'Описание 2',
      },
    ]

    mockedUseAppSelector.mockReturnValueOnce('Все города') // city
    mockedUseAppSelector.mockReturnValueOnce(1)            // activePageNumber
    mockedUseAppSelector.mockReturnValueOnce(vacancies)    // activePageList
    mockedUseAppSelector.mockReturnValueOnce(2)            // total
    mockedUseAppSelector.mockReturnValueOnce(vacancies)    // filteredList
    mockedUseAppSelector.mockReturnValueOnce('')           // searchString
    mockedUseAppSelector.mockReturnValueOnce([])           // skills

    const setPageSpy = vi.spyOn(pageActions, 'setPage')
    const user = userEvent.setup()

    renderWithProviders(<App />)

    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument()
    expect(screen.getByText('React разработчик')).toBeInTheDocument()

    const secondPageButton = screen.getByRole('button', { name: '2' })
    await user.click(secondPageButton)

    expect(setPageSpy).toHaveBeenCalledWith(2)
    expect(dispatch).toHaveBeenCalledWith(setPageSpy.mock.results[0].value)
  })
})

/*
Что проверяем:
- Базовый каркас приложения и сообщение об отсутствии вакансий при пустых данных.
- Dispatch vacanciesActions.setAllVacancies с VacanciesData при монтировании.
- Рендер списка вакансий и пагинации + dispatch pageActions.setPage при переключении страницы.
*/