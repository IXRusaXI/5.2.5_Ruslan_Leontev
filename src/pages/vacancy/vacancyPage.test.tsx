// src/pages/VacancyPage/VacancyPage.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { renderWithProviders } from '../../test-utils/render'
import * as ParamTool from '../../tools/params/ParamTool'
import type { Vacancy } from '../types/types'
import VacancyPage from './vacancyPage'

// Мокируем useQueryParams
vi.mock('../../tools/params/ParamTool', () => ({
  useQueryParams: vi.fn(),
}))

// Мок-данные вакансии
const mockVacancy: Vacancy = {
  id: '123',
  name: 'Frontend разработчик',
  salary: { from: 150000, to: 250000, currency: 'RUR' },
  experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
  employer: {
    id: 'employer1',
    name: 'ООО "Технологии"',
    employerDescription: 'Мы — крупная IT-компания, специализирующаяся на разработке веб-приложений.',
  },
  schedule: { id: 'fullDay', name: 'Полный день' },
  area: { id: 'area1', name: 'Москва' },
  description: 'Требуется опытный Frontend разработчик для работы над корпоративными проектами. Работа с React, TypeScript, Redux.',
  snippet: { requirement: 'React, TypeScript' },
} as Vacancy

// Helper для рендера с Router и params
function renderVacancyPage(vacancyId: string, getVacancyByIdMock: (id: string) => Vacancy | undefined) {
  vi.mocked(ParamTool.useQueryParams).mockReturnValue({
    getVacancyById: getVacancyByIdMock,
  } as any)

  return renderWithProviders(
    <MemoryRouter initialEntries={[`/vacancy/${vacancyId}`]}>
      <Routes>
        <Route path="/vacancy/:id" element={<VacancyPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('VacancyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('базовый рендер', () => {
    // Проверяет, что VacancyCard отображается с данными вакансии
    it('отображает VacancyCard с информацией о вакансии', () => {
      const getVacancyByIdMock = vi.fn(() => mockVacancy)
      renderVacancyPage('123', getVacancyByIdMock)

      expect(screen.getByRole('heading', { name: 'Frontend разработчик' })).toBeInTheDocument()
      expect(screen.getByText('150000 - 250000 ₽')).toBeInTheDocument()
      expect(screen.getByText('От 1 года до 3 лет')).toBeInTheDocument()
      expect(screen.getByText('ООО "Технологии"')).toBeInTheDocument()
    })

    // Проверяет, что секция "Компания" отображается
    it('отображает секцию "Компания" с описанием работодателя', () => {
      const getVacancyByIdMock = vi.fn(() => mockVacancy)
      renderVacancyPage('123', getVacancyByIdMock)

      expect(screen.getByRole('heading', { name: 'Компания' })).toBeInTheDocument()
      expect(screen.getByText('Мы — крупная IT-компания, специализирующаяся на разработке веб-приложений.')).toBeInTheDocument()
    })

    // Проверяет, что секция "О проекте" отображается
    it('отображает секцию "О проекте" с описанием вакансии', () => {
      const getVacancyByIdMock = vi.fn(() => mockVacancy)
      renderVacancyPage('123', getVacancyByIdMock)

      expect(screen.getByRole('heading', { name: 'О проекте:' })).toBeInTheDocument()
      expect(screen.getByText('Требуется опытный Frontend разработчик для работы над корпоративными проектами. Работа с React, TypeScript, Redux.')).toBeInTheDocument()
    })
  })

  describe('интеграция с useParams и useQueryParams', () => {
    // Проверяет, что getVacancyById вызывается с правильным id из params
    it('вызывает getVacancyById с id из useParams', () => {
      const getVacancyByIdMock = vi.fn(() => mockVacancy)
      renderVacancyPage('123', getVacancyByIdMock)

      expect(getVacancyByIdMock).toHaveBeenCalledWith('123')
    })

    // Проверяет, что при другом id вызывается getVacancyById с этим id
    it('вызывает getVacancyById с другим id', () => {
      const getVacancyByIdMock = vi.fn(() => mockVacancy)
      renderVacancyPage('456', getVacancyByIdMock)

      expect(getVacancyByIdMock).toHaveBeenCalledWith('456')
    })
  })

  describe('граничные случаи', () => {
    // Проверяет, что ничего не отображается, если вакансия не найдена
    it('не отображает контент, если getVacancyById возвращает undefined', () => {
      const getVacancyByIdMock = vi.fn(() => undefined)
      renderVacancyPage('999', getVacancyByIdMock)

      expect(screen.queryByRole('heading', { name: 'Frontend разработчик' })).not.toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: 'Компания' })).not.toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: 'О проекте:' })).not.toBeInTheDocument()
    })

    // Проверяет работу с вакансией без описания работодателя
    it('корректно отображает вакансию без employerDescription', () => {
      const vacancyWithoutEmployerDescription: Vacancy = {
        ...mockVacancy,
        employer: {
          ...mockVacancy.employer,
          employerDescription: undefined,
        },
      } as Vacancy

      const getVacancyByIdMock = vi.fn(() => vacancyWithoutEmployerDescription)
      renderVacancyPage('123', getVacancyByIdMock)

      expect(screen.getByRole('heading', { name: 'Компания' })).toBeInTheDocument()
      // Текст employerDescription не должен быть в документе
      expect(screen.queryByText('Мы — крупная IT-компания')).not.toBeInTheDocument()
    })

    // Проверяет работу с вакансией без описания проекта
    it('корректно отображает вакансию без description', () => {
      const vacancyWithoutDescription: Vacancy = {
        ...mockVacancy,
        description: undefined,
      } as Vacancy

      const getVacancyByIdMock = vi.fn(() => vacancyWithoutDescription)
      renderVacancyPage('123', getVacancyByIdMock)

      expect(screen.getByRole('heading', { name: 'О проекте:' })).toBeInTheDocument()
      // Текст description не должен быть в документе
      expect(screen.queryByText('Требуется опытный Frontend разработчик')).not.toBeInTheDocument()
    })

    // Проверяет работу с длинными описаниями
    it('корректно отображает длинные описания компании и проекта', () => {
      const vacancyWithLongDescriptions: Vacancy = {
        ...mockVacancy,
        employer: {
          ...mockVacancy.employer,
          employerDescription: 'Очень длинное описание компании, которое содержит множество деталей о том, чем занимается компания, какие проекты реализует, какие технологии использует и какие перспективы открываются перед сотрудниками.',
        },
        description: 'Очень длинное описание проекта, которое включает детальную информацию о задачах, технологическом стеке, методологиях разработки, командной работе и ожидаемых результатах от кандидата.',
      } as Vacancy

      const getVacancyByIdMock = vi.fn(() => vacancyWithLongDescriptions)
      renderVacancyPage('123', getVacancyByIdMock)

      expect(screen.getByText(/Очень длинное описание компании/)).toBeInTheDocument()
      expect(screen.getByText(/Очень длинное описание проекта/)).toBeInTheDocument()
    })

    // Проверяет работу с минимальными данными вакансии
    it('корректно отображает вакансию с минимальными данными', () => {
    const minimalVacancy: Vacancy = {
        id: '1',
        name: 'Разработчик',
        salary: null,
        experience: { id: 'noExperience', name: 'Без опыта' },
        employer: { id: 'emp1', name: 'Компания' },
        schedule: { id: 'other', name: 'Другое' },
        area: { id: 'area1', name: 'Москва' },
        description: 'Описание',
        snippet: undefined,
        alternate_url: 'https://hh.ru/vacancy/1',
    }

    const getVacancyByIdMock = vi.fn(() => minimalVacancy)
    renderVacancyPage('1', getVacancyByIdMock)

    expect(screen.getByRole('heading', { name: 'Разработчик' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Компания' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'О проекте:' })).toBeInTheDocument()
    expect(screen.getByText('Описание')).toBeInTheDocument()
    })
  })

  describe('структура компонента', () => {
    // Проверяет, что оба Container рендерятся при наличии вакансии
    it('рендерит два Container при наличии вакансии', () => {
      const getVacancyByIdMock = vi.fn(() => mockVacancy)
      const { container } = renderVacancyPage('123', getVacancyByIdMock)

      const containers = container.querySelectorAll('[class*="mantine-Container"]')
      expect(containers.length).toBe(2)
    })

    // Проверяет, что ShadowWrapper используется для секции "Компания"
    it('оборачивает секцию "Компания" в ShadowWrapper', () => {
      const getVacancyByIdMock = vi.fn(() => mockVacancy)
      const { container } = renderVacancyPage('123', getVacancyByIdMock)

      // ShadowWrapper создаёт Box с тенью
      const shadowWrappers = container.querySelectorAll('[style*="box-shadow"]')
      expect(shadowWrappers.length).toBeGreaterThan(0)
    })
  })
})