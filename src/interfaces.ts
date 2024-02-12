export interface Pokemon {
  name: string;
  url: string;
  image?: string;
}

export interface Ability {
  name: string;
  url: string;
  label: string;
}

interface TextEntry {
  flavor_text: string;
  language: { name: string; url: string };
  version: { name: string; url: string };
}

interface Meta {
  category: {
    name: string;
    url: string;
  }
}
export interface Move {
  name: string;
  url: string;
  label: string;
  power: number;
  pp: number;
  accuracy: number;
  type: { name: string; url: string };
  damage_class: { name: string; url: string };
  flavor_text_entries: TextEntry[];
  meta: Meta
}

export interface Specie {
  name: string;
  shape: { name: string; url: string };
  color: { name: string; url: string }
  habitat: { name: string; url: string }
}
export interface PokemonDetail extends Pokemon {
  id: number;
  abilities: Ability[];
  moves: [{ move: { name: string; url: string } }];
  types: [{ slot: number; type: { name: string; url: string } }];
  weight: number;
  height: number;
  stats: [{ base_stat: number; effort: number, stat: { name: string; url: string } }];
}
