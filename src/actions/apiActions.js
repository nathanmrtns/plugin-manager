/**
 * Used more than once, so I created a function for reusing it.
 */
export async function ApiFetchTabs() {
  const response = await fetch("/api/tabs");
  const data = await response.json();
  return data;
}
