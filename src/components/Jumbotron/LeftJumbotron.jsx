import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { Row, Col, Icon } from 'antd';
import { Button } from 'antd';
import Img from 'gatsby-image';
import {
  LeftContent,
  ExhibitionTitle,
  DateRange,
  ExhibitionDescription,
  ExhibitionNavigation,
} from './styled';

const LeftJumbotron = ({ exhibitions, onPrev, onNext, currentExhibition }) => {
  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ span: 8 }}></Col>
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        <LeftContent>
          <ExhibitionNavigation>
            <a
              title="previous"
              alt="previous exhibition"
              onClick={onPrev}
              style={{ marginRight: 10 }}
            >
              <Icon type="arrow-left" />
            </a>
            <a title="next" alt="next exhibition" onClick={onNext}>
              <Icon type="arrow-right" />
            </a>
          </ExhibitionNavigation>
          <ExhibitionTitle>
            {exhibitions && exhibitions[currentExhibition].node.title}
          </ExhibitionTitle>
          <DateRange>
            {`${exhibitions &&
              moment(exhibitions[currentExhibition].node.date_from).format(
                'MMM DD YYYY',
              )} - ${exhibitions &&
              moment(exhibitions[currentExhibition].node.date_to).format(
                'MMM DD YYYY',
              )}
            `}
          </DateRange>
          <ExhibitionDescription>
            {exhibitions &&
              exhibitions[currentExhibition].node.descriptions.substring(
                0,
                899,
              )}{' '}
            {exhibitions[currentExhibition].node.descriptions.length > 899
              ? '...'
              : ''}
          </ExhibitionDescription>
          <Link to={exhibitions[currentExhibition].node.id}>
            <Button size="large">Read More...</Button>
          </Link>
        </LeftContent>
      </Col>
    </Row>
  );
};

export default LeftJumbotron;
