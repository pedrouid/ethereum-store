import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import QRCodeDisplay from '../components/QRCodeDisplay';
import { colors, transitions } from '../styles';

const StyledLightbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  transition: ${transitions.base};
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  background: rgba(${colors.dark}, 0.2);
`;

const StyledHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledColumn = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 512px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const StyledSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: ${({ expand }) => (expand ? '1' : '0')};
`;

class Modal extends Component {
  state = {
    fetching: false,
    webConnector: null
  };
  onClose = () => {
    this.setState({
      fetching: false,
      webConnector: null
    });
    this.props.toggleModal();
  };
  render = () => {
    const body = document.body || document.getElementsByTagName('body')[0];
    if (this.props.showModal) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    const data = this.state.webConnector
      ? `{"domain":"https://walletconnect.balance.io","sessionId":"${
          this.state.webConnector.sessionId
        }","sharedKey":"${this.state.webConnector.sharedKey}", "dappName":"${
          this.state.webConnector.dappName
        }"}`
      : null;
    return (
      <StyledLightbox show={this.props.showModal}>
        <StyledContainer>
          <StyledHitbox onClick={this.onClose} />
          <StyledColumn>
            <Card maxWidth={500} background="white">
              <StyledCardContainer>
                <StyledSection expand>
                  {this.state.fetching && !data ? (
                    <Loader color="dark" background="white" />
                  ) : data ? (
                    <QRCodeDisplay data={data} />
                  ) : (
                    <div />
                  )}
                </StyledSection>
                <StyledSection>
                  <Button onClick={this.onClose}>Cancel</Button>
                </StyledSection>
              </StyledCardContainer>
            </Card>
          </StyledColumn>
        </StyledContainer>
      </StyledLightbox>
    );
  };
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Modal;
