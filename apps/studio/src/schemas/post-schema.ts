import { z } from "zod";
import { ZPostCreatePayload } from "@blog/lib";

export const ZCreate = ZPostCreatePayload.omit({ authorId: true });

export type TCreate = z.infer<typeof ZCreate>

