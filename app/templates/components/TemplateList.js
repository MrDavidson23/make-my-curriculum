import { Suspense } from "react"
import CustomSpinner from "app/core/components/CustomSpinner"
import { Routes, useRouter, useMutation, useQuery } from "blitz"
import getTemplates from "app/templates/queries/getTemplates"
import getTemplateOnUser from "app/template-on-users/queries/getTemplateOnUser"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Swal from "sweetalert2"
import { Grid, Typography, Button } from "@mui/material"
import { Preview } from "app/templates/components/Preview"

const TemplateList = ({ onClick, showName }) => {
  const currentUser = useCurrentUser()
  const [{ templates, hasMore }] = useQuery(getTemplates, {
    orderBy: {
      id: "asc",
    },
  })
  const [templateOnUser] = useQuery(getTemplateOnUser, {
    id: currentUser.id,
  })

  const checkPremiumTemplate = (template) => {
    const templateFound = templateOnUser.find((x) => x.templateId === template.id)
    if (!template.isPremium) {
      return false
    } else {
      if (templateOnUser?.length === 0) {
        return false
      } else if (templateFound) {
        return false
      }
      return true
    }
  }

  if (!templates) {
    return null
  }

  showName = showName === undefined ? false : showName

  const getProps = (template) => {
    return {
      percentage: template.design.left.container.width / 6,
      leftStyles: template.design.left,
      rightStyles: template.design.right,
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        textAlign={"center"}
        alignContent={"center"}
        justifyContent={"center"}
        spacing={4}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Suspense fallback={<CustomSpinner />}>
          {templates.map((template) => (
            <Grid item key={template.id}>
              {showName && (
                <Typography variant="h5" gutterBottom>
                  {" "}
                  {template.name}{" "}
                </Typography>
              )}
              {/* The preview is clickable */}
              {onClick !== undefined && (
                <Button
                  onClick={() =>
                    checkPremiumTemplate(template)
                      ? Swal.fire({
                          icon: "error",
                          title: "Error",
                          text: "Esta plantilla es premium",
                        })
                      : onClick(template)
                  }
                >
                  <Preview {...getProps(template)} isPremium={checkPremiumTemplate(template)} />
                </Button>
              )}
              {/* Just the preview */}
              {onClick === undefined && (
                <Preview {...getProps(template)} isPremium={checkPremiumTemplate(template)} />
              )}
            </Grid>
          ))}
        </Suspense>
      </Grid>
    </>
  )
}

export default TemplateList
