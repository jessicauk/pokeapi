import { expect, describe, it } from "vitest";

import { render, screen } from "@testing-library/react";
import Abilities from ".";

describe("Abilities", () => {
  it("should render the abilities", () => {
    render(
      <Abilities
        abilities={[
          {
            url: "url",
            label: "label",
            name: "ability 1",
          },
          {
            url: "url",
            label: "label",
            name: "ability 2",
          },
        ]}
      />
    );
    const ability1 = screen.getByText("ability 1");
    const ability2 = screen.getByText("ability 2");
    expect(ability1).toBeDefined();
    expect(ability2).toBeDefined();
  });
});
