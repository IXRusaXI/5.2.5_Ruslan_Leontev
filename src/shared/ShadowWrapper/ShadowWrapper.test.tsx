// import { describe, it, expect } from 'vitest'
// import { screen } from '@testing-library/react'

// import { renderWithProviders } from '../../test-utils/render'
// import ShadowWrapper from './ShadowWrapper'

// describe('ShadowWrapper', () => {
//   it('рендерит дочерний контент внутри карточки', () => {
//     renderWithProviders(
//       <ShadowWrapper>
//         <div>Контент в тени</div>
//       </ShadowWrapper>
//     )

//     const child = screen.getByText('Контент в тени')
//     expect(child).toBeInTheDocument()
//   })

//   it('может содержать несколько дочерних элементов', () => {
//     renderWithProviders(
//       <ShadowWrapper>
//         <span>Первый</span>
//         <span>Второй</span>
//       </ShadowWrapper>
//     )

//     expect(screen.getByText('Первый')).toBeInTheDocument()
//     expect(screen.getByText('Второй')).toBeInTheDocument()
//   })
// })

// /*
// Что проверяем:
// - Компонент рендерит переданный дочерний контент внутри Card.
// - Компонент корректно отображает несколько дочерних элементов.
// */