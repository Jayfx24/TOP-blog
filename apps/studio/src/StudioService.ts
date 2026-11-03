import { api } from "@blog/features";
import type { PostUpdatePayload, PostResponsePayload } from "@blog/lib";
import type { TCreate } from "./schemas/post-schema";

// remove { data }

async function getUserPosts() {
  const { data } = await api.get<PostResponsePayload[]>("api/"); //?
  return data;
}

async function getPost(id: PostResponsePayload["id"]) {
  const { data } = await api.get<PostResponsePayload>(`api/${id}`);
  return data;
}
async function createPost(payload: TCreate) {
  const { data } = await api.post<PostResponsePayload>("api/new", payload);
  return data;
}

async function updatePost(payload: PostUpdatePayload) {
  const { data } = await api.patch<PostResponsePayload>(
    `api/${payload.id}/update`,
    payload,
  );
  return data;
} //

async function deletePost(id: PostResponsePayload["id"]) {
  const { data } = await api.delete<PostResponsePayload>(
    `api/posts/${id}/delete`,
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
