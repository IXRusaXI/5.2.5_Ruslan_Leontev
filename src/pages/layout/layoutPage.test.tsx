// src/pages/layout/layoutPage.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLoaderData } from 'react-router-dom'
import { renderWithProviders } from '../../test-utils/render'
import Layout from './layoutPage'
import * as vacanciesSlice from '../../store/slices/vacancies/vacanciesSlice'
import * as errorSlice from '../../store/slices/error/errorSlice'
import type { Vacancy } from '../types/types'

// Мокируем useLoaderData
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLoaderData: vi.fn(),
  }
})

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
  },
  {
    id: '2',
    name: 'React разработчик',
    salary: { from: 100000, to: 200000, currency: 'RUR' },
    experience: { id: 'noExperience', name: 'Без опыта' },
    employer: { id: 'employer2', name: 'Стартап' },
    schedule: { id: 'remote', name: 'Удаленная работа' },
    area: { id: 'area2', name: 'Санкт-Петербург' },
  },
] as Vacancy[]

describe('Layout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('базовый рендер', () => {
    // Проверяет, что Header отображается
    it('отображает компонент Header', () => {
      vi.mocked(useLoaderData).mockReturnValue({ vacancies: [], error: false })

      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Test Outlet Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      )

      expect(screen.getByRole('button', { name: 'hh' })).toBeInTheDocument()
      expect(screen.getByText('.FrontEnd')).toBeInTheDocument()
    })

    // Проверяет, что Outlet рендерит дочерние роуты
    it('рендерит Outlet с дочерними роутами', () => {
      vi.mocked(useLoaderData).mockReturnValue({ vacancies: [], error: false })

      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Test Outlet Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      )

      expect(screen.getByText('Test Outlet Content')).toBeInTheDocument()
    })
  })

  describe('интеграция с Redux', () => {
    // Проверяет, что при загрузке вакансий диспатчится setAllVacancies
    it('диспатчит setAllVacancies при загрузке вакансий', () => {
      const setAllVacanciesSpy = vi.spyOn(vacanciesSlice.vacanciesActions, 'setAllVacancies')
      vi.mocked(useLoaderData).mockReturnValue({ vacancies: mockVacancies, error: false })

      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      )

      expect(setAllVacanciesSpy).toHaveBeenCalledWith(mockVacancies)
    })

    // Проверяет, что при пустом массиве вакансий диспатчится пустой массив
    it('диспатчит setAllVacancies с пустым массивом', () => {
      const setAllVacanciesSpy = vi.spyOn(vacanciesSlice.vacanciesActions, 'setAllVacancies')
      vi.mocked(useLoaderData).mockReturnValue({ vacancies: [], error: false })

      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      )

      expect(setAllVacanciesSpy).toHaveBeenCalledWith([])
    })

    // Проверяет, что при error=true диспатчится showError
    it('диспатчит showError при наличии ошибки', () => {
      const showErrorSpy = vi.spyOn(errorSlice.errorActions, 'showError')
      vi.mocked(useLoaderData).mockReturnValue({ vacancies: [], error: true })

      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      )

      expect(showErrorSpy).toHaveBeenCalled()
    })

    // Проверяет, что при error=false НЕ диспатчится showError
    it('не диспатчит showError если ошибки нет', () => {
      const showErrorSpy = vi.spyOn(errorSlice.errorActions, 'showError')
      vi.mocked(useLoaderData).mockReturnValue({ vacancies: mockVacancies, error: false })

      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      )

      expect(showErrorSpy).not.toHaveBeenCalled()
    })
  })

  describe('граничные случаи', () => {
    // Проверяет работу с большим количеством вакансий
    it('корректно обрабатывает большой массив вакансий', () => {
      const setAllVacanciesSpy = vi.spyOn(vacanciesSlice.vacanciesActions, 'setAllVacancies')

      const manyVacancies = Array.from({ length: 100 }, (_, i) => ({
        ...mockVacancies[0],
        id: `${i}`,
        name: `Вакансия ${i}`,
      }))

      vi.mocked(useLoaderData).mockReturnValue({ vacancies: manyVacancies, error: false })

      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      )

      expect(setAllVacanciesSpy).toHaveBeenCalledWith(manyVacancies)
    })

    // Проверяет одновременную обработку вакансий и ошибки
    it('корректно обрабатывает вакансии и ошибку одновременно', () => {
      const setAllVacanciesSpy = vi.spyOn(vacanciesSlice.vacanciesActions, 'setAllVacancies')
      const showErrorSpy = vi.spyOn(errorSlice.errorActions, 'showError')

      vi.mocked(useLoaderData).mockReturnValue({ vacancies: mockVacancies, error: true })

      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      )

      expect(setAllVacanciesSpy).toHaveBeenCalledWith(mockVacancies)
      expect(showErrorSpy).toHaveBeenCalled()
    })
  })
})