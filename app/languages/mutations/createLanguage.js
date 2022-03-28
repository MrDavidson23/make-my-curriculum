import { resolver } from "blitz"
import db from "db"
import {CreateLanguage} from "../components/validations"

export default resolver.pipe(resolver.zod(CreateLanguage), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const language = await db.language.create({
    data: input,
  })
  return language
})
