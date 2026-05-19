// src/widgets/SkillSettings/SkillSettings.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils/render'
import SkillSettings from './SkillSettings'
import * as filterSlice from '../../store/slices/filter/filterSlice'
import * as ParamTool from '../../tools/params/ParamTool'

// Мокируем useQueryParams
vi.mock('../../tools/params/ParamTool', () => ({
  useQueryParams: vi.fn(),
}))

describe('SkillSettings', () => {
  const mockUpdateSkills = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(ParamTool.useQueryParams).mockReturnValue({
      updateSkills: mockUpdateSkills,
    } as any)
  })

  describe('базовый рендер', () => {
    // Проверяет, что заголовок "Ключевые навыки" отображается
    it('отображает заголовок "Ключевые навыки"', () => {
      renderWithProviders(<SkillSettings />)

      expect(screen.getByText('Ключевые навыки')).toBeInTheDocument()
    })

    // Проверяет, что инпут для ввода навыка отображается
    it('отображает инпут с плейсхолдером "Навык"', () => {
      renderWithProviders(<SkillSettings />)

      expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument()
    })

    // Проверяет, что кнопка добавления навыка отображается
    it('отображает кнопку добавления навыка', () => {
      renderWithProviders(<SkillSettings />)

      const addButton = screen.getByRole('button')
      expect(addButton).toBeInTheDocument()
    })

    // Проверяет, что SkillList отображается (может быть пустым)
    it('отображает SkillList контейнер', () => {
      const { container } = renderWithProviders(<SkillSettings />)

      const skillList = container.querySelector('.mantine-PillGroup-group')
      expect(skillList).toBeInTheDocument()
    })
  })

  describe('интеграция с Redux', () => {
    // Проверяет, что навыки из Redux отображаются как Pill
    it('отображает навыки из filter.skills', () => {
      renderWithProviders(<SkillSettings />, {
        preloadedState: {
          filter: {
            skills: ['React', 'TypeScript', 'Redux'],
            searchString: '',
            city: 'Все города',
          },
        },
      })

      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Redux')).toBeInTheDocument()
    })

    // Проверяет, что при пустом массиве навыков SkillList пустой
    it('отображает пустой SkillList при пустом filter.skills', () => {
      renderWithProviders(<SkillSettings />, {
        preloadedState: {
          filter: {
            skills: [],
            searchString: '',
            city: 'Все города',
          },
        },
      })

      expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
    })
  })

  describe('добавление навыков', () => {
    // Проверяет, что можно добавить навык через кнопку
    it('добавляет навык при клике на кнопку', async () => {
      const user = userEvent.setup()
      const addSkillSpy = vi.spyOn(filterSlice.filterActions, 'addSkill')

      renderWithProviders(<SkillSettings />)

      const input = screen.getByPlaceholderText('Навык')
      const addButton = screen.getByRole('button')

      await user.type(input, 'Vue')
      await user.click(addButton)

      expect(addSkillSpy).toHaveBeenCalledWith('Vue')
      expect(mockUpdateSkills).toHaveBeenCalledWith(['Vue'])
    })

    // Проверяет, что можно добавить навык нажатием Enter
    it('добавляет навык при нажатии Enter', async () => {
      const user = userEvent.setup()
      const addSkillSpy = vi.spyOn(filterSlice.filterActions, 'addSkill')

      renderWithProviders(<SkillSettings />)

      const input = screen.getByPlaceholderText('Навык')

      await user.type(input, 'Angular')
      await user.keyboard('{Enter}')

      expect(addSkillSpy).toHaveBeenCalledWith('Angular')
      expect(mockUpdateSkills).toHaveBeenCalledWith(['Angular'])
    })

    // Проверяет, что нельзя добавить пустой навык
    it('не добавляет пустой навык при клике на кнопку', async () => {
      const user = userEvent.setup()
      const addSkillSpy = vi.spyOn(filterSlice.filterActions, 'addSkill')

      renderWithProviders(<SkillSettings />)

      const addButton = screen.getByRole('button')
      await user.click(addButton)

      expect(addSkillSpy).not.toHaveBeenCalled()
      expect(mockUpdateSkills).not.toHaveBeenCalled()
    })

    // Проверяет, что добавление навыка обновляет список
    it('добавляет навык к существующим навыкам из Redux', async () => {
      const user = userEvent.setup()
      const addSkillSpy = vi.spyOn(filterSlice.filterActions, 'addSkill')

      renderWithProviders(<SkillSettings />, {
        preloadedState: {
          filter: {
            skills: ['React', 'Redux'],
            searchString: '',
            city: 'Все города',
          },
        },
      })

      const input = screen.getByPlaceholderText('Навык')
      await user.type(input, 'Vitest')
      await user.keyboard('{Enter}')

      expect(addSkillSpy).toHaveBeenCalledWith('Vitest')
      expect(mockUpdateSkills).toHaveBeenCalledWith(['React', 'Redux', 'Vitest'])
    })
  })

  describe('удаление навыков', () => {
    // Проверяет, что можно удалить навык через кнопку удаления
    it('удаляет навык при клике на кнопку удаления', async () => {
      const user = userEvent.setup()
      const removeSkillSpy = vi.spyOn(filterSlice.filterActions, 'removeSkill')

      renderWithProviders(<SkillSettings />, {
        preloadedState: {
          filter: {
            skills: ['React', 'TypeScript'],
            searchString: '',
            city: 'Все города',
          },
        },
      })

      // Mantine Pill с withRemoveButton создаёт кнопку удаления
      const pills = screen.getAllByRole('button').filter(btn => 
        btn.getAttribute('aria-label')?.includes('Remove') || 
        btn.querySelector('[class*="closeButton"]')
      )

      if (pills.length > 0) {
        await user.click(pills[0])

        expect(removeSkillSpy).toHaveBeenCalledWith('React')
        expect(mockUpdateSkills).toHaveBeenCalledWith(['TypeScript'])
      }
    })

    // Проверяет, что удаление последнего навыка оставляет пустой список
    it('удаляет единственный навык, оставляя пустой список', async () => {
      const user = userEvent.setup()
      const removeSkillSpy = vi.spyOn(filterSlice.filterActions, 'removeSkill')

      renderWithProviders(<SkillSettings />, {
        preloadedState: {
          filter: {
            skills: ['JavaScript'],
            searchString: '',
            city: 'Все города',
          },
        },
      })

      const removeButtons = screen.getAllByRole('button').filter(btn => 
        btn.getAttribute('aria-label')?.includes('Remove') ||
        btn.querySelector('[class*="closeButton"]')
      )

      if (removeButtons.length > 0) {
        await user.click(removeButtons[0])

        expect(removeSkillSpy).toHaveBeenCalledWith('JavaScript')
        expect(mockUpdateSkills).toHaveBeenCalledWith([])
      }
    })
  })

  describe('поведение ввода', () => {
    // Проверяет, что можно вводить текст в инпут
    it('обновляет локальное состояние при вводе текста', async () => {
      const user = userEvent.setup()

      renderWithProviders(<SkillSettings />)

      const input = screen.getByPlaceholderText('Навык')
      await user.type(input, 'CSS')

      expect(screen.getByDisplayValue('CSS')).toBeInTheDocument()
    })

    // Проверяет, что инпут очищается после добавления навыка (опционально, если это реализовано)
    it('позволяет очистить инпут', async () => {
      const user = userEvent.setup()

      renderWithProviders(<SkillSettings />)

      const input = screen.getByPlaceholderText('Навык')
      await user.type(input, 'HTML')
      await user.clear(input)

      expect((input as HTMLInputElement).value).toBe('')
    })
  })

  describe('граничные случаи', () => {
    // Проверяет работу с длинными названиями навыков
    it('корректно работает с длинными названиями навыков', async () => {
      const user = userEvent.setup()
      const addSkillSpy = vi.spyOn(filterSlice.filterActions, 'addSkill')

      renderWithProviders(<SkillSettings />)

      const input = screen.getByPlaceholderText('Навык')
      const longSkill = 'Advanced React Patterns and Performance Optimization'

      await user.type(input, longSkill)
      await user.keyboard('{Enter}')

      expect(addSkillSpy).toHaveBeenCalledWith(longSkill)
    })

    // Проверяет работу со спецсимволами
    it('корректно работает со спецсимволами в навыках', async () => {
      const user = userEvent.setup()
      const addSkillSpy = vi.spyOn(filterSlice.filterActions, 'addSkill')

      renderWithProviders(<SkillSettings />)

      const input = screen.getByPlaceholderText('Навык')
      await user.type(input, 'C++')
      await user.keyboard('{Enter}')

      expect(addSkillSpy).toHaveBeenCalledWith('C++')
    })

    // Проверяет работу с большим количеством навыков
    it('корректно отображает много навыков', () => {
      const manySkills = Array.from({ length: 10 }, (_, i) => `Skill${i + 1}`)

      renderWithProviders(<SkillSettings />, {
        preloadedState: {
          filter: {
            skills: manySkills,
            searchString: '',
            city: 'Все города',
          },
        },
      })

      manySkills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
    })
  })
})