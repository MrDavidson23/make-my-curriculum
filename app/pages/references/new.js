import { Link, useRouter, useMutation, useRouterQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ReferenceForm, FORM_ERROR } from "app/references/components/ReferenceForm"

import {
  Box,
  Typography,
  Button,
  Stack,
  Checkbox,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Avatar,
  Grid,
} from "@mui/material"
import { CreateReferenceValidation } from "app/references/components/validaciones"
import createReference from "app/references/mutations/createReference"

const NewReferencePage = () => {
  const router = useRouter()
  const { curriculumId } = useRouterQuery()
  const [createReferenceMutation] = useMutation(createReference)
  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={12}>
          <h1>Create New Reference</h1>
        </Grid>
        <Grid item xs={12}>
          <ReferenceForm
            submitText="Create Reference" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreateReferenceValidation} ////////////////////////////
            initialValues={{ curriculumId: parseInt(curriculumId) }}
            onSubmit={async (values) => {
              try {
                const reference = await createReferenceMutation(values)
                router.push(Routes.EditCurriculumPage({ curriculumId }))
              } catch (error) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <p>
            <Link href={Routes.EditCurriculumPage({ curriculumId })}>
              <a>References</a>
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

NewReferencePage.authenticate = true

NewReferencePage.getLayout = (page) => <Layout title={"Create New Reference"}>{page}</Layout>

export default NewReferencePage
