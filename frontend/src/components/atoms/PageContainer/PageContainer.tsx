import { FC, ReactNode } from 'react';

import * as S from './PageContainer.styles';

export interface Props {
  children: ReactNode;
}

const PageContainer: FC<Props> = ({ children, ...props }) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default PageContainer;
