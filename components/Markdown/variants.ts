import { css } from 'styled-components';

import { ThemeSlug } from '../../styles/theme.types';

export const horizontalRuleVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css``,
  'windows-98': css`
    border: none;
    border-top: 0.1rem solid #808080;
    border-bottom: 0.1rem solid #ffffff;
    height: 0;
  `,
  geocities: css`
    height: 0.6rem;
    border: none;
    background: linear-gradient(
      to right,
      #ff0000,
      #ff8800,
      #ffff00,
      #00ff00,
      #0000ff,
      #8800ff,
      #ff0088
    );
  `,
  bauhaus: css`
    height: 0.4rem;
    border: none;
    background-color: #000000;
  `,
  futurism: css`
    border: none;
    height: auto;
    &::before {
      content: '>>> >>> >>>';
      display: block;
      color: ${({ theme }) => theme.accent.primary};
      font-size: 1.6rem;
      font-weight: 900;
      font-style: italic;
      letter-spacing: 0.2em;
    }
  `,
  synthwave: css`
    border-color: rgba(255, 106, 193, 0.5);
    box-shadow: 0 0 0.6rem rgba(255, 106, 193, 0.4);
  `,
};

export const blockquoteVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    border-left-color: ${({ theme }) => theme.accent.highlight};
  `,
  cyberpunk: css`
    background-color: rgba(0, 255, 65, 0.05);
    padding: 1.2rem 1.6rem;
  `,
  'windows-98': css`
    border: 0.2rem solid;
    border-color: #808080 #ffffff #ffffff #808080;
    background-color: #ffffff;
    padding: 1.2rem 1.6rem;
  `,
  geocities: css`
    border: 0.3rem double #ff00ff;
    background-color: rgba(255, 0, 255, 0.08);
    padding: 1.2rem 1.6rem;
  `,
  bauhaus: css`
    border-left-width: 0.6rem;
    border-left-color: #000000;
  `,
  futurism: css`
    border-left-width: 0.4rem;
    font-style: italic;
  `,
  synthwave: css`
    background-color: rgba(255, 106, 193, 0.06);
    padding: 1.2rem 1.6rem;
  `,
};

// Applied to unordered lists only — ordered lists keep decimal markers.
export const listVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css``,
  'windows-98': css`
    list-style-type: square;
  `,
  geocities: css`
    li::marker {
      color: #ff00ff;
    }
  `,
  bauhaus: css`
    list-style-type: square;
  `,
  futurism: css``,
  synthwave: css``,
};

export const inlineCodeVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css`
    color: ${({ theme }) => theme.accent.highlight};
  `,
  cyberpunk: css`
    color: ${({ theme }) => theme.accent.primary};
  `,
  'windows-98': css`
    border: 0.1rem solid;
    border-color: #808080 #ffffff #ffffff #808080;
    border-radius: 0;
    font-family: 'Courier New', monospace;
  `,
  geocities: css`
    color: ${({ theme }) => theme.accent.primary};
  `,
  bauhaus: css`
    border: 0.1rem solid rgba(17, 17, 17, 0.25);
    border-radius: 0;
  `,
  futurism: css`
    color: #ffffff;
  `,
  synthwave: css`
    color: ${({ theme }) => theme.accent.secondary};
  `,
};

export const codeBlockVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    border-color: rgba(0, 255, 65, 0.35);
    box-shadow: 0 0 1rem rgba(0, 255, 65, 0.15);
  `,
  'windows-98': css`
    border: 0.2rem solid;
    border-color: #808080 #ffffff #ffffff #808080;
    border-radius: 0;
  `,
  geocities: css`
    border-color: #ff00ff;
    border-width: 0.2rem;
    border-radius: 0;
  `,
  bauhaus: css`
    border: 0.2rem solid #111111;
    border-radius: 0;
  `,
  futurism: css`
    border: none;
    border-left: 0.4rem solid ${({ theme }) => theme.accent.primary};
    border-radius: 0;
  `,
  synthwave: css`
    border-color: rgba(255, 106, 193, 0.45);
    box-shadow: 0 0 1.2rem rgba(255, 106, 193, 0.2);
  `,
};

export const tableVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css`
    border-color: rgba(0, 255, 65, 0.35);
    box-shadow: 0 0 1rem rgba(0, 255, 65, 0.15);

    th {
      color: ${({ theme }) => theme.accent.primary};
    }
  `,
  'windows-98': css`
    border: 0.2rem solid;
    border-color: #808080 #ffffff #ffffff #808080;
    border-radius: 0;
    background-color: #ffffff;

    th {
      color: #000080;
    }

    td {
      border-bottom-color: #c0c0c0;
    }
  `,
  geocities: css`
    border: 0.3rem ridge #ff00ff;
    border-radius: 0;

    th {
      color: #ffff00;
      border-bottom-style: dashed;
    }

    td {
      border-bottom-style: dashed;
    }
  `,
  bauhaus: css`
    border: 0.2rem solid #111111;
    border-radius: 0;

    th {
      text-transform: uppercase;
      border-bottom-color: #111111;
    }

    td {
      border-bottom-color: #111111;
    }
  `,
  futurism: css`
    border: none;
    border-left: 0.4rem solid ${({ theme }) => theme.accent.primary};
    border-radius: 0;

    th {
      font-style: italic;
      border-bottom-color: ${({ theme }) => theme.accent.primary};
    }
  `,
  synthwave: css`
    border-color: rgba(255, 106, 193, 0.45);
    box-shadow: 0 0 1.2rem rgba(255, 106, 193, 0.2);

    th {
      color: ${({ theme }) => theme.accent.primary};
    }

    td {
      border-bottom-color: rgba(255, 106, 193, 0.15);
    }
  `,
};

// Applied to GFM task-list checkboxes (li.task-list-item input[type='checkbox']).
export const taskListVariants: Record<ThemeSlug, ReturnType<typeof css>> = {
  'solarized-dark': css``,
  cyberpunk: css``,
  'windows-98': css`
    // Native grey checkbox fits the OS chrome better than an accent color.
    accent-color: auto;
  `,
  geocities: css``,
  bauhaus: css``,
  futurism: css``,
  synthwave: css``,
};
