import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styled, { css, keyframes } from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';

const CYBER_GREEN = '#00ff41';
const CYBER_BLACK = '#0d0d0d';
const CYBER_CYAN = '#00ffff';

const blinkCursor = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const scrollFiles = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const glitchText = keyframes`
  0%, 100% { clip-path: inset(0 0 0 0); }
  20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
  40% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
  60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }
  80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const HintText = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: ${CYBER_GREEN};
  z-index: 100;
  animation: ${fadeIn} 0.5s ease-out 5s forwards;
  opacity: 0;

  @media (hover: none) {
    display: none;
  }
`;

const Cursor = styled.span`
  animation: ${blinkCursor} 1s step-end infinite;
`;

const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: ${CYBER_BLACK};
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  color: ${CYBER_GREEN};
  padding: 2rem;
  overflow: hidden;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StageContent = styled.div<{ $stage: number }>`
  text-align: center;
  max-width: 40rem;

  ${({ $stage }) =>
    $stage === 0 &&
    css`
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
    `}

  ${({ $stage }) =>
    $stage === 1 &&
    css`
      height: 20rem;
      overflow: hidden;
      font-size: 0.75rem;
      text-align: left;
      width: 100%;
    `}

  ${({ $stage }) =>
    $stage === 2 &&
    css`
      font-size: 1.25rem;
    `}

  ${({ $stage }) =>
    $stage === 3 &&
    css`
      font-size: 1rem;
      white-space: pre;
      line-height: 1.2;
    `}

  ${({ $stage }) =>
    $stage === 4 &&
    css`
      font-size: 3rem;
      font-weight: bold;
      color: ${CYBER_GREEN};
      animation: ${glitchText} 0.3s ease-in-out infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

const FileList = styled.div`
  animation: ${scrollFiles} 2s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const FileLine = styled.div`
  padding: 0.125rem 0;
  opacity: 0.8;
`;

const ProgressBar = styled.div`
  margin-top: 1rem;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
`;

const ProgressFill = styled.span<{ $percent: number }>`
  color: ${CYBER_CYAN};
`;

const ASCII_ART = `    ╔══════════════════════╗
    ║   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄   ║
    ║   █ ◉         ◉ █   ║
    ║   █    ▄▄▄▄▄    █   ║
    ║   █   |     |   █   ║
    ║   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀   ║
    ║   NEURAL INTERFACE   ║
    ╚══════════════════════╝`;

const FILE_PATHS = [
  '/etc/passwd',
  '/home/user/.ssh/id_rsa',
  '/var/log/syslog',
  '/usr/bin/python3',
  '/opt/app/config.yml',
  '/var/www/html/index.html',
  '/etc/nginx/nginx.conf',
  '/home/user/.bashrc',
  '/var/lib/docker/containers',
  '/usr/local/bin/node',
  '/etc/hosts',
  '/proc/cpuinfo',
  '/sys/class/net/eth0',
  '/dev/null',
  '/tmp/exploit.sh',
  '/root/.bash_history',
  '/var/spool/cron/crontabs',
  '/etc/shadow',
  '/home/user/projects/secret',
  '/opt/database/production.db',
];

const FadeOutText = styled.div`
  animation: ${fadeOut} 0.5s ease-out forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const VisuallyHiddenButton = styled.button`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const CyberpunkHack = (): React.ReactElement | null => {
  const { themeName } = useThemeSwitch();
  const [isHacking, setIsHacking] = useState(false);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const keyBufferRef = useRef<string[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const allFilePaths = useMemo(() => [...FILE_PATHS, ...FILE_PATHS], []);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  }, []);

  const resetHack = useCallback(() => {
    clearTimeouts();
    setIsHacking(false);
    setStage(0);
    setProgress(0);
  }, [clearTimeouts]);

  const startHack = useCallback(() => {
    if (isHacking) return;
    setIsHacking(true);
    setStage(0);
    setProgress(0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stageDuration = prefersReducedMotion ? 1000 : 2000;

    // Stage 0: Initiating (0-2s)
    timeoutsRef.current.push(
      setTimeout(() => {
        setStage(1);
      }, stageDuration),
    );

    // Stage 1: File scrolling (2-4s)
    timeoutsRef.current.push(
      setTimeout(() => {
        setStage(2);
      }, stageDuration * 2),
    );

    // Stage 2: Progress bar (4-6s)
    const progressInterval = setInterval(
      () => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      },
      prefersReducedMotion ? 20 : 40,
    );

    // Track the interval so clearTimeouts() can clear it on unmount/Escape
    timeoutsRef.current.push(progressInterval as unknown as NodeJS.Timeout);

    timeoutsRef.current.push(
      setTimeout(() => {
        clearInterval(progressInterval);
        setStage(3);
      }, stageDuration * 3),
    );

    // Stage 3: ASCII art (6-7s)
    timeoutsRef.current.push(
      setTimeout(() => {
        setStage(4);
      }, stageDuration * 3.5),
    );

    // Stage 4: Access granted (7-8s)
    timeoutsRef.current.push(
      setTimeout(() => {
        setStage(5);
      }, stageDuration * 4),
    );

    // Stage 5: Fade out (8s+)
    timeoutsRef.current.push(
      setTimeout(() => {
        resetHack();
      }, stageDuration * 4.5),
    );
  }, [isHacking, resetHack]);

  useEffect(() => {
    if (themeName !== 'cyberpunk') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isHacking) {
        resetHack();
        return;
      }

      if (isHacking) return;

      keyBufferRef.current = [...keyBufferRef.current.slice(-3), e.key.toLowerCase()];
      if (keyBufferRef.current.join('') === 'hack') {
        startHack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [themeName, isHacking, startHack, resetHack]);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  // Focus management for accessibility
  useEffect(() => {
    if (isHacking) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the overlay
      overlayRef.current?.focus();
    } else {
      // Restore focus when overlay closes
      previousFocusRef.current?.focus();
    }
  }, [isHacking]);

  if (themeName !== 'cyberpunk') {
    return null;
  }

  const renderStage = () => {
    switch (stage) {
      case 0:
        return <div>INITIATING BREACH PROTOCOL...</div>;
      case 1:
        return (
          <FileList>
            {allFilePaths.map((path, index) => (
              <FileLine key={index}>{`> Accessing ${path}...`}</FileLine>
            ))}
          </FileList>
        );
      case 2:
        return (
          <ProgressBar>
            <div>DECRYPTING... [{progress}%]</div>
            <div>
              [
              <ProgressFill $percent={progress}>
                {'█'.repeat(Math.floor(progress / 5))}
                {'░'.repeat(20 - Math.floor(progress / 5))}
              </ProgressFill>
              ]
            </div>
          </ProgressBar>
        );
      case 3:
        return <div>{ASCII_ART}</div>;
      case 4:
        return <div>ACCESS GRANTED</div>;
      case 5:
        return <FadeOutText>DISCONNECTING...</FadeOutText>;
      default:
        return null;
    }
  };

  return (
    <>
      <HintText>
        {"> type 'hack' to proceed"}
        <Cursor>_</Cursor>
      </HintText>
      <Overlay
        ref={overlayRef}
        $visible={isHacking}
        aria-label="Hack sequence animation - press Escape to close"
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        <VisuallyHiddenButton aria-label="Close hack sequence" onClick={resetHack}>
          Close
        </VisuallyHiddenButton>
        <StageContent $stage={stage}>{renderStage()}</StageContent>
      </Overlay>
    </>
  );
};
