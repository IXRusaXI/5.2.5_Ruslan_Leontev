import { Card } from '@mantine/core';

interface ShadowWrapperProps {
  children: React.ReactNode;
}


export function ShadowWrapper({ children }: ShadowWrapperProps) {
  return (
    <Card px="md" py="sm" style={{ boxShadow: '0 2px 6px rgba(15, 15, 16, 0.35)'}}>
        {children}
    </Card>
  );
}

export default ShadowWrapper