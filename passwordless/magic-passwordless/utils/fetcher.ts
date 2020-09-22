export async function fetcher(url: string, method = "GET"): Promise<any> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
