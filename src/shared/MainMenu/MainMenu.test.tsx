// src/shared/MainMenu/MainMenu.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import MainMenu from './MainMenu'

describe('MainMenu', () => {
  describe('базовый рендер', () => {
    // Проверяет, что текст "Вакансии FE" отображается
    it('отображает текст "Вакансии FE"', () => {
      renderWithProviders(<MainMenu />)

      const vacanciesLink = screen.getByText('Вакансии FE')
      expect(vacanciesLink).toBeInTheDocument()
    })

    // Проверяет, что текст "Обо мне" отображается
    it('отображает текст "Обо мне"', () => {
      renderWithProviders(<MainMenu />)

      const aboutMeLink = screen.getByText('Обо мне')
      expect(aboutMeLink).toBeInTheDocument()
    })
  })

  describe('структура компонента', () => {
    // Проверяет, что меню содержит оба пункта
    it('содержит оба пункта меню', () => {
      renderWithProviders(<MainMenu />)

      expect(screen.getByText('Вакансии FE')).toBeInTheDocument()
      expect(screen.getByText('Обо мне')).toBeInTheDocument()
    })

    // Проверяет, что в компоненте ровно две иконки
    it('содержит две иконки', () => {
      renderWithProviders(<MainMenu />)

      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(2)
    })
  })

  describe('стили и позиционирование', () => {
    // Проверяет, что контейнер имеет абсолютное позиционирование по центру
    it('имеет центральное позиционирование', () => {
      const { container } = renderWithProviders(<MainMenu />)

      // Ищем элемент с inline-стилями позиционирования
      const box = container.querySelector('[style*="position"]') as HTMLElement
      expect(box).toBeTruthy()
      expect(box.style.position).toBe('absolute')
      expect(box.style.left).toBe('50%')
      expect(box.style.top).toBe('50%')
      expect(box.style.transform).toBe('translate(-50%, -50%)')
    })
  })
})