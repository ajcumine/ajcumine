import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { color } from "../styles/variables";
import { StyledLink } from "./Typography";

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
  console.log({ router });
  const routes = [
    {
      href: '/',
      name: 'Home',
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
