// src/shared/ErrorModal/ErrorModal.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils/render'
import ErrorModal from './ErrorModal'
import * as errorSlice from '../../store/slices/error/errorSlice'

describe('ErrorModal', () => {
  let modalRoot: HTMLElement

  beforeEach(() => {
    // Создаём modal-root для Portal, если его нет
    modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  })

  afterEach(() => {
    // Очищаем modal-root после каждого теста
    document.body.removeChild(modalRoot)
    vi.clearAllMocks()
  })

  describe('базовый рендер', () => {
    // Проверяет, что заголовок отображается корректно
    it('отображает заголовок "Произошла ошибка"', () => {
      renderWithProviders(<ErrorModal />)

      const title = screen.getByRole('heading', { name: 'Произошла ошибка' })
      expect(title).toBeInTheDocument()
    })

    // Проверяет, что текст ошибки отображается
    it('отображает текст сообщения об ошибке', () => {
      renderWithProviders(<ErrorModal />)

      const message = screen.getByText('Отображен заранее заготовленный список вакансий')
      expect(message).toBeInTheDocument()
    })

    // Проверяет, что кнопка закрытия присутствует
    it('отображает кнопку закрытия с иконкой', () => {
      renderWithProviders(<ErrorModal />)

      const closeButton = screen.getByRole('button')
      expect(closeButton).toBeInTheDocument()

      // Mantine Image может рендерить встроенный SVG или data-url вместо прямого src
      const closeIcon = screen.getByRole('img')
      expect(closeIcon).toBeInTheDocument()
    })
  })

  describe('взаимодействие с Redux', () => {
    // Проверяет, что при клике на кнопку закрытия диспатчится hideError
    it('диспатчит errorActions.hideError при клике на кнопку закрытия', async () => {
      const user = userEvent.setup()
      const hideErrorSpy = vi.spyOn(errorSlice.errorActions, 'hideError')

      renderWithProviders(<ErrorModal />)

      const closeButton = screen.getByRole('button')
      await user.click(closeButton)

      expect(hideErrorSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('поведение onClick', () => {
    // Проверяет, что клик по кнопке закрытия вызывает экшен через hideError
    it('вызывает errorActions.hideError при клике на кнопку закрытия', async () => {
      const user = userEvent.setup()
      const hideErrorSpy = vi.spyOn(errorSlice.errorActions, 'hideError')

      renderWithProviders(<ErrorModal />)

      const closeButton = screen.getByRole('button')
      await user.click(closeButton)

      expect(hideErrorSpy).toHaveBeenCalled()
    })
  })

  describe('стили и позиционирование', () => {
    // Проверяет, что модалка имеет красный фон
    it('имеет красный фон (bg="red")', () => {
      renderWithProviders(<ErrorModal />)

      const container = screen.getByRole('heading').closest('[class*="mantine-Container"]')
      expect(container).toBeInTheDocument()
    })

    // Проверяет, что модалка имеет fixed позиционирование
    it('имеет fixed позиционирование', () => {
      renderWithProviders(<ErrorModal />)

      const container = screen.getByRole('heading').closest('[class*="mantine-Container"]') as HTMLElement
      expect(container.style.position).toBe('fixed')
    })

    // Проверяет inline-стили для позиционирования
    it('имеет корректные inline-стили для центрирования', () => {
      renderWithProviders(<ErrorModal />)

      const container = screen.getByRole('heading').closest('[class*="mantine-Container"]') as HTMLElement
      expect(container.style.top).toBe('40px')
      expect(container.style.left).toBe('50%')
      expect(container.style.transform).toBe('translateX(-50%)')
    })

    // Проверяет, что модалка имеет borderRadius
    it('имеет скруглённые углы (borderRadius: 8px)', () => {
      renderWithProviders(<ErrorModal />)

      const container = screen.getByRole('heading').closest('[class*="mantine-Container"]') as HTMLElement
      expect(container.style.borderRadius).toBe('8px')
    })

    // Проверяет, что модалка имеет boxShadow
    it('имеет тень (boxShadow)', () => {
      renderWithProviders(<ErrorModal />)

      const container = screen.getByRole('heading').closest('[class*="mantine-Container"]') as HTMLElement
      expect(container.style.boxShadow).toContain('rgba(255, 0, 0, 0.35)')
    })
  })

  describe('Portal поведение', () => {
    // Проверяет, что если modal-root отсутствует, Portal рендерится в body
    it('рендерится в body, если modal-root отсутствует', () => {
      // Удаляем modal-root
      document.body.removeChild(modalRoot)

      renderWithProviders(<ErrorModal />)

      const title = screen.getByText('Произошла ошибка')
      expect(title).toBeInTheDocument()
      expect(document.body).toContainElement(title)

      // Восстанавливаем modal-root для afterEach
      modalRoot = document.createElement('div')
      modalRoot.setAttribute('id', 'modal-root')
      document.body.appendChild(modalRoot)
    })
  })

  describe('доступность', () => {
    // Проверяет, что заголовок имеет правильный heading level (h3)
    it('заголовок имеет правильный уровень (order={3} -> h3)', () => {
      renderWithProviders(<ErrorModal />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Произошла ошибка')
    })

    // Проверяет, что кнопка закрытия доступна для клавиатуры
    it('кнопка закрытия доступна для клавиатуры', async () => {
      const user = userEvent.setup()
      const hideErrorSpy = vi.spyOn(errorSlice.errorActions, 'hideError')

      renderWithProviders(<ErrorModal />)

      const closeButton = screen.getByRole('button')
      closeButton.focus()
      expect(closeButton).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(hideErrorSpy).toHaveBeenCalled()
    })
  })

  describe('структура компонента', () => {
    // Проверяет, что модалка содержит все необходимые элементы
    it('содержит заголовок, текст и кнопку закрытия', () => {
      renderWithProviders(<ErrorModal />)

      expect(screen.getByRole('heading', { name: 'Произошла ошибка' })).toBeInTheDocument()
      expect(screen.getByText('Отображен заранее заготовленный список вакансий')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})