'use client';

import { InstrumentBusProvider } from '@/context/InstrumentBus';
import type { ReactNode } from 'react';

export default function WorkstationShell({ children }: { children: ReactNode }) {
  return <InstrumentBusProvider>{children}</InstrumentBusProvider>;
}
