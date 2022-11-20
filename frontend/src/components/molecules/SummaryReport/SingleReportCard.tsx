import { ReportDetails } from '../../../types/report';
import { FC } from 'react';
import styled from 'styled-components';
import FeedbackMessage from '../../atoms/FeedbackMessage/FeedbackMessage';
import StatusIcon from '../../atoms/StatusIcon/StatusIcon';
import Address from '../../atoms/Address/Address';
import PDFPreview from '../../atoms/PDFPreview/PDFPreview';

const Wrapper = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  color: ${({ theme }) => theme.colors.black};
  padding: 0.5rem 1rem;
`;

const ReportName = styled.h4`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin: 0.5rem 0 1rem 0;
  color: ${({ isOk, theme }) => (isOk ? 'green' : theme.colors.red)};
  svg {
    width: 2rem;
    margin-right: 0.5rem;
  }
`;

const ReportErrorWrapper = styled.div`
  margin: 0.5rem 0;
`;

const PreviewArea = styled.div``;

const AddressesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1.5rem 0;

  span {
    font-weight: bold;
  }
`;

const PreviewWrapper = styled.div`
  .react-pdf__Page__canvas {
    //border: 2px solid ${({ theme }) => theme.colors.lightGray};
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
      drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    border-radius: 0.25rem;
  }
`;

const StatusWrapper = styled.div``;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  color: ${({ isOk, theme }) => (isOk ? 'green' : theme.colors.red)};
  svg {
    stroke: ${({ isOk, theme }) => (isOk ? 'green' : theme.colors.red)};
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }
`;

const ErrorsList = styled.div`
  margin-top: 1rem;
`;

interface SingleReportCardProps {
  reportDetails: ReportDetails;
}

const SingleReportCard: FC<SingleReportCardProps> = ({ reportDetails }) => {
  const passedVerification = !reportDetails.validationGeneralFailed;
  const statusMessage = passedVerification
    ? 'Weryfikacja przebiegła pomyślnie'
    : 'Weryfikacja wykazała błędy';
  const previewUrl = reportDetails.isCorrectedFileAvailable
    ? reportDetails.correctedPreviewUrl
    : reportDetails.originalPreviewUrl;
  console.log(reportDetails);
  return (
    <Wrapper>
      <div>
        <ReportName isOk={passedVerification}>{reportDetails.name}</ReportName>
        <span>
          ID pliku: {reportDetails.id} <br />
          Data weryfikacji:{' '}
          {new Date(reportDetails.verificationDate).toLocaleString()} <br />
        </span>
        <AddressesGrid>
          <div>
            <span>Nadawca</span>
            <Address prefix="receiver" reportDetails={reportDetails} />
          </div>
          <div>
            <span>Odbiorca</span>
            <Address prefix="sender" reportDetails={reportDetails} />
          </div>
        </AddressesGrid>
        <StatusWrapper>
          <StatusMessage isOk={passedVerification}>
            <StatusIcon isOk={passedVerification} />
            <span>{statusMessage}</span>
          </StatusMessage>
          <ErrorsList>
            {reportDetails.feedbackMessagesProps.map(({ message, isOk }) => (
              <ReportErrorWrapper key={message}>
                <FeedbackMessage isOk={isOk} message={message} />
              </ReportErrorWrapper>
            ))}
          </ErrorsList>
        </StatusWrapper>
      </div>
      <PreviewArea>
        <PreviewWrapper>
          <PDFPreview key={previewUrl} previewUrl={previewUrl} />
        </PreviewWrapper>
      </PreviewArea>
    </Wrapper>
  );
};
export default SingleReportCard;
