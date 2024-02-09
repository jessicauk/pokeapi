const url = new URL("https://pokeapi.co/api/v2/pokemon"); // https://pokeapi.co/
const LIMIT = 20

export interface Params {
    offset: number
}

export async function getPokemons({ offset }: Params) {
  try {
    const response = await fetch(`${url}?offset=${offset}&limit=${LIMIT}`);
    if (!response.ok) {
      throw new Error("Request not working");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getPokemonDetail(id:number) {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        throw new Error("Request not working");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

