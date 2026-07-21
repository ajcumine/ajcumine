import styled from 'styled-components';

import { cardGridVariants } from './variants';

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  gap: 1.6rem;

  ${({ theme }) => cardGridVariants[theme.slug]}
`;
