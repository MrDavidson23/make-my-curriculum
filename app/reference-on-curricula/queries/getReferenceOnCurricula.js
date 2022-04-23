import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: referenceOnCurricula,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.referenceOnCurriculum.count({
          where,
        }),
      query: (paginateArgs) =>
        db.referenceOnCurriculum.findMany({ ...paginateArgs, where, orderBy }),
    })
    return {
      referenceOnCurricula,
      nextPage,
      hasMore,
      count,
    }
  }
)
