import React from 'react';
import { Row, Col } from 'antd';
import { SpanConfig } from './enums';
import LeftJumbotron from './LeftJumbotron';
import RightJumbotron from './RightJumbotron';
import BGImage from '../../images/RGalleryV2ExhibitionBG.jpg';
import { RightContentBg } from './styled';

const MainJumbotron = props => {
  return (
    <RightContentBg imgUrl={BGImage}>
      <Row>
        <Col {...SpanConfig}>
          <LeftJumbotron {...props} />
        </Col>
        <Col {...SpanConfig}>
          <RightJumbotron {...props} />
        </Col>
      </Row>
    </RightContentBg>
  );
};

export default MainJumbotron;
