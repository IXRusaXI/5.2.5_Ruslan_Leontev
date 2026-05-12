import { Flex, Text, Button } from '@mantine/core';

export function Header() {
  return (
    <Flex h="100%" align="center" pr={280}> {/* pr ~ ширина центра, чтобы не перекрывать */}
        <Flex align="center" gap="sm">
            <Button bg='#e40000' c="white" size='1.2rem' fw={600} radius="50%" h='36px' w='36px' p='0'>
            hh
            </Button>
            <Text size="xl" fw={500}>.FrontEnd</Text>
        </Flex>
    </Flex>
  );
}

export default Header