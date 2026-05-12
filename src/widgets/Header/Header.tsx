import { Box } from '@mantine/core';
import Logo from './../../shared/Logo/Logo';
import MainMenu from './../../shared/MainMenu/MainMenu';

export function Header() {

  return (
    <Box component="header" h={70} bg="white" px="md" py="xs" // Твоя white.6 = FFFFFF, тень ниже
      style={{ boxShadow: '0 2px 6px rgba(15, 15, 16, 0.35)', position: 'relative'}}
    >
        <Logo />
        <MainMenu />
    </Box>
  );
}