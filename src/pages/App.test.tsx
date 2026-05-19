// src/pages/App.test.tsx
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  // Проверяет, что компонент App существует и экспортируется
  it('экспортирует компонент App', () => {
    expect(App).toBeDefined()
    expect(typeof App).toBe('function')
  })
})