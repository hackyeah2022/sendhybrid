import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { ErrorCode, useDropzone } from 'react-dropzone';
import { showNotification } from '@mantine/notifications';

import XMark from 'icons/XMark';
import DocumentIcon from 'icons/Document';
import Button from 'components/atoms/Button/Button';

import * as S from './FileInput.styles';

const IconWrapper = styled.div`
  width: 3rem;
`;

export interface Props {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  progress: number;
}

const FileInput: FC<Props> = ({
  selectedFile,
  setSelectedFile,
  progress,
  ...props
}) => {
  const onDrop = (acceptedFiles: File[]) => setSelectedFile(acceptedFiles[0]);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1024 * 1024 * 100,
    });

  useEffect(() => {
    fileRejections.length >= 1 &&
      fileRejections[0].errors.length >= 1 &&
      fileRejections[0].errors[0].code === ErrorCode.FileTooLarge &&
      showNotification({
        title: 'Błąd!',
        message: 'Plik nie może być większy niż 100MB.',
        color: 'red',
      });
  }, [fileRejections]);

  return (
    <S.Wrapper
      animate={{ scale: !selectedFile ? (isDragActive ? 1.05 : 1) : 1 }}
      {...props}
    >
      {!!selectedFile && (
        <S.RemoveFileButton onClick={() => setSelectedFile(null)}>
          <XMark width="100%" height="100%" />
        </S.RemoveFileButton>
      )}
      <S.DropzoneWrapper {...(getRootProps() as any)}>
        <S.Input {...getInputProps()} />
        {!!selectedFile && (
          <S.SelectedFileWrapper layout>
            <IconWrapper>
              <DocumentIcon width="100%" height="100%" />
            </IconWrapper>
            {selectedFile.name && (
              <S.SelectedFileName>{selectedFile.name}</S.SelectedFileName>
            )}
          </S.SelectedFileWrapper>
        )}
        {!selectedFile && isDragActive && (
          <S.InfoText>Upuść tutaj plik</S.InfoText>
        )}
        {!selectedFile && !isDragActive && (
          <>
            <S.InfoText>Przenieś tutaj plik</S.InfoText>
            <S.InfoText>lub</S.InfoText>
            <Button>Wybierz plik</Button>
          </>
        )}
        {progress > 0 && <S.ProgressBar layout $value={progress} />}
      </S.DropzoneWrapper>
    </S.Wrapper>
  );
};

export default FileInput;
