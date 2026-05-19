// src/components/SearchInput/SearchInput.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils/render'
import SearchInput from './SearchInput'

describe('SearchInput', () => {
  describe('базовый рендер', () => {
    // Проверяет, что инпут отображается с плейсхолдером
    it('отображает инпут с плейсхолдером', () => {
      const mockOnChange = vi.fn()
      renderWithProviders(<SearchInput value="" onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText('Должность или название компании')
      expect(input).toBeInTheDocument()
    })

    // Проверяет, что иконка поиска присутствует
    it('отображает иконку поиска', () => {
      const mockOnChange = vi.fn()
      renderWithProviders(<SearchInput value="" onChange={mockOnChange} />)

      const searchIcon = screen.getByAltText('search')
      expect(searchIcon).toBeInTheDocument()
    })
  })

  describe('взаимодействие с пропами', () => {
    // Проверяет, что отображается переданное значение
    it('отображает переданное значение value', () => {
      const mockOnChange = vi.fn()
      renderWithProviders(<SearchInput value="Frontend разработчик" onChange={mockOnChange} />)

      const input = screen.getByDisplayValue('Frontend разработчик')
      expect(input).toBeInTheDocument()
    })

    // Проверяет, что инпут пустой при value=""
    it('отображает пустой инпут при value=""', () => {
      const mockOnChange = vi.fn()
      renderWithProviders(<SearchInput value="" onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText('Должность или название компании') as HTMLInputElement
      expect(input.value).toBe('')
    })
  })

  describe('поведение onChange', () => {
    // Проверяет, что onChange вызывается при вводе текста
    it('вызывает onChange при вводе текста', async () => {
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      renderWithProviders(<SearchInput value="" onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText('Должность или название компании')
      await user.type(input, 'React')

      expect(mockOnChange).toHaveBeenCalled()
      expect(mockOnChange).toHaveBeenCalledTimes(5) // По одному вызову на каждую букву
    })

    // Проверяет, что onChange получает корректный event
    it('передает корректный event в onChange', async () => {
        const user = userEvent.setup()
        const mockOnChange = vi.fn()
        renderWithProviders(<SearchInput value="" onChange={mockOnChange} />)

        const input = screen.getByPlaceholderText('Должность или название компании')
        await user.type(input, 'T')

        // Проверяем, что onChange был вызван с SyntheticEvent
        expect(mockOnChange).toHaveBeenCalled()
        const firstCall = mockOnChange.mock.calls[0][0]
        expect(firstCall).toHaveProperty('target')
        expect(firstCall).toHaveProperty('type', 'change')
    })

    // Проверяет, что onChange вызывается при очистке поля
    it('вызывает onChange при очистке поля', async () => {
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      renderWithProviders(<SearchInput value="Test" onChange={mockOnChange} />)

      const input = screen.getByDisplayValue('Test')
      await user.clear(input)

      expect(mockOnChange).toHaveBeenCalled()
    })
  })

  describe('пользовательские действия', () => {
    // Проверяет, что можно вводить текст в инпут
    it('позволяет вводить текст', async () => {
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      
      const { rerender } = renderWithProviders(<SearchInput value="" onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText('Должность или название компании')
      await user.type(input, 'Vue')

      // Эмулируем обновление value через родительский компонент
      rerender(<SearchInput value="Vue" onChange={mockOnChange} />)

      expect(screen.getByDisplayValue('Vue')).toBeInTheDocument()
    })

    // Проверяет, что инпут можно фокусировать
    it('можно фокусировать инпут', async () => {
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      renderWithProviders(<SearchInput value="" onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText('Должность или название компании')
      await user.click(input)

      expect(input).toHaveFocus()
    })
  })

  describe('граничные случаи', () => {
    // Проверяет работу с длинным текстом
    it('корректно работает с длинным текстом', () => {
      const mockOnChange = vi.fn()
      const longText = 'Очень длинная должность Senior Frontend разработчик в международной компании'
      
      renderWithProviders(<SearchInput value={longText} onChange={mockOnChange} />)

      const input = screen.getByDisplayValue(longText)
      expect(input).toBeInTheDocument()
    })

    // Проверяет работу со спецсимволами
    it('корректно работает со спецсимволами', () => {
      const mockOnChange = vi.fn()
      const specialChars = 'C++ / C# разработчик @Company™'
      
      renderWithProviders(<SearchInput value={specialChars} onChange={mockOnChange} />)

      const input = screen.getByDisplayValue(specialChars)
      expect(input).toBeInTheDocument()
    })

    // Проверяет работу с кириллицей и латиницей
    it('корректно работает с кириллицей и латиницей', async () => {
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      
      renderWithProviders(<SearchInput value="" onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText('Должность или название компании')
      await user.type(input, 'Frontend Разработчик')

      expect(mockOnChange).toHaveBeenCalled()
    })
  })
})