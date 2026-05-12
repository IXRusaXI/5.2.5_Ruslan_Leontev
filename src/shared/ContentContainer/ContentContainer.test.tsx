import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import { ContentContainer } from './ContentContainer'

describe('ContentContainer', () => {
  it('рендерит дочерний контент внутри контейнера', () => {
    renderWithProviders(
      <ContentContainer>
        <div>Тестовый контент</div>
      </ContentContainer>
    )

    const child = screen.getByText('Тестовый контент')
    expect(child).toBeInTheDocument()
  })

  it('позволяет рендерить несколько дочерних компонентов', () => {
    renderWithProviders(
      <ContentContainer>
        <span>Первый</span>
        <span>Второй</span>
      </ContentContainer>
    )

    expect(screen.getByText('Первый')).toBeInTheDocument()
    expect(screen.getByText('Второй')).toBeInTheDocument()
  })
})

/*
Что проверяем:
- Компонент рендерит переданный дочерний контент.
- Компонент корректно отображает несколько дочерних элементов.
*/