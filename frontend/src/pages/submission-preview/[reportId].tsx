import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {ReportDetails} from "../../types/report";
import {FC, useState} from "react";
import PDFPreview from "../../components/atoms/PDFPreview/PDFPreview";
import styled from "styled-components";
import FeedbackMessage from "../../components/atoms/FeedbackMessage/FeedbackMessage";
import PageContainer from "../../components/atoms/PageContainer/PageContainer";
import XCircle from "../../icons/XCircle";
import CheckCircle from "../../icons/CheckCircle";
import GoBack from "../../components/atoms/GoBack/GoBack";
import environment from "../../environment";
import getFeedbackMessages from "../../lib/getFeedbackMessagesProps";
import getFeedbackMessagesProps from "../../lib/getFeedbackMessagesProps";
import StatusIcon from "../../components/atoms/StatusIcon/StatusIcon";
import Address from "../../components/atoms/Address/Address";
import Button from "../../components/atoms/Button/Button";
import Link from "next/link";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  width: 75%;
  margin: 1rem auto 0 auto;
  max-width: 100%;
  height: calc(100vh - ${({theme}) => theme.layout.navBarHeight});
`

const ReportErrorWrapper = styled.div`
  margin: 0.5rem 0;
`

const ReportName = styled.h1`
  margin-top: 0.6rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const PreviewArea = styled.div`

`

const TabButton = styled.button`
  background: ${({theme, active}) => active ? theme.colors.blue : theme.colors.white};
  color: ${({theme, active}) => active ? theme.colors.white : theme.colors.gray};
  font-weight: ${({active}) => active ? 'bold' : 'normal'};
  border: 2px solid ${({theme}) => theme.colors.blue};
  border-bottom: 0;
  margin: 0;
  font-family: inherit;
  cursor: pointer;
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
.react-pdf__Page__canvas {
  //border: 2px solid ${({theme}) => theme.colors.lightGray};
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  border-radius: 0.25rem;
}
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

const LinksWrapper = styled.div`
  display: flex;
  
  a {
    margin: 0 0.2rem;
  }
`

const PREVIEW_VERSIONS = {
    CORRECTED: 'CORRECTED',
    ORIGINAL: 'ORIGINAL'
}

interface ReportPageProps {
    reportDetails: ReportDetails
}

const SubmissionPreviewPage: FC<ReportPageProps> = ({reportDetails}) => {
    const passedVerification = !reportDetails.validationGeneralFailed
    const statusMessage = passedVerification ? 'Weryfikacja przebiegła pomyślnie' : 'Weryfikacja wykazała błędy'
    const [previewVersion, setPreviewVersion] = useState(() => {
        if(reportDetails.isCorrectedFileAvailable) return PREVIEW_VERSIONS.CORRECTED
        return PREVIEW_VERSIONS.ORIGINAL
    })

    const previewUrl = previewVersion === PREVIEW_VERSIONS.ORIGINAL ? reportDetails.originalPreviewUrl : reportDetails.correctedPreviewUrl
    console.log(previewUrl)
    return (
        <PageContainer wide>
        <Wrapper>
            <div>
                <ReportName>Podgląd: {reportDetails.name ?? 'Bez nazwy'}</ReportName>
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
                        <span>
                            {statusMessage}
                        </span>
                    </StatusMessage>
                    <ErrorsList>
                        {
                            reportDetails.feedbackMessagesProps.map(({message, isOk}) => (
                                <ReportErrorWrapper key={message}>
                                    <FeedbackMessage
                                        isOk={isOk}
                                        message={message} />
                                </ReportErrorWrapper>
                            ))
                        }
                    </ErrorsList>
                </StatusWrapper>
                <LinksWrapper style={{marginTop: '2rem'}}>
                    <Link href="/send">
                        <Button as="a">Wyślij ten list</Button>
                    </Link>
                    <Link href="/submissions">
                        <Button as="a">Kontynuuj bez wysyłania</Button>
                    </Link>
                    <br/>
                    <Link href="/send">
                        <Button as="a">Wyślij kolejny list</Button>
                    </Link>
                </LinksWrapper>
            </div>
            <PreviewArea>
                {
                    reportDetails.isCorrectedFileAvailable  && (
                        <TabButton
                            active={previewVersion === PREVIEW_VERSIONS.CORRECTED}
                            onClick={() => setPreviewVersion(PREVIEW_VERSIONS.CORRECTED)}
                        >Corrected file</TabButton>
                    )
                }
                <TabButton
                    active={previewVersion === PREVIEW_VERSIONS.ORIGINAL}
                    onClick={() => setPreviewVersion(PREVIEW_VERSIONS.ORIGINAL)}
                >Original file</TabButton>
                <PreviewWrapper>
                    <PDFPreview key={previewUrl} previewUrl={previewUrl} />
                </PreviewWrapper>
            </PreviewArea>
        </Wrapper>
        </PageContainer>
    )
}

export default SubmissionPreviewPage

export const getServerSideProps = async ({params: {reportId}}: GetServerSidePropsContext): GetServerSidePropsResult<{reportDetails: ReportDetails}> => {
    const res = await fetch(`${environment.API_URL}/documents/getById/${reportId}`).then(res => res.json())
    console.log(res)
    return {
        props: {
            reportDetails: {
                id: res.id,
                name: res.name,
                isCorrectedFileAvailable: res.correctedFileId && res.correctedFileId.trim().length > 0,
                originalPreviewUrl: `${environment.API_URL}/files/content/${res.originalFileId}`,
                correctedPreviewUrl: `${environment.API_URL}/files/content/${res.correctedFileId}`,
                verificationDate: res.created,
                feedbackMessagesProps: getFeedbackMessagesProps(res),
                ...res
            }
        }
    }
}
