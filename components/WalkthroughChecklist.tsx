import React, { useCallback, useMemo, useSyncExternalStore } from 'react';

import styled from 'styled-components';

import { color } from '../styles/variables';

import { Typography } from './Typography';

// --- Types ---

interface ChecklistItem {
  id: string;
  tag: string;
  text: string;
}

interface Section {
  title: string;
  items: ChecklistItem[];
}

interface WalkthroughData {
  title: string;
  description: string;
  sections: Section[];
}

// --- Tag color mapping (Solarized palette) ---

const tagColors: Record<string, string> = {
  Main: color.yellow,
  Companions: color.orange,
  Thieves: color.violet,
  'Dark Brotherhood': color.red,
  College: color.blue,
  'Civil War': color.cyan,
  Daedric: color.magenta,
  'DLC-DG': color.green,
  'DLC-DB': color.green,
  Bards: color.violet,
  Side: color.darkText,
  Misc: color.darkText,
  Collectible: color.cyan,
};

const getTagColor = (tag: string): string => {
  if (tagColors[tag]) return tagColors[tag];
  const prefix = tag.split(' - ')[0];
  if (prefix && tagColors[prefix]) return tagColors[prefix];
  return color.darkText;
};

// --- Markdown parser ---

const parseWalkthrough = (content: string): WalkthroughData => {
  const lines = content.split('\n');
  let title = '';
  let description = '';
  const sections: Section[] = [];
  let currentSection: Section | null = null;
  let itemCounter = 0;
  let inDescription = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      title = trimmed.replace(/^# /, '');
      inDescription = true;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      inDescription = false;
      currentSection = {
        title: trimmed.replace(/^## /, ''),
        items: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (inDescription && trimmed && !trimmed.startsWith('---') && !trimmed.startsWith('**')) {
      if (description) description += ' ';
      description += trimmed;
      continue;
    }

    const checkboxMatch = trimmed.match(/^- \[ \] `([^`]+)` (.+)$/);
    if (checkboxMatch?.[1] && checkboxMatch[2] && currentSection) {
      currentSection.items.push({
        id: `item-${itemCounter++}`,
        tag: checkboxMatch[1],
        text: checkboxMatch[2],
      });
    }
  }

  return { title, description, sections };
};

// --- localStorage helpers ---

const STORAGE_PREFIX = 'walkthrough:';

const getCheckedItems = (gameSlug: string): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${gameSlug}`);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveCheckedItems = (gameSlug: string, items: Set<string>): void => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${gameSlug}`, JSON.stringify([...items]));
  } catch {
    // localStorage full or unavailable — silently fail
  }
};

// --- Styled components ---

const Wrapper = styled.div`
  padding-bottom: 3.2rem;
`;

const DescriptionText = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${color.darkText};
  margin-bottom: 2.4rem;
`;

const OverallProgressWrapper = styled.div`
  margin-bottom: 3.2rem;
  padding: 1.6rem;
  background-color: ${color.darkCard};
  border-radius: 0.8rem;
`;

const ProgressLabel = styled.div`
  font-size: 1.4rem;
  color: ${color.light};
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
`;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: ${color.dark};
  border-radius: 0.4rem;
  overflow: hidden;
`;

const ProgressBarInner = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${(props) => props.$percent}%;
  background-color: ${color.green};
  border-radius: 0.4rem;
  transition: width 0.3s ease;
`;

const ResetButton = styled.button`
  font-family: 'Fira Code';
  font-size: 1.2rem;
  color: ${color.red};
  background: none;
  border: 0.1rem solid ${color.red};
  border-radius: 0.4rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  margin-top: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${color.red};
    color: ${color.light};
  }
`;

const SectionWrapper = styled.div`
  margin-bottom: 2.4rem;
`;

const SectionHeader = styled.button`
  font-family: 'Fira Code';
  background: none;
  border: none;
  color: ${color.light};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  text-align: left;
  padding: 0.8rem 0;
  border-bottom: 0.1rem solid ${color.darkCard};
  margin-bottom: 0.8rem;
`;

const Chevron = styled.span<{ $open: boolean }>`
  font-size: 1.2rem;
  color: ${color.yellow};
  transform: rotate(${(props) => (props.$open ? '90deg' : '0deg')});
  transition: transform 0.2s ease;
`;

const SectionProgress = styled.span`
  font-size: 1.2rem;
  color: ${color.darkText};
  margin-left: auto;
`;

const SectionProgressBar = styled.div`
  width: 8rem;
  height: 0.4rem;
  background-color: ${color.dark};
  border-radius: 0.2rem;
  overflow: hidden;
  margin-left: 0.8rem;
`;

const SectionProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${(props) => props.$percent}%;
  background-color: ${color.green};
  border-radius: 0.2rem;
  transition: width 0.3s ease;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ItemRow = styled.li<{ $checked: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.6rem 0;
  opacity: ${(props) => (props.$checked ? 0.5 : 1)};
  transition: opacity 0.2s ease;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 1.8rem;
  height: 1.8rem;
  min-width: 1.8rem;
  border: 0.2rem solid ${color.yellow};
  border-radius: 0.3rem;
  background-color: transparent;
  cursor: pointer;
  margin-top: 0.2rem;
  position: relative;

  &:checked {
    background-color: ${color.yellow};
    &::after {
      content: '✓';
      position: absolute;
      top: -0.1rem;
      left: 0.2rem;
      color: ${color.dark};
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
`;

const Tag = styled.span<{ $color: string }>`
  font-size: 1rem;
  font-family: 'Fira Code';
  color: ${(props) => props.$color};
  border: 0.1rem solid ${(props) => props.$color};
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  white-space: nowrap;
  margin-top: 0.2rem;
`;

const ItemText = styled.span<{ $checked: boolean }>`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${color.light};
  text-decoration: ${(props) => (props.$checked ? 'line-through' : 'none')};
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.4rem;
`;

const TitleDecorator = styled.div`
  width: 4rem;
  height: 0.2rem;
  background-color: ${color.yellow};
  border-radius: 0.1rem;
`;

const LegendWrapper = styled.div`
  margin-bottom: 2.4rem;
  padding: 1.2rem 1.6rem;
  background-color: ${color.darkCard};
  border-radius: 0.8rem;
  border-left: 0.3rem solid ${color.yellow};
`;

const LegendToggle = styled.button`
  font-family: 'Fira Code';
  font-size: 1.4rem;
  color: ${color.yellow};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const LegendContent = styled.div`
  margin-top: 1.2rem;
`;

const LegendItem = styled.div`
  font-size: 1.3rem;
  line-height: 2rem;
  color: ${color.light};
  margin-bottom: 0.6rem;
`;

const LegendLabel = styled.span<{ $color: string }>`
  color: ${(props) => props.$color};
  font-weight: bold;
`;

const LegendSection = styled.div`
  margin-top: 1.2rem;
`;

const LegendSectionTitle = styled.div`
  font-size: 1.3rem;
  color: ${color.yellow};
  margin-bottom: 0.4rem;
`;

const LegendRow = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${color.darkText};
  margin-bottom: 0.2rem;
`;

// --- Component ---

interface WalkthroughChecklistProps {
  content: string;
  gameSlug: string;
}

// --- External store for localStorage-backed checked items ---

const createCheckedStore = (gameSlug: string) => {
  let listeners: Array<() => void> = [];
  let snapshot: Set<string> = new Set();

  const notify = () => listeners.forEach((l) => l());

  const store = {
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => new Set<string>(),
    toggle: (itemId: string) => {
      const next = new Set(snapshot);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      snapshot = next;
      saveCheckedItems(gameSlug, next);
      notify();
    },
    reset: () => {
      snapshot = new Set();
      saveCheckedItems(gameSlug, snapshot);
      notify();
    },
    hydrate: () => {
      snapshot = getCheckedItems(gameSlug);
      notify();
    },
  };

  // Hydrate on creation (client only)
  if (typeof window !== 'undefined') {
    snapshot = getCheckedItems(gameSlug);
  }

  return store;
};

export const WalkthroughChecklist = ({ content, gameSlug }: WalkthroughChecklistProps) => {
  const data = useMemo(() => parseWalkthrough(content), [content]);
  const store = useMemo(() => createCheckedStore(gameSlug), [gameSlug]);
  const checked = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const [collapsedSections, setCollapsedSections] = React.useState<Set<number>>(new Set());
  const [legendOpen, setLegendOpen] = React.useState(false);

  const toggleItem = useCallback(
    (itemId: string) => {
      store.toggle(itemId);
    },
    [store],
  );

  const toggleSection = useCallback((sectionIndex: number) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionIndex)) {
        next.delete(sectionIndex);
      } else {
        next.add(sectionIndex);
      }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    store.reset();
  }, [store]);

  const totalItems = data.sections.reduce((sum, s) => sum + s.items.length, 0);
  const totalChecked = data.sections.reduce(
    (sum, s) => sum + s.items.filter((item) => checked.has(item.id)).length,
    0,
  );
  const overallPercent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography variant="h1">{data.title}</Typography>
        <TitleDecorator />
      </TitleWrapper>

      {data.description && <DescriptionText>{data.description}</DescriptionText>}

      <LegendWrapper>
        <LegendToggle onClick={() => setLegendOpen((prev) => !prev)}>
          <Chevron $open={legendOpen}>▶</Chevron>
          Guide &amp; annotations key
        </LegendToggle>
        {legendOpen && (
          <LegendContent>
            <LegendItem>
              <LegendLabel $color={color.orange}>Leveled — best at X</LegendLabel> — This reward
              scales with your level. Wait until the listed level for the strongest version.
            </LegendItem>
            <LegendItem>
              <LegendLabel $color={color.red}>Missable</LegendLabel> — This item or area is
              permanently inaccessible after a certain point.
            </LegendItem>
            <LegendItem>
              <LegendLabel $color={color.red}>Quest-locked area</LegendLabel> — You can only access
              this location during a specific quest.
            </LegendItem>
            <LegendSection>
              <LegendSectionTitle>Leveled rewards — when to delay</LegendSectionTitle>
              <LegendRow>
                Most Daedric artifacts are NOT leveled. The key leveled items are:
              </LegendRow>
              <LegendRow>
                Level 46+: Chillrend, Nightingale Blade, Nightingale Bow, Dragonbane
              </LegendRow>
              <LegendRow>Level 40+: Shield of Solitude</LegendRow>
              <LegendRow>Level 36+: Gauldur Blackblade, Gauldur Blackbow</LegendRow>
              <LegendRow>Level 32+: Nightingale Armor set</LegendRow>
            </LegendSection>
            <LegendSection>
              <LegendSectionTitle>Quest chain tags</LegendSectionTitle>
              {Object.entries(tagColors).map(([tag, tagColor]) => (
                <Tag
                  key={tag}
                  $color={tagColor}
                  style={{ marginRight: '0.4rem', marginBottom: '0.4rem', display: 'inline-block' }}
                >
                  {tag}
                </Tag>
              ))}
            </LegendSection>
          </LegendContent>
        )}
      </LegendWrapper>

      <OverallProgressWrapper>
        <ProgressLabel>
          <span>Overall progress</span>
          <span>
            {totalChecked} / {totalItems} ({overallPercent}%)
          </span>
        </ProgressLabel>
        <ProgressBarOuter>
          <ProgressBarInner $percent={overallPercent} />
        </ProgressBarOuter>
        <ResetButton onClick={resetProgress}>Reset all progress</ResetButton>
      </OverallProgressWrapper>

      {data.sections.map((section, sectionIndex) => {
        const sectionChecked = section.items.filter((item) => checked.has(item.id)).length;
        const sectionPercent =
          section.items.length > 0 ? Math.round((sectionChecked / section.items.length) * 100) : 0;
        const isOpen = !collapsedSections.has(sectionIndex);

        return (
          <SectionWrapper key={sectionIndex}>
            <SectionHeader onClick={() => toggleSection(sectionIndex)}>
              <Chevron $open={isOpen}>▶</Chevron>
              <Typography variant="h3">{section.title}</Typography>
              <SectionProgress>
                {sectionChecked}/{section.items.length}
              </SectionProgress>
              <SectionProgressBar>
                <SectionProgressFill $percent={sectionPercent} />
              </SectionProgressBar>
            </SectionHeader>

            {isOpen && (
              <ItemList>
                {section.items.map((item) => (
                  <ItemRow key={item.id} $checked={checked.has(item.id)}>
                    <Checkbox checked={checked.has(item.id)} onChange={() => toggleItem(item.id)} />
                    <Tag $color={getTagColor(item.tag)}>{item.tag}</Tag>
                    <ItemText $checked={checked.has(item.id)}>{item.text}</ItemText>
                  </ItemRow>
                ))}
              </ItemList>
            )}
          </SectionWrapper>
        );
      })}
    </Wrapper>
  );
};
