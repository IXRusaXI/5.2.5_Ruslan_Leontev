// src/components/CircleLoader/CircleLoader.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import CircleLoader from './CircleLoader'

describe('CircleLoader', () => {
  describe('базовый рендер', () => {
    // Проверяет, что компонент отображает изображение лоадера
    it('рендерит изображение лоадера', () => {
      renderWithProviders(<CircleLoader />)

      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
    })

    // Проверяет, что изображение имеет корректный src
    it('изображение имеет правильный src (loader.gif)', () => {
      renderWithProviders(<CircleLoader />)

      const image = screen.getByRole('img') as HTMLImageElement
      expect(image.src).toContain('loader.gif')
    })

    // Проверяет, что изображение доступно (имеет alt, даже если пустой)
    it('изображение доступно для скринридеров', () => {
      renderWithProviders(<CircleLoader />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt')
    })
  })

  describe('структура DOM', () => {
    // Проверяет, что компонент рендерится без ошибок
    it('рендерится без падения', () => {
      const { container } = renderWithProviders(<CircleLoader />)
      expect(container).toBeInTheDocument()
    })

    // Проверяет, что в DOM присутствует только одно изображение
    it('содержит ровно одно изображение', () => {
      renderWithProviders(<CircleLoader />)

      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(1)
    })
  })
})