import { SubpleaseAnimeResponse } from '../types/types.js'
async function recentAnimes(): Promise<null | SubpleaseAnimeResponse> {
  let res, data
  try {
    res = await fetch(`${process.env.BASE_URL}`)
  } catch (error) {
    return null
  }

  if (res?.ok) {
    data = await res.json()
    return data
  }
  return null
}

export { recentAnimes }
