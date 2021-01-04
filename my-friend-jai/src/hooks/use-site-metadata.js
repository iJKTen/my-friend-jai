// @flow strict
import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            author {
              name
            }
            social {
              twitter
              github
            }
          }
        }
      }
    `
  );

  return site.siteMetadata;
};

export default useSiteMetadata;