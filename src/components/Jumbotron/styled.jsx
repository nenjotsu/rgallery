import styled from "styled-components";

export const LeftContent = styled.div`
  background: #fff;
  box-shadow: 0px 27px 29px 0px rgba(0, 0, 0, 0.2);
  width: 100%;
  min-height: 426px;
  height: auto;
  margin: 60px 0 60px;
  padding: 20px;
`;

export const RightContent = styled.div`
  background: #fff;
  box-shadow: 0px 27px 29px 0px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: auto;
  margin-top: 60px;
`;

export const RightContentBg = styled.div`
  background: url(${props => props.imgUrl}) no-repeat center top fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% auto;
  min-height: 768px;
`;

export const ExhibitionTitle = styled.div`
  font-size: 3em;
  font-family: "Oswald", sans-serif;
`;

export const DateRange = styled.div`
  font-size: 0.8em;
  color: #989898;
  font-family: "Quattrocento", serif;
  text-transform: uppercase;
`;

export const ExhibitionDescription = styled.div`
  font-size: 1em;
  margin-top: 20px;
  margin-bottom: 50px;
`;
export const ExhibitionNavigation = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
