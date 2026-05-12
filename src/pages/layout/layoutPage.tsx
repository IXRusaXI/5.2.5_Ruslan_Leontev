import { Box } from '@mantine/core';
import { Header } from '../../widgets/Header/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Box bg='background' mih='100vh' pb='xl' >
      <Header />

      <Outlet />
    </ Box>
  )
}

export default Layout
