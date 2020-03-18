import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Layout from "../components/layout";

const tileSizes = [
  "m",
  "l",
  "m",
  "m",
  "m",
  "m",
  "l",
  "m",
  "m",
  "s",
  "m",
  "m",
  "s",
  "l",
  "m",
  "l"
];

const IndexPage = ({ data }) => (
  <Layout>
    <section className="main">
      <ul className="work--feed mix-margin">
        {data.allDatoCmsProject.edges.map(({ node: project }, index) => (
          <li
            className={`work--item cba_${tileSizes[index % tileSizes.length]}`}
          >
            <Link to={`/projects/${project.slug}`}>
              <Img fluid={project.coverImage.fluid} />
              <div className="meta">
                <span className="title">{project.title}</span>
                {project.location && (
                  <span>
                    , <span className="location sup"> {project.location}</span>
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsProject {
      edges {
        node {
          id
          title
          location
          slug
          coverImage {
            fluid(maxWidth: 400, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`;
