import type { NodePos } from "@tiptap/core";
import axios, { AxiosError } from "axios";

export const uploadToCloudinary = async (
  src: string,
  title: string,
): Promise<string> => {
  const { data: blob } = await axios.get(src, {
    responseType: "blob",
  });
  const formData = new FormData();
  formData.append("file", blob, title);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );
  formData.append("asset_folder", "blog");

  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
  );

  console.log(data);

  return data.secure_url as string;
};

export const processNode = async (nodes: NodePos[] | null) => {
  if (!nodes) return;
  const filtered = nodes?.filter((node) =>
    node.attributes.src.startsWith("blob:"),
  );
  try {
    await Promise.all(
      filtered.map(
        async (img) =>
          (img.attributes.src = await uploadToCloudinary(
            img.attributes.src,
            img.attributes.title,
          )),
      ),
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      console.error(error.request);
    }
    console.error(error);
  }
};
