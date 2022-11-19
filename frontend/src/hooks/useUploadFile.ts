import { useState } from 'react';
import { AxiosProgressEvent } from 'axios';

import api from 'utils/axios';

const useUploadFile = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadedSuccessfully, setUploadedSuccessfully] =
    useState<boolean>(false);

  const onUploadProgress = (event: AxiosProgressEvent) => {
    setUploadProgress(event.loaded / (event.total || 0));
  };

  const uploadFile = (file: File) => {
    let formData = new FormData();
    formData.append('file', file);

    api
      .post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      })
      .then(() => setUploadedSuccessfully(true))
      .catch(() => setErrorMessage('Error occurred!'));
  };

  return { uploadFile, uploadProgress, errorMessage, uploadedSuccessfully };
};

export default useUploadFile;
