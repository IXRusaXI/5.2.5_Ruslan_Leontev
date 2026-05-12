import { Route, Routes } from "react-router-dom"
import Layout from "./layout/layoutPage"
import List from "./main/vacancyListPage"
import VacancyPage from "./vacancy/vacancyPage"
import { useEffect } from "react"
import { vacanciesActions } from "../store/slices/vacancies/vacanciesSlice"
import VacanciesData from "./data/vacancies"
import { useAppDispatch } from '../store/typedHooks'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(vacanciesActions.setAllVacancies(VacanciesData))
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<List />} />
          <Route path="vacancy/:id" element={<VacancyPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
