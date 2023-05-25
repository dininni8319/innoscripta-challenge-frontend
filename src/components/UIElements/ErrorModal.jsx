import React from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { Button } from '@/style/globalButtons';
import { rem } from 'polished';

export const DeclineButton = styled(Button)`
  width: ${rem("100px")};
  margin: ${rem("5px")};
`;

const ErrorModal = ({ error, onClear}) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<DeclineButton onClick={onClear}>Okay</DeclineButton>}
    >
      <p className="error-class">{error}</p>
    </Modal>
  );
};

export default ErrorModal;