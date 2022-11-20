import { FC, MouseEventHandler, useState } from 'react';

import PageContainer from 'components/atoms/PageContainer/PageContainer';
import ReportTable from 'components/molecules/ReportTable/ReportTable';
import styled from 'styled-components';
import Button from '../components/atoms/Button/Button';
import { useQuery } from '@tanstack/react-query';
import environment from '../environment';
import { useDebouncedValue } from '@mantine/hooks';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ReportDetails } from '../types/report';
import GoBack from '../components/atoms/GoBack/GoBack';
import FeedbackMessage from '../components/atoms/FeedbackMessage/FeedbackMessage';
import SingleReportCard from '../components/molecules/SummaryReport/SingleReportCard';
import getFeedbackMessagesProps from '../lib/getFeedbackMessagesProps';
import allReportsGetServerSideProps from '../lib/allReportsGetServerSideProps';
import useAllReports from '../hooks/useAllReports';

const Wrapper = styled.div`
  padding-top: 1rem;
  width: 75%;
  margin: 0 auto;
`;

const Heading = styled.h1`
  margin: 1rem 0 0.5rem 0;
`;

const TableOfContents = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
  display: inline-block;

  li {
    padding: 0.5rem 1rem;

    span {
      font-weight: bold;
      display: inline-block;
      margin-right: 0.5rem;
      width: 2rem;
    }

    a:hover {
      text-decoration: underline;
    }

    &:nth-child(even) {
      background: rgba(0, 0, 0, 0.03);
    }
  }
`;

const SubHeading = styled.h4`
  margin: 1.5rem 0 0.5rem 0;
`;

const SingleReportWrapper = styled.div`
  border-radius: 0.25rem;
  padding: 0.2rem 0;
  &:nth-child(even) {
    background: rgba(0, 0, 0, 0.03);
    color: black;
  }
`;

const reportGenerationDate = new Date();

export interface SummaryReportPageProps {}

const SummaryReportPage: FC<SummaryReportPageProps> = ({ query, ...props }) => {
  const ids = query.ids.split(',');
  const { data } = useAllReports();
  const filteredReports = data.filter(rep => ids.includes(rep.id));

  const createClickHandler =
    (id: string): MouseEventHandler =>
    e => {
      if (typeof window != 'undefined') {
        e.preventDefault();
        document.getElementById(`report-section-${id}`)!.scrollIntoView({
          behavior: 'smooth',
        });
      }
    };

  return (
    <PageContainer wide {...props}>
      <Wrapper>
        <GoBack />
        <Heading>Raport zbiorczy</Heading>
        <span>
          Czas wygenerowania raportu:{' '}
          {new Date(reportGenerationDate).toLocaleString()}
        </span>
        <SubHeading>Pliki zawarte w raporcie</SubHeading>
        <TableOfContents>
          {filteredReports.map(({ name, id }, i) => (
            <li key={name}>
              <a
                onClick={createClickHandler(id)}
                href={`#report-section-${id}`}
              >
                <span>{i + 1}.</span>
                {''}
                {name}
              </a>
            </li>
          ))}
        </TableOfContents>
        <SubHeading>Pliki</SubHeading>
        {filteredReports.map(reportDetails => (
          <SingleReportWrapper id={`report-section-${reportDetails.id}`}>
            <SingleReportCard reportDetails={reportDetails} />
          </SingleReportWrapper>
        ))}
      </Wrapper>
    </PageContainer>
  );
};

export default SummaryReportPage;

export const getServerSideProps = allReportsGetServerSideProps;
