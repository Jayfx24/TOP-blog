import { api } from "@blog/features";
import type { PostUpdatePayload, PostResponsePayload } from "@blog/lib";
import type { TCreate } from "./schemas/post-schema";

// remove { data }
const studioAPI = api

async function getUserPosts() {
  const { data } = await studioAPI.get<PostResponsePayload[]>("studio/posts"); //?
  return data;
}

async function getPost(id: PostResponsePayload["id"]) {
  const { data } = await studioAPI.get<PostResponsePayload>(`studio/posts/${id}`);
  return data;
}
async function createPost(payload: TCreate) {
  const { data } = await studioAPI.post<PostResponsePayload>("studio/posts/new", payload);
  return data;
}

async function updatePost(payload: PostUpdatePayload) {
  const { data } = await studioAPI.patch<PostResponsePayload>(
    `studio/posts/${payload.id}/update`,
    payload,
  );
  return data;
} //

async function deletePost(id: PostResponsePayload["id"]) {
  const { data } = await studioAPI.delete<PostResponsePayload>(
    `studio/posts/${id}/delete`,
  );
  return data;
}

const StudioService = {
  createPost,
  getPost,
  getUserPosts,
  updatePost,
  deletePost,
};
export default StudioService;
