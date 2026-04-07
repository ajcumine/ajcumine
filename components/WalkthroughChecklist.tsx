import React, { useCallback, useMemo, useSyncExternalStore } from 'react';

import styled from 'styled-components';

import { color } from '../styles/variables';

import { Typography } from './Typography';

// --- Types ---

interface ChecklistBlock {
  type: 'checklist';
  id: string;
  tag: string;
  text: string;
}

interface SubheadingBlock {
  type: 'subheading';
  text: string;
}

interface TextBlock {
  type: 'text';
  text: string;
}

interface TableBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
}

interface OrderedListBlock {
  type: 'ordered-list';
  items: string[];
}

type SectionBlock = ChecklistBlock | SubheadingBlock | TextBlock | TableBlock | OrderedListBlock;

interface Section {
  title: string;
  blocks: SectionBlock[];
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
  // FM24 Chelsea tags
  Chelsea: color.blue,
  Global: color.violet,
  Immediate: color.green,
  Future: color.cyan,
  Sell: color.red,
  Scout: color.darkText,
  Hijack: color.orange,
  Actual: color.magenta,
  Keep: color.yellow,
  Develop: color.green,
};

const paletteColors = [
  color.yellow,
  color.orange,
  color.red,
  color.magenta,
  color.violet,
  color.blue,
  color.cyan,
  color.green,
];

const getTagColor = (tag: string): string => {
  if (tagColors[tag]) return tagColors[tag];
  const prefix = tag.split(' - ')[0];
  if (prefix && tagColors[prefix]) return tagColors[prefix];
  let hash = 0;
  for (const ch of tag) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return paletteColors[Math.abs(hash) % paletteColors.length] ?? color.darkText;
};

// --- Markdown parser ---

const parseTable = (lines: string[]): TableBlock => {
  const parseRow = (line: string): string[] =>
    line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim());

  const headers = parseRow(lines[0] ?? '');
  const rows = lines.slice(2).map(parseRow);
  return { type: 'table', headers, rows };
};

