import CheckCircle from "../../../icons/CheckCircle";
import XCircle from "../../../icons/XCircle";
import styled from "styled-components";
import {FC, SVGProps} from "react";

const NotOkIcon = styled(XCircle)`
  stroke: ${({theme}) => theme.colors.red };
`

const OkIcon = styled(CheckCircle)`
  stroke: ${({theme}) => theme.colors.green };
`

interface StatusIconProps extends SVGProps<SVGSVGElement> {
    isOk: boolean
}

const StatusIcon: FC<StatusIconProps> = ({isOk, ...props}) => {
    const Icon = isOk ? OkIcon : NotOkIcon;
    return <Icon {...props} />
}

export default StatusIcon
