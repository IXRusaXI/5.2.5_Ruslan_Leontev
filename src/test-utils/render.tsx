// src/test-utils/render.tsx
import type { ReactNode } from 'react'
import { type PropsWithChildren } from 'react'
import { render as rtlRender, type RenderOptions } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import type { Store } from '@reduxjs/toolkit'
import { type RootState } from './../store/store'
import pageReducer from './../store/slices/page/pageSlice'
import filterReducer from './../store/slices/filter/filterSlice'
import vacancyReducer from './../store/slices/vacancies/vacanciesSlice'
import errorReducer from './../store/slices/error/errorSlice'
import userEvent from '@testing-library/user-event'

type PartialRootState = Partial<RootState>

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: PartialRootState
  store?: Store<RootState>
}

export function renderWithProviders(
  ui: ReactNode,
  { preloadedState, store, ...renderOptions }: RenderWithProvidersOptions = {}
) {
  const testStore: Store<RootState> =
    store ??
    configureStore({
      reducer: {
        page: pageReducer,
        filter: filterReducer,
        vacancy: vacancyReducer,
        error: errorReducer,
      },
      preloadedState: preloadedState as RootState | undefined,
    })

  const Wrapper = ({ children }: PropsWithChildren<{}>) => (
    <MantineProvider>
      <Provider store={testStore}>{children}</Provider>
    </MantineProvider>
  )

  const user = userEvent.setup()

  return {
    store: testStore,
    user,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}