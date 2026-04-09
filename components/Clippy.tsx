import React, { useCallback, useEffect, useMemo, useState } from 'react';

import styled, { css, keyframes } from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';

const MESSAGES = [
  "It looks like you're browsing a website. Would you like help with that?",
  "It looks like you're reading a blog post. Would you like me to summarize it?",
  'Did you know you can change themes? Click the palette icon!',
  "I see you're exploring projects. Need help finding something?",
  "Tip: Try pressing Ctrl+S... just kidding, this isn't Word!",
  "You look like you could use some help. Unfortunately, I can't actually help.",
  "It looks like you're trying to have fun. Would you like me to interrupt?",
  'Remember to save your work! Oh wait, this is a website.',
  'Would you like to install Bonzi Buddy? Just kidding... unless?',
  "I'm Clippy! I was retired in 2007, but I'm back, baby!",
];

const bobAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1) translateY(-0.3rem);
  }
  50% {
    transform: scale(0.95) translateY(0.1rem);
  }
  75% {
    transform: scale(1.05) translateY(-0.1rem);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(0.5rem);
  }
`;

const ClippyContainer = styled.div`
  position: fixed;
  bottom: 10rem;
  right: calc(50% - 430px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  font-family: 'Tahoma', 'MS Sans Serif', 'Arial', sans-serif;

  @media (min-width: 1200px) {
    right: calc(50% - 550px);
  }

  @media (max-width: 900px) {
    right: 2.4rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ClippyCharacter = styled.button<{ $isBouncing: boolean }>`
  width: 5rem;
  height: 6.67rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  ${({ $isBouncing }) =>
    $isBouncing
      ? css`
          animation: ${bounceAnimation} 0.5s ease-out;
        `
      : css`
          animation: ${bobAnimation} 2s ease-in-out infinite;
        `}

  &:hover {
    filter: brightness(1.1);
  }

  &:focus {
    outline: 0.15rem solid #000080;
    outline-offset: 0.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SpeechBubble = styled.div<{ $isVisible: boolean }>`
  position: relative;
  max-width: 16rem;
  padding: 0.75rem;
  background-color: #ffffe1;
  border: 0.15rem solid #000000;
  border-radius: 0.5rem;
  box-shadow: 0.15rem 0.15rem 0 rgba(0, 0, 0, 0.2);
  ${({ $isVisible }) =>
    $isVisible
      ? css`
          animation: ${fadeIn} 0.2s ease-out forwards;
        `
      : css`
          animation: ${fadeOut} 0.2s ease-out forwards;
        `}
  animation-fill-mode: forwards;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.6rem;
    right: 2rem;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 0.6rem solid #ffffe1;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    right: 1.9rem;
    width: 0;
    height: 0;
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
    border-top: 0.75rem solid #000000;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  }
`;

const SpeechBubbleContent = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #000000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c0c0c0;
  border: 0.1rem solid #ffffff;
  border-right-color: #000000;
  border-bottom-color: #000000;
  font-size: 0.75rem;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
  line-height: 1;

  &:active {
    border-color: #000000 #ffffff #ffffff #000000;
  }

  &:focus {
    outline: 0.1rem solid #000080;
    outline-offset: 0.05rem;
  }
`;

const ClippySvg = () => (
  <svg
    fill="none"
    height="100%"
    viewBox="0 0 120 160"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="wire" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#909090" />
        <stop offset="30%" stopColor="#d8d8d8" />
        <stop offset="50%" stopColor="#f0f0f0" />
        <stop offset="70%" stopColor="#d0d0d0" />
        <stop offset="100%" stopColor="#888888" />
      </linearGradient>
    </defs>

    {/* Paperclip wire body - continuous path */}
    <path
      d="M78 155 L78 30 C78 12, 42 12, 42 30 L42 135 C42 148, 68 148, 68 135 L68 50 C68 38, 52 38, 52 50 L52 115"
      fill="none"
      stroke="url(#wire)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    />

    {/* Metallic highlight stroke */}
    <path
      d="M78 155 L78 30 C78 12, 42 12, 42 30 L42 135 C42 148, 68 148, 68 135 L68 50 C68 38, 52 38, 52 50 L52 115"
      fill="none"
      stroke="#e8e8e8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    />

    {/* Left eye */}
    <ellipse cx="52" cy="60" fill="#ffffff" rx="9" ry="11" stroke="#333333" strokeWidth="1.5" />
    <ellipse cx="54" cy="61" fill="#000000" rx="4" ry="5" />
    <circle cx="55" cy="58" fill="#ffffff" r="2" />

    {/* Right eye */}
    <ellipse cx="68" cy="60" fill="#ffffff" rx="9" ry="11" stroke="#333333" strokeWidth="1.5" />
    <ellipse cx="66" cy="61" fill="#000000" rx="4" ry="5" />
    <circle cx="67" cy="58" fill="#ffffff" r="2" />

    {/* Left eyebrow */}
    <path
      d="M44 46 Q52 38, 60 46"
      fill="none"
      stroke="#333333"
      strokeLinecap="round"
      strokeWidth="2.5"
    />

    {/* Right eyebrow */}
    <path
      d="M60 46 Q68 38, 76 46"
      fill="none"
      stroke="#333333"
      strokeLinecap="round"
      strokeWidth="2.5"
    />
  </svg>
);

export const Clippy = (): React.ReactElement | null => {
  const { themeName } = useThemeSwitch();
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const currentMessage = useMemo(() => MESSAGES[messageIndex], [messageIndex]);

  const showRandomMessage = useCallback(() => {
    const newIndex = Math.floor(Math.random() * MESSAGES.length);
    setMessageIndex(newIndex);
    setIsBubbleVisible(true);
  }, []);

  const handleClippyClick = useCallback(() => {
    setIsBouncing(true);
    showRandomMessage();
    setTimeout(() => setIsBouncing(false), 500);
  }, [showRandomMessage]);

  const handleCloseBubble = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBubbleVisible(false);
  }, []);

  // Show bubble automatically after 3 seconds when Clippy appears
  useEffect(() => {
    if (themeName !== 'windows-98') return;

    const timer = setTimeout(() => {
      setIsBubbleVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [themeName]);

  if (themeName !== 'windows-98') {
    return null;
  }

  return (
    <ClippyContainer>
      <SpeechBubble $isVisible={isBubbleVisible}>
        <CloseButton aria-label="Close message" onClick={handleCloseBubble}>
          ×
        </CloseButton>
        <SpeechBubbleContent>{currentMessage}</SpeechBubbleContent>
      </SpeechBubble>
      <ClippyCharacter
        $isBouncing={isBouncing}
        aria-label="Clippy - Click for help"
        onClick={handleClippyClick}
        title="Click me for help!"
      >
        <ClippySvg />
      </ClippyCharacter>
    </ClippyContainer>
  );
};
