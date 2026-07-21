import React from 'react';

import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const MarqueeWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  background-color: #000080;
  border-bottom: 0.3rem double #ffff00;
  padding: 0.6rem 0;
`;

const MarqueeTrack = styled.div`
  display: inline-block;
  animation: ${scroll} 18s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const MarqueeText = styled.span`
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 1.6rem;
  font-weight: bold;
  color: #ffff00;
  padding-right: 4rem;
`;

const MESSAGE =
  '*** WELCOME TO ANDY\u2019S HOMEPAGE!!! *** sign the guestbook *** BEST VIEWED AT 800x600 *** thanks for visiting!!! ';

// A loving tribute to <marquee>. The track holds two copies of the
// message so the -50% loop point is seamless.
export const Marquee = () => (
  <MarqueeWrapper aria-hidden="true">
    <MarqueeTrack>
      <MarqueeText>{MESSAGE}</MarqueeText>
      <MarqueeText>{MESSAGE}</MarqueeText>
    </MarqueeTrack>
  </MarqueeWrapper>
);
