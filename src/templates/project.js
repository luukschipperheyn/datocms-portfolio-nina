import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsProject.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsProject.title}</h1>
        <div className="sheet__slider">
          <Slider infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} dots={true} arrows={true}>
            {data.datoCmsProject.gallery.map(({ fluid }) => (
              <img alt={data.datoCmsProject.title} key={fluid.src} src={fluid.src} />
            ))}
          </Slider>
        </div>
        {
          data.datoCmsProject.content.map(contentNode => {
            switch (contentNode.model.name) {
              case 'paragraph':
                return <div dangerouslySetInnerHTML={{ __html: contentNode.paragraphNode.childMarkdownRemark.html }} />
                case 'slideshow':       
                  return <div>
                    <Slider infinite={true} speed={500} slidesToShow={1} arrows={true}>
                      {contentNode.gallery.map(({ fluid }) => (
                        <img alt={data.datoCmsProject.title} key={fluid.src} src={fluid.src} />
                      ))}
                    </Slider>
                  </div>
            }
          }
          )
        }
        <div className="sheet__gallery">
          <Img fluid={data.datoCmsProject.coverImage.fluid} />
        </div>
      </div>
    </article>
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
        ... on DatoCmsSlideshow {
          id
          model {
            name
          }
          gallery {
            fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
              src
            }
          }
        }
      }
    }
  }
`
