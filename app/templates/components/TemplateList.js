import { Suspense } from "react"
import CustomSpinner from "app/core/components/CustomSpinner"
import { Routes, useRouter, useMutation } from "blitz"
import { Grid, Typography } from "@mui/material"
import { Preview } from "app/templates/components/Preview"

const TemplateList = ({
  templates,
}) => {

  if (!templates) {
    return null
  }

  return (
    <>
      <Grid>
        <Suspense fallback={<CustomSpinner />}>
            {templates.map((template) => (
            <Grid item key={template.id}>
                <Typography variant="h5" gutterBottom> {template.name} </Typography>
                <Preview
                    percentage={template.design.left.container.width/6}
                    leftStyles={template.design.left}
                    rightStyles={template.design.right}
                />
            </Grid>
            ))}
        </Suspense>
      </Grid>
    </>
  )
}

export default TemplateList
