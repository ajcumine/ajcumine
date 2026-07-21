import styled, { css } from 'styled-components';

// Shared Windows 98 chrome: bevels and title-bar pieces used by
// DraggableWindow and ThemeWindow.

export const bevelOut = css`
  border-top: 0.2rem solid #ffffff;
  border-left: 0.2rem solid #ffffff;
  border-right: 0.2rem solid #000000;
  border-bottom: 0.2rem solid #000000;
  box-shadow:
    inset -0.1rem -0.1rem 0 #808080,
    inset 0.1rem 0.1rem 0 #dfdfdf;
`;

export const bevelIn = css`
  border-top: 0.2rem solid #808080;
  border-left: 0.2rem solid #808080;
  border-right: 0.2rem solid #ffffff;
  border-bottom: 0.2rem solid #ffffff;
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  height: 2.4rem;
  padding: 0 0.4rem 0 0.8rem;
  background: linear-gradient(to right, #000080, #1084d0);
  color: #ffffff;
  font-weight: bold;
  font-size: 1.3rem;
  user-select: none;
`;

export const TitleBarButton = styled.button`
  width: 2rem;
  height: 1.8rem;
  padding: 0;
  background-color: #c0c0c0;
  border-top: 0.2rem solid #ffffff;
  border-left: 0.2rem solid #ffffff;
  border-right: 0.2rem solid #000000;
  border-bottom: 0.2rem solid #000000;
  font-family: 'Tahoma', sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;

  &:active {
    border-color: #000000 #ffffff #ffffff #000000;
  }
`;
