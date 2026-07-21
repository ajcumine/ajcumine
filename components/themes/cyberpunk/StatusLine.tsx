import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

const StatusBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.4rem;
  z-index: 900;
  display: flex;
  align-items: center;
  gap: 2.4rem;
  padding: 0 1.6rem;
  background-color: #0a0a0a;
  border-top: 0.1rem solid rgba(0, 255, 65, 0.3);
  font-family: 'Fira Code';
  font-size: 1.1rem;
  color: #00ff41;
`;

const StatusItem = styled.span`
  white-space: nowrap;
`;

const Spacer = styled.span`
  margin-left: auto;
`;

const formatUptime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const StatusLine = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <StatusBar aria-hidden="true">
      <StatusItem>SYS.OK</StatusItem>
      <StatusItem>UPTIME {formatUptime(seconds)}</StatusItem>
      <Spacer />
      <StatusItem>PACKETS: {(1024 + seconds * 7).toLocaleString()}</StatusItem>
    </StatusBar>
  );
};
