import React from 'react';

import { useThemeSwitch } from '../../styles/ThemeContext';
import { assertNever } from '../../styles/utils';
import { BauhausLayout } from '../layouts/BauhausLayout';
import { CyberpunkLayout } from '../layouts/CyberpunkLayout';
import { FuturismLayout } from '../layouts/FuturismLayout';
import { GeocitiesLayout } from '../layouts/GeocitiesLayout';
import { SolarizedLayout } from '../layouts/SolarizedLayout';
import { SynthwaveLayout } from '../layouts/SynthwaveLayout';
import { Win98Layout } from '../layouts/Win98Layout';

interface PageProps {
  children?: React.ReactNode;
  title?: string;
}

export const Page = ({ children, title }: PageProps) => {
  const { themeName } = useThemeSwitch();

  switch (themeName) {
    case 'solarized-dark':
      return <SolarizedLayout title={title}>{children}</SolarizedLayout>;
    case 'cyberpunk':
      return <CyberpunkLayout title={title}>{children}</CyberpunkLayout>;
    case 'windows-98':
      return <Win98Layout title={title}>{children}</Win98Layout>;
    case 'geocities':
      return <GeocitiesLayout title={title}>{children}</GeocitiesLayout>;
    case 'bauhaus':
      return <BauhausLayout title={title}>{children}</BauhausLayout>;
    case 'futurism':
      return <FuturismLayout title={title}>{children}</FuturismLayout>;
    case 'synthwave':
      return <SynthwaveLayout title={title}>{children}</SynthwaveLayout>;
    default:
      return assertNever(themeName);
  }
};
