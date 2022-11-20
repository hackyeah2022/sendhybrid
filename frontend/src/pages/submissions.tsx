import { FC, useState } from 'react';

import PageContainer from 'components/atoms/PageContainer/PageContainer';
import ReportTable from 'components/molecules/ReportTable/ReportTable';
import styled from 'styled-components';
import Button from '../components/atoms/Button/Button';
import { useQuery } from '@tanstack/react-query';
import environment from '../environment';
import { useDebouncedValue } from '@mantine/hooks';

const Wrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const Heading = styled.h1`
  margin: 1rem 0 0.5rem 0;
`;

const SearchInput = styled.input`
  background: #eee;
  border: 2px solid #eee;
  font-size: 1.1rem;
  font-family: inherit;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  transition: 0.2s all;
  outline: none;
  margin-right: 3rem;
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.gray};
  }
`;


const fetchReports = (caseId?: string) =>
  fetch(
      caseId && caseId.trim().length > 0 ?
          `${environment.API_URL}/documents/getByCaseNumber/${caseId}` :
          `${environment.API_URL}/documents/getAll`
  )
    .then(res => res.json())
    .then(res =>
      res.map((singleDoc) => ({
        id: singleDoc.id,
        name: singleDoc.name,
        sent: singleDoc.sent,
        validationGeneralFailed: singleDoc.validationGeneralFailed,
        date: singleDoc.created,
      }))
    );

export interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({ ...props }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebouncedValue(inputValue, 400);

  const { data } = useQuery(['search', debouncedInputValue], () => fetchReports(debouncedInputValue[0]), {
    initialData: async () => [] as string[],
  });

  return (
    <PageContainer wide {...props}>
      <Wrapper>
        <Heading>Dokumenty</Heading>
        <ReportTable
          data={data}
          renderSearch={() => (
            <SearchInput
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Wyszukaj plik po nr sprawy"
            />
          )}
        />
      </Wrapper>
    </PageContainer>
  );
};

export default DashboardPage;
