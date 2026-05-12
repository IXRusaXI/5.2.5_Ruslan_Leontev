import { Group, Box, Stack, Flex, Pagination, Title } from '@mantine/core';
import { Header } from '../widgets/Header/Header';
import { PageTitle } from '../widgets/PageTitle/PageTitle'
import { Divider } from '@mantine/core';
import { ContentContainer } from '../shared/ContentContainer/ContentContainer';
import SkillSettings from '../widgets/SkillSettings/SkillSettings'
import { CitySelector } from '../shared/CitySelector/CitySelector'
import { Vacancy } from '../widgets/Vacancy/Vacancy'
import './App.css'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks'
import { vacanciesActions } from '../store/slices/vacancies/vacanciesSlice';
import { pageActions } from '../store/slices/page/pageSlice';
import VacanciesData from './data/vacancies'
import { Link, Route, Routes } from 'react-router-dom';
// import { base } from './..'

function App() {
  const dispatch = useAppDispatch()
  const city = useAppSelector(state => state.filter.city)
  const activePageNumber = useAppSelector(state => state.page.activePageNumber)
  const activePageList = useAppSelector(state => state.page.activePageList)
  const total = useAppSelector(state => state.page.total)
  const filteredList = useAppSelector(state => state.vacancy.filtered)
  const searchString = useAppSelector(state => state.filter.searchString)
  const skills = useAppSelector(state => state.filter.skills)
  const pageLimit = 10

  useEffect(() => {
    dispatch(vacanciesActions.setAllVacancies(VacanciesData))
  }, [])

  useEffect(() => {
    dispatch(vacanciesActions.filterVacancies({searchString, skills, city}))
  }, [searchString, skills, city])

  useEffect(() => {
    const integerPagesNumber = filteredList.length / pageLimit
    const floatPagesNumber = filteredList.length % pageLimit

    if (integerPagesNumber < 0 && floatPagesNumber > 0) {
      dispatch(pageActions.setTotalPages(1))
      return
    } 
    if (integerPagesNumber > 0 && floatPagesNumber > 0) {
      dispatch(pageActions.setTotalPages(integerPagesNumber + 1))
      return
    } 
    dispatch(pageActions.setTotalPages(filteredList.length / pageLimit))
  }, [filteredList])

  useEffect(() => {
    dispatch(pageActions.setActivePageList({filtered: filteredList, page: activePageNumber}))
  }, [activePageNumber, total])

  function setPage(page: number) {
    dispatch(pageActions.setPage(page))
  }

  return (
    <Box bg='background' mih='100vh' pb='xl' >
      <Header />
      <ContentContainer>
        <PageTitle />
      </ContentContainer>

      <Divider color='#5050552c' />

      <Routes>
      <Route path='chinazes' element={<div> Чиназес </div>} />
      </Routes>
      <Link to='chinazes' replace={false}>Чиназес</Link>

      <ContentContainer>
        <Group gap={0} justify='space-between' align='top'>
          <Stack gap='sm' w="30%" >
            <SkillSettings />
            <CitySelector />
          </Stack>

          {filteredList?.length > 0 && <Stack gap='lg' w="67%">
            {activePageList?.map(vacancy => <Vacancy
              key={vacancy.id}
              vacancy={vacancy}
            />)}

            <Group justify='center' mb='xl'>
              <Pagination
                value={activePageNumber}
                onChange={setPage}
                total={total}
                radius={4} withEdges/>
            </Group>
          </Stack>}

          {filteredList?.length === 0 && <Flex w="67%">
          <Title 
            order={1}
            m='auto'
            fw={600} 
            c='#00000050'
          >
            Вакансии по данному запросу не найдены
          </Title>
          </Flex>}
        </Group>
      </ContentContainer>
    </ Box>
  )
}

export default App
