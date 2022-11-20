import Address from '../../atoms/Address/Address';
import StatusIcon from '../../atoms/StatusIcon/StatusIcon';
import FeedbackMessage from '../../atoms/FeedbackMessage/FeedbackMessage';
import styled from 'styled-components';
import PaperAirplane from '../../../icons/PaperAirplane';
import WrenchIcon from '../../../icons/WrenchIcon';
import Button from '../../atoms/Button/Button';
import Link from 'next/link';

export const ReportName = styled.h1`
  margin-top: 0.6rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const AddressesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1.5rem 0;

  span {
    font-weight: bold;
  }
`;

const StatusWrapper = styled.div`
  margin-top: 1.5rem;
`;

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

const ReportErrorWrapper = styled.div`
  margin: 0.5rem 0;
`;

const ErrorsList = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const BadgesRow = styled.div`
  margin: 0.5rem 0;
`;

const SentInfo = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1.2rem;
  background: #006cd71c;
  border-radius: 1.5rem;
  color: ${({ theme }) => theme.colors.lightBlue};
  margin-right: 1rem;

  svg {
    margin-right: 0.5rem;
    width: 1.5rem;
  }
`;

const FixedInfo = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1.2rem;
  background: rgb(254 249 195);
  border-radius: 1.5rem;
  color: rgb(161 98 7);

  svg {
    margin-right: 0.5rem;
    width: 1.5rem;
  }
`;

const DownloadButton = styled(Button)`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  margin-left: 0.2rem;
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1.2rem;
  border-radius: 0.25rem;
  color: rgb(161 98 7);
  border: 2px solid rgb(161 98 7);
  font-weight: bold;
  cursor: pointer;
`;

const FixedMessage = styled.div`
  margin: 0.5rem 0;
  color: rgb(161 98 7);
  font-weight: bold;
`;

const ReportInfo = ({ reportDetails }) => {
  if (!reportDetails) return null;
  const passedVerification = !reportDetails?.validationGeneralFailed;
  const sent = reportDetails.sent;
  const isCorrectedFileAvailable = reportDetails?.isCorrectedFileAvailable;
  const statusMessage = passedVerification
    ? 'Weryfikacja przebiegła pomyślnie'
    : 'Weryfikacja wykazała błędy';
  console.log(reportDetails);
  return (
    <>
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
      <BadgesRow>
        {sent && (
          <SentInfo>
            <PaperAirplane />
            <span>Wysłano</span>
          </SentInfo>
        )}
        {isCorrectedFileAvailable && (
          <FixedInfo>
            <WrenchIcon />
            <span>Plik naprawiono</span>
          </FixedInfo>
        )}
      </BadgesRow>
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
      <FixedMessage>
        {!reportDetails.validationPdfFailed &&
          reportDetails.validationFilenameFailed && (
            <span>
              Nazwa bądż rozszerzenie zostały naprawione. Pobierz poprawioną
              wersję pliku PDF
            </span>
          )}
        {reportDetails.validationPdfFailed &&
          reportDetails.correctedPreviewUrl && (
            <span>
              Skonwertowano plik Worda do PDF. Pobierz go, podpisz i prześlij
              ponownie.
            </span>
          )}
      </FixedMessage>
      {isCorrectedFileAvailable && (
        <Link target="_blank" href={reportDetails.correctedPreviewUrl}>
          <DownloadButton as="a">Pobierz naprawiony plik</DownloadButton>
        </Link>
      )}
    </>
  );
};

export default ReportInfo;
