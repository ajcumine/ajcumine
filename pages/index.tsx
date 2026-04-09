import React from 'react';

import { GeoCitiesHomepage } from '../components/GeoCitiesHomepage';
import { HeaderImage } from '../components/HeaderImage';
import { InfoPanel } from '../components/InfoPanel';
import { Page } from '../components/Page';
import { useThemeSwitch } from '../styles/ThemeContext';

const Home = (): React.ReactElement => {
  const { themeName } = useThemeSwitch();

  if (themeName === 'geocities') {
    return (
      <Page>
        <GeoCitiesHomepage />
      </Page>
    );
  }

  return (
    <Page>
      <HeaderImage />
      <InfoPanel />
    </Page>
  );
};

export default Home;