const parseWalkthrough = (content: string): WalkthroughData => {
  const lines = content.split('\n');
  let title = '';
  let description = '';
  const sections: Section[] = [];
  let currentSection: Section | null = null;
  let itemCounter = 0;
  let inDescription = false;
  let tableBuffer: string[] = [];
  let orderedListBuffer: string[] = [];

  const flushTable = () => {
    if (tableBuffer.length >= 3 && currentSection) {
      currentSection.blocks.push(parseTable(tableBuffer));
    }
    tableBuffer = [];
  };

  const flushOrderedList = () => {
    if (orderedListBuffer.length > 0 && currentSection) {
      currentSection.blocks.push({ type: 'ordered-list', items: [...orderedListBuffer] });
    }
    orderedListBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // H1 title
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      flushTable();
      flushOrderedList();
      title = trimmed.replace(/^# /, '');
      inDescription = true;
      continue;
    }

    // H2 section heading
    if (trimmed.startsWith('## ')) {
      flushTable();
      flushOrderedList();
      inDescription = false;
      currentSection = {
        title: trimmed.replace(/^## /, ''),
        blocks: [],
      };
      sections.push(currentSection);
      continue;
    }

    // Description paragraph (between H1 and first H2)
    if (inDescription && trimmed && !trimmed.startsWith('---')) {
      if (description) description += ' ';
      description += trimmed;
      continue;
    }

    // Skip horizontal rules and empty lines
    if (!trimmed || trimmed === '---') {
      flushTable();
      flushOrderedList();
      continue;
    }

    if (!currentSection) continue;

    // Table rows
    if (trimmed.startsWith('|')) {
      flushOrderedList();
      tableBuffer.push(trimmed);
      continue;
    } else {
      flushTable();
    }

    // H3 sub-heading
    if (trimmed.startsWith('### ')) {
      flushOrderedList();
      currentSection.blocks.push({ type: 'subheading', text: trimmed.replace(/^### /, '') });
      continue;
    }

    // Checklist item
    const checkboxMatch = trimmed.match(/^- \[ \] `([^`]+)` (.+)$/);
    if (checkboxMatch?.[1] && checkboxMatch[2]) {
      flushOrderedList();
      currentSection.blocks.push({
        type: 'checklist',
        id: `item-${itemCounter++}`,
        tag: checkboxMatch[1],
        text: checkboxMatch[2],
      });
      continue;
    }

    // Ordered list item
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch?.[1]) {
      orderedListBuffer.push(olMatch[1]);
      continue;
    }

    // Plain text / bold text
    flushOrderedList();
    currentSection.blocks.push({ type: 'text', text: trimmed });
  }

  flushTable();
  flushOrderedList();

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

const LegendSection = styled.div`
  margin-top: 1.2rem;
`;

const LegendSectionTitle = styled.div`
  font-size: 1.3rem;
  color: ${color.yellow};
  margin-bottom: 0.4rem;
`;

const SubHeadingWrapper = styled.div`
  margin-top: 1.6rem;
  margin-bottom: 0.8rem;
`;

const TextBlockWrapper = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${color.light};
  margin-bottom: 0.8rem;

  strong {
    color: ${color.yellow};
    font-weight: bold;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
`;

const TableHead = styled.thead`
  border-bottom: 0.2rem solid ${color.yellow};
`;

const TableHeaderCell = styled.th`
  text-align: left;
  padding: 0.6rem 1.2rem;
  color: ${color.yellow};
  font-weight: bold;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  border-bottom: 0.1rem solid ${color.darkCard};

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 0.4rem 1.2rem;
  color: ${color.light};
  white-space: nowrap;
`;

const OrderedList = styled.ol`
  padding-left: 2.4rem;
  margin-bottom: 1.2rem;
`;

const OrderedListItem = styled.li`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${color.light};
  margin-bottom: 0.4rem;

  strong {
    color: ${color.yellow};
    font-weight: bold;
  }
`;

const renderInlineFormatting = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch?.[1]) {
      return <strong key={i}>{boldMatch[1]}</strong>;
    }
    return part;
  });
};

const getChecklistBlocks = (section: Section): ChecklistBlock[] =>
  section.blocks.filter((b): b is ChecklistBlock => b.type === 'checklist');

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
    getServerSnapshot: () => snapshot,
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

  const totalItems = data.sections.reduce((sum, s) => sum + getChecklistBlocks(s).length, 0);
  const totalChecked = data.sections.reduce(
    (sum, s) => sum + getChecklistBlocks(s).filter((item) => checked.has(item.id)).length,
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
              Each item is tagged with a category shown as a coloured label. Check items off as you
              complete them — progress is saved in your browser.
            </LegendItem>
            <LegendSection>
              <LegendSectionTitle>Tags in this guide</LegendSectionTitle>
              {Array.from(
                new Set(
                  data.sections.flatMap((s) => getChecklistBlocks(s).map((item) => item.tag)),
                ),
              ).map((tag) => (
                <Tag
                  key={tag}
                  $color={getTagColor(tag)}
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
        const sectionItems = getChecklistBlocks(section);
        const sectionChecked = sectionItems.filter((item) => checked.has(item.id)).length;
        const sectionTotal = sectionItems.length;
        const sectionPercent =
          sectionTotal > 0 ? Math.round((sectionChecked / sectionTotal) * 100) : 0;
        const isOpen = !collapsedSections.has(sectionIndex);

        return (
          <SectionWrapper key={sectionIndex}>
            <SectionHeader onClick={() => toggleSection(sectionIndex)}>
              <Chevron $open={isOpen}>▶</Chevron>
              <Typography variant="h3">{section.title}</Typography>
              <SectionProgress>
                {sectionChecked}/{sectionTotal}
              </SectionProgress>
              <SectionProgressBar>
                <SectionProgressFill $percent={sectionPercent} />
              </SectionProgressBar>
            </SectionHeader>

            {isOpen && (
              <ItemList>
                {section.blocks.map((block, blockIndex) => {
                  switch (block.type) {
                    case 'checklist':
                      return (
                        <ItemRow key={block.id} $checked={checked.has(block.id)}>
                          <Checkbox
                            checked={checked.has(block.id)}
                            onChange={() => toggleItem(block.id)}
                          />
                          <Tag $color={getTagColor(block.tag)}>{block.tag}</Tag>
                          <ItemText $checked={checked.has(block.id)}>
                            {renderInlineFormatting(block.text)}
                          </ItemText>
                        </ItemRow>
                      );
                    case 'subheading':
                      return (
                        <SubHeadingWrapper key={`sh-${blockIndex}`}>
                          <Typography variant="h3">{block.text}</Typography>
                        </SubHeadingWrapper>
                      );
                    case 'text':
                      return (
                        <TextBlockWrapper key={`txt-${blockIndex}`}>
                          {renderInlineFormatting(block.text)}
                        </TextBlockWrapper>
                      );
                    case 'table':
                      return (
                        <StyledTable key={`tbl-${blockIndex}`}>
                          <TableHead>
                            <tr>
                              {block.headers.map((h, i) => (
                                <TableHeaderCell key={i}>{h}</TableHeaderCell>
                              ))}
                            </tr>
                          </TableHead>
                          <tbody>
                            {block.rows.map((row, rowIndex) => (
                              <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <TableCell key={cellIndex}>
                                    {renderInlineFormatting(cell)}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </tbody>
                        </StyledTable>
                      );
                    case 'ordered-list':
                      return (
                        <OrderedList key={`ol-${blockIndex}`}>
                          {block.items.map((item, i) => (
                            <OrderedListItem key={i}>
                              {renderInlineFormatting(item)}
                            </OrderedListItem>
                          ))}
                        </OrderedList>
                      );
                    default:
                      return null;
                  }
                })}
              </ItemList>
            )}
          </SectionWrapper>
        );
      })}
    </Wrapper>
  );
};
