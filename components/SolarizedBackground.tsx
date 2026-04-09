import React, { useMemo } from 'react';

import styled, { keyframes } from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';

const scrollUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
`;

const ScrollingContent = styled.div`
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(88, 110, 117, 0.15);
  animation: ${scrollUp} 60s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translateY(-10%);
  }
`;

const TerminalLine = styled.div`
  white-space: pre;
  padding: 0.125rem 0;
`;

const TERMINAL_LINES = [
  '[  OK  ] Started Kernel Logging Service.',
  '[  OK  ] Reached target Local File Systems.',
  'Mounting /dev/nvme0n1p2 on /home...',
  '[  OK  ] Started Network Manager.',
  '$ git log --oneline -5',
  'a3f8c21 fix: resolve hydration mismatch on theme switch',
  'b7e4d19 feat: add synthwave horizon hero',
  'c1a9f03 refactor: extract theme context hook',
  'd5b2e87 chore: update dependencies',
  'e8c3f41 docs: update README with theme docs',
  '$ htop',
  '  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM',
  ' 1024 ajcumine  20   0  2.3G   180M   45M S   2.1   4.5',
  ' 1337 node      20   0  1.8G   220M   38M S  12.4   5.5',
  ' 2048 postgres  20   0  512M    64M   12M S   0.3   1.6',
  '$ cat /etc/hostname',
  'ajcumine-dev',
  '$ uptime',
  ' 14:32:07 up 42 days, 7:15, 1 user, load average: 0.42, 0.38, 0.35',
  '$ ls -la ~/projects/',
  'drwxr-xr-x  12 ajcumine users  4096 Apr 09 2026 .',
  'drwxr-xr-x   5 ajcumine users  4096 Jan 15 2026 ..',
  'drwxr-xr-x   8 ajcumine users  4096 Mar 20 2026 nextjs-site',
  'drwxr-xr-x   3 ajcumine users  4096 Feb 10 2026 rust-cli',
  'drwxr-xr-x   6 ajcumine users  4096 Mar 01 2026 elm-playground',
  '$ docker ps',
  'CONTAINER ID   IMAGE          STATUS         PORTS',
  'a1b2c3d4e5f6   postgres:15    Up 42 days     5432/tcp',
  'f6e5d4c3b2a1   redis:7        Up 42 days     6379/tcp',
  '$ npm run build',
  '> ajcumine@1.0.0 build',
  '> next build',
  '✓ Compiled successfully',
  '✓ Collecting page data',
  '✓ Generating static pages (12/12)',
  '$ echo "Hello, World"',
  'Hello, World',
  '$ neofetch',
  'ajcumine@dev',
  'OS: Arch Linux x86_64',
  'Kernel: 6.1.0-arch1',
  'Shell: zsh 5.9',
  'Terminal: alacritty',
  '$ ping -c 1 localhost',
  'PING localhost (127.0.0.1) 56(84) bytes of data.',
  '64 bytes from localhost: icmp_seq=1 ttl=64 time=0.042 ms',
  '[  OK  ] Started OpenSSH Daemon.',
  '[  OK  ] Reached target Multi-User System.',
  '$ fortune',
  '"Any sufficiently advanced technology is indistinguishable from magic."',
  '  -- Arthur C. Clarke',
  '$ date',
  'Thu Apr 09 14:32:42 UTC 2026',
  '$ whoami',
  'ajcumine',
  '$ cowsay "moo"',
  ' _____',
  '< moo >',
  ' -----',
  '        \\   ^__^',
  '         \\  (oo)\\_______',
  '            (__)\\       )\\/\\',
  '                ||----w |',
  '                ||     ||',
];

export const SolarizedBackground = (): React.ReactElement | null => {
  const { themeName } = useThemeSwitch();

  const allLines = useMemo(() => [...TERMINAL_LINES, ...TERMINAL_LINES], []);

  if (themeName !== 'solarized-dark') {
    return null;
  }

  return (
    <Container aria-hidden="true">
      <ScrollingContent>
        {allLines.map((line, index) => (
          <TerminalLine key={index}>{line}</TerminalLine>
        ))}
      </ScrollingContent>
    </Container>
  );
};
