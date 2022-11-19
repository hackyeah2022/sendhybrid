import { FC, ReactNode } from 'react';

import * as S from './PageContainer.styles';

export interface Props {
  wide?: boolean;
  children: ReactNode;
}

const PageContainer: FC<Props> = ({ wide, children, ...props }) => {
  return (
    <S.Wrapper $wide={!!wide} {...props}>
      {children}
    </S.Wrapper>
  );
};

export default PageContainer;
