import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { color } from '../styles/variables';

export const StyledLink = styled.a<{active: boolean}>`
  font-size: 1.6em;
  text-decoration: none;
  color: ${props => props.active ? color.magenta :color.yellow};
  border-bottom: 0.2rem solid;
  border-color: ${props => props.active ? color.magenta : color.dark};

  :hover {
    border-color: ${props => props.active ? color.magenta : color.yellow};
  }
`;

const NavBarWrapper = styled.nav`
  background-color: ${color.dark};
  color: ${color.darkText};
  flex-shrink: 0;
  height: 4.8rem;
  padding: 1.2rem 1.6em;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 1.2rem;
`;

export const NavBar = () => {
  const router = useRouter();
  const routes = [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: '/about',
      name: 'About',
    },
    {
      href: '/blog',
      name: 'Blog',
    },
    {
      href: '/projects',
      name: 'Projects',
    },
  ];

  return (
    <NavBarWrapper>
      <ul>
        {routes.map(({ href, name }) => (
          <ListItem key={name}>
            <Link href={href} passHref>
              <StyledLink active={router.asPath === href}>{name}</StyledLink>
            </Link>
          </ListItem>
        ))}
      </ul>
    </NavBarWrapper>
  );
};
