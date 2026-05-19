// src/components/Logo/Logo.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import Logo from './Logo'

describe('Logo', () => {
  describe('базовый рендер', () => {
    // Проверяет, что кнопка с логотипом "hh" отображается
    it('отображает кнопку с логотипом "hh"', () => {
      renderWithProviders(<Logo />)

      const logoButton = screen.getByRole('button', { name: 'hh' })
      expect(logoButton).toBeInTheDocument()
    })

    // Проверяет, что текст ".FrontEnd" присутствует
    it('отображает текст ".FrontEnd"', () => {
      renderWithProviders(<Logo />)

      const text = screen.getByText('.FrontEnd')
      expect(text).toBeInTheDocument()
    })

    // Проверяет, что компонент содержит все основные элементы
    it('содержит кнопку и текст бренда', () => {
      renderWithProviders(<Logo />)

      expect(screen.getByRole('button', { name: 'hh' })).toBeInTheDocument()
      expect(screen.getByText('.FrontEnd')).toBeInTheDocument()
    })
  })
})