import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '../../test-utils/render'
import { useAppDispatch, useAppSelector } from '../../store/typedHooks'
import { filterActions } from '../../store/slices/filter/filterSlice'
import SkillSettings from './SkillSettings'

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

describe('SkillSettings', () => {
  it('рендерит заголовок, инпут навыка и список навыков', () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockReturnValue(dispatch)
    mockedUseAppSelector.mockReturnValue(['React', 'TypeScript'])

    renderWithProviders(<SkillSettings />)

    expect(screen.getByText('Ключевые навыки')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('добавляет навык по клику на кнопку с плюсиком', async () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockReturnValue(dispatch)
    mockedUseAppSelector.mockReturnValue([])

    const addSkillSpy = vi.spyOn(filterActions, 'addSkill')
    const user = userEvent.setup()

    renderWithProviders(<SkillSettings />)

    const input = screen.getByPlaceholderText('Навык')
    await user.type(input, 'React')

    const addButton = screen.getByRole('button')
    await user.click(addButton)

    expect(addSkillSpy).toHaveBeenCalledWith('React')
    expect(dispatch).toHaveBeenCalledWith(addSkillSpy.mock.results[0].value)
  })

  it('удаляет навык при клике на кнопку удаления у Pill', async () => {
    const dispatch = vi.fn()
    mockedUseAppDispatch.mockReturnValue(dispatch)
    mockedUseAppSelector.mockReturnValue(['React'])

    const removeSkillSpy = vi.spyOn(filterActions, 'removeSkill')
    const user = userEvent.setup()

    renderWithProviders(<SkillSettings />)

    const pill = screen.getByText('React')
    const pillRemoveButton = pill.parentElement?.querySelector('button') as HTMLButtonElement

    await user.click(pillRemoveButton)

    expect(removeSkillSpy).toHaveBeenCalledWith('React')
    expect(dispatch).toHaveBeenCalledWith(removeSkillSpy.mock.results[0].value)
  })
})

/*
Что проверяем:
- Рендерятся заголовок, инпут навыка и список навыков (массив из селектора).
- Ввод в инпут и клик по плюс‑кнопке диспатчат filterActions.addSkill с введённым значением.
- Клик по кнопке удаления внутри Pill диспатчит filterActions.removeSkill с нужным навыком.
*/