import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: references,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.reference.count({
          where,
        }),
      query: (paginateArgs) =>
        db.reference.findMany({
          ...paginateArgs,
          where: { ...where, userId: ctx.session.userId },
          orderBy,
        }),
    })
    const { items: allReferences } = await paginate({
      skip,
      take,
      count: () =>
        db.reference.count({
          where,
        }),
      query: (paginateArgs) =>
        db.reference.findMany({
          ...paginateArgs,
          where: { userId: ctx.session.userId },
          orderBy,
        }),
    })
    return {
      references,
      allReferences,
      nextPage,
      hasMore,
      count,
    }
  }
)
