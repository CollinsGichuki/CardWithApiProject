const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts() {
  const response = await fetch(BASE_URL);
  const posts = await response.json();

  return posts;
}
