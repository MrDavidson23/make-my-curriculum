import { resolver } from "blitz"
import db from "db"
import { UpdateLanguage } from "../components/validations"
export default resolver.pipe(
  resolver.zod(UpdateLanguage),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const language = await db.language.update({
      where: {
        id,
      },
      data,
    })
    return language
  }
)
