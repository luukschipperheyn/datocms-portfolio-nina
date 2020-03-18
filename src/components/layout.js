import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/index.sass";

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
        <div className={`container ${showMenu ? "is-open" : ""}`}>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />

          <header className="global--nav nav-down">
            <ul className="nav-wide">
              <li className="nav--item logo underline">
                <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
              </li>
              <li className="nav--item desktop">
                <Link to="/">Projects</Link>
              </li>
              <li className="nav--item desktop">
                <Link to="/about">About</Link>
              </li>
            </ul>

            <button
              className="nav--item menu-toggle mobile"
              onClick={e => {
                e.preventDefault();
                setShowMenu(!showMenu);
              }}
            >
              Menu
            </button>
          </header>

          {showMenu && (
            <div className="global--nav--full">
              <button
                className="nav--item menu-toggle mobile"
                onClick={e => {
                  e.preventDefault();
                  setShowMenu(!showMenu);
                }}
              >
                Menu
              </button>
              <ul className="nav--full">
                <li className="nav--item">
                  <Link to="/">Projects</Link>
                </li>
                <li className="nav--item">
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
          )}

          <div class="wrap container" role="document">
            <div class="content row">
              <main class="main">{children}</main>
            </div>
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
