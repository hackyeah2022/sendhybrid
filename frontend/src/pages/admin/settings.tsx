import { FC } from 'react';

import PageContainer from 'components/atoms/PageContainer/PageContainer';
import Heading from 'components/atoms/Heading/Heading';

export interface Props {}

const AdminSettingsPage: FC<Props> = ({ ...props }) => {
  return (
    <PageContainer centerContent {...props}>
      <div>
        <Heading>Panel ustawień</Heading>
      </div>
    </PageContainer>
  );
};

export default AdminSettingsPage;
