// src/components/ContentContainer/ContentContainer.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import ContentContainer from './ContentContainer'

describe('ContentContainer', () => {
  describe('базовый рендер', () => {
    // Проверяет, что компонент рендерится без ошибок
    it('рендерится без падения', () => {
      const { container } = renderWithProviders(
        <ContentContainer>
          <div>Test content</div>
        </ContentContainer>
      )

      expect(container).toBeInTheDocument()
    })

    // Проверяет, что children отображаются в DOM
    it('отображает переданные children', () => {
      renderWithProviders(
        <ContentContainer>
          <div>Test content</div>
        </ContentContainer>
      )

      expect(screen.getByText('Test content')).toBeInTheDocument()
    })
  })

  describe('взаимодействие с пропами', () => {
    // Проверяет, что компонент рендерит текстовый children
    it('рендерит текстовый children', () => {
      renderWithProviders(
        <ContentContainer>Simple text</ContentContainer>
      )

      expect(screen.getByText('Simple text')).toBeInTheDocument()
    })

    // Проверяет, что компонент рендерит множественные children
    it('рендерит множественные children', () => {
      renderWithProviders(
        <ContentContainer>
          <p>First child</p>
          <p>Second child</p>
          <span>Third child</span>
        </ContentContainer>
      )

      expect(screen.getByText('First child')).toBeInTheDocument()
      expect(screen.getByText('Second child')).toBeInTheDocument()
      expect(screen.getByText('Third child')).toBeInTheDocument()
    })

    // Проверяет, что компонент рендерит сложные вложенные структуры
    it('рендерит сложные вложенные структуры', () => {
      renderWithProviders(
        <ContentContainer>
          <div>
            <header>Header</header>
            <main>
              <article>Article content</article>
            </main>
            <footer>Footer</footer>
          </div>
        </ContentContainer>
      )

      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Article content')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })
  })

  describe('граничные случаи', () => {
    // Проверяет, что компонент корректно работает с пустым children
    it('рендерится с пустым children (null)', () => {
      const { container } = renderWithProviders(
        <ContentContainer>{null}</ContentContainer>
      )

      expect(container).toBeInTheDocument()
    })

    // Проверяет, что компонент корректно работает с undefined
    it('рендерится с undefined children', () => {
      const { container } = renderWithProviders(
        <ContentContainer>{undefined}</ContentContainer>
      )

      expect(container).toBeInTheDocument()
    })

    // Проверяет, что компонент корректно работает с пустой строкой
    it('рендерится с пустой строкой', () => {
      const { container } = renderWithProviders(
        <ContentContainer>{''}</ContentContainer>
      )

      expect(container).toBeInTheDocument()
    })

    // Проверяет, что компонент корректно работает с числовым children
    it('рендерит числовой children', () => {
      renderWithProviders(
        <ContentContainer>{42}</ContentContainer>
      )

      expect(screen.getByText('42')).toBeInTheDocument()
    })

    // Проверяет, что компонент корректно работает с массивом children
    it('рендерит массив children', () => {
      renderWithProviders(
        <ContentContainer>
          {['Item 1', 'Item 2', 'Item 3']}
        </ContentContainer>
      )

      expect(screen.getByText(/Item 1Item 2Item 3/)).toBeInTheDocument()
    })
  })

  describe('композиция компонентов', () => {
    // Проверяет, что внутри ContentContainer можно использовать другие Mantine-компоненты
    it('поддерживает композицию с другими компонентами', () => {
      renderWithProviders(
        <ContentContainer>
          <button>Click me</button>
          <input placeholder="Type here" />
        </ContentContainer>
      )

      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
    })

    // Проверяет, что можно вкладывать ContentContainer друг в друга
    it('поддерживает вложенность ContentContainer', () => {
      renderWithProviders(
        <ContentContainer>
          <div>Outer</div>
          <ContentContainer>
            <div>Inner</div>
          </ContentContainer>
        </ContentContainer>
      )

      expect(screen.getByText('Outer')).toBeInTheDocument()
      expect(screen.getByText('Inner')).toBeInTheDocument()
    })
  })
})