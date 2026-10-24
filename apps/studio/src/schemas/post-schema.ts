import { z } from "zod";
import { ZPostCreatePayload, ZPostUpdatePayload } from "@blog/lib";

export const ZCreate = ZPostCreatePayload.omit({ authorId: true });

export type TCreate = z.infer<typeof ZCreate>


export const ZUpdate = ZPostUpdatePayload
export type TUpdate = z.infer<typeof ZUpdate>
