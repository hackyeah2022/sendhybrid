import styled from 'styled-components';

import Button from 'components/atoms/Button/Button';

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 16rem;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.neutral[5]};
`;

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral[2]};
  border-radius: 0.25rem;

  &:focus {
    border: none;
    outline: ${({ theme }) => theme.colors.primary[1]} solid 2px;
  }
`;

export const InputErrorText = styled.p.attrs({ role: 'alert' })`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary[1]};
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const SubmitButton = styled(Button).attrs({ solid: true })`
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;
