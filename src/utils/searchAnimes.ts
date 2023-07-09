import { SubpleaseAnimeResponse } from '../types/types.js'

async function searchAnimes(
  query: string,
): Promise<null | SubpleaseAnimeResponse> {
  let res, data
  try {
    res = await fetch(`${process.env.BASE_URL}/s=${query}`)
  } catch (error) {
    return null
  }

  if (res?.ok) {
    data = await res.json()
    return data
  }

  return null
}

export { searchAnimes }
