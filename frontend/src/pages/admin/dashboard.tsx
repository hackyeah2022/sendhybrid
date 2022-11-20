import { FC } from 'react';
import { VictoryPie } from 'victory';

import PageContainer from 'components/atoms/PageContainer/PageContainer';
import Heading from 'components/atoms/Heading/Heading';
import theme from 'utils/styled/theme';

export interface Props {}

const AdminDashboardPage: FC<Props> = ({ ...props }) => {
  return (
    <PageContainer centerContent {...props}>
      <div>
        <Heading>Panel administratora</Heading>
        <p>Wyniki weryfikacji:</p>
        <VictoryPie
          radius={100}
          style={{ labels: { fontSize: 12 } }}
          colorScale={[theme.colors.accent[1], theme.colors.secondary[1]]}
          data={[
            { x: 'Pozytywne', y: '82' },
            { x: 'Negatywne', y: '18' },
          ]}
        />
      </div>
    </PageContainer>
  );
};

export default AdminDashboardPage;
