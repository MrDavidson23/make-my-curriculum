import { Suspense } from "react"
import { useQuery, useParam } from "blitz"
import getCurriculum from "app/curricula/queries/getAllCurriculum"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { PDFViewer } from "@react-pdf/renderer"

import PDFSection from "app/curricula/components/PDFSection"
import CustomSpinner from "app/core/components/CustomSpinner"
import getTemplate from "app/templates/queries/getTemplate"

// Create styles
const json_styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    "@media max-width: 400": {
      flexDirection: "column",
    },
    margin: "2px",
  },
  leftColumn: {
    flexDirection: "column",
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    paddingLeft: 15,
    "@media max-width: 400": {
      width: "100%",
      paddingRight: 0,
    },
    "@media orientation: landscape": {
      width: 200,
    },
    backgroundColor: "#3A298F",
    color: "#FAF6F6",
  },
  rightColumn: {
    paddingTop: 30,
    paddingRight: 15,
    paddingLeft: 10,
    "@media max-width: 400": {
      width: "100%",
      paddingRight: 0,
    },
    backgroundColor: "#FAF6F6",
  },
  title: {
    fontSize: "16pt",
    fontWeight: "bold",
  },
  text: {
    fontSize: "12pt",
    margin: "10px",
    lineHeight: 1.6,
  },
}
const styles = StyleSheet.create(json_styles)

const GetInfo = () => {
  const currentUser = useCurrentUser()
  const curriculumId = useParam("curriculumId", "number")
  const [curriculum] = useQuery(getCurriculum, {
    id: curriculumId,
  })
  const [template] = useQuery(getTemplate, {
    id: curriculum.templateId,
  })
  const { role, userId, ...user } = currentUser
  const { name, ...info } = curriculum
  return { ...info, ...user }
}
const PersonalInfo = (props) => {
  const { info } = props
  return (
    <View style={styles.text}>
      <Text>{info.name + " " + info.lastName} </Text>
      <Text>{info.email} </Text>
      <Text>{info.phone} </Text>
      <Text>{info.profession}</Text>
      <Text>{info.description}</Text>
    </View>
  )
}
const CurriculumDocument = (props) => {
  const info = props.curriculum
  const text = styles.text
  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <PersonalInfo info={info} />
            <PDFSection list={info.skills} attributes={["description"]} label={info.skillLabel} styles={styles}/>
          </View>
          <View style={styles.rightColumn}>
            <PDFSection list={info.laboralExperiences} 
                        attributes={["position","institution","location","startYear-finishYear"]}
                        label={info.laboralExperienceLabel} styles={styles}
            />
            <PDFSection list={info.academicEducations} 
                        attributes={["studies","institution","location","startYear-finishYear"]}
                        label={info.academicEducationLabel} styles={styles}
            />
            <PDFSection list={info.technicalEducations} 
                        attributes={["studies","institution","location","completionYear"]}
                        label={info.technicalEducationLabel} styles={styles}
            />
            <PDFSection list={info.publications} attributes={["name-tag","institution","location","date"]} label={info.publicationLabel} styles={styles}/>
            <PDFSection list={info.references} attributes={["name","email","phone"]} label={info.referenceLabel} styles={styles}/>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const PDFViewPage = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Suspense fallback={<CustomSpinner />}>
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <CurriculumDocument curriculum={GetInfo()} />
        </PDFViewer>
      </Suspense>
    </div>
  )
}

PDFViewPage.authenticate = true

PDFViewPage.getLayout = (page) => <Layout>{page}</Layout>

export default PDFViewPage
