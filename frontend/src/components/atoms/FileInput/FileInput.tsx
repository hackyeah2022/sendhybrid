import { FC } from 'react';
import { useDropzone } from 'react-dropzone';

import Button from 'components/atoms/Button/Button';

import * as S from './FileInput.styles';

export interface Props {
  selectedFile?: File;
  setSelectedFile: (file: File) => void;
  progress: number;
}

const FileInput: FC<Props> = ({
  selectedFile,
  setSelectedFile,
  progress,
  ...props
}) => {
  const onDrop = (acceptedFiles: File[]) => setSelectedFile(acceptedFiles[0]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <S.Wrapper
      animate={{ scale: !selectedFile ? (isDragActive ? 1.05 : 1) : 1 }}
      {...(getRootProps() as any)}
      {...props}
    >
      <S.Input {...getInputProps()} />
      {!!selectedFile && (
        <S.SelectedFileWrapper layout>
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
    </S.Wrapper>
  );
};

export default FileInput;
