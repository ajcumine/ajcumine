import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ThemeSwitcher } from './ThemeSwitcher';

const BAUHAUS_RED = '#e74c3c';
const BAUHAUS_YELLOW = '#f1c40f';
const BAUHAUS_BLUE = '#3498db';
const BAUHAUS_CREAM = '#f4f4f0';
const BAUHAUS_BLACK = '#1a1a1a';

const GridContainer = styled.nav`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  grid-template-rows: 1fr 1fr auto;
  gap: 0.3rem;
  background: ${BAUHAUS_BLACK};
  padding: 0.3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 4rem);
  }
`;

const NavBlock = styled(Link)<{ $active: boolean; $color: string; $isCream?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  background: ${({ $active, $color, $isCream }) =>
    $active ? $color : $isCream ? BAUHAUS_CREAM : BAUHAUS_CREAM};
  color: ${({ $active, $isCream }) => {
    if ($active) {
      return $isCream ? BAUHAUS_BLACK : '#ffffff';
    }
    return BAUHAUS_BLACK;
  }};
  transition: none;
  border-radius: 0;

  &:hover {
    background: ${({ $color }) => {
      // Darken the color slightly for hover
      if ($color === BAUHAUS_RED) return '#c0392b';
      if ($color === BAUHAUS_YELLOW) return '#d4ac0d';
      if ($color === BAUHAUS_BLUE) return '#2980b9';
      return '#e0e0dc';
    }};
  }

  &:focus-visible {
    outline: 0.3rem solid ${BAUHAUS_BLACK};
    outline-offset: -0.3rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const HomeBlock = styled(NavBlock)`
  grid-column: 1;
  grid-row: 1 / 3;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const AboutBlock = styled(NavBlock)`
  grid-column: 2;
  grid-row: 1;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const BlogBlock = styled(NavBlock)`
  grid-column: 2;
  grid-row: 2;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 3;
  }
`;

const ProjectsBlock = styled(NavBlock)`
  grid-column: 3;
  grid-row: 1 / 3;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 4;
  }
`;

const ThemeSwitcherRow = styled.div`
  grid-column: 1 / 4;
  grid-row: 3;
  background: ${BAUHAUS_CREAM};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 5;
  }
`;

const routes = [
  { href: '/', name: 'Home', color: BAUHAUS_RED, isCream: false, component: HomeBlock },
  { href: '/about', name: 'About', color: BAUHAUS_YELLOW, isCream: false, component: AboutBlock },
  { href: '/blog', name: 'Blog', color: BAUHAUS_BLUE, isCream: false, component: BlogBlock },
  {
    href: '/projects',
    name: 'Projects',
    color: BAUHAUS_CREAM,
    isCream: true,
    component: ProjectsBlock,
  },
];

export const BauhausNav = (): React.ReactElement => {
  const router = useRouter();

  return (
    <GridContainer>
      {routes.map(({ href, name, color, isCream, component: Component }) => (
        <Component
          key={href}
          $active={router.asPath === href}
          $color={color}
          $isCream={isCream}
          href={href}
        >
          {name}
        </Component>
      ))}
      <ThemeSwitcherRow>
        <ThemeSwitcher />
      </ThemeSwitcherRow>
    </GridContainer>
  );
};
