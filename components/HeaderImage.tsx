import React from 'react';

import styled from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';

import { SynthwaveHero } from './SynthwaveHero';

const Wrapper = styled.div`
  height: 20rem;
`;

export const HeaderImage = (): React.ReactElement => {
  const { themeName } = useThemeSwitch();

  if (themeName === 'synthwave') {
    return <SynthwaveHero />;
  }

  return <Wrapper />;
};
