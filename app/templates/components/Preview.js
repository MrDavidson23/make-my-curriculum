import { useMutation } from "blitz"
import { Paper, Card, CardContent, Typography, Grid } from "@mui/material"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"

import createTemplateOnUser from "app/template-on-users/mutations/createTemplateOnUser"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import axios from "axios"

export const Preview = (props) => {
  const [createTemplateOnUserMutation] = useMutation(createTemplateOnUser)
  // Calculates the distribution of rows for both sides
  const getDistribution = (percentage) => {
    return percentage > 0.5
      ? Math.floor(12 * (percentage / 100))
      : Math.ceil(12 * (percentage / 100))
  }

  return (
    <Grid display="flex" justifyContent="center">
      <Paper elevation={3}>
        <Grid
          container
          direction="row"
          sx={{ mx: "auto", width: "100%", minHeight: 350, maxWidth: 300 }}
        >
          {/*Left side*/}
          <Grid item xs={getDistribution(props.percentage)}>
            <Card
              sx={{ minWidth: 300 * (props.percentage / 100), minHeight: 350 }}
              style={{ backgroundColor: props.leftStyles.container.backgroundColor }}
            >
              <CardContent>
                <Typography style={props.leftStyles.title}>
                  {props.title === undefined ? "Título" : props.title}
                </Typography>
                <Typography style={props.leftStyles.text}>
                  {props.text === undefined ? "Texto" : props.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/*Right side*/}
          <Grid item xs={12 - getDistribution(props.percentage)}>
            <Card
              sx={{ minWidth: 300 * (1 - props.percentage / 100), minHeight: 350 }}
              style={{ backgroundColor: props.rightStyles.container.backgroundColor }}
            >
              <CardContent>
                {props.isPremium && (
                  <>
                    <WorkspacePremiumIcon color="warning" />
                  </>
                )}
                <Typography style={props.rightStyles.title}>
                  {props.title === undefined ? "Título" : props.title}
                </Typography>
                <Typography style={props.rightStyles.text}>
                  {props.text === undefined ? "Texto" : props.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {props.isPremium && (
          <PayPalScriptProvider
            options={{
              "client-id": process.env.BLITZ_PUBLIC_CLIENTID_PAYPAL,
            }}
          >
            <PayPalButtons
              createOrder={async () => {
                try {
                  const res = await axios({
                    url: "/app/api/payment/payment",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  return res.data.id
                } catch (error) {
                  console.log(error)
                }
              }}
              onApprove={async (data, actions) => {
                console.log(data)
                actions.order.capture()
                const values = {
                  userId: props.userId,
                  templateId: props.templateId,
                }
                const template = await createTemplateOnUserMutation(values)
              }}
              style={{ layout: "vertical", color: "blue" }}
            />
          </PayPalScriptProvider>
        )}
      </Paper>
    </Grid>
  )
}

export default Preview
