import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '../../test-utils/render'
import SearchInput from './SearchInput'

describe('SearchInput', () => {
  it('рендерит инпут с плейсхолдером и иконкой', () => {
    const value = ''
    const handleChange = vi.fn()

    renderWithProviders(<SearchInput value={value} onChange={handleChange} />)

    const input = screen.getByPlaceholderText('Должность или название компании')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')

    const icon = screen.getByAltText('search')
    expect(icon).toBeInTheDocument()
  })

  it('вызывает onChange при вводе текста', async () => {
    const value = ''
    const handleChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<SearchInput value={value} onChange={handleChange} />)

    const input = screen.getByPlaceholderText('Должность или название компании')
    await user.type(input, 'Frontend')

    expect(handleChange).toHaveBeenCalled()
  })
})

/*
Что проверяем:
- Инпут рендерится с нужным плейсхолдером, значением и иконкой.
- При вводе текста в инпут вызывается переданный пропом onChange.
*/