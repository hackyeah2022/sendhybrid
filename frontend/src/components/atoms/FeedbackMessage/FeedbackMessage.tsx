import { FC } from 'react';
import styled from 'styled-components';
import ExclamationCircle from '../../../icons/ExclamationCircle';
import CheckCircle from '../../../icons/CheckCircle';

export const Wrapper = styled.div`
  border-left: 2px solid
    ${({ theme, isOk }) => (isOk ? 'green' : theme.colors.red)};
  padding-left: 0.2rem;
  display: flex;
  align-items: center;
`;

export const getIcon = isOk => styled(isOk ? CheckCircle : ExclamationCircle)`
  stroke: ${({ theme }) => (isOk ? 'green' : theme.colors.red)};
  width: 1.6rem;
  height: 1.6rem;
`;

export const MessageText = styled.p`
  margin-left: 0.5rem;
`;

interface ReportErrorProps {
  isOk: boolean;
  message: string;
}

const FeedbackMessage: FC<ReportErrorProps> = ({ message, isOk }) => {
  const Icon = getIcon(isOk);
  return (
    <Wrapper isOk={isOk}>
      <Icon />
      <MessageText>{message}</MessageText>
    </Wrapper>
  );
};

export default FeedbackMessage;
