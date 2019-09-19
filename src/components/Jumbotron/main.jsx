import React from 'react';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { SpanConfig } from './enums';
import LeftJumbotron from './LeftJumbotron';
import RightJumbotron from './RightJumbotron';

const MainJumbotron = props => {
  return (
    <Row>
      <Col {...SpanConfig}>
        <LeftJumbotron {...props} />
      </Col>
      <Col {...SpanConfig}>
        <RightJumbotron {...props} />
      </Col>
    </Row>
  );
};

export default MainJumbotron;
