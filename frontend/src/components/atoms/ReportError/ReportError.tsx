import {Wrapper, ErrorIcon, ErrorMessageText} from "./ReportError.styles";
import {FC} from "react";

interface ReportErrorProps {
    errorMessage: string
}

const ReportError: FC<ReportErrorProps> = ({ errorMessage }) => {
    return (
        <Wrapper>
            <ErrorIcon />
            <ErrorMessageText>
                {errorMessage}
            </ErrorMessageText>
        </Wrapper>
    )
}

export default ReportError
