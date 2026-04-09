import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styled, { keyframes } from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';

const GEO_BLACK = '#000000';
const GEO_GREEN = '#00ff00';
const GEO_CYAN = '#00ffff';
const GEO_MAGENTA = '#ff00ff';
const GEO_YELLOW = '#ffff00';
const GEO_RED = '#ff0000';

const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.5rem); }
`;

const constructionStripe = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 2rem 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Comic Sans MS', 'Comic Sans', 'Chalkboard', 'ChalkboardSE', cursive;
  background: ${GEO_BLACK};
  color: ${GEO_GREEN};
  padding: 1rem;
  min-height: 100vh;
`;

const MarqueeContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  background: ${GEO_MAGENTA};
  color: ${GEO_YELLOW};
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const MarqueeText = styled.div`
  display: inline-block;
  animation: ${marquee} 12s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const GlobeSection = styled.div`
  margin: 1.5rem 0;
`;

const SpinningGlobe = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  animation: ${spin} 4s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const WelcomeText = styled.div`
  color: ${GEO_CYAN};
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const SectionBox = styled.div<{ $borderColor: string }>`
  border: 6px ridge ${({ $borderColor }) => $borderColor};
  padding: 1rem;
  margin: 1rem 0;
  background: ${GEO_BLACK};
`;

const SectionHeading = styled.h2<{ $color: string }>`
  font-family: 'Times New Roman', serif;
  color: ${({ $color }) => $color};
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
`;

const AboutText = styled.p<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin: 0.5rem 0;
`;

const FakeLink = styled.span`
  color: #0000ff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0000aa;
  }
`;

const LinkError = styled.div`
  color: ${GEO_RED};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const GuestbookButton = styled.button`
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.75rem;
  background: linear-gradient(90deg, ${GEO_MAGENTA}, ${GEO_YELLOW}, ${GEO_CYAN}, ${GEO_MAGENTA});
  background-size: 200% 100%;
  border: 3px solid ${GEO_YELLOW};
  color: ${GEO_BLACK};
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`;

const HitCounter = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${GEO_BLACK};
  border: 3px solid ${GEO_MAGENTA};
  color: ${GEO_YELLOW};
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  animation: ${bounce} 1s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  &:hover {
    background: ${GEO_MAGENTA};
    color: ${GEO_BLACK};
  }
`;

const ConstructionBanner = styled.div`
  margin: 1rem 0;
  padding: 0.5rem;
  background: repeating-linear-gradient(
    45deg,
    ${GEO_YELLOW},
    ${GEO_YELLOW} 0.5rem,
    ${GEO_BLACK} 0.5rem,
    ${GEO_BLACK} 1rem
  );
  background-size: 2rem 2rem;
  border: 3px solid ${GEO_BLACK};
  color: ${GEO_BLACK};
  font-size: 1rem;
  font-weight: bold;
  animation: ${constructionStripe} 1s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const FooterText = styled.div`
  margin-top: 1rem;
  color: #ff69b4;
  font-size: 0.75rem;
  font-style: italic;
`;

const PopupOverlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const PopupBox = styled.div`
  padding: 1.5rem;
  background: ${GEO_BLACK};
  border: 4px solid ${GEO_MAGENTA};
  box-shadow: 0 0 2rem ${GEO_MAGENTA};
  text-align: center;
  max-width: 20rem;
`;

const PopupText = styled.p`
  color: ${GEO_CYAN};
  font-size: 1rem;
  margin: 0 0 1rem 0;
`;

const PopupClose = styled.button`
  padding: 0.5rem 1rem;
  background: ${GEO_MAGENTA};
  border: none;
  color: ${GEO_BLACK};
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${GEO_CYAN};
  }
`;

const GlobeSvg = () => (
  <svg
    fill="none"
    height="100%"
    viewBox="0 0 48 48"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" fill="none" r="20" stroke={GEO_GREEN} strokeWidth="1" />
    <ellipse cx="24" cy="24" fill="none" rx="20" ry="8" stroke={GEO_GREEN} strokeWidth="1" />
    <ellipse cx="24" cy="24" fill="none" rx="20" ry="14" stroke={GEO_GREEN} strokeWidth="1" />
    <ellipse cx="24" cy="24" fill="none" rx="8" ry="20" stroke={GEO_GREEN} strokeWidth="1" />
    <ellipse cx="24" cy="24" fill="none" rx="14" ry="20" stroke={GEO_GREEN} strokeWidth="1" />
    <line stroke={GEO_CYAN} strokeWidth="1" x1="24" x2="24" y1="4" y2="44" />
    <line stroke={GEO_CYAN} strokeWidth="1" x1="4" x2="44" y1="24" y2="24" />
  </svg>
);

