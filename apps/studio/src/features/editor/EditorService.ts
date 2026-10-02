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

const EditorService = {
  createPost,
  getPost,
  getAll,
  updatePost,
};
export default EditorService;
