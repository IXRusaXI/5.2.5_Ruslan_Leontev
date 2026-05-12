import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test-utils/render'
import { useAppDispatch } from '../../store/typedHooks'
import CitySelector from './CitySelector'

vi.mock('../../store/typedHooks', () => ({
  useAppDispatch: vi.fn(),
}))

const mockedUseAppDispatch = useAppDispatch as unknown as {
  mockReturnValue: (value: unknown) => void
}

describe('CitySelector', () => {
  it('показывает город по умолчанию', async () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockReturnValue(dispatch)

    renderWithProviders(<CitySelector />)

    await waitFor(() => {
      expect(screen.getByText('Все города')).toBeInTheDocument()
    })
  })

  it('диспатчит updateCity при выборе города', async () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockReturnValue(dispatch)

    const user = userEvent.setup()
    renderWithProviders(<CitySelector />)

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByText('Москва'))

    expect(dispatch).toHaveBeenCalledWith({
      type: 'filter/updateCity',
      payload: 'Москва',
    })
  })
})