import {
  describe,
  beforeAll,
  beforeEach,
  afterEach,
  vi,
  it,
  expect,
} from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import PokemonCard from "./";
import { useRouter } from "../../tests/mocks/mockNextRouter";

const image =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

describe("Card", () => {
  beforeAll(() => {
    vi.mock("next/navigation", () => ({
      useRouter: vi.fn(() => useRouter()),
    }));
  });
  beforeEach(() => {
    render(<PokemonCard name="pikachu" url="" image={image} />);
  });
  afterEach(() => {
    cleanup;
  });
  it("Should render the card", () => {
    const card = screen.getByRole("listitem");
    const pokemoncard = within(card).getByText("pikachu");
    const pokemonimage = within(card).getByRole("img");
    expect(card).toBeDefined();
    expect(pokemoncard).toBeDefined();
    expect(pokemonimage).toHaveProperty("alt", "pikachu");
  });
});
