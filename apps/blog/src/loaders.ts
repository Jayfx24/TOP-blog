import { blogService } from "./blogService";

export async function articlesLoader() {
  return await blogService.getPosts();
}
