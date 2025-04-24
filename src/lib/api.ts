import { baseUrl } from "./constants";

export const pokeApiCall = async (path=''): Promise<Response> => {
    const url = new URL(path, baseUrl)

    return fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

export const pokeApiCallWithPage = async (path='', limit=20, offset=0): Promise<Response> => {
    const url = new URL(path, baseUrl)
    url.searchParams.set('limit', String(limit))
    url.searchParams.set('offset', String(offset))

    return fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
}