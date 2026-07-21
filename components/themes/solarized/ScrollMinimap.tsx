import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

const MinimapTrack = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 0.5rem;
  height: 100%;
  background-color: rgba(7, 54, 66, 0.6);
  z-index: 900;
  pointer-events: none;
`;

const MinimapFill = styled.div<{ $percent: number }>`
  width: 100%;
  height: ${({ $percent }) => $percent}%;
  background-color: #b58900;
`;

// Editor-style minimap: a thin rail on the right edge that fills as
// you scroll, like the coloured regions of a code-minimap.
export const ScrollMinimap = () => {
  const [percent, setPercent] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
      setPercent(Math.min(100, Math.max(0, next)));
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <MinimapTrack aria-hidden="true">
      <MinimapFill $percent={percent} />
    </MinimapTrack>
  );
};
