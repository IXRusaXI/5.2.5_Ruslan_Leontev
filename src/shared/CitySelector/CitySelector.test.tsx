// src/components/CitySelector/CitySelector.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils/render'
import CitySelector from './CitySelector'
import * as filterSlice from '../../store/slices/filter/filterSlice'
import * as ParamTool from '../../tools/params/ParamTool'

// Мокаем useQueryParams
vi.mock('../../tools/params/ParamTool', () => ({
  useQueryParams: vi.fn(),
}))

describe('CitySelector', () => {
  const mockUpdateCity = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Настраиваем дефолтный мок для useQueryParams
    vi.mocked(ParamTool.useQueryParams).mockReturnValue({
      updateCity: mockUpdateCity,
    } as any)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('базовый рендер', () => {
    // Проверяет, что селектор отображается в DOM
    it('рендерит Select компонент', () => {
      renderWithProviders(<CitySelector />)

      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
    })

    // Проверяет, что иконка геометки присутствует
    it('отображает иконку геометки слева от селектора', () => {
      renderWithProviders(<CitySelector />)

      const icon = screen.getByRole('img')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('height', '18')
      expect(icon).toHaveAttribute('width', '18')
    })

    // Проверяет, что значение по умолчанию берётся из Redux store
    it('отображает значение города из Redux store', () => {
      renderWithProviders(<CitySelector />, {
        preloadedState: {
          filter: { city: 'Москва' },
        } as any,
      })

      const select = screen.getByRole('combobox') as HTMLInputElement
      expect(select.value).toBe('Москва')
    })
  })

  describe('взаимодействие с Redux', () => {
    // Проверяет, что при изменении значения диспатчится экшен updateCity
    it('диспатчит filterActions.updateCity при выборе города', async () => {
      const user = userEvent.setup()
      const dispatchSpy = vi.spyOn(filterSlice.filterActions, 'updateCity')

      renderWithProviders(<CitySelector />, {
        preloadedState: {
          filter: { city: 'Все города' },
        } as any,
      })

      const select = screen.getByRole('combobox')
      await user.click(select)

      const option = await screen.findByText('Санкт‑Петербург')
      await user.click(option)

      expect(dispatchSpy).toHaveBeenCalledWith('Санкт‑Петербург')
    })

    // Проверяет, что компонент читает актуальное значение city из store
    it('читает city из state.filter.city', () => {
      renderWithProviders(<CitySelector />, {
        preloadedState: {
          filter: { city: 'Екатеринбург' },
        } as any,
      })

      const select = screen.getByRole('combobox') as HTMLInputElement
      expect(select.value).toBe('Екатеринбург')
    })
  })

  describe('интеграция с useQueryParams', () => {
    // Проверяет, что при выборе города вызывается updateCity из useQueryParams
    it('вызывает updateCity из useQueryParams при выборе города', async () => {
      const user = userEvent.setup()

      renderWithProviders(<CitySelector />, {
        preloadedState: {
          filter: { city: 'Все города' },
        } as any,
      })

      const select = screen.getByRole('combobox')
      await user.click(select)

      const option = await screen.findByText('Тула')
      await user.click(option)

      expect(mockUpdateCity).toHaveBeenCalledWith('Тула')
      expect(mockUpdateCity).toHaveBeenCalledTimes(1)
    })
  })

  describe('поведение onChange', () => {
    // Проверяет, что при выборе города обновляется значение селектора
    it('обновляет значение селектора при выборе города', async () => {
      const user = userEvent.setup()

      const { store } = renderWithProviders(<CitySelector />, {
        preloadedState: {
          filter: { city: 'Все города' },
        } as any,
      })

      const select = screen.getByRole('combobox')
      await user.click(select)

      const option = await screen.findByText('Чернобыль')
      await user.click(option)

      // Проверяем, что в store обновилось значение
      expect(store.getState().filter.city).toBe('Чернобыль')
    })

    // Проверяет, что handleChange не вызывает action при value === null
    it('не диспатчит экшены, если value === null', async () => {
      const user = userEvent.setup()
      const dispatchSpy = vi.spyOn(filterSlice.filterActions, 'updateCity')

      renderWithProviders(<CitySelector />, {
        preloadedState: {
          filter: { city: 'Москва' },
        } as any,
      })

      const select = screen.getByRole('combobox')
      await user.click(select)
      await user.keyboard('{Escape}') // Закрываем без выбора

      // Проверяем, что экшены не вызывались после эскейпа
      const callCount = dispatchSpy.mock.calls.length
      expect(callCount).toBe(0)
    })
  })

  describe('список городов', () => {
    // Проверяет, что в селекторе доступны все города из data
    it('содержит все города из списка data', async () => {
      const user = userEvent.setup()

      renderWithProviders(<CitySelector />)

      const select = screen.getByRole('combobox')
      await user.click(select)

      expect(await screen.findByText('Все города')).toBeInTheDocument()
      expect(screen.getByText('Москва')).toBeInTheDocument()
      expect(screen.getByText('Санкт‑Петербург')).toBeInTheDocument()
      expect(screen.getByText('Чернобыль')).toBeInTheDocument()
      expect(screen.getByText('Екатеринбург')).toBeInTheDocument()
      expect(screen.getByText('Тула')).toBeInTheDocument()
    })
  })

  describe('граничные случаи', () => {
    // Проверяет, что компонент рендерится без падения при отсутствии city в store
    it('рендерится без падения, если city не задан в store', () => {
      renderWithProviders(<CitySelector />, {
        preloadedState: {
          filter: { city: '' },
        } as any,
      })

      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
    })

    // Проверяет, что компонент корректно работает с пустым значением
    it('корректно работает с пустым значением city', () => {
      renderWithProviders(<CitySelector />, {
        preloadedState: {
          filter: { city: '' },
        } as any,
      })

      const select = screen.getByRole('combobox') as HTMLInputElement
      expect(select.value).toBe('')
    })
  })
})