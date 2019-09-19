import React from 'react';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import Img from 'gatsby-image';
import { LeftContent } from './styled';

const LeftJumbotron = ({ exhibitions }) => {
  console.log('exhibitions', exhibitions);
  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        Info
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        <LeftContent>
          {exhibitions && exhibitions[0].node.thumbnail && (
            <Img fluid={exhibitions[0].node.thumbnail.childImageSharp.fluid} />
          )}
        </LeftContent>
      </Col>
    </Row>
  );
};

export default LeftJumbotron;
