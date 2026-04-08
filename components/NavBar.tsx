import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ThemeSwitcher } from './ThemeSwitcher';

const StyledNavLink = styled(Link)<{ $active: boolean }>`
  font-size: 1.6em;
  text-decoration: none;
  color: ${({ $active, theme }) => ($active ? theme.ui.navLinkActive : theme.ui.navLinkInactive)};
  border-bottom: 0.2rem solid;
  border-color: ${({ $active, theme }) => ($active ? theme.ui.navLinkActive : theme.ui.navBg)};
  border-radius: 0.2rem;

  &:hover {
    border-color: ${({ $active, theme }) =>
      $active ? theme.ui.navLinkActive : theme.ui.navLinkHoverBorder};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.border.focus};
    outline-offset: 0.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${({ theme }) => theme.meta.navLinkCss || ''}
`;

const NavBarWrapper = styled.nav`
  background-color: ${({ theme }) => theme.ui.navBg};
  color: ${({ theme }) => theme.ui.navText};
  flex-shrink: 0;
  height: 4.8rem;
  padding: 1.6rem;
  overflow: visible;
  display: flex;
  align-items: center;
  margin-bottom: 2.4rem;

  ${({ theme }) => theme.meta.navCss || ''}
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 1.2rem;
`;

export const StyledLink = ({
  href,
  $active,
  children,
}: {
  href: string;
  $active: boolean;
  children: React.ReactNode;
}) => (
  <StyledNavLink href={href} $active={$active}>
    {children}
  </StyledNavLink>
);

export const NavBar = () => {
  const router = useRouter();
  const routes = [
    { href: '/', name: 'Home' },
    { href: '/about', name: 'About' },
    { href: '/blog', name: 'Blog' },
    { href: '/projects', name: 'Projects' },
  ];

  return (
    <NavBarWrapper>
      <ul>
        {routes.map(({ href, name }) => (
          <ListItem key={name}>
            <StyledLink href={href} $active={router.asPath === href}>
              {name}
            </StyledLink>
          </ListItem>
        ))}
      </ul>
      <ThemeSwitcher />
    </NavBarWrapper>
  );
};
