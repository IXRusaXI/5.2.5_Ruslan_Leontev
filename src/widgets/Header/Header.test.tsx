import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test-utils/render'
import { Header } from './Header'

vi.mock('./../../shared/Logo/Logo', () => ({
  default: () => <div>Mocked Logo</div>,
}))

vi.mock('./../../shared/MainMenu/MainMenu', () => ({
  default: () => <nav>Mocked MainMenu</nav>,
}))

describe('Header', () => {
  it('рендерит header с логотипом и меню', () => {
    renderWithProviders(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    expect(screen.getByText('Mocked Logo')).toBeInTheDocument()
    expect(screen.getByText('Mocked MainMenu')).toBeInTheDocument()
  })
})

/*
Что проверяем:
- Компонент рендерит семантический header (role="banner").
- Внутри header рендерятся Logo и MainMenu (замоканы упрощёнными компонентами).
*/