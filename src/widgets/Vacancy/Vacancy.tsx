import { Group, Stack, Title, Text, Badge, Button } from '@mantine/core';
import { ShadowWrapper } from './../../shared/ShadowWrapper/ShadowWrapper'
import type { Vacancy } from '../../pages/types/types';
import { Link } from 'react-router-dom';

interface VacancyProps {
    vacancy: Vacancy
}

export function Vacancy({vacancy: {
    id,
    name, 
    salary, 
    experience, 
    employer, 
    schedule,
    area
}}: VacancyProps) {
  return (
    <ShadowWrapper >
        <Stack mb='lg' gap='sm'>
            <Title order={3} c='primary' fw={600}> {name} </Title>
            <Group>
                {salary?.from && !salary.to && <Text> От {salary?.from} &#8381; </Text>}
                {salary?.to && !salary.from && <Text> До {salary?.to} &#8381; </Text>}
                {salary?.from && salary.to && <Text> {salary?.from} - {salary?.to} &#8381; </Text>}
                <Text c='#00000050'> {experience.name} </Text>
            </Group>
        </Stack>
        <Stack gap='xs' mb='lg'>
            <Text c='#00000050'>{employer?.name}</Text>
            {schedule?.name === 'Полный день' && <Badge size='xs' color='red'> {schedule.name} </Badge>}
            {schedule?.name === 'Удаленная работа' && <Badge size='xs' color='green'> {schedule.name} </Badge>}
            {schedule?.name === 'Гибкий график' && <Badge size='xs' > {schedule.name} </Badge>}
            <Text size='lg'>{area.name}</Text>
        </Stack>
        <Group>
            
            <Link to={`/vacancy/${id}`} ><Button fw={400} bg='black' c='white'> Смотреть вакансию </Button></Link>
            <Button fw={400} bg='#00000015' c='black'>Откликнуться</Button>
        </Group>
    </ShadowWrapper>
  );
}

export default Vacancy