import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test-utils/render'
import { Vacancy } from './Vacancy'
import type { Vacancy as VacancyType } from '../../pages/types/types'

describe('Vacancy', () => {
  const baseVacancy: VacancyType = {
    id: '1',
    name: 'Frontend разработчик',
    url: 'https://example.com/vacancy/1',
    salary: {
      from: null,
      to: null,
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
      name: 'ООО Рога и Копыта',
      logo_urls: {
        '90': 'https://example.com/logo-90.png',
      },
    },
    snippet: {
      requirement: null,
      responsibility: null,
    },
    alternate_url: 'https://example.com/vacancy/1/alt',
    description: 'Описание вакансии',
  }

  it('рендерит основные данные вакансии и кнопки действий', () => {
    renderWithProviders(<Vacancy vacancy={baseVacancy} />)

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /Frontend разработчик/i,
      })
    ).toBeInTheDocument()

    expect(screen.getByText('Опыт от 3 лет')).toBeInTheDocument()
    expect(screen.getByText('ООО Рога и Копыта')).toBeInTheDocument()
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Смотреть вакансию' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Откликнуться' })).toBeInTheDocument()
  })

  it('отображает только "От {from}" когда указана только нижняя граница зарплаты', () => {
    const vacancy: VacancyType = {
      ...baseVacancy,
      salary: {
        from: 100000,
        to: null,
        currency: 'RUR',
        gross: false,
      },
    }

    renderWithProviders(<Vacancy vacancy={vacancy} />)

    expect(screen.getByText(/От 100000/)).toBeInTheDocument()
    expect(screen.queryByText(/До 100000/)).not.toBeInTheDocument()
  })

  it('отображает только "До {to}" когда указана только верхняя граница зарплаты', () => {
    const vacancy: VacancyType = {
      ...baseVacancy,
      salary: {
        from: null,
        to: 200000,
        currency: 'RUR',
        gross: false,
      },
    }

    renderWithProviders(<Vacancy vacancy={vacancy} />)

    expect(screen.getByText(/До 200000/)).toBeInTheDocument()
    expect(screen.queryByText(/От 200000/)).not.toBeInTheDocument()
  })

  it('отображает диапазон зарплаты, когда указаны обе границы', () => {
    const vacancy: VacancyType = {
      ...baseVacancy,
      salary: {
        from: 100000,
        to: 200000,
        currency: 'RUR',
        gross: false,
      },
    }

    renderWithProviders(<Vacancy vacancy={vacancy} />)

    expect(screen.getByText(/100000 - 200000/)).toBeInTheDocument()
  })

  it('отображает корректный бейдж для разных графиков работы', () => {
    const fullDayVacancy: VacancyType = {
      ...baseVacancy,
      schedule: { id: 'full-day', name: 'Полный день' },
    }

    const remoteVacancy: VacancyType = {
      ...baseVacancy,
      schedule: { id: 'remote', name: 'Удаленная работа' },
    }

    const flexibleVacancy: VacancyType = {
      ...baseVacancy,
      schedule: { id: 'flex', name: 'Гибкий график' },
    }

    renderWithProviders(
      <>
        <Vacancy vacancy={fullDayVacancy} />
        <Vacancy vacancy={remoteVacancy} />
        <Vacancy vacancy={flexibleVacancy} />
      </>
    )

    expect(screen.getByText('Полный день')).toBeInTheDocument()
    expect(screen.getByText('Удаленная работа')).toBeInTheDocument()
    expect(screen.getByText('Гибкий график')).toBeInTheDocument()
  })
})

/*
Что проверяем:
- Рендерятся основные данные вакансии (название, опыт, работодатель, город) и обе кнопки действий.
- Логика условного отображения зарплаты: только "От", только "До" и диапазон при обеих границах.
- Для разных значений schedule рендерятся корректные бейджи с текстами "Полный день", "Удаленная работа" и "Гибкий график".
*/