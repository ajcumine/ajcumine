import React, { useCallback, useRef, useState } from 'react';

import styled, { css } from 'styled-components';

import { size } from '../../../styles/variables';

import { bevelOut } from './chrome';

export type WindowState = 'normal' | 'minimized' | 'maximized';

interface DraggableWindowProps {
  title: string;
  windowState: WindowState;
  onWindowStateChange: (state: WindowState) => void;
  children: React.ReactNode;
}

const WindowFrame = styled.div<{ $maximized: boolean }>`
  background-color: #c0c0c0;
  ${bevelOut}
  padding: 0.3rem;
  margin: 1.6rem auto 4.8rem;
  max-width: 860px;
  width: calc(100% - 4.8rem);

  @media (min-width: ${size.desktop}) {
    max-width: 1100px;
  }

  ${({ $maximized }) =>
    $maximized &&
    css`
      position: fixed;
      inset: 1rem 1rem 5rem 1rem;
      width: auto;
      max-width: none;
      margin: 0;
      z-index: 800;
      display: flex;
      flex-direction: column;
    `}
`;

const TitleBar = styled.div<{ $maximized: boolean }>`
  display: flex;
  align-items: center;
  height: 2.4rem;
  padding: 0 0.4rem 0 0.8rem;
  background: linear-gradient(to right, #000080, #1084d0);
  color: #ffffff;
  font-weight: bold;
  font-size: 1.3rem;
  user-select: none;
  touch-action: none;
  cursor: ${({ $maximized }) => ($maximized ? 'default' : 'move')};

  &:focus-visible {
    outline: 0.2rem dotted #ffffff;
    outline-offset: -0.3rem;
  }
`;

const TitleText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TitleBarButtons = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-left: auto;
`;

const TitleBarButton = styled.button`
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

const WindowBody = styled.div<{ $maximized: boolean }>`
  padding: 1.6rem;
  color: #000000;

  ${({ $maximized }) =>
    $maximized &&
    css`
      flex: 1 1 auto;
      overflow-y: auto;
    `}
`;

const NUDGE_PX = 10;

export const DraggableWindow = ({
  title,
  windowState,
  onWindowStateChange,
  children,
}: DraggableWindowProps) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{
    pointerX: number;
    pointerY: number;
    baseX: number;
    baseY: number;
  } | null>(null);

  const maximized = windowState === 'maximized';

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (maximized) return;
      // Clicks on the title-bar buttons must not start a drag: capturing the
      // pointer here would retarget the pointerup away from the button and
      // its onClick would never fire.
      if ((event.target as HTMLElement).closest('button')) return;
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragStart.current = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        baseX: offset.x,
        baseY: offset.y,
      };
    },
    [maximized, offset],
  );

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const { pointerX, pointerY, baseX, baseY } = dragStart.current;
    setOffset({
      x: baseX + (event.clientX - pointerX),
      y: baseY + (event.clientY - pointerY),
    });
  }, []);

  const handlePointerEnd = useCallback(() => {
    dragStart.current = null;
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (maximized) return;
      const deltas: Record<string, { x: number; y: number }> = {
        ArrowLeft: { x: -NUDGE_PX, y: 0 },
        ArrowRight: { x: NUDGE_PX, y: 0 },
        ArrowUp: { x: 0, y: -NUDGE_PX },
        ArrowDown: { x: 0, y: NUDGE_PX },
      };
      const delta = deltas[event.key];
      if (!delta) return;
      event.preventDefault();
      setOffset((prev) => ({ x: prev.x + delta.x, y: prev.y + delta.y }));
    },
    [maximized],
  );

  if (windowState === 'minimized') return null;

  return (
    <WindowFrame
      $maximized={maximized}
      style={maximized ? undefined : { transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <TitleBar
        $maximized={maximized}
        tabIndex={0}
        role="toolbar"
        aria-label={`${title} window title bar. Use arrow keys to move the window.`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        <TitleText>{title}</TitleText>
        <TitleBarButtons>
          <TitleBarButton
            aria-label="Minimize window"
            onClick={() => onWindowStateChange('minimized')}
          >
            _
          </TitleBarButton>
          <TitleBarButton
            aria-label={maximized ? 'Restore window' : 'Maximize window'}
            onClick={() => onWindowStateChange(maximized ? 'normal' : 'maximized')}
          >
            □
          </TitleBarButton>
          <TitleBarButton
            aria-label="Close window"
            title="Nice try."
            onClick={() => onWindowStateChange('minimized')}
          >
            ×
          </TitleBarButton>
        </TitleBarButtons>
      </TitleBar>
      <WindowBody $maximized={maximized}>{children}</WindowBody>
    </WindowFrame>
  );
};
