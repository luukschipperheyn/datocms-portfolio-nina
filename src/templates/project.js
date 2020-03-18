import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <HelmetDatoCms seo={data.datoCmsProject.seoMetaTags} />
    <section class="main">
      <ul class="work--feed mix-margin-n">
        <li class="col-1-3">
          <span class="heading-w">
            <span class="spec">Kana Talo,</span>
            <span class="location sup">Porovesi, 2018, Complete</span>
          </span>
          {
            data.datoCmsProject.content.map(contentNode => {
              switch (contentNode.model.name) {
                case 'paragraph':
                  return <div dangerouslySetInnerHTML={{ __html: contentNode.paragraphNode.childMarkdownRemark.html }} />
                  case 'image':       
                    return <div>
                      <img alt={data.datoCmsProject.title} key={contentNode.image.fluid.src} src={contentNode.image.fluid.src} />
                    </div>
              }
            })
          }
        </li>

        <li class="col-2-3">
          <Img fluid={data.datoCmsProject.coverImage.fluid} />
          {data.datoCmsProject.gallery.map(({ fluid }) => (
            <img alt={data.datoCmsProject.title} key={fluid.src} src={fluid.src} />
          ))}
        </li>
      </ul>
    </section>
  </Layout>
)

export const query = graphql`
  query ProjectQuery($slug: String!) {
    datoCmsProject(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      content {
        ... on DatoCmsParagraph {
          id
          model {
            name
          }
          paragraphNode {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on DatoCmsImage {
          model {
            name
          }
          image {
            url
            fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
