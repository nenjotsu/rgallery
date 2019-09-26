import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../components';
import { AddressTextMain, AddressTextSub } from '../components/v2/styled';
import LatestExhibitions from '../components/LatestExhibitions/main';
import PanoramicImg from '../images/panoramic_default.jpg';
import CoverImg from '../images/cover.jpg';
import Footer from '../components/v2/Footer/main';
import Jumbotron from '../components/Jumbotron/main';

const Index = ({ data, location }) => {
  const [currentExhibition, setCurrentExhibition] = React.useState(0);

  const exhibitions = data.allStrapiExhibitions.edges;
  const artworks = data.allStrapiArtworks.edges;

  function handlePrev(e) {
    e.preventDefault();
    if (currentExhibition > 0) {
      setCurrentExhibition(currentExhibition - 1);
    }
  }

  function handleNext(e) {
    e.preventDefault();
    if (currentExhibition < exhibitions.length) {
      setCurrentExhibition(currentExhibition + 1);
    }
  }

  return (
    <Layout pathname={location.pathname}>
      {exhibitions && (
        <Jumbotron
          exhibitions={exhibitions}
          artworks={artworks}
          onPrev={handlePrev}
          onNext={handleNext}
          currentExhibition={currentExhibition}
        />
      )}
      <LatestExhibitions exhibitions={exhibitions} />
      <img
        src={PanoramicImg}
        alt="R Gallery Social Pictures"
        style={{ width: '100%' }}
      />
      <section key="address" style={{ minHeight: 300 }}>
        <AddressTextMain>
          Address: 26 V. Luna Ave, Diliman, Quezon City, 1100 Metro Manila
        </AddressTextMain>
        <AddressTextSub>
          To inquire on available work of art, please call or text us at
          +63917-7180-777. You may also send us an email to
          rgallery.ph@gmail.com.
        </AddressTextSub>
      </section>
      <img
        src={CoverImg}
        alt="R Gallery Social Pictures"
        style={{ marginBottom: -70 }}
      />
      <section key="footer" style={{ background: '#000' }}>
        <Footer />
      </section>
    </Layout>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allStrapiExhibitions: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
    allStrapiArtworks: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query MainQuery {
    allStrapiExhibitions(sort: { order: DESC, fields: updatedAt }, limit: -1) {
      edges {
        node {
          id
          title
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 550, quality: 40) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          descriptions
          date_from
          date_to
        }
      }
    }
    allStrapiArtworks(sort: { order: DESC, fields: updatedAt }, limit: -1) {
      edges {
        node {
          id
          title
          descriptions
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 250, quality: 20) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          artist {
            id
            name
          }
          medium {
            name
          }
          sizes {
            descriptions
          }
          exhibition {
            id
            title
          }
          createdAt
          updatedAt
        }
      }
      group(field: exhibition___id) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
