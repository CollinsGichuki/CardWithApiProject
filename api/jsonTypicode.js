const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts() {
  //The network call
  const response = await fetch(BASE_URL);

  //Convert the response to Json
  const posts = await response.json();

  return posts;
}
