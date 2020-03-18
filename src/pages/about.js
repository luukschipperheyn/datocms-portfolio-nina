import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const About = ({ data: { about } }) => (
  <Layout>
    <HelmetDatoCms seo={about.seoMetaTags} />
    <section class="main">
      <ul class="work--feed">
        <li class="col-1-3">
<span class="heading-w"><span class="spec">{about.title}</span></span>
          <div
            dangerouslySetInnerHTML={{
              __html: about.studioNode.childMarkdownRemark.html,
            }}
          />
        </li>
        <li class="col-1-3">
          <Img fluid={about.photo.fluid} />
          <span class="heading-w">
            <span class="spec">{about.name}</span>
            <span class="sup">{about.nameSubtitle}</span>
          </span>
          <div
            dangerouslySetInnerHTML={{
              __html: about.bioNode.childMarkdownRemark.html,
            }}
          />
        </li>
      </ul>
    </section>
  </Layout>
)

export default About

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      name
      nameSubtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      studioNode {
        childMarkdownRemark {
          html
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
