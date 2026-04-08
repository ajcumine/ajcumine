import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type PrismStyle = Record<string, React.CSSProperties>;

export const codeThemes: Record<string, PrismStyle> = {
  a11yDark: a11yDark as PrismStyle,
  oneLight: oneLight as PrismStyle,
  vs: vs as PrismStyle,
};
