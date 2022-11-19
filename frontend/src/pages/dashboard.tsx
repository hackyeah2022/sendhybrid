import {FC, useState} from 'react';

import PageContainer from 'components/atoms/PageContainer/PageContainer';
import ReportTable from 'components/molecules/ReportTable/ReportTable'
import styled from "styled-components";
import Button from "../components/atoms/Button/Button";
import {useQuery} from "@tanstack/react-query";
import environment from "../environment";
import {useDebouncedValue} from "@mantine/hooks";

const Wrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`

const Heading = styled.h1`
  margin: 1rem 0 .5rem 0;
`

const SearchInput = styled.input`
  background: #eee;
  border: 2px solid #eee;
  font-size: 1.1rem;
  font-family: inherit;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  transition: .2s all;
  outline: none;
  margin-right: 3rem;
  &:focus {
    border: 2px solid ${({theme}) => theme.colors.gray};
  }
`

const ActionWrapper = styled.div`

`

const fetchReports = () =>
    fetch(`${environment.API_URL}/files`)
        .then(res => res.json())
        .then(res => res.map((reportId: string) => ({
        id: reportId,
        name: reportId,
        status: false,
        date: '2022-231'
    }
)))


export interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({ ...props }) => {
    const [inputValue, setInputValue] = useState('')
    const debouncedInputValue = useDebouncedValue(inputValue, 400)

    const {data} = useQuery(['search', debouncedInputValue], fetchReports, {
        initialData: async () => ([] as string[])
    })


    return (
        <PageContainer wide {...props}>
            <Wrapper>
                <Heading>Dashboard</Heading>
                <ReportTable data={data} renderSearch={() => (
                    <SearchInput
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Wyszukaj plik" />
                )} />
            </Wrapper>
        </PageContainer>
    );
};

export default DashboardPage;
