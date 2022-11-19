import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {ReportDetails} from "../../types/report";
import {FC} from "react";
import PDFPreview from "../../components/atoms/PDFPreview/PDFPreview";
import styled from "styled-components";
import ReportError from "../../components/atoms/ReportError/ReportError";
import PageContainer from "../../components/atoms/PageContainer/PageContainer";
import XCircle from "../../icons/XCircle";
import CheckCircle from "../../icons/CheckCircle";
import GoBack from "../../components/atoms/GoBack/GoBack";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  width: 75%;
  margin: 1rem auto 0 auto;
  max-width: 100%;
`

const ReportErrorWrapper = styled.div`
  margin: 0.5rem 0;
`

const ReportName = styled.h1`
  margin-top: 0.6rem;
`

const PreviewArea = styled.div`

`

const TabButton = styled.button`
  background: ${({theme, active}) => active ? theme.colors.blue : theme.colors.white};
  color: ${({theme, active}) => active ? theme.colors.white : theme.colors.black};
  border: 2px solid ${({theme}) => theme.colors.blue};
  border-bottom: 0;
  margin: 0;
  font-family: inherit;
  padding: 0.4rem 0.7rem;
  &:first-of-type {
    border-top-left-radius: 0.25rem;
    margin-left: 1rem;
  }
  &:last-of-type {
    border-top-right-radius: 0.25rem;
  }
`

const AddressesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1.5rem 0;
  
  span {
    font-weight: bold;
  }
`

const PreviewWrapper = styled.div`
  border: 2px solid ${({theme}) => theme.colors.blue};
  border-radius: 0.25rem;
`

const StatusWrapper = styled.div``

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  margin-right: .5rem;
  color: ${({isOk, theme}) => isOk ? 'green' : theme.colors.red };
  svg {
    stroke: ${({isOk, theme}) => isOk ? 'green' : theme.colors.red };
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }
`

const ErrorsList = styled.div`
  margin-top: 1rem;
`


interface ReportPageProps {
    reportDetails: ReportDetails
}

const ReportPage: FC<ReportPageProps> = ({reportDetails}) => {
    const passedVerification = reportDetails.errorsList.length === 0
    const StatusIcon = passedVerification ? CheckCircle : XCircle;
    const statusMessage = passedVerification ? 'Weryfikacja przeiegła pomyślnie' : 'Weryfikacja wykazała błędy'

    return (
        <PageContainer wide>
        <Wrapper>
            <div>
                <GoBack />
                <ReportName>{reportDetails.name}</ReportName>
                <span>
                    Data weryfikacji: {new Date(reportDetails.verificationDate).toDateString()} |
                    ID pliku: {reportDetails.id} |
                    Wielkość pliku: {reportDetails.fileSize}b
                </span>
                <AddressesGrid>
                    <div>
                        <span>Nadawca</span>
                        <address>
                            Lipowa 10 <br/>
                            00-000 Kraków
                        </address>
                    </div>
                    <div>
                        <span>Odbiorca</span>
                        <address>
                            Lipowa 10 <br/>
                            00-000 Kraków
                        </address>
                    </div>
                </AddressesGrid>
                <StatusWrapper>
                    <StatusMessage isOk={passedVerification}>
                        <StatusIcon />
                        <span>
                            {statusMessage}
                        </span>
                    </StatusMessage>
                    <ErrorsList>
                        {
                            reportDetails.errorsList.map((errorMessage) => (
                                <ReportErrorWrapper>
                                    <ReportError key={errorMessage} errorMessage={errorMessage} />
                                </ReportErrorWrapper>
                            ))
                        }
                    </ErrorsList>
                </StatusWrapper>
            </div>
            <PreviewArea>
                <TabButton>Corrected file</TabButton>
                <TabButton active>Original file</TabButton>
                <PreviewWrapper>
                    <PDFPreview previewUrl={reportDetails.previewUrl} />
                </PreviewWrapper>
            </PreviewArea>
        </Wrapper>
        </PageContainer>
    )
}

export default ReportPage

export const getServerSideProps = ({params: {reportId}}: GetServerSidePropsContext): GetServerSidePropsResult<{reportDetails: ReportDetails}> => {
    return {
        props: {
            reportDetails: {
                id: reportId,
                name: 'Wezwanie',
                previewUrl: '/sample-file.pdf',
                verificationDate: '2022-10-12',
                fileSize: 4000,
                errorsList: [
                    'Some error',
                    'Some error 2',
                    'Some error 3',
                ],
            }
        }
    }
}
