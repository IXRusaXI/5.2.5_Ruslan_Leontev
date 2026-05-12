import { Container } from '@mantine/core';

interface ContentContainerProps {
  children: React.ReactNode;
}

export function ContentContainer({ children }: ContentContainerProps) {
  return (
    <>
      <Container size="lg" py="lg">
        {children}
      </Container>
    </>
  );
}

export default ContentContainer