import { Button, Group, Input, Stack, Text, Image, Flex, Pill } from '@mantine/core';
import { ShadowWrapper } from '../../shared/ShadowWrapper/ShadowWrapper'
import plusIcon from './../../shared/icons/plus.svg'
import './style.scss'
import SkillList from '../../shared/SkillList/SkillList';
import { useAppDispatch, useAppSelector } from '../../store/typedHooks'
import { filterActions } from '../../store/slices/filter/filterSlice';
import { useState } from 'react';
import { useQueryParams } from '../../tools/params/ParamTool';

export function SkillSettings() {
  const [skillString, setSkillString] = useState('')
  const dispatch = useAppDispatch()
  const skills = useAppSelector(state => state.filter.skills)
  const { updateSkills } = useQueryParams()

  function addSkill() {
    if (skillString.length === 0) return
    updateSkills([...skills, skillString])
    dispatch(filterActions.addSkill(skillString))
  }

  function removeSkill(skill: string) {
    updateSkills(skills.filter(s => s !== skill))
    dispatch(filterActions.removeSkill(skill))
  }


  return (
    <ShadowWrapper >
        <Stack>
            <Text fw={600} size='lg'>Ключевые навыки</Text>

            <Group justify='space-between'>
                <Input
                    placeholder="Навык"
                    w={'78%'}
                    className={'skill-input'}
                    value={skillString}
                    onChange={(e) => setSkillString(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button px='sm' color='#006eff60' onClick={addSkill}>
                    <Image src={plusIcon} />    
                </Button>
            </Group>

            <Flex>
                <SkillList>
                    {skills?.map(skill => 
                    <Pill 
                        key={skill} 
                        bg='#00000008' 
                        withRemoveButton 
                        onRemove={() => removeSkill(skill)}
                    >
                        {skill}
                    </Pill>)}
                </SkillList>
            </Flex>
        </Stack>
    </ShadowWrapper>
  );
}

export default SkillSettings