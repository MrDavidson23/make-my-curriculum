This project only exists to be able to run blitz db seed
as there is a bug that does not let blitzjs run db seed
if it is a javascript project

https://github.com/blitz-js/blitz/issues/3099

it is necesary to rename blitz.config.ts.backup to blitz.config.ts in order to run

also it is necesary to copy the schema.prisma file and the env.local from root project
