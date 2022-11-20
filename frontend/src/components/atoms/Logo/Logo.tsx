import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export interface Props {}

const LogoWrapper = styled.div`
  position: relative;
  top: 1rem;
  width: 10rem;
  height: 10rem;
  transform: scale(3.5);
`;

const LogoImage = styled(Image)`
  object-fit: cover;
`;

const Logo: FC<Props> = ({ ...props }) => {
  return (
    <LogoWrapper {...props}>
      <LogoImage src="/logo.png" layout="fill" />
    </LogoWrapper>
  );
};

export default Logo;
