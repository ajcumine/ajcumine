import React, { useEffect } from 'react';

import styled from 'styled-components';

import { useThemeSwitch } from '../../../styles/ThemeContext';
import { themeList, themes } from '../../../styles/themes';

import { bevelIn, bevelOut, TitleBar, TitleBarButton } from './chrome';

const WindowFrame = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  z-index: 1100;
  width: 30rem;
  background-color: #c0c0c0;
  ${bevelOut}
  padding: 0.3rem;
  font-family: 'Tahoma', sans-serif;
`;

const WindowTitleText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CloseWrapper = styled.div`
  margin-left: auto;
`;

const WindowBody = styled.div`
  padding: 1.2rem;
  color: #000000;
`;

const Fieldset = styled.fieldset`
  ${bevelIn}
  background-color: #c0c0c0;
  padding: 0.8rem;
  margin: 0;

  legend {
    padding: 0 0.4rem;
    font-size: 1.2rem;
  }
`;

const ThemeRow = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.5rem 0.6rem;
  background: ${({ $active }) => ($active ? '#000080' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#000000')};
  border: none;
  font-family: 'Tahoma', sans-serif;
  font-size: 1.3rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#000080' : '#a0a0a0')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#000000')};
  }

  &:focus-visible {
    outline: 0.1rem dotted #000000;
    outline-offset: -0.2rem;
  }
`;

const Swatch = styled.span<{ $color: string; $accent: string }>`
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
  border: 0.3rem solid ${({ $accent }) => $accent};
  ${bevelIn}
`;

interface ThemeWindowProps {
  onClose: () => void;
}

export const ThemeWindow = ({ onClose }: ThemeWindowProps) => {
  const { themeName, setTheme } = useThemeSwitch();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <WindowFrame role="dialog" aria-label="Theme Properties">
      <TitleBar>
        <WindowTitleText>Theme Properties</WindowTitleText>
        <CloseWrapper>
          <TitleBarButton aria-label="Close Theme Properties" onClick={onClose}>
            ×
          </TitleBarButton>
        </CloseWrapper>
      </TitleBar>
      <WindowBody>
        <Fieldset>
          <legend>Select a theme:</legend>
          {themeList.map((theme) => {
            const themeData = themes[theme.slug];
            const isActive = theme.slug === themeName;
            return (
              <ThemeRow
                key={theme.slug}
                $active={isActive}
                aria-pressed={isActive}
                onClick={() => setTheme(theme.slug)}
              >
                <Swatch
                  aria-hidden="true"
                  $color={themeData?.background.page ?? '#000'}
                  $accent={themeData?.accent.primary ?? '#fff'}
                />
                {theme.name}
                {isActive ? ' ✓' : ''}
              </ThemeRow>
            );
          })}
        </Fieldset>
      </WindowBody>
    </WindowFrame>
  );
};
