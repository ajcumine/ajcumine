import React from 'react';

import { Typography } from './Typography';

export const BulletListItem = ({ children }: {children: React.ReactNode;}) => (
  <li>
    <Typography variant='body'>
      - {children}
    </Typography>
  </li>
);

export const BulletList = ({ children }: {children: React.ReactNode & React.ReactNode[]}) => (
  <ul>
    {children}
  </ul>
);
