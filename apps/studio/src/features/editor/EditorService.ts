import { api } from "@/config/axios.config";

// ECONNABORTED

// return types

/**
 * S
 */
export default class EditorService {
  public static async getAll() {
    const { data } = await api.get("posts");
    return data;
  }

  public static async getPost(id: number) {
    const { data } = await api.get(`posts/${id}`);
    return data;
  }
  static sendPost() {} //payload
}
