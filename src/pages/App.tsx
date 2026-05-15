import { Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./layout/layoutPage"
import List from "./main/vacancyListPage"
import VacancyPage from "./vacancy/vacancyPage"
import { vacanciesLoader } from './../tools/loaders/vacanciesLoader'
import CircleLoader from '../shared/CircleLoader/CircleLoader'

const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={vacanciesLoader} hydrateFallbackElement={<CircleLoader />}>
      <Route path="" element={<List />}/>
      <Route path="vacancy/:id" element={<VacancyPage />} />
    </Route>
)

const router = createBrowserRouter(routes, {
  basename: '/5.2.5_Ruslan_Leontev/'
})

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
