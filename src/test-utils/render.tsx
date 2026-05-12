// src/test-utils/render.tsx
import { type ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { store as appStore, type RootState } from './../store/store'
import pageReducer from './../store/slices/page/pageSlice'
import filterReducer from './../store/slices/filter/filterSlice'
import vacancyReducer from './../store/slices/vacancies/vacanciesSlice'

type PreloadedState = Partial<RootState>

interface RenderWithProvidersOptions {
  preloadedState?: PreloadedState
  store?: typeof appStore
  renderOptions?: Parameters<typeof rtlRender>[1]
}

export function renderWithProviders(
  ui: ReactNode,
  { preloadedState, store, renderOptions }: RenderWithProvidersOptions = {}
) {
  const testStore =
    store ??
    configureStore({
      reducer: {
        page: pageReducer,
        filter: filterReducer,
        vacancy: vacancyReducer,
      },
      preloadedState: preloadedState as RootState | undefined,
    })

  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <MantineProvider>
      <Provider store={testStore}>{children}</Provider>
    </MantineProvider>
  )

  return {
    store: testStore,
    ...rtlRender(ui, { wrapper: Wrapper, ...(renderOptions ?? {}) }),
  }
}