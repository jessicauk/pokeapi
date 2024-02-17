import { vi } from "vitest";

export const useRouter = () => ({
  push: vi.fn(), // Mock a function for router.push
  pathname: "/", // Mock pathname or any relevant property your component uses
  query: {}, // Mock empty query object or populate as needed for tests
  asPath: "/",
  // Add any other router properties or methods your component relies on
});
