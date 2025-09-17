// Text balance utilities for Safari fallbacks
import { getBrowserCapabilities } from './browserUtils';

/**
 * Check if text-wrap: balance is supported
 */
export const supportsTextBalance = (): boolean => {
  if (typeof window === 'undefined') return false;
  return CSS.supports('text-wrap: balance') || CSS.supports('text-wrap', 'balance');
};

/**
 * Text balancing configuration
 */
export interface TextBalanceConfig {
  maxLines?: number;
  minWordsPerLine?: number;
  targetRatio?: number; // Ideal ratio of longest to shortest line
}

/**
 * Manual text balancing for Safari fallback
 */
export const balanceText = (
  text: string,
  _maxWidth: number,
  config: TextBalanceConfig = {},
): string => {
  const { maxLines = 3, minWordsPerLine = 2, targetRatio = 1.5 } = config;

  const words = text.split(' ');
  if (words.length <= minWordsPerLine * 2) {
    return text; // Too short to balance
  }

  // Simple heuristic: try to split into roughly equal parts
  const wordsPerLine = Math.ceil(
    words.length / Math.min(maxLines, Math.ceil(words.length / minWordsPerLine)),
  );

  const lines: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    const line = words.slice(i, i + wordsPerLine).join(' ');
    lines.push(line);
  }

  // Check if the balance is reasonable
  if (lines.length > 1) {
    const lineLengths = lines.map((line) => line.length);
    const maxLength = Math.max(...lineLengths);
    const minLength = Math.min(...lineLengths);

    if (maxLength / minLength > targetRatio) {
      // Try a different split
      const avgWordsPerLine = Math.floor(words.length / lines.length);
      const newLines: string[] = [];
      let currentLine: string[] = [];

      for (const word of words) {
        currentLine.push(word);

        if (currentLine.length >= avgWordsPerLine && newLines.length < lines.length - 1) {
          newLines.push(currentLine.join(' '));
          currentLine = [];
        }
      }

      if (currentLine.length > 0) {
        if (newLines.length > 0 && currentLine.length < minWordsPerLine) {
          // Merge short last line with previous
          const lastLine = newLines.pop();
          if (lastLine) {
            newLines.push(`${lastLine} ${currentLine.join(' ')}`);
          }
        } else {
          newLines.push(currentLine.join(' '));
        }
      }

      return newLines.join('\n');
    }
  }

  return lines.join('\n');
};

/**
 * Get text balance classes with Safari fallback
 * For SSR compatibility, always include text-balance and let CSS handle the fallback
 */
export const getTextBalanceClasses = (
  baseClasses: string = '',
  _enableManualBalance: boolean = true,
): string => {
  const classes = [baseClasses];

  // Always add text-balance class for consistent SSR/client rendering
  // CSS will handle the fallback via @supports queries
  classes.push('text-balance');

  return classes.filter(Boolean).join(' ');
};

/**
 * React hook for text balancing with Safari fallback
 */
export const useTextBalance = (text: string, enabled: boolean = true) => {
  const capabilities = getBrowserCapabilities();
  const hasNativeSupport = supportsTextBalance();

  const getBalancedText = (containerWidth?: number) => {
    if (!enabled || hasNativeSupport) {
      return text;
    }

    if (capabilities.isSafari && containerWidth) {
      // Estimate characters per line based on container width
      // This is a rough estimate - in practice you might want to measure actual text
      const avgCharWidth = 8; // pixels per character (varies by font)
      const charsPerLine = Math.floor(containerWidth / avgCharWidth);
      const maxWidth = charsPerLine * avgCharWidth;

      return balanceText(text, maxWidth, {
        maxLines: 3,
        minWordsPerLine: 2,
        targetRatio: 1.3,
      });
    }

    return text;
  };

  const getTextBalanceClasses = (baseClasses: string = '') => {
    const classes = [baseClasses];

    if (hasNativeSupport) {
      classes.push('text-balance');
    } else if (capabilities.isSafari) {
      classes.push('text-balance-fallback');
    }

    return classes.filter(Boolean).join(' ');
  };

  return {
    balancedText: getBalancedText(),
    getBalancedText,
    getTextBalanceClasses,
    hasNativeSupport,
    needsFallback: capabilities.isSafari && !hasNativeSupport,
  };
};