const FAKE_LINKS = [
  "My Friend's Page",
  'FREE Email!!!',
  'Webmaster Tools',
  'Download Winamp!',
  'The Best MIDI Archive',
];

export const GeoCitiesHomepage = (): React.ReactElement | null => {
  const { themeName } = useThemeSwitch();
  const [visitorCount, setVisitorCount] = useState(10000);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedLink, setClickedLink] = useState<string | null>(null);
  const linkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const popupCloseRef = useRef<HTMLButtonElement>(null);

  // Set random visitor count after mount to avoid SSR hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR hydration: must set random value after mount
    setVisitorCount((Date.now() % 90000) + 10000);
  }, []);

  // Focus the popup close button when popup opens
  useEffect(() => {
    if (showPopup) {
      popupCloseRef.current?.focus();
    }
  }, [showPopup]);

  // Cleanup link timeout on unmount
  useEffect(() => {
    return () => {
      if (linkTimeoutRef.current) {
        clearTimeout(linkTimeoutRef.current);
      }
    };
  }, []);

  const formattedCount = useMemo(() => visitorCount.toString().padStart(6, '0'), [visitorCount]);

  const handleCounterClick = useCallback(() => {
    setVisitorCount((prev) => prev + 1);
  }, []);

  const handleGuestbookClick = useCallback(() => {
    setShowPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const handleLinkClick = useCallback((linkName: string) => {
    if (linkTimeoutRef.current) {
      clearTimeout(linkTimeoutRef.current);
    }
    setClickedLink(linkName);
    linkTimeoutRef.current = setTimeout(() => setClickedLink(null), 3000);
  }, []);

  if (themeName !== 'geocities') {
    return null;
  }

  return (
    <>
      <Container>
        <MarqueeContainer>
          <MarqueeText>★·.·´¯`·.·★ WELCOME TO ANDY&apos;S HOMEPAGE ★·.·´¯`·.·★</MarqueeText>
        </MarqueeContainer>

        <GlobeSection>
          <SpinningGlobe>
            <GlobeSvg />
          </SpinningGlobe>
          <WelcomeText>Welcome to my corner of the World Wide Web!</WelcomeText>
        </GlobeSection>

        <SectionBox $borderColor={GEO_MAGENTA}>
          <SectionHeading $color={GEO_MAGENTA}>✦ About Me ✦</SectionHeading>
          <AboutText $color={GEO_GREEN}>My name is Andy Cumine</AboutText>
          <AboutText $color={GEO_YELLOW}>I am an Engineering Manager @ Second Nature</AboutText>
          <AboutText $color={GEO_GREEN}>
            I like functional programming, game design, and the web!
          </AboutText>
        </SectionBox>

        <SectionBox $borderColor={GEO_CYAN}>
          <SectionHeading $color={GEO_CYAN}>✦ Cool Links ✦</SectionHeading>
          <LinkList>
            {FAKE_LINKS.map((link) => (
              <LinkItem key={link}>
                <FakeLink onClick={() => handleLinkClick(link)}>{link}</FakeLink>
                {clickedLink === link && (
                  <LinkError>Link not found! This is 2026, not 1997 😅</LinkError>
                )}
              </LinkItem>
            ))}
          </LinkList>
        </SectionBox>

        <GuestbookButton onClick={handleGuestbookClick}>🌟 Sign My Guestbook! 🌟</GuestbookButton>

        <div>
          <div style={{ color: GEO_CYAN, marginBottom: '0.5rem' }}>You are visitor #</div>
          <HitCounter onClick={handleCounterClick}>{formattedCount}</HitCounter>
        </div>

        <ConstructionBanner>🚧 UNDER CONSTRUCTION 🚧</ConstructionBanner>

        <FooterText>Made with Notepad</FooterText>
        <FooterText>Best viewed in Netscape Navigator 4.0 at 800x600</FooterText>
      </Container>

      <PopupOverlay
        aria-label="Guestbook message"
        aria-modal="true"
        $isVisible={showPopup}
        onClick={handleClosePopup}
        role="dialog"
      >
        <PopupBox onClick={(e) => e.stopPropagation()}>
          <PopupText>Just kidding! Guestbooks went extinct in 2004 🦕</PopupText>
          <PopupClose aria-label="Close" onClick={handleClosePopup} ref={popupCloseRef}>
            OK
          </PopupClose>
        </PopupBox>
      </PopupOverlay>
    </>
  );
};
