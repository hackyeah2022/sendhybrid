import PDFPreview from "../../atoms/PDFPreview/PDFPreview";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

const PreviewWrapper = styled.div`
  margin-bottom: 4rem;
  .react-pdf__Page__canvas {
    //border: 2px solid ${({ theme }) => theme.colors.lightGray};
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
      drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    border-radius: 0.25rem;
  }
`;

const TabButton = styled.button`
  background: ${({ theme, active }) =>
    active ? theme.colors.blue : theme.colors.white};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.gray};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border: 2px solid ${({ theme }) => theme.colors.blue};
  border-bottom: 0;
  margin: 0;
  font-family: inherit;
  cursor: pointer;
  padding: 0.4rem 0.7rem;
  &:first-of-type {
    border-top-left-radius: 0.25rem;
    margin-left: 1rem;
  }
  &:last-of-type {
    border-top-right-radius: 0.25rem;
  }
`;


const PREVIEW_VERSIONS = {
    CORRECTED: 'CORRECTED',
    ORIGINAL: 'ORIGINAL',
};

const PreviewArea = ({reportDetails}) => {

    const [previewVersion, setPreviewVersion] = useState(() => {
        if (reportDetails?.isCorrectedFileAvailable)
            return PREVIEW_VERSIONS.CORRECTED;
        return PREVIEW_VERSIONS.ORIGINAL;
    });

    const previewUrl =
        previewVersion === PREVIEW_VERSIONS.ORIGINAL
            ? reportDetails?.originalPreviewUrl
            : reportDetails?.correctedPreviewUrl;

    if(!reportDetails)
        return null
    return (
        <div>
            {reportDetails.isCorrectedFileAvailable && (
                <TabButton
                    active={previewVersion === PREVIEW_VERSIONS.CORRECTED}
                    onClick={() => setPreviewVersion(PREVIEW_VERSIONS.CORRECTED)}
                >
                    Plik poprawiony
                </TabButton>
            )}
            <TabButton
                active={previewVersion === PREVIEW_VERSIONS.ORIGINAL}
                onClick={() => setPreviewVersion(PREVIEW_VERSIONS.ORIGINAL)}
            >
                Plik oryginalny
            </TabButton>
            <PreviewWrapper>
                <PDFPreview previewUrl={previewUrl} />
            </PreviewWrapper>
        </div>
    )
}

export default PreviewArea
