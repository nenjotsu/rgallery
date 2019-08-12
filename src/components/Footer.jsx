import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  padding: 1rem ${props => props.theme.spacer.horizontal};
  text-align: center;
  font-size: 0.6em;
  color: ${props => props.theme.colors.grey};
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #ffffffe3;
  a {
    text-decoration: none;
    color: ${props => props.theme.brand.primary};
  }
`;

const Footer = () => (
  <Wrapper data-testid="footer">
    Address: 26 V. Luna Ave, Diliman, Quezon City, 1100 Metro Manila. Contact
    Us: +63917-7180-777. Copyright &copy; 2019. All right reserved. RGallery.{' '}
    <a href="mailto:rgallery.ph@gmail.com">rgallery.ph@gmail.com</a>
  </Wrapper>
);

export default Footer;
