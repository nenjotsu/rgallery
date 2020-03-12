import React from "react";
import { Row, Col } from "antd";
import { Link } from "gatsby";
import { SpanConfig } from "./enums";
import LogoGray from "../../../images/logo-gray.jpg";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { TopFour, FooterLabel, FooterAddress } from "./styled";
import { navs, termsList } from "../../../common/constants";

const LatestExhibitions = () => {
  return (
    <TopFour>
      <Row>
        <Col {...SpanConfig}>
          <FooterLabel>Site Map</FooterLabel>
          {navs.map(n => (
            <Link to={n.slug} key={n.slug}>
              <p>{n.title}</p>
            </Link>
          ))}
        </Col>
        <Col {...SpanConfig}>
          <FooterLabel>About</FooterLabel>
          {termsList.map(n => (
            <Link to="/" key={n.title}>
              <p>{n.title}</p>
            </Link>
          ))}
        </Col>
        <Col {...SpanConfig} style={{ marginBottom: 20 }}>
          <FooterLabel>Social Accounts</FooterLabel>
          <a
            href="https://www.instagram.com/rgallery.ph"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ marginRight: 20 }}
          >
            <FaInstagram
              size="30"
              color="#fff"
              title="https://www.instagram.com/rgallery.ph"
            />
          </a>
          <a
            href="https://www.facebook.com/rgalleryph"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook
              size="30"
              color="#fff"
              title="https://www.facebook.com/rgalleryph"
            />
          </a>
        </Col>
        <Col {...SpanConfig}>
          <FooterLabel>Contact</FooterLabel>
          <FooterAddress>
            <p>
              Address: 26 V. Luna Ave, Diliman, Quezon City, 1100 Metro Manila
            </p>
            <p>
              To inquire on available work of art, please call or text us at
              +63917-7180-777.
            </p>
            <p>You may also send us an email to rgallery.ph@gmail.com</p>
          </FooterAddress>
          <img
            src={LogoGray}
            alt="RGallery Contemporary Arts"
            style={{ margin: "1em", width: 100 }}
          />
        </Col>
      </Row>
    </TopFour>
  );
};

export default LatestExhibitions;
