import React, { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { WindowState } from './DraggableWindow';

const ROUTES = [
  { href: '/', name: 'Home', icon: '⌂' },
  { href: '/about', name: 'About', icon: '✎' },
  { href: '/blog', name: 'Blog', icon: '☰' },
  { href: '/projects', name: 'Projects', icon: '⚒' },
  { href: '/walkthroughs', name: 'Walkthroughs', icon: '♟' },
];

const TaskbarFrame = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.8rem;
  background-color: #c0c0c0;
  border-top: 0.2rem solid #ffffff;
  box-shadow: inset 0 0.1rem 0 #dfdfdf;
  font-family: 'Tahoma', sans-serif;
`;

const StartButton = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: 3rem;
  padding: 0 1rem;
  background-color: #c0c0c0;
  font-family: 'Tahoma', sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  border-top: 0.2rem solid ${({ $open }) => ($open ? '#000000' : '#ffffff')};
  border-left: 0.2rem solid ${({ $open }) => ($open ? '#000000' : '#ffffff')};
  border-right: 0.2rem solid ${({ $open }) => ($open ? '#ffffff' : '#000000')};
  border-bottom: 0.2rem solid ${({ $open }) => ($open ? '#ffffff' : '#000000')};

  &:focus-visible {
    outline: 0.1rem dotted #000000;
    outline-offset: -0.4rem;
  }
`;

const StartGlyph = styled.span`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  width: 1.4rem;
  height: 1.4rem;

  i {
    display: block;
  }
  i:nth-child(1) {
    background-color: #ff0000;
  }
  i:nth-child(2) {
    background-color: #00ff00;
  }
  i:nth-child(3) {
    background-color: #0000ff;
  }
  i:nth-child(4) {
    background-color: #ffff00;
  }
`;

const TaskButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: 3rem;
  padding: 0 1.2rem;
  max-width: 22rem;
  background-color: ${({ $active }) => ($active ? '#dfdfdf' : '#c0c0c0')};
  font-family: 'Tahoma', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-top: 0.2rem solid ${({ $active }) => ($active ? '#000000' : '#ffffff')};
  border-left: 0.2rem solid ${({ $active }) => ($active ? '#000000' : '#ffffff')};
  border-right: 0.2rem solid ${({ $active }) => ($active ? '#ffffff' : '#000000')};
  border-bottom: 0.2rem solid ${({ $active }) => ($active ? '#ffffff' : '#000000')};
`;

const Clock = styled.div`
  margin-left: 0.4rem;
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 1.2rem;
  font-size: 1.2rem;
  border-top: 0.2rem solid #808080;
  border-left: 0.2rem solid #808080;
  border-right: 0.2rem solid #ffffff;
  border-bottom: 0.2rem solid #ffffff;
`;

const TrayArea = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 3rem;
  padding: 0 0.6rem;
  border-top: 0.2rem solid #808080;
  border-left: 0.2rem solid #808080;
  border-right: 0.2rem solid #ffffff;
  border-bottom: 0.2rem solid #ffffff;
`;

const TrayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0;

  &:hover {
    outline: 0.1rem dotted #000000;
  }

  &:focus-visible {
    outline: 0.2rem solid #000000;
  }
`;

const PaletteGlyph = styled.span`
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  width: 1.6rem;
  height: 1.6rem;
  border: 0.1rem solid #808080;

  i:nth-child(1) {
    background-color: #002b36;
  }
  i:nth-child(2) {
    background-color: #00ff41;
  }
  i:nth-child(3) {
    background-color: #008080;
  }
  i:nth-child(4) {
    background-color: #000033;
  }
  i:nth-child(5) {
    background-color: #f4f4f0;
  }
  i:nth-child(6) {
    background-color: #ff3300;
  }
  i:nth-child(7) {
    background-color: #ff6ac1;
  }
  i:nth-child(8) {
    background-color: #000080;
  }
  i:nth-child(9) {
    background-color: #b58900;
  }
`;

const StartMenu = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 0.4rem;
  z-index: 1001;
  width: 22rem;
  background-color: #c0c0c0;
  border-top: 0.2rem solid #ffffff;
  border-left: 0.2rem solid #ffffff;
  border-right: 0.2rem solid #000000;
  border-bottom: 0.2rem solid #000000;
  box-shadow: 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.3);
  display: flex;
`;

const StartMenuBanner = styled.div`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  background: linear-gradient(to top, #000080, #1084d0);
  color: #c0c0c0;
  font-weight: bold;
  font-size: 1.6rem;
  padding: 0.8rem 0.4rem;
  user-select: none;
`;

const StartMenuItems = styled.ul`
  flex: 1 1 auto;
  padding: 0.4rem;
`;

const StartMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  color: #000000;
  text-decoration: none;
  font-size: 1.4rem;

  &:hover,
  &:focus-visible {
    background-color: #000080;
    color: #ffffff;
    outline: none;
  }
`;

const MenuIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  background-color: #ffffff;
  border: 0.1rem solid #808080;
  font-size: 1.4rem;
`;

const StartMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.8rem 1.2rem;
  background: none;
  border: none;
  color: #000000;
  font-family: 'Tahoma', sans-serif;
  font-size: 1.4rem;
  text-align: left;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: #000080;
    color: #ffffff;
    outline: none;
  }
