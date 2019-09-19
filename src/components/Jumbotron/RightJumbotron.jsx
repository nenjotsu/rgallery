import React from 'react';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import Img from 'gatsby-image';
import { LeftContent } from './styled';

const RightJumbotron = ({ exhibitions }) => {
  console.log('exhibitions', exhibitions);
  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        <LeftContent>
          {exhibitions && exhibitions[2].node.thumbnail && (
            <Img fluid={exhibitions[2].node.thumbnail.childImageSharp.fluid} />
          )}
        </LeftContent>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        Info
      </Col>
    </Row>
  );
};

export default RightJumbotron;
