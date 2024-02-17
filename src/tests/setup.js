import { vi } from "vitest";
import { mockMatchMedia } from "./mocks/mockMatchMedia";

vi.stubGlobal("matchMedia", mockMatchMedia(true));
