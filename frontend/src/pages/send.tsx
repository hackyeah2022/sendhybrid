import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';

import useUploadFile from 'hooks/useUploadFile';
import PageContainerBase from 'components/atoms/PageContainer/PageContainer';
import FileInput from 'components/atoms/FileInput/FileInput';
import Button from 'components/atoms/Button/Button';
import Modal from 'components/atoms/Modal/Modal';
import {useRouter} from "next/router";

export interface SendPageProps {}

const PageContainer = styled(PageContainerBase)`
  margin-top: -4rem;
  gap: 2rem;
`;

const PageHeading = styled.h1`
  width: 24rem;
  font-size: 28px;
  line-height: 1.3;
`;

const BlueText = styled.span`
  color: ${({ theme }) => theme.colors.lightBlue};
`;

const SendPage: FC<SendPageProps> = ({ ...props }) => {
  const router = useRouter();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    uploadFile,
    uploadProgress,
    errorMessage,
    uploadedSuccessfully,
    responseBody,
  } = useUploadFile();
    const isUploadInProgress = uploadProgress > 0 && !uploadedSuccessfully
  useEffect(() => setIsModalOpened(!!errorMessage), [errorMessage]);
  useEffect(() => {
    if (uploadedSuccessfully) {
      router.push(`/submission-preview/${responseBody.id}`);
    }
  }, [uploadedSuccessfully]);

  return (
    <PageContainer centerContent {...props}>
      <PageHeading>
        Wybierz <BlueText>dokument</BlueText>, a my dostarczymy go do odbiorcy{' '}
        <BlueText>w formie listu!</BlueText>
      </PageHeading>
      <FileInput
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        progress={uploadProgress}
      />
      {!!selectedFile && !isUploadInProgress && (
        <Button solid onClick={() => uploadFile(selectedFile)}>
          Wyślij plik
        </Button>
      )}
        {isUploadInProgress && (
            <BarLoader color={theme.colors.lightBlue} />
        )}
      <Modal opened={isModalOpened} setIsOpened={setIsModalOpened}>
        {errorMessage}
      </Modal>
    </PageContainer>
  );
};

export default SendPage;
