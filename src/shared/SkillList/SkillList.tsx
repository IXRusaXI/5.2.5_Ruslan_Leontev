import { Pill, Flex } from '@mantine/core';
import type { ReactNode } from 'react';

interface SkillListProps {
    children: ReactNode;
}

function SkillList({ children }: SkillListProps) {
  return (
    <Flex gap={15}>
      <Pill.Group>{children}</Pill.Group>
    </Flex>
  );
}

export default SkillList