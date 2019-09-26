import styled from 'styled-components';

export const LeftNav = styled.nav`
  background: #fff;
  height: 70px;
  box-shadow: 0px 0px 23.49px 3.51px rgba(4, 4, 4, 0.07);
`;

export const RightNav = styled.nav`
  font-family: 'Source Sans Pro', sans-serif;
  background: #000;
  height: 70px;
  line-height: 1.2;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  font-size: 1.1em;
  color: #f2f1f0;
  text-transform: uppercase;
  padding: 1.5em;
  a:not(:first-child) {
    margin-left: 1.5rem;
  }
`;

export const LogoBrand = styled.img`
  max-height: 40px;
  margin: 15px;
`;
