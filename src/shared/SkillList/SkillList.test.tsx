// src/components/SkillList/SkillList.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import SkillList from './SkillList'

describe('SkillList', () => {
  describe('базовый рендер', () => {
    // Проверяет, что компонент рендерит переданные children внутри Pill.Group
    it('рендерит children внутри Pill.Group', () => {
      renderWithProviders(
        <SkillList>
          <div>React</div>
        </SkillList>
      )

      expect(screen.getByText('React')).toBeInTheDocument()
    })
  })

  describe('взаимодействие с children', () => {
    // Проверяет, что можно передавать несколько элементов
    it('поддерживает несколько children', () => {
      renderWithProviders(
        <SkillList>
          <div>React</div>
          <div>TypeScript</div>
        </SkillList>
      )

      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })
  })

  describe('граничные случаи', () => {
    // Проверяет, что компонент рендерится, даже если children пусты
    it('рендерится с пустыми children (null)', () => {
        const { container } = renderWithProviders(<SkillList>{null}</SkillList>)
        expect(container.querySelector('.mantine-PillGroup-group')).toBeInTheDocument()
    })
  })
})