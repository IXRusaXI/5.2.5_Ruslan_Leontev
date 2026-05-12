import { Button, Group, Stack, Title, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../store/typedHooks'
import { filterActions } from '../../store/slices/filter/filterSlice';
import SearchInput from './../../shared/SearchInput/SearchInput';
import { useEffect, useState } from 'react';
import { useQueryParams } from '../../tools/params/ParamTool';

export function PageTitle() {
  const searchString = useAppSelector(state => state.filter.searchString)
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useAppDispatch()
  const { updateSearchString } = useQueryParams()

  useEffect(() => {
    setSearchInput(searchString)
  }, [searchString])
  
  function onClick() {
    updateSearchString(searchInput)
    dispatch(filterActions.setSearchString(searchInput))
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value)
  }

  return (
    <Group justify='space-between' py='md'>
        <Stack gap={2}>
            <Title order={1}>Список вакансий</Title>
            <Text c='pre-light' fw={600} size='xl' >По професии Frontend-разработчик</Text>
        </Stack>

        <Group>
            <SearchInput
              onChange={onChange} 
              value={searchInput} 
            />
            <Button 
              onClick={onClick} 
              color='primary' 
              h={50} 
              size='lg' 
              fw={400}> 
              Найти 
            </Button>
        </Group>
    </Group>
  );
}

export default PageTitle