// src/widgets/Vacancy/Vacancy.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../test-utils/render'
import { Vacancy } from './Vacancy'
import type { Vacancy as VacancyType } from '../../pages/types/types'

// Helper для рендера компонента с Router
function renderVacancy(vacancy: VacancyType) {
  return renderWithProviders(
    <BrowserRouter>
      <Vacancy vacancy={vacancy} />
    </BrowserRouter>
  )
}

// Мок-данные вакансии
const mockVacancy: VacancyType = {
  id: '12345',
  name: 'Frontend разработчик',
  salary: {
    from: 150000,
    to: 250000,
    currency: 'RUR',
  },
  experience: {
    id: 'between1And3',
    name: 'От 1 года до 3 лет',
  },
  employer: {
    id: 'employer1',
    name: 'ООО "Технологии"',
  },
  schedule: {
    id: 'fullDay',
    name: 'Полный день',
  },
  area: {
    id: 'area1',
    name: 'Москва',
  },
} as VacancyType

describe('Vacancy', () => {
  describe('базовый рендер', () => {
    // Проверяет, что название вакансии отображается
    it('отображает название вакансии', () => {
      renderVacancy(mockVacancy)

      expect(screen.getByRole('heading', { name: 'Frontend разработчик' })).toBeInTheDocument()
    })

    // Проверяет, что диапазон зарплаты отображается
    it('отображает диапазон зарплаты', () => {
      renderVacancy(mockVacancy)

      expect(screen.getByText('150000 - 250000 ₽')).toBeInTheDocument()
    })

    // Проверяет, что требуемый опыт отображается
    it('отображает требуемый опыт работы', () => {
      renderVacancy(mockVacancy)

      expect(screen.getByText('От 1 года до 3 лет')).toBeInTheDocument()
    })

    // Проверяет, что название компании отображается
    it('отображает название работодателя', () => {
      renderVacancy(mockVacancy)

      expect(screen.getByText('ООО "Технологии"')).toBeInTheDocument()
    })

    // Проверяет, что график работы отображается
    it('отображает график работы с бейджем', () => {
      renderVacancy(mockVacancy)

      expect(screen.getByText('Полный день')).toBeInTheDocument()
    })

    // Проверяет, что город отображается
    it('отображает город вакансии', () => {
      renderVacancy(mockVacancy)

      expect(screen.getByText('Москва')).toBeInTheDocument()
    })

    // Проверяет, что обе кнопки отображаются
    it('отображает кнопки "Смотреть вакансию" и "Откликнуться"', () => {
      renderVacancy(mockVacancy)

      expect(screen.getByRole('link', { name: /смотреть вакансию/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Откликнуться' })).toBeInTheDocument()
    })
  })

  describe('отображение зарплаты', () => {
    // Проверяет отображение "От X ₽"
    it('отображает "От X ₽" если указан только минимум', () => {
      const vacancyWithMinSalary: VacancyType = {
        ...mockVacancy,
        salary: { from: 100000, to: null, currency: 'RUR' },
      } as VacancyType

      renderVacancy(vacancyWithMinSalary)

      expect(screen.getByText('От 100000 ₽')).toBeInTheDocument()
    })

    // Проверяет отображение "До X ₽"
    it('отображает "До X ₽" если указан только максимум', () => {
      const vacancyWithMaxSalary: VacancyType = {
        ...mockVacancy,
        salary: { from: null, to: 200000, currency: 'RUR' },
      } as VacancyType

      renderVacancy(vacancyWithMaxSalary)

      expect(screen.getByText('До 200000 ₽')).toBeInTheDocument()
    })

    // Проверяет отсутствие зарплаты, если salary = null
    it('не отображает зарплату если salary отсутствует', () => {
      const vacancyWithoutSalary: VacancyType = {
        ...mockVacancy,
        salary: null,
      } as VacancyType

      renderVacancy(vacancyWithoutSalary)

      expect(screen.queryByText(/₽/)).not.toBeInTheDocument()
    })
  })

  describe('бейджи графика работы', () => {
    // Проверяет красный бейдж для "Полный день"
    it('отображает красный бейдж для "Полный день"', () => {
      renderVacancy(mockVacancy)

      const badge = screen.getByText('Полный день')
      expect(badge).toBeInTheDocument()
      // Mantine Badge с color='red' имеет data-атрибут
      expect(badge.closest('[class*="mantine-Badge"]')).toBeInTheDocument()
    })

    // Проверяет зелёный бейдж для "Удаленная работа"
    it('отображает зелёный бейдж для "Удаленная работа"', () => {
      const remoteVacancy: VacancyType = {
        ...mockVacancy,
        schedule: { id: 'remote', name: 'Удаленная работа' },
      } as VacancyType

      renderVacancy(remoteVacancy)

      expect(screen.getByText('Удаленная работа')).toBeInTheDocument()
    })

    // Проверяет дефолтный бейдж для "Гибкий график"
    it('отображает бейдж для "Гибкий график"', () => {
      const flexibleVacancy: VacancyType = {
        ...mockVacancy,
        schedule: { id: 'flexible', name: 'Гибкий график' },
      } as VacancyType

      renderVacancy(flexibleVacancy)

      expect(screen.getByText('Гибкий график')).toBeInTheDocument()
    })

    // Проверяет отсутствие бейджа для других графиков
    it('не отображает бейдж для других графиков работы', () => {
      const otherScheduleVacancy: VacancyType = {
        ...mockVacancy,
        schedule: { id: 'shift', name: 'Сменный график' },
      } as VacancyType

      renderVacancy(otherScheduleVacancy)

      expect(screen.queryByText('Сменный график')).not.toBeInTheDocument()
    })
  })

  describe('ссылка на детальную страницу', () => {
    // Проверяет, что ссылка ведёт на /vacancy/:id
    it('ссылка "Смотреть вакансию" ведёт на /vacancy/:id', () => {
      renderVacancy(mockVacancy)

      const link = screen.getByRole('link', { name: /смотреть вакансию/i })
      expect(link).toHaveAttribute('href', '/vacancy/12345')
    })
  })

  describe('граничные случаи', () => {
    // Проверяет работу с длинными названиями вакансий
    it('корректно отображает длинное название вакансии', () => {
      const longNameVacancy: VacancyType = {
        ...mockVacancy,
        name: 'Senior Frontend разработчик (React/TypeScript/Redux) с опытом работы более 5 лет',
      }

      renderVacancy(longNameVacancy)

      expect(screen.getByRole('heading', { 
        name: 'Senior Frontend разработчик (React/TypeScript/Redux) с опытом работы более 5 лет' 
      })).toBeInTheDocument()
    })

    // Проверяет работу с длинными названиями компаний
    it('корректно отображает длинное название работодателя', () => {
      const longEmployerVacancy: VacancyType = {
        ...mockVacancy,
        employer: {
          id: 'employer2',
          name: 'Общество с ограниченной ответственностью "Международные технологии и инновации"',
        },
      } as VacancyType

      renderVacancy(longEmployerVacancy)

      expect(screen.getByText('Общество с ограниченной ответственностью "Международные технологии и инновации"')).toBeInTheDocument()
    })

    // Проверяет работу с минимальными данными
    it('корректно отображает вакансию с минимальными данными', () => {
      const minimalVacancy: VacancyType = {
        id: '1',
        name: 'Разработчик',
        salary: null,
        experience: { id: 'noExperience', name: 'Без опыта' },
        employer: { id: 'emp1', name: 'Компания' },
        schedule: { id: 'other', name: 'Другое' },
        area: { id: 'area1', name: 'Санкт-Петербург' },
      } as VacancyType

      renderVacancy(minimalVacancy)

      expect(screen.getByRole('heading', { name: 'Разработчик' })).toBeInTheDocument()
      expect(screen.getByText('Без опыта')).toBeInTheDocument()
      expect(screen.getByText('Компания')).toBeInTheDocument()
      expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument()
    })
  })
})