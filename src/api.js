import { API_URL, API_KEY, AUTHEN_TOKEN } from "./constants";

export const makeGetRequest = async (queryParams) => {
  const res = await fetch(`${API_URL}?${queryParams}`, {
    headers: {
      apikey: API_KEY,
      Authorization: AUTHEN_TOKEN,
    },
  })
  const response = await res.json()
  return response
}
