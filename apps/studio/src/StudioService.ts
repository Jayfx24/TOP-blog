import { api } from "@/config/axios.config";
import type {
  PostCreatePayload,
  PostUpdatePayload,
  PostResponsePayload,
  
} from "@blog/lib";



async function getAll() {
  const { data } = await api.get<PostResponsePayload[]>("posts");
  return data;
}

async function getPost(id: number) {
  const { data } = await api.get<PostResponsePayload>(`posts/${id}`);
  return data;
}
async function createPost(payload: PostCreatePayload) {
  const { data } = await api.post<PostResponsePayload>("posts/create", payload);
  return data;


}

async function updatePost(payload: PostUpdatePayload) {
  const { data } = await api.post<PostResponsePayload>(
    `posts/${payload.id}/update`,
    payload,
  );
  return data;
} //

async function deletePost(id: number) {
  const { data } = await api.delete<PostResponsePayload>(`posts/${id}/delete`);
  return data;
}

const StudioService = {
  createPost,
  getPost,
  getAll,
  updatePost,
  deletePost
};
export default StudioService;
