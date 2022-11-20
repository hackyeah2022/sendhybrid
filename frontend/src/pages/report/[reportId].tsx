import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ReportDetails } from '../../types/report';
import { FC } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/atoms/PageContainer/PageContainer';
import GoBack from '../../components/atoms/GoBack/GoBack';
import environment from '../../environment';
import getFeedbackMessagesProps from '../../lib/getFeedbackMessagesProps';
import PaperAirplane from '../../icons/PaperAirplane';
import ReportInfo, {
  ReportName,
} from '../../components/molecules/ReportInfo/ReportInfo';
import singleReportGetServerSideProps from '../../lib/singleReportGetServerSideProps';
import useSingleReport from '../../hooks/useSingleReport';
import PreviewArea from '../../components/molecules/PreviewArea/PreviewArea';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  width: 75%;
  margin: 1rem auto 0 auto;
  max-width: 100%;
  height: calc(100vh - ${({ theme }) => theme.layout.navBarHeight});
`;

const ReportPage: FC = () => {
  const {
    query: { reportId },
  } = useRouter();
  const { data: reportDetails } = useSingleReport(reportId);
  return (
    <PageContainer wide>
      <Wrapper>
        <div>
          <GoBack />
          <ReportName>Podgląd: {reportDetails?.name ?? 'Bez nazwy'}</ReportName>
          <ReportInfo reportDetails={reportDetails} />
        </div>
        <PreviewArea reportDetails={reportDetails} />
      </Wrapper>
    </PageContainer>
  );
};

export default ReportPage;

export const getServerSideProps = singleReportGetServerSideProps;
