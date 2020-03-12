import React from "react";
import { Row, Col } from "antd";
import Img from "gatsby-image";
import { RightContent } from "./styled";

const RightJumbotron = ({ exhibitions, currentExhibition }) => {
  const isExist = exhibitions && exhibitions[currentExhibition];
  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        {isExist && (
          <RightContent>
            {exhibitions && exhibitions[currentExhibition].node.thumbnail && (
              <Img
                fluid={
                  exhibitions[currentExhibition].node.thumbnail.childImageSharp
                    .fluid
                }
              />
            )}
          </RightContent>
        )}
      </Col>
    </Row>
  );
};

export default RightJumbotron;
