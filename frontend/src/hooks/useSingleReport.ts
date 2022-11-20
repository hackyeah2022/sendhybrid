import environment from '../environment';
import getFeedbackMessagesProps from '../lib/getFeedbackMessagesProps';
import { useQuery } from '@tanstack/react-query';

export const getSingleReportQueryKey = (id: string) => [`single-report`, id];

const transformRes = res => ({
  id: res.id,
  name: res.name,
  isCorrectedFileAvailable: Boolean(res.correctedFileId),
  originalPreviewUrl: `${environment.API_URL}/files/content/${res.originalFileId}`,
  correctedPreviewUrl: `${environment.API_URL}/files/content/${res.correctedFileId}`,
  verificationDate: res.created,
  feedbackMessagesProps: getFeedbackMessagesProps(res),
  ...res,
});

export const fetchSingleReport = (id: string) =>
  fetch(`${environment.API_URL}/documents/getById/${id}`)
    .then(res => res.json())
    .then(res => transformRes(res));

const useSingleReport = (id: string) =>
  useQuery(getSingleReportQueryKey(id), () => fetchSingleReport(id));

export default useSingleReport;
