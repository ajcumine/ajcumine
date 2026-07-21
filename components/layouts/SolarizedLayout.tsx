import React from 'react';

import { ScrollMinimap } from '../themes/solarized/ScrollMinimap';

import { DefaultLayout } from './DefaultLayout';

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

// The IDE: standard chrome plus an editor minimap on the right edge.
export const SolarizedLayout = ({ children, title }: LayoutProps) => (
  <>
    <DefaultLayout title={title}>{children}</DefaultLayout>
    <ScrollMinimap />
  </>
);
