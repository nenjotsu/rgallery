import React from "react";
import moment from "moment";
import { Link } from "gatsby";
import { Row, Col, Icon } from "antd";
import { Button } from "antd";
import {
  LeftContent,
  ExhibitionTitle,
  DateRange,
  ExhibitionDescription,
  ExhibitionNavigation
} from "./styled";

const LeftJumbotron = ({ exhibitions, onPrev, onNext, currentExhibition }) => {
  const isDisabled = exhibitions.length === currentExhibition + 1;
  const isExist = exhibitions && exhibitions[currentExhibition];
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
            <a
              title="next"
              alt="next exhibition"
              onClick={onNext}
              disabled={isDisabled}
            >
              <Icon type="arrow-right" />
            </a>
          </ExhibitionNavigation>
          <ExhibitionTitle>
            {isExist && exhibitions[currentExhibition].node.title}
          </ExhibitionTitle>
          {isExist && (
            <DateRange>
              {`${exhibitions &&
                moment(exhibitions[currentExhibition].node.date_from).format(
                  "MMM DD YYYY"
                )} - ${exhibitions &&
                moment(exhibitions[currentExhibition].node.date_to).format(
                  "MMM DD YYYY"
                )}
            `}
            </DateRange>
          )}
          {isExist && (
            <ExhibitionDescription>
              {exhibitions &&
                exhibitions[currentExhibition].node.descriptions.substring(
                  0,
                  899
                )}{" "}
              {exhibitions[currentExhibition].node.descriptions.length > 899
                ? "..."
                : ""}
            </ExhibitionDescription>
          )}
          {isExist && (
            <Link to={exhibitions[currentExhibition].node.id}>
              <Button size="small">Read More...</Button>
            </Link>
          )}
        </LeftContent>
      </Col>
    </Row>
  );
};

export default LeftJumbotron;
