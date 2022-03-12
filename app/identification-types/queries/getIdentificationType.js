import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetIdentificationType = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetIdentificationType),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const identificationType = await db.identificationType.findFirst({
      where: {
        id,
      },
    })
    if (!identificationType) throw new NotFoundError()
    return identificationType
  }
)
