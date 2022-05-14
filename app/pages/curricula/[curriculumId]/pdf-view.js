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

const GetInfo = () => {
  const currentUser = useCurrentUser()
  const curriculumId = useParam("curriculumId", "number")
  const [curriculum] = useQuery(getCurriculum, {
    id: curriculumId,
  })
  const [template] = useQuery(getTemplate, {
    id: curriculum.templateId,
  })
  curriculum.template = template
  const { role, userId, ...user } = currentUser
  const { name, ...info } = curriculum
  return { ...info, ...user }
}

const CurriculumDocument = (props) => {
  const info = props.curriculum
  const styles = props.curriculum.template.design
  return (
    <Document>
      <Page size="A4">
        <View  style={styles.container}>
          <View style={styles.left.container}>
            <PDFSection list={[info]} attributes={["name","email","phone","profession","description"]} label={""} styles={styles.left}/>          
            <PDFSection list={info.skills} attributes={["description"]} label={info.skillLabel} styles={styles.left}/>
          </View>
          <View style={styles.right.container}>
            <PDFSection list={info.laboralExperiences} 
                        attributes={["position","institution","location","startYear-finishYear"]}
                        label={info.laboralExperienceLabel} styles={styles.right}
            />
            <PDFSection list={info.academicEducations} 
                        attributes={["studies","institution","location","startYear-finishYear"]}
                        label={info.academicEducationLabel} styles={styles.right}
            />
            <PDFSection list={info.technicalEducations} 
                        attributes={["studies","institution","location","completionYear"]}
                        label={info.technicalEducationLabel} styles={styles.right}
            />
            <PDFSection list={info.publications} attributes={["name-tag","institution","location","date"]} label={info.publicationLabel} styles={styles.right}/>
            <PDFSection list={info.references} attributes={["name","email","phone"]} label={info.referenceLabel} styles={styles.right}/>
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
