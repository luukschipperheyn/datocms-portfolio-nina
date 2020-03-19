import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    <HelmetDatoCms seo={data.datoCmsProject.seoMetaTags} />
    <section class="main">
      <ul class="work--feed mix-margin-n">
        <li class="col-1-3">
          <span class="heading-w">
            <span class="spec">{data.datoCmsProject.title},</span>
            <span class="location sup"> {data.datoCmsProject.location}</span>
          </span>
          {data.datoCmsProject.content.map(contentNode => {
            switch (contentNode.model.name) {
              case "paragraph":
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contentNode.paragraphNode.childMarkdownRemark.html
                    }}
                  />
                );
              case "image":
                return (
                  <div>
                    <Img fluid={contentNode.image.fluid} />
                  </div>
                );
            }
          })}
        </li>

        <li class="col-2-3">
          <Img fluid={data.datoCmsProject.coverImage.fluid} />
          {data.datoCmsProject.gallery.map(({ fluid }) => (
            <Img fluid={fluid} />
          ))}
        </li>
      </ul>
    </section>
  </Layout>
);

export const query = graphql`
  query ProjectQuery($slug: String!) {
    datoCmsProject(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      location
      gallery {
        fluid(maxWidth: 800, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      coverImage {
        url
        fluid(maxWidth: 800, imgixParams: { fm: "jpg", auto: "compress" }) {
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
            fluid(maxWidth: 800, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
