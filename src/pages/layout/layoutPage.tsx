import { Box } from '@mantine/core';
import { Header } from '../../widgets/Header/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/typedHooks';
import { vacanciesActions } from '../../store/slices/vacancies/vacanciesSlice';
import { errorActions } from '../../store/slices/error/errorSlice';

function Layout() {
  const dispatch = useAppDispatch();
  const { vacancies, error } = useLoaderData();

  useEffect(() => {
    dispatch(vacanciesActions.setAllVacancies(vacancies))
  }, [vacancies])

  useEffect(() => {
    if (error) dispatch(errorActions.showError())
  }, [error])
  return (
    <Box bg='background' mih='100vh' pb='xl' >
      <Header />

      <Outlet />
    </ Box>
  )
}

export default Layout
