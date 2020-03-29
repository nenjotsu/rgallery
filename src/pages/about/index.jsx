/* eslint react/display-name: 0 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";
import { Container, Layout, Hero, BGImage } from "../../components";
import AboutCover from "../../images/cover.jpg";
import RGalleryMap from "../../images/rgallery_map.png";

const Content = styled(Container)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  z-index: 3;
`;

const Title = styled(animated.h1)`
  margin-top: 0;
`;

const MapDiv = styled.div`
  img {
    width: 100%;
  }
`;

// dirty

const About = ({ location }) => {
  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: "translate3d(0, -30px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" }
  });
  const contentProps = useSpring({
    config: config.slow,
    delay: 500,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <Layout pathname={location.pathname} customSEO>
      <Hero single>
        <BGImage single>
          <img src={AboutCover} alt="RGallery Contemporary Arts" />
        </BGImage>

        <Content type="text">
          <Title data-testid="single-title" style={titleProps}>
            About
          </Title>
        </Content>
      </Hero>
      <Container type="text">
        <animated.div style={contentProps}>
          <p>
            To showcase a work of an artist is a fulfilling privilege. There is
            fulfillment to being a home to every art piece that goes through an
            admirable creative process unique to each of its creator. Likewise,
            it is a privilege to be an avenue where the audience can take in the
            different aspects of art- its meaningful composition, color harmony,
            shapes and strokes that tell things even beyond our intuitions.
          </p>
          <p>
            This is the commitment of R Gallery to showcase the artistic minds
            of emerging artists in the contemporary scene. It gives us great
            pleasure to connect the audience and the collectors to masterpieces
            that they can together live with in a place where they love to see
            the art pieces each day.
          </p>
          <MapDiv>
            <a
              href="https://www.google.com/maps/place/R+Gallery/@14.637104,121.0473543,17z/data=!3m1!4b1!4m5!3m4!1s0x3397b7c680bfe4f7:0xe0dd663e54658b2c!8m2!3d14.637104!4d121.049543"
              target="_new"
            >
              <img src={RGalleryMap} alt="RGallery Contemporary Arts - Map" />
            </a>
            <p>
              Address: 26 V. Luna Ave, Diliman, Quezon City, 1100 Metro Manila
            </p>

            <p style={{ marginBottom: 50 }}>
              To inquire on available work of art, please call or text us at
              +63917-7180-777.
              <br />
              You may also send us an email to
              <a href="mailto:rgallery.ph@gmail.com"> rgallery.ph@gmail.com.</a>
            </p>
          </MapDiv>
        </animated.div>
      </Container>
    </Layout>
  );
};

export default About;

About.propTypes = {
  location: PropTypes.object.isRequired
};
