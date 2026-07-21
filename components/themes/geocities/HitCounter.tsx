import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

const STORAGE_KEY = 'geocities-hits';

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 1.4rem;
  color: #00ffff;
`;

const Digits = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Digit = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2.8rem;
  background-color: #000000;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 1.8rem;
  font-weight: bold;
  border: 0.2rem inset #c0c0c0;
`;

// A *real* hit counter: increments on every visit, stored in
// localStorage, rendered as odometer digits.
export const HitCounter = () => {
  const [hits, setHits] = useState<number | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const current = Number(localStorage.getItem(STORAGE_KEY) ?? '0') + 1;
        localStorage.setItem(STORAGE_KEY, String(current));
        setHits(current);
      } catch {
        setHits(1);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <CounterWrapper>
      <span>You are visitor number</span>
      <Digits aria-label={`Visitor number ${hits ?? 0}`}>
        {String(hits ?? 0)
          .padStart(6, '0')
          .split('')
          .map((digit, index) => (
            <Digit key={index} aria-hidden="true">
              {digit}
            </Digit>
          ))}
      </Digits>
    </CounterWrapper>
  );
};
