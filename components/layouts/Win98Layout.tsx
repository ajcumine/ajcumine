import React, { useCallback, useState } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import { DraggableWindow, WindowState } from '../themes/win98/DraggableWindow';
import { Taskbar } from '../themes/win98/Taskbar';
import { ThemeWindow } from '../themes/win98/ThemeWindow';
import { TitleDecorator } from '../TitleDecorator';
import { Typography } from '../Typography';

import { LayoutWrapper } from './DefaultLayout';

const TitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

// Desktop shortcut, bottom-left of the desktop above the taskbar
const DesktopIcon = styled(Link)`
  position: fixed;
  bottom: 5.6rem;
  left: 2.4rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  width: 8rem;
  padding: 0.8rem 0.4rem;
  color: #ffffff;
  font-family: 'Tahoma', sans-serif;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  text-shadow: 0.1rem 0.1rem #000000;

  &:hover,
  &:focus-visible {
    outline: 0.1rem dotted #ffffff;
    outline-offset: 0.2rem;
  }
`;

const DesktopIconGlyph = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  background-color: #c0c0c0;
  border-top: 0.2rem solid #ffffff;
  border-left: 0.2rem solid #ffffff;
  border-right: 0.2rem solid #000000;
  border-bottom: 0.2rem solid #000000;
  font-size: 1.8rem;
  color: #000080;
`;

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

// The desktop OS: no NavBar/Footer — page content lives in a draggable
// window, navigation lives in the taskbar's Start menu, theme switching
// lives in the Theme Properties window.
export const Win98Layout = ({ children, title }: LayoutProps) => {
  const [windowState, setWindowState] = useState<WindowState>('normal');
  const [themeWindowOpen, setThemeWindowOpen] = useState(false);

  const toggleWindow = useCallback(() => {
    setWindowState((state) => (state === 'minimized' ? 'normal' : 'minimized'));
  }, []);

  const openThemeWindow = useCallback(() => setThemeWindowOpen(true), []);
  const closeThemeWindow = useCallback(() => setThemeWindowOpen(false), []);

  return (
    <LayoutWrapper>
      <DesktopIcon href="/walkthroughs">
        <DesktopIconGlyph aria-hidden="true">♟</DesktopIconGlyph>
        Walkthroughs
      </DesktopIcon>
      <DraggableWindow
        title="andy_cumine.exe"
        windowState={windowState}
        onWindowStateChange={setWindowState}
      >
        {title && (
          <TitleWrapper>
            <Typography variant="h1">{title}</Typography>
            <TitleDecorator />
          </TitleWrapper>
        )}
        {children}
      </DraggableWindow>
      <Taskbar
        windowState={windowState}
        onToggleWindow={toggleWindow}
        onOpenThemeWindow={openThemeWindow}
      />
      {themeWindowOpen && <ThemeWindow onClose={closeThemeWindow} />}
    </LayoutWrapper>
  );
};
