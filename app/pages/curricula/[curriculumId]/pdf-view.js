import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes, Router } from "blitz"
import getCurriculum from "app/curricula/queries/getAllCurriculum"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { PDFViewer } from "@react-pdf/renderer"

import Skills from "app/curricula/components/structure/skills"
import Experiences from "app/curricula/components/structure/experience"
import AcademicEducations from "app/curricula/components/structure/academicEducations"
import TechnicalEducations from "app/curricula/components/structure/technicalEducations"
import Publications from "app/curricula/components/structure/publications"
import References from "app/curricula/components/structure/references"

// Create styles
const styles = StyleSheet.create({
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
    fontSize: "18pt",
    fontWeight: "bold",
  },
  text: {
    fontSize: "14pt",
    margin: "10px",
    lineHeight: 1.6,
  },
})

const GetInfo = () => {
  const currentUser = useCurrentUser()
  const curriculumId = useParam("curriculumId", "number")
  const [curriculum] = useQuery(
    getCurriculum,
    {
      id: curriculumId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const { role, userId, ...user } = currentUser
  const { name, ...info } = curriculum
  return { ...info, ...user }
}
const PersonalInfo = (props) => {
  const { info } = props
  return (
    <View style={styles.text}>
      <Text>{info.name + " " + info.lastName} </Text>
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
            <Skills skills={info.skills} styles={styles} />
          </View>
          <View style={styles.rightColumn}>
            <Experiences experiences={info.laboralExperiences} styles={{ text }} />
            <AcademicEducations academicEducations={info.academicEducations} styles={{ text }} />
            <TechnicalEducations technicalEducations={info.technicalEducations} styles={{ text }} />
            <Publications publications={info.publications} styles={{ text }} />
            <References references={info.references} styles={{ text }} />
          </View>
        </View>
      </Page>
    </Document>
  )
}

const PDFViewPage = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Suspense fallback={<div>Loading...</div>}>
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