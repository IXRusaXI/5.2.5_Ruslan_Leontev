// src/widgets/Header/Header.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import { Header } from './Header'

describe('Header', () => {
  describe('базовый рендер', () => {
    // Проверяет, что Header рендерится как header-элемент
    it('рендерится как header элемент', () => {
      const { container } = renderWithProviders(<Header />)
      
      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    // Проверяет, что Logo отображается внутри Header
    it('отображает компонент Logo', () => {
      renderWithProviders(<Header />)
      
      // Logo содержит кнопку "hh" и текст ".FrontEnd"
      expect(screen.getByRole('button', { name: 'hh' })).toBeInTheDocument()
      expect(screen.getByText('.FrontEnd')).toBeInTheDocument()
    })

    // Проверяет, что MainMenu отображается внутри Header
    it('отображает компонент MainMenu', () => {
      renderWithProviders(<Header />)
      
      // MainMenu содержит пункты "Вакансии FE" и "Обо мне"
      expect(screen.getByText('Вакансии FE')).toBeInTheDocument()
      expect(screen.getByText('Обо мне')).toBeInTheDocument()
    })
  })

  describe('стили и структура', () => {
    // Проверяет, что header имеет белый фон и тень
    it('имеет белый фон и тень', () => {
      const { container } = renderWithProviders(<Header />)
      
      const header = container.querySelector('header') as HTMLElement
      expect(header.style.boxShadow).toBe('0 2px 6px rgba(15, 15, 16, 0.35)')
      expect(header.style.position).toBe('relative')
    })

    // Проверяет, что все ключевые элементы присутствуют
    it('содержит Logo и MainMenu', () => {
      renderWithProviders(<Header />)
      
      // Logo
      expect(screen.getByRole('button', { name: 'hh' })).toBeInTheDocument()
      
      // MainMenu
      expect(screen.getByText('Вакансии FE')).toBeInTheDocument()
      expect(screen.getByText('Обо мне')).toBeInTheDocument()
    })
  })
})