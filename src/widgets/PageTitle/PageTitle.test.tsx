import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '../../test-utils/render'
import { useAppDispatch, useAppSelector } from '../../store/typedHooks'
import { filterActions } from '../../store/slices/filter/filterSlice'
import PageTitle from './PageTitle'

vi.mock('../../store/typedHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}))

const mockedUseAppDispatch = useAppDispatch as unknown as {
  mockReturnValue: (value: unknown) => void
}

const mockedUseAppSelector = useAppSelector as unknown as {
  mockReturnValue: (value: unknown) => void
}

describe('PageTitle', () => {
  it('рендерит заголовок, подзаголовок и кнопку "Найти"', () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockReturnValue(dispatch)
    mockedUseAppSelector.mockReturnValue({
      filter: { searchString: '' },
    })

    renderWithProviders(<PageTitle />)

    expect(screen.getByRole('heading', { level: 1, name: 'Список вакансий' })).toBeInTheDocument()
    expect(screen.getByText('По професии Frontend-разработчик')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Найти/i })).toBeInTheDocument()
  })

  it('обновляет локальное состояние инпута и диспатчит setSearchString по клику на "Найти"', async () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockReturnValue(dispatch)
    mockedUseAppSelector.mockReturnValue({
      filter: { searchString: '' },
    })

    const setSearchStringSpy = vi.spyOn(filterActions, 'setSearchString')
    const user = userEvent.setup()

    renderWithProviders(<PageTitle />)

    const input = screen.getByPlaceholderText('Должность или название компании')
    await user.type(input, 'React разработчик')

    const button = screen.getByRole('button', { name: /Найти/i })
    await user.click(button)

    expect(setSearchStringSpy).toHaveBeenCalledWith('React разработчик')
    expect(dispatch).toHaveBeenCalledWith(setSearchStringSpy.mock.results[0].value)
  })
})

/*
Что проверяем:
- Рендерятся заголовок, подзаголовок и кнопка "Найти".
- При вводе текста в инпут и клике по "Найти" диспатчится filterActions.setSearchString с введённой строкой.
*/