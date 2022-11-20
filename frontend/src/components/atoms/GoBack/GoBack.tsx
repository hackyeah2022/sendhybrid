import ArrowLeft from '../../../icons/ArrowLeft';
import styled from 'styled-components';
import Link from 'next/link';

const StyledA = styled.a`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 0.5rem;
    width: 1.2rem;
    height: 1.2rem;
    transition: 0.2s all;
    stroke: ${({ theme }) => theme.colors.blue};
  }
  span {
    font-size: 0.9rem;
    transition: 0.2s all;
  }
  &:hover {
    svg {
      transform: translateX(-5px);
      stroke: ${({ theme }) => theme.colors.lightBlue};
    }
    span {
      color: ${({ theme }) => theme.colors.lightBlue};
    }
  }
`;

const GoBack = () => (
  <Link href="/submissions">
    <StyledA>
      <ArrowLeft />
      <span>Wróć do dokumentów</span>
    </StyledA>
  </Link>
);

export default GoBack;
