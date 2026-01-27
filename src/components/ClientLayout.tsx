'use client';

import { FC, ReactNode } from 'react';
import { NetworkWarning } from './NetworkWarning';

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: FC<ClientLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <NetworkWarning />
    </>
  );
};
