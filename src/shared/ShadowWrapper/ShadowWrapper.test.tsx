// src/components/ShadowWrapper/ShadowWrapper.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import ShadowWrapper from './ShadowWrapper'

describe('ShadowWrapper', () => {
  describe('базовый рендер', () => {
    // Проверяет, что ShadowWrapper рендерит переданные children
    it('рендерит переданные children', () => {
      renderWithProviders(
        <ShadowWrapper>
          <div>Child content</div>
        </ShadowWrapper>
      )

      expect(screen.getByText('Child content')).toBeInTheDocument()
    })

    // Проверяет, что внутри есть один Card (Mantine рендерит обёртку)
    it('содержит контейнер Card', () => {
      const { container } = renderWithProviders(
        <ShadowWrapper>
          <span>Inner</span>
        </ShadowWrapper>
      )

      // Ищем ближайший элемент с inline-стилем boxShadow (явно заданный в компоненте)
      const card = container.querySelector('[style*="box-shadow"], [style*="boxShadow"]')
      expect(card).toBeTruthy()
    })
  })

  describe('взаимодействие с children', () => {
    // Проверяет, что можно вкладывать любые элементы (текст, элементы, компоненты)
    it('поддерживает различные типы children', () => {
      renderWithProviders(
        <ShadowWrapper>
          <>
            <p>Paragraph</p>
            <button>Button</button>
          </>
        </ShadowWrapper>
      )

      expect(screen.getByText('Paragraph')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
    })
  })

  describe('граничные случаи', () => {
    // Проверяет, что компонент рендерится, даже если children пусты
    it('рендерится с пустыми children (null)', () => {
      const { container } = renderWithProviders(<ShadowWrapper>{null}</ShadowWrapper>)
      // Достаточно проверить, что контейнер существует
      expect(container).toBeInTheDocument()
    })
  })
})