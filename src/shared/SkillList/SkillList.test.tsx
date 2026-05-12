import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test-utils/render'
import SkillList from './SkillList'

describe('SkillList', () => {
  it('рендерит переданные элементы как детей', () => {
    renderWithProviders(
      <SkillList>
        <span>React</span>
      </SkillList>
    )

    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('отображает несколько детей внутри группы', () => {
    renderWithProviders(
      <SkillList>
        <span>React</span>
        <span>TypeScript</span>
      </SkillList>
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })
})

/*
Что проверяем:
- Компонент рендерит переданный дочерний контент.
- Компонент корректно отображает несколько элементов внутри Pill.Group.
*/