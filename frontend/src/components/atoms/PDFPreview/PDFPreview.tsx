import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useState } from 'react';
import styled from 'styled-components';
import { BarLoader } from 'react-spinners';
import theme from '../../../utils/styled/theme';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const LoadErrorBoundary = styled.div`
  border-radius: 0.25rem;
  // border: 2px solid ${({ theme }) => theme.colors.red};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.05);
`;

const LoadingInfo = styled.div`
  border-radius: 0.25rem;
  // border: 2px solid ${({ theme }) => theme.colors.red};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.05);

  span {
    font-size: 1rem;
  }

  .loader-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
`;

const PDFPreview = ({ previewUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Document
      file={previewUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      error={
        <LoadErrorBoundary>
          <span>Podgląd jest niedostępny</span>
        </LoadErrorBoundary>
      }
      loading={
        <LoadingInfo>
          <div>
            <span>Ładowanie podglądu</span>
            <div className="loader-wrapper">
              <BarLoader color={theme.colors.lightBlue} />
            </div>
          </div>
        </LoadingInfo>
      }
    >
      <Page pageNumber={pageNumber} />
    </Document>
  );
};

export default PDFPreview;
