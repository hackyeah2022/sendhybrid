import { FC } from 'react';

import PageContainer from 'components/atoms/PageContainer/PageContainer';
import ReportTable from 'components/molecules/ReportTable/ReportTable'
import styled from "styled-components";
import Button from "../components/atoms/Button/Button";

const Wrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`

const Heading = styled.h1`
  margin: 1rem 0 .5rem 0;
`

const ActionWrapper = styled.div`

`


export interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({ ...props }) => {
    return (
        <PageContainer wide {...props}>
            <Wrapper>
                <Heading>Dashboard</Heading>
                <ReportTable />
            </Wrapper>
        </PageContainer>
    );
};

export default DashboardPage;
