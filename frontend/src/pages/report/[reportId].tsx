import {useRouter} from "next/router";
import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {ReportDetails} from "../../types/report";
import {FC} from "react";
import PDFPreview from "../../components/atoms/PDFPreview/PDFPreview";
import styled from "styled-components";
import ReportError from "../../components/atoms/ReportError/ReportError";
import PageContainer from "../../components/atoms/PageContainer/PageContainer";

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

const PreviewArea = styled.div`
  
`

const TabButton = styled.button`
  background: ${({theme, active}) => active ? theme.colors.blue : theme.colors.white};
  color: ${({theme, active}) => active ? theme.colors.white : theme.colors.black};
  border: 2px solid ${({theme}) => theme.colors.blue};
  border-bottom: 0;
  margin: 0;
  padding: 0.4rem 0.7rem;
  &:first-of-type {
    border-top-left-radius: 0.25rem;
    margin-left: 1rem;
  }
  &:LAST-of-type {
    border-top-right-radius: 0.25rem;
  }
`

const PreviewWrapper = styled.div`
  border: 2px solid ${({theme}) => theme.colors.blue};
  border-radius: 0.25rem;
`


interface ReportPageProps {
    reportDetails: ReportDetails
}

const ReportPage: FC<ReportPageProps> = ({reportDetails}) => {

    return (
        <PageContainer wide>
        <Wrapper>
            <div>
                <h1>{reportDetails.name}</h1>
                <span>
                    Data weryfikacji: {new Date(reportDetails.verificationDate).toDateString()} |
                    ID pliku: {reportDetails.id} |
                    Wielkość pliku: {reportDetails.fileSize}b
                </span>
                <div className="">
                    {
                        reportDetails.errorsList.map((errorMessage) => (
                            <ReportErrorWrapper>
                                <ReportError key={errorMessage} errorMessage={errorMessage} />
                            </ReportErrorWrapper>
                        ))
                    }
                </div>
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
