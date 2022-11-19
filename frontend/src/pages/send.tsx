import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';

import useUploadFile from 'hooks/useUploadFile';
import theme from 'utils/styled/theme';
import PageContainerBase from 'components/atoms/PageContainer/PageContainer';
import FileInput from 'components/atoms/FileInput/FileInput';
import Button from 'components/atoms/Button/Button';
import Modal from 'components/atoms/Modal/Modal';

export interface SendPageProps {}

const PageContainer = styled(PageContainerBase)`
  padding-top: 4rem;
  gap: 1rem;
`;

const SendPage: FC<SendPageProps> = ({ ...props }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const { uploadFile, uploadProgress, errorMessage, uploadedSuccessfully } =
    useUploadFile();

  useEffect(() => setIsModalOpened(!!errorMessage), [errorMessage]);
  useEffect(() => {
    uploadedSuccessfully &&
      showNotification({
        title: 'Success!',
        message: 'Your document was uploaded successfully!',
        color: theme.colors.accent[1],
      });
  }, [uploadedSuccessfully]);

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
      <Modal opened={isModalOpened} setIsOpened={setIsModalOpened}>
        {errorMessage}
      </Modal>
    </PageContainer>
  );
};

export default SendPage;
