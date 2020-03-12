import React from "react";
import lodash from "lodash";
import { Row, Col, Button } from "antd";
import moment from "moment";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { SpanConfig } from "./enums";
import {
  TopFour,
  ExhibitionTitle,
  DateRange,
  ExhibitionDescription
} from "./styled";

const LatestExhibitions = props => {
  const exhibitions = lodash.sortBy(
    props.exhibitions,
    "node.date_from",
    "desc"
  );

  const totalLength = exhibitions.length;
  const latestFour = totalLength - 8;

  const topFour = exhibitions.filter((_, i) => i >= latestFour);
  const topFourExhibitions = lodash.sortBy(topFour, "node.date_from", "asc");

  return (
    <TopFour>
      <Row gutter={30}>
        {topFourExhibitions.map(exhibition => (
          <Col
            key={exhibition.node.id}
            {...SpanConfig}
            style={{ marginBottom: "2em" }}
          >
            <div>
              {exhibition && exhibition.node.thumbnail && (
                <Img
                  style={{ marginBottom: 20 }}
                  fluid={exhibition.node.thumbnail.childImageSharp.fluid}
                />
              )}
              <ExhibitionTitle>
                {exhibition && exhibition.node.title}
              </ExhibitionTitle>
              <DateRange>
                {`${exhibition &&
                  moment(exhibition.node.date_from).format(
                    "MMM DD YYYY"
                  )} - ${exhibition &&
                  moment(exhibition.node.date_to).format("MMM DD YYYY")}
                `}
              </DateRange>
              <ExhibitionDescription>
                {exhibition && exhibition.node.descriptions.substring(0, 300)}{" "}
                {exhibition.node.descriptions.length > 300 ? "..." : ""}
              </ExhibitionDescription>
              <Link to={exhibition.node.id}>
                <Button size="large">Read More...</Button>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </TopFour>
  );
};

export default LatestExhibitions;
