import { Group, Box, Stack, Flex, Pagination, Title } from '@mantine/core';
import { PageTitle } from './../../widgets/PageTitle/PageTitle'
import { Divider } from '@mantine/core';
import { ContentContainer } from '../../shared/ContentContainer/ContentContainer';
import SkillSettings from '../../widgets/SkillSettings/SkillSettings'
import { CitySelector } from './../../shared/CitySelector/CitySelector'
import { Vacancy } from './../../widgets/Vacancy/Vacancy'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../store/typedHooks'
import { vacanciesActions } from './../../store/slices/vacancies/vacanciesSlice';
import { pageActions } from './../../store/slices/page/pageSlice';
import { useQueryParams } from '../../tools/params/ParamTool';
import ErrorModal from '../../shared/ErrorModal/ErrorModal';
import { errorActions } from '../../store/slices/error/errorSlice';

function App() {
  const { updateSearchString, updateSkills, updateCity } = useQueryParams()

  const dispatch = useAppDispatch()
  const city = useAppSelector(state => state.filter.city)
  const errorIsOpen = useAppSelector(state => state.error.showErrorModal)
  const activePageNumber = useAppSelector(state => state.page.activePageNumber)
  const activePageList = useAppSelector(state => state.page.activePageList)
  const total = useAppSelector(state => state.page.total)
  const filteredList = useAppSelector(state => state.vacancy.filtered)
  const searchString = useAppSelector(state => state.filter.searchString)
  const skills = useAppSelector(state => state.filter.skills)
  const all = useAppSelector(state => state.vacancy.all)
  const pageLimit = useAppSelector(state => state.page.pageLimit)

  useEffect(() => {
    if (!errorIsOpen) return

    const timer = setTimeout(() => dispatch(errorActions.hideError()), 6000)
    return () => {
      clearTimeout(timer)
    }
  }, [errorIsOpen])

  useEffect(() => {
    updateSearchString()
    updateCity()
    updateSkills()
  }, [])

  useEffect(() => {
    if (all.length !== 0) dispatch(vacanciesActions.filterVacancies({searchString, skills, city}))
  }, [searchString, skills, city, all])

  useEffect(() => {
    if (all.length === 0) return

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
    <>
    <Box bg='background' mih='100vh' pb='xl' >
      <ContentContainer>
        <PageTitle />
      </ContentContainer>

      <Divider color='#5050552c' />

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

    {errorIsOpen && <ErrorModal />}
    </>
  )
}

export default App
