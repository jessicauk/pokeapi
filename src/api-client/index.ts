const API_URL = new URL("https://pokeapi.co/api/v2/pokemon"); // https://pokeapi.co/

export interface Params {
  offset: number;
  limit?: number;
}

export async function getPokemons({ offset, limit }: Params) {
  try {
    const response = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Request not working");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getPokemonDetail(name: string) {
  try {
    const response = await fetch(`${API_URL}/${name}`);
    if (!response.ok) {
      throw new Error("Request not working");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Request not working");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
