import {ReportDetails} from "../../../types/report";
import {FC} from "react";
import styled from "styled-components";
import FeedbackMessage from "../../atoms/FeedbackMessage/FeedbackMessage";
import StatusIcon from "../../atoms/StatusIcon/StatusIcon";

const Wrapper = styled.div`
  margin: 2rem 0;
  
`

const ReportName = styled.h4`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin: 0.5rem 0 1rem 0;
  color: ${({isOk, theme}) => isOk ? 'green' : theme.colors.red };
  svg {
    width: 2rem;
    margin-right: 0.5rem;
  }
`

const StatusWrapper = styled.div``


const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  margin-right: .5rem;
  color: ${({isOk, theme}) => isOk ? 'green' : theme.colors.red };
  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }
`

const ErrorsList = styled.div`
  margin-top: 1rem;
`


const AddressesGrid = styled.div`
  display: grid;
  width: 50%;
  grid-template-columns: 1fr 1fr;
  margin: 1.5rem 0;
  
  span {
    font-weight: bold;
  }
`

interface SingleReportCardProps {
    reportDetails: ReportDetails
}

const SingleReportCard: FC<SingleReportCardProps> = ({reportDetails: {errorsList, id, name, verificationDate, fileSize}}) => {
    const passedVerification = Math.random() > 0.5;
    const statusMessage = passedVerification ? 'Weryfikacja przebiegła pomyślnie' : 'Weryfikacja wykazała błędy'
    return (
        <Wrapper>
            <ReportName isOk={passedVerification}>
                <StatusIcon isOk={passedVerification}/>
                <span>
                {name}
            </span>
            </ReportName>
            <span>
                    ID pliku: {id} <br/>
                    Data weryfikacji: {new Date(verificationDate).toLocaleDateString()} <br/>
                    Wielkość pliku: {fileSize}b
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
                    <span>
                            {statusMessage}
                        </span>
                </StatusMessage>
                <ErrorsList>
                    {
                        errorsList.map((errorMessage) => (
                            <div>
                                <FeedbackMessage key={errorMessage} errorMessage={errorMessage}/>
                            </div>
                        ))
                    }
                </ErrorsList>
            </StatusWrapper>

        </Wrapper>
    )
}
export default SingleReportCard