`;

const formatTime = (date: Date): string =>
  date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

interface TaskbarProps {
  windowState: WindowState;
  onToggleWindow: () => void;
  onOpenThemeWindow: () => void;
}

export const Taskbar = ({ windowState, onToggleWindow, onOpenThemeWindow }: TaskbarProps) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tick = () => setTime(new Date());
    const timeout = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  // Close menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        startRef.current &&
        !startRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        startRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  const handleSelect = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {menuOpen && (
        <StartMenu ref={menuRef} role="menu" aria-label="Start menu">
          <StartMenuBanner aria-hidden="true">ajcumine 98</StartMenuBanner>
          <StartMenuItems>
            {ROUTES.map(({ href, name, icon }) => (
              <li key={href} role="none">
                <StartMenuItem href={href} role="menuitem" onClick={handleSelect}>
                  <MenuIcon aria-hidden="true">{icon}</MenuIcon>
                  {name}
                </StartMenuItem>
              </li>
            ))}
            <li role="none">
              <StartMenuButton
                role="menuitem"
                onClick={() => {
                  handleSelect();
                  onOpenThemeWindow();
                }}
              >
                <MenuIcon aria-hidden="true">▦</MenuIcon>
                Theme Properties
              </StartMenuButton>
            </li>
          </StartMenuItems>
        </StartMenu>
      )}
      <TaskbarFrame>
        <StartButton
          ref={startRef}
          $open={menuOpen}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <StartGlyph aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </StartGlyph>
          Start
        </StartButton>
        <TaskButton
          $active={windowState !== 'minimized'}
          aria-pressed={windowState !== 'minimized'}
          title={
            windowState === 'minimized' ? 'Restore andy_cumine.exe' : 'Minimize andy_cumine.exe'
          }
          onClick={onToggleWindow}
        >
          {windowState === 'minimized' ? '▁' : '▣'} andy_cumine.exe
          {router.asPath !== '/' ? ` — ${router.asPath}` : ''}
        </TaskButton>
        <TrayArea>
          <TrayButton
            aria-label="Open Theme Properties"
            title="Theme Properties"
            onClick={onOpenThemeWindow}
          >
            <PaletteGlyph aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </PaletteGlyph>
          </TrayButton>
        </TrayArea>
        <Clock aria-label={time ? `Current time ${formatTime(time)}` : undefined}>
          {time ? formatTime(time) : '--:--'}
        </Clock>
      </TaskbarFrame>
    </>
  );
};
