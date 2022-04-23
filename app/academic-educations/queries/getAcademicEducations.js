import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: academicEducations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.academicEducation.count({
          where,
        }),
      query: (paginateArgs) =>
        db.academicEducation.findMany({
          ...paginateArgs,
          where: { ...where, userId: ctx.session.userId },
          orderBy,
        }),
    })
    return {
      academicEducations,
      nextPage,
      hasMore,
      count,
    }
  }
)
