import { FC, ReactNode } from 'react';

import * as S from './PageContainer.styles';

export interface Props {
  wide?: boolean;
  centerContent?: boolean;
  children: ReactNode;
}

const PageContainer: FC<Props> = ({
  wide,
  centerContent,
  children,
  ...props
}) => {
  return (
    <S.Wrapper $wide={!!wide} $centerContent={!!centerContent} {...props}>
      {children}
    </S.Wrapper>
  );
};

export default PageContainer;
