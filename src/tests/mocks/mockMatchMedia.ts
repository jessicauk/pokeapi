import { vi } from "vitest";

export const mockMatchMedia = (matches = false) => {
  return (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated but included for completeness
    removeListener: vi.fn(), // Deprecated but included for completeness
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
};
