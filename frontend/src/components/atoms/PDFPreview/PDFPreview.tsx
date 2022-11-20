import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {useState} from "react";
import styled from "styled-components";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const LoadErrorBoundary = styled.div`
  border-radius: 0.25rem;
  // border: 2px solid ${({theme}) => theme.colors.red};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-size: 1.2rem;
  background: rgba(0,0,0,0.05);
`

const PDFPreview = ({previewUrl}) => {
    const [numPages, setNumPages] = useState(null);
    const [hasLoadingFailed, setHasLoadingFailed] = useState(false)
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleLoadError = () => {
        setHasLoadingFailed(true)
    }

    if(hasLoadingFailed)
        return (
            <LoadErrorBoundary>
                <span>Podgląd jest niedostępny</span>
            </LoadErrorBoundary>
        )

    return (
        <Document file={previewUrl} onLoadError={handleLoadError} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
        </Document>
    )
}

export default PDFPreview

