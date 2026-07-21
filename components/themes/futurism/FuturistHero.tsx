import React from 'react';

import styled from 'styled-components';

// Marinetti's "parole in libertà" — words in freedom. The hero is a
// scattered typographic composition instead of a polite stack of text.

const Composition = styled.div`
  position: relative;
  height: 30rem;
  margin-bottom: 3.2rem;
  overflow: visible;

  @media (min-width: 900px) {
    height: 34rem;
  }
`;

const Word = styled.span`
  position: absolute;
  font-family: 'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  white-space: nowrap;
  line-height: 1;
`;

const Andy = styled(Word)`
  top: 1rem;
  left: 0;
  font-size: clamp(6rem, 14vw, 12rem);
  font-style: italic;
  color: #111111;
  transform: rotate(-2deg);
  text-shadow: 0.4rem 0.4rem 0 #ff3300;
`;

const Cumine = styled(Word)`
  top: clamp(7rem, 12vw, 13rem);
  left: clamp(4rem, 12vw, 14rem);
  font-size: clamp(3.2rem, 8vw, 6.4rem);
  color: #ffffff;
  transform: rotate(1.5deg);
  -webkit-text-stroke: 0.2rem #111111;
  text-stroke: 0.2rem #111111;
`;

const Handle = styled(Word)`
  top: clamp(12rem, 21vw, 21rem);
  left: 0.4rem;
  font-family: 'Fira Code';
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 400;
  color: #ff3300;
  transform: rotate(-3deg);
  letter-spacing: 0.1em;
`;

const Role = styled(Word)`
  top: clamp(16rem, 27vw, 26rem);
  left: clamp(1rem, 6vw, 6rem);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-style: italic;
  color: #111111;
  transform: skewX(-8deg);
`;

const Company = styled(Word)`
  top: clamp(20rem, 32vw, 30rem);
  left: clamp(0.5rem, 3vw, 3rem);
  font-size: clamp(1.2rem, 2.6vw, 1.8rem);
  color: #ffffff;
  background-color: #111111;
  padding: 0.2rem 1rem;
  transform: rotate(1deg) skewX(-12deg);
`;

const SrOnly = styled.span`
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

export const FuturistHero = () => (
  <Composition>
    <SrOnly>@ajcumine — Andy Cumine — Engineering Manager @ Second Nature</SrOnly>
    <Andy aria-hidden="true">Andy</Andy>
    <Cumine aria-hidden="true">Cumine</Cumine>
    <Handle aria-hidden="true">@ajcumine</Handle>
    <Role aria-hidden="true">+ Engineering Manager +</Role>
    <Company aria-hidden="true">Second Nature</Company>
  </Composition>
);
