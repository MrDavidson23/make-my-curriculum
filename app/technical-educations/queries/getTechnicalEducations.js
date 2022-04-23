import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: technicalEducations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.technicalEducation.count({
          where,
        }),
      query: (paginateArgs) =>
        db.technicalEducation.findMany({
          ...paginateArgs,
          where: { ...where, userId: ctx.session.userId },
          orderBy,
        }),
    })
    return {
      technicalEducations,
      nextPage,
      hasMore,
      count,
    }
  }
)
