import { Suspense } from "react"

import { useRouter, useQuery, useParam, Routes } from "blitz"
import getCurriculum from "app/curricula/queries/getAllCurriculum"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"

import { Document, Page, PDFViewer, View, Text } from "@react-pdf/renderer"

import PDFSection from "app/curricula/components/PDFSection"
import CustomSpinner from "app/core/components/CustomSpinner"
import getTemplate from "app/templates/queries/getTemplate"
import FontRegister from "app/core/components/FontRegister"

FontRegister()

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

const getAttributes = (name) => {
  const attributes = {
    infos: ["name", "email", "phone", "profession", "description"],
    skills: ["description-rating"],
    laboralExperiences: [
            "position",
            "description",
            "institution",
            "location",
            "startYear-finishYear",
        ],
    academicEducations: [ 
            "studies", 
            "institution", 
            "location", 
            "startYear-finishYear"
        ],
    technicalEducations: [
            "studies", 
            "institution", 
            "location", 
            "completionYear"
        ],
    publications: ["name-tag", "institution", "location", "date"],
    references: ["name", "institution", "email", "phone"]
  }
  return attributes[name]
}

const getLabel = (name,info) => {
  const label = info[name.substring(0,name.length-1)+"Label"]
  return (label === undefined ? "" : label)
}

const CurriculumDocument = (props) => {

  const { email, phone, profession, description, ...info} = props.curriculum

  // Formating personal information
  const name = info.name + " " + info.lastName
  info.infos = [{id:1,name, email, phone, profession, description}]
  info.infoLabel = ""

  const stylesObj = props.curriculum.template.design

  // The default order with two columns
  const defaultOrder = [
    ["infos","skills"],
    ["laboralExperiences","academicEducations","technicalEducations","publications","references"]
  ]

  /*
    The order is a matrix with name of sections,
    container the main style
    sections the object with each individual section style
    the rest contains the styles of each subcontainers
  */
  const {order:newOrder,container,sections,...styles} = stylesObj
  const order = (newOrder !== undefined && Array.isArray(newOrder) && newOrder.length > 0 ? newOrder : defaultOrder)
  
  // In the style object the properties different to order, sections and container are the subcontainers, for example, to create columns
  const containers = Object.getOwnPropertyNames(styles)

  return (
    <Document>
      <Page size="A4">
        <View style={container}>
          {containers.map((ctn,i) => 
            <View key={i} style={stylesObj[ctn].container}>
              {order[i].map((section,j) =>
                <PDFSection
                  key={(i+1)*10+j}
                  list={info[section]}                                    
                  attributes={getAttributes(section)}  
                  label={getLabel(section,info)}
                  styles={{
                    ...stylesObj[ctn], 
                    container: (sections === undefined ? {} : sections[section])
                  }}
                />
              )}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

const PDFViewPage = () => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
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
}

PDFViewPage.authenticate = true

PDFViewPage.getLayout = (page) => <Layout>{page}</Layout>

export default PDFViewPage
