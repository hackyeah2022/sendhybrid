import { FC } from 'react';
import { useDropzone } from 'react-dropzone';

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
  });

  return (
    <S.Wrapper {...getRootProps()} {...props}>
      <S.Input {...getInputProps()} />
      {isDragActive ? (
        <S.InfoText>Upuść tutaj plik</S.InfoText>
      ) : (
        <S.InfoText>Przenieś tutaj plik</S.InfoText>
      )}
      <S.ProgressBar $value={progress} />
    </S.Wrapper>
  );
};

export default FileInput;
