import { Box, Group, Text, Image } from '@mantine/core';
import aboutMeIcon from './../../shared/icons/aboutMe.svg'
import blueDot from './../../shared/icons/blueDot.svg'

export function MainMenu() {
  return (
      <Box 
        ta="center" 
        style={{ 
          position: 'absolute', 
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Group gap='xl' align='center' ta='center'>
            <Group gap='xs'>
                <Text size="lg" fw={500}>Вакансии FE</Text>
                <Image src={blueDot} w='8' h='8'/>
            </Group>

            <Group c='ultra-light' gap='xs'>
                <Image src={aboutMeIcon} w='xl' h='xl'/>
                <Text size="lg" fw={500} >Обо мне</Text>
            </Group>
        </Group>
      </Box>
  );
}

export default MainMenu