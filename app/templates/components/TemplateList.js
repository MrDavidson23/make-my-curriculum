import { Suspense } from "react"
import CustomSpinner from "app/core/components/CustomSpinner"
import { Routes, useRouter, useMutation, useQuery } from "blitz"
import getTemplates from "app/templates/queries/getTemplates"
import { Grid, Typography, Button } from "@mui/material"
import { Preview } from "app/templates/components/Preview"

const TemplateList = ({
  onClick
}) => {

  const [{ templates, hasMore }] = useQuery(getTemplates, {
    orderBy: {
      id: "asc",
    },
  })

  if (!templates) {
    return null
  }

  const getProps = (template) => {
    return {
      percentage:template.design.left.container.width/6,
      leftStyles:template.design.left,
      rightStyles:template.design.right
    }
  }

  return (
    <>
      <Grid>
        <Suspense fallback={<CustomSpinner />}>
            {templates.map((template) => (
            <Grid item key={template.id}>
                <Typography variant="h5" gutterBottom> {template.name} </Typography>
                { onClick === undefined &&
                  <Preview {...getProps(template)}/>
                }
                { onClick !== undefined &&
                  <Button onClick={onClick}>
                    <Preview {...getProps(template)}/>
                  </Button>
                }
            </Grid>
            ))}
        </Suspense>
      </Grid>
    </>
  )
}

export default TemplateList
