import React from 'react';

import styled from 'styled-components';

const WebringWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Times New Roman', 'Georgia', serif;
  font-size: 1.3rem;
  color: #ffffff;
`;

const WebringTitle = styled.span`
  color: #00ffff;
  text-decoration: underline;
`;

const Links = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const DeadLink = styled.span`
  color: #0000ff;
  background-color: #c0c0c0;
  text-decoration: underline;
  padding: 0 0.6rem;
  border: 0.2rem outset #ffffff;
  cursor: default;
  user-select: none;
`;

// Decorative webring bar. The links go nowhere — webrings are gone.
export const WebringBar = () => (
  <WebringWrapper aria-hidden="true">
    <WebringTitle>~*~ The Personal Homepages Webring ~*~</WebringTitle>
    <Links>
      <DeadLink title="It's decorative. Webrings are gone.">← Prev</DeadLink>
      <span>|</span>
      <DeadLink title="It's decorative. Webrings are gone.">Random</DeadLink>
      <span>|</span>
      <DeadLink title="It's decorative. Webrings are gone.">Next →</DeadLink>
    </Links>
  </WebringWrapper>
);
