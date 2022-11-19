import styled from 'styled-components';
import { FC, useState } from 'react';

import useUploadFile from 'hooks/useUploadFile';
import PageContainerBase from 'components/atoms/PageContainer/PageContainer';
import FileInput from 'components/atoms/FileInput/FileInput';
import Button from 'components/atoms/Button/Button';

export interface SendPageProps {}

const PageContainer = styled(PageContainerBase)`
  padding-top: 4rem;
  gap: 1rem;
`;

const SendPage: FC<SendPageProps> = ({ ...props }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const { uploadFile, uploadProgress } = useUploadFile();

  return (
    <PageContainer centerContent {...props}>
      <FileInput
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        progress={uploadProgress}
      />
      {!!selectedFile && (
        <Button solid onClick={() => uploadFile(selectedFile)}>
          Wyślij plik
        </Button>
      )}
    </PageContainer>
  );
};

export default SendPage;
