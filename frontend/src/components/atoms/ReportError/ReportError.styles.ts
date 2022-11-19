import styled from 'styled-components';
import ExclamationCircle from "../../../icons/ExclamationCircle";

export const Wrapper = styled.div`
  border-left: 2px solid ${({theme}) => theme.colors.red};
  padding-left: 0.2rem;
  display: flex;
  align-items: center;
`;

export const ErrorIcon = styled(ExclamationCircle)`
  width: 1.6rem;
  height: 1.6rem;
  stroke: ${({theme}) => theme.colors.red};
`

export const ErrorMessageText = styled.p`
    margin-left: 0.5rem;
`
