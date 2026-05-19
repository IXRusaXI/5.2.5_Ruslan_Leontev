// src/widgets/PageTitle/PageTitle.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils/render'
import PageTitle from './PageTitle'
import * as filterSlice from '../../store/slices/filter/filterSlice'
import * as ParamTool from '../../tools/params/ParamTool'

// Мокируем useQueryParams
vi.mock('../../tools/params/ParamTool', () => ({
  useQueryParams: vi.fn(),
}))

describe('PageTitle', () => {
  const mockUpdateSearchString = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Настраиваем мок useQueryParams
    vi.mocked(ParamTool.useQueryParams).mockReturnValue({
      updateSearchString: mockUpdateSearchString,
    } as any)
  })

  describe('базовый рендер', () => {
    // Проверяет, что заголовок "Список вакансий" отображается
    it('отображает заголовок "Список вакансий"', () => {
      renderWithProviders(<PageTitle />)

      expect(screen.getByRole('heading', { name: 'Список вакансий' })).toBeInTheDocument()
    })

    // Проверяет, что подзаголовок "По професии Frontend-разработчик" отображается
    it('отображает подзаголовок "По професии Frontend-разработчик"', () => {
      renderWithProviders(<PageTitle />)

      expect(screen.getByText('По професии Frontend-разработчик')).toBeInTheDocument()
    })

    // Проверяет, что SearchInput отображается
    it('отображает SearchInput', () => {
      renderWithProviders(<PageTitle />)

      const searchInput = screen.getByPlaceholderText('Должность или название компании')
      expect(searchInput).toBeInTheDocument()
    })

    // Проверяет, что кнопка "Найти" отображается
    it('отображает кнопку "Найти"', () => {
      renderWithProviders(<PageTitle />)

      expect(screen.getByRole('button', { name: 'Найти' })).toBeInTheDocument()
    })
  })

  describe('интеграция с Redux', () => {
    // Проверяет, что SearchInput синхронизируется с Redux state
    it('синхронизирует SearchInput с filter.searchString из Redux', () => {
      renderWithProviders(<PageTitle />, {
        preloadedState: {
          filter: {
            searchString: 'React разработчик',
            skills: [],
            city: 'Все города',
          },
        },
      })

      const searchInput = screen.getByDisplayValue('React разработчик')
      expect(searchInput).toBeInTheDocument()
    })

    // Проверяет, что при пустом searchString инпут пустой
    it('отображает пустой SearchInput при пустом filter.searchString', () => {
      renderWithProviders(<PageTitle />, {
        preloadedState: {
          filter: {
            searchString: '',
            skills: [],
            city: 'Все города',
          },
        },
      })

      const searchInput = screen.getByPlaceholderText('Должность или название компании') as HTMLInputElement
      expect(searchInput.value).toBe('')
    })
  })

  describe('поведение onChange', () => {
    // Проверяет, что ввод текста обновляет локальное состояние
    it('обновляет локальное состояние при вводе текста', async () => {
      const user = userEvent.setup()
      renderWithProviders(<PageTitle />)

      const searchInput = screen.getByPlaceholderText('Должность или название компании')
      await user.type(searchInput, 'Vue')

      expect(screen.getByDisplayValue('Vue')).toBeInTheDocument()
    })

    // Проверяет, что можно очистить инпут
    it('позволяет очистить инпут', async () => {
      const user = userEvent.setup()
      renderWithProviders(<PageTitle />, {
        preloadedState: {
          filter: {
            searchString: 'Angular',
            skills: [],
            city: 'Все города',
          },
        },
      })

      const searchInput = screen.getByDisplayValue('Angular')
      await user.clear(searchInput)

      expect((searchInput as HTMLInputElement).value).toBe('')
    })
  })

  describe('поведение onClick', () => {
    // Проверяет, что клик на "Найти" диспатчит setSearchString
    it('диспатчит filterActions.setSearchString при клике на "Найти"', async () => {
      const user = userEvent.setup()
      const setSearchStringSpy = vi.spyOn(filterSlice.filterActions, 'setSearchString')

      renderWithProviders(<PageTitle />)

      const searchInput = screen.getByPlaceholderText('Должность или название компании')
      const findButton = screen.getByRole('button', { name: 'Найти' })

      await user.type(searchInput, 'TypeScript')
      await user.click(findButton)

      expect(setSearchStringSpy).toHaveBeenCalledWith('TypeScript')
    })

    // Проверяет, что клик на "Найти" вызывает updateSearchString
    it('вызывает updateSearchString при клике на "Найти"', async () => {
      const user = userEvent.setup()
      renderWithProviders(<PageTitle />)

      const searchInput = screen.getByPlaceholderText('Должность или название компании')
      const findButton = screen.getByRole('button', { name: 'Найти' })

      await user.type(searchInput, 'JavaScript')
      await user.click(findButton)

      expect(mockUpdateSearchString).toHaveBeenCalledWith('JavaScript')
    })

    // Проверяет, что можно кликнуть "Найти" с пустым инпутом
    it('диспатчит пустую строку при клике на "Найти" с пустым инпутом', async () => {
      const user = userEvent.setup()
      const setSearchStringSpy = vi.spyOn(filterSlice.filterActions, 'setSearchString')

      renderWithProviders(<PageTitle />)

      const findButton = screen.getByRole('button', { name: 'Найти' })
      await user.click(findButton)

      expect(setSearchStringSpy).toHaveBeenCalledWith('')
    })
  })

  describe('useEffect синхронизация', () => {
    // Проверяет, что локальное состояние синхронизируется с Redux при изменении searchString
    it('синхронизирует локальное состояние с Redux при монтировании', () => {
        renderWithProviders(<PageTitle />, {
        preloadedState: {
            filter: {
            searchString: 'Rust',
            skills: [],
            city: 'Все города',
            },
        },
        })

        // После монтирования локальный state должен быть синхронизирован
        expect(screen.getByDisplayValue('Rust')).toBeInTheDocument()
    })
  })

  describe('граничные случаи', () => {
    // Проверяет работу с длинным текстом
    it('корректно работает с длинным текстом в SearchInput', async () => {
      const user = userEvent.setup()
      const setSearchStringSpy = vi.spyOn(filterSlice.filterActions, 'setSearchString')

      renderWithProviders(<PageTitle />)

      const searchInput = screen.getByPlaceholderText('Должность или название компании')
      const findButton = screen.getByRole('button', { name: 'Найти' })

      const longText = 'Senior Frontend разработчик с опытом работы более 5 лет в международной компании'
      await user.type(searchInput, longText)
      await user.click(findButton)

      expect(setSearchStringSpy).toHaveBeenCalledWith(longText)
    })

    // Проверяет работу со спецсимволами
    it('корректно работает со спецсимволами', async () => {
      const user = userEvent.setup()
      const setSearchStringSpy = vi.spyOn(filterSlice.filterActions, 'setSearchString')

      renderWithProviders(<PageTitle />)

      const searchInput = screen.getByPlaceholderText('Должность или название компании')
      const findButton = screen.getByRole('button', { name: 'Найти' })

      await user.type(searchInput, 'C++ / C#')
      await user.click(findButton)

      expect(setSearchStringSpy).toHaveBeenCalledWith('C++ / C#')
    })
  })
})