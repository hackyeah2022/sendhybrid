import { ReportDetails } from '../../types/report';
import { FC } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/atoms/PageContainer/PageContainer';
import Button from '../../components/atoms/Button/Button';
import Link from 'next/link';
import ReportInfo, {
  ReportName,
} from '../../components/molecules/ReportInfo/ReportInfo';
import PreviewArea from '../../components/molecules/PreviewArea/PreviewArea';
import singleReportGetServerSideProps from '../../lib/singleReportGetServerSideProps';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import environment from '../../environment';
import useSingleReport, {
  getSingleReportQueryKey,
} from '../../hooks/useSingleReport';
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

const LinksWrapper = styled.div`
  display: flex;

  a {
    margin: 0 0.2rem;
  }
`;

const markAsSend = (id: string) =>
  fetch(`${environment.API_URL}/documents/markSentById/${id}`, {
    method: 'PUT',
  }).then(res => res.json());

interface ReportPageProps {
  reportDetails: ReportDetails;
}

const SubmissionPreviewPage: FC<ReportPageProps> = () => {
  const {
    query: { reportId },
  } = useRouter();
  const queryClient = useQueryClient();
  const { data: reportDetails } = useSingleReport(reportId);
  const { mutateAsync, isSuccess: hasSentSuccessfully } = useMutation(
    ['markAsSent'],
    () => markAsSend(reportDetails.id)
  );
  const passedVerification = !reportDetails?.validationGeneralFailed;

  const handleSend = async () => {
    await mutateAsync();
    await queryClient.refetchQueries({
      queryKey: getSingleReportQueryKey(reportId),
    });
  };
  return (
    <PageContainer wide>
      <Wrapper>
        <div>
          <ReportName>Podgląd: {reportDetails?.name ?? 'Bez nazwy'}</ReportName>
          <ReportInfo reportDetails={reportDetails} />
          <LinksWrapper>
            <Link href="/submissions">
              <Button as="a">Nie wysyłaj</Button>
            </Link>
            {passedVerification && !hasSentSuccessfully && (
              <Button onClick={() => handleSend()}>Wyślij ten list</Button>
            )}
            <br />
          </LinksWrapper>
        </div>
        <PreviewArea reportDetails={reportDetails} />
      </Wrapper>
    </PageContainer>
  );
};

export default SubmissionPreviewPage;

export const getServerSideProps = singleReportGetServerSideProps;
