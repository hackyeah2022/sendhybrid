import environment from '../environment';
import { useQuery } from '@tanstack/react-query';
import { ReportDetails } from '../types/report';
import getFeedbackMessagesProps from "../lib/getFeedbackMessagesProps";

export const getAllReportsQueryKey = (caseNumber?: string) => [
  `all-reports`,
  caseNumber ?? '',
];

const transformRes = res =>
  res.map(singleDoc => ({
    id: singleDoc.id,
    name: singleDoc.name ?? 'Brak nazwy',
    caseNumber: singleDoc.caseNumber ?? 'Brak nr sprawy',
    sent: singleDoc.sent,
    validationGeneralFailed: singleDoc.validationGeneralFailed,
    date: singleDoc.created,
      feedbackMessagesProps: getFeedbackMessagesProps(res)
  }));

export const fetchAllReports = (caseId?: string) =>
  fetch(
    caseId && caseId.trim().length > 0
      ? `${environment.API_URL}/documents/getByCaseNumber/${caseId}`
      : `${environment.API_URL}/documents/getAll`
  )
    .then(res => res.json())
    .then(res => transformRes(res));

const useAllReports = (caseNumber?: string) =>
  useQuery(
    getAllReportsQueryKey(caseNumber),
    () => fetchAllReports(caseNumber),
    {
      initialData: () => [] as ReportDetails[],
    }
  );

export default useAllReports;
