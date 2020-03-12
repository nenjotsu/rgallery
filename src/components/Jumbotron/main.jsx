import React from "react";
import { Row, Col } from "antd";
import { SpanConfig } from "./enums";
import LeftJumbotron from "./LeftJumbotron";
import RightJumbotron from "./RightJumbotron";
import { RightContentBg } from "./styled";
import BGImage1 from "../../images/RGalleryV2ExhibitionBG_1.jpg";
import BGImage2 from "../../images/RGalleryV2ExhibitionBG_2.jpg";
import BGImage3 from "../../images/RGalleryV2ExhibitionBG_3.jpg";
import BGImage4 from "../../images/RGalleryV2ExhibitionBG_4.jpg";
import BGImage5 from "../../images/RGalleryV2ExhibitionBG_5.jpg";

const MainJumbotron = props => {
  const getRandomArbitrary = (min = 1, max = 7) => {
    const number = Math.random() * (max - min) + min;
    const numberAbs = Math.round(number);
    let Img = BGImage4;
    switch (numberAbs) {
      case 1:
        Img = BGImage1;
        break;
      case 2:
        Img = BGImage2;
        break;
      case 3:
        Img = BGImage3;
        break;
      case 4:
        Img = BGImage4;
        break;
      case 5:
        Img = BGImage5;
        break;

      default:
        Img = BGImage5;
        break;
    }
    return Img;
  };

  return (
    <RightContentBg imgUrl={getRandomArbitrary(1, 4)}>
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
