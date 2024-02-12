export interface Item {
  name: string;
  url: string;
}

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
  language: Item;
  version: Item;
}

interface Meta {
  category: Item;
}

export interface Move {
  name: string;
  url: string;
  label: string;
  power: number;
  pp: number;
  accuracy: number;
  type: Item;
  damage_class: Item;
  flavor_text_entries: TextEntry[];
  meta: Meta;
}

export interface Specie {
  name: string;
  shape: Item;
  color: Item;
  habitat: Item;
  base_happiness: number;
  capture_rate: number;
  evolves_from_species: Item;
  growth_rate: Item;
}
export interface PokemonDetail extends Pokemon {
  id: number;
  abilities: Ability[];
  moves: [{ move: Item }];
  types: [{ slot: number; type: Item }];
  weight: number;
  height: number;
  held_items: { item: Item }[];
  stats: [{ base_stat: number; effort: number; stat: Item }];
}
