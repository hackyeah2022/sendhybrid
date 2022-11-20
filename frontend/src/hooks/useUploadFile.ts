import { useState } from 'react';
import { AxiosProgressEvent } from 'axios';

import api from 'utils/axios';

const useUploadFile = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [body, setBody] = useState(null);
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
      .then(res => {
        setUploadedSuccessfully(true);
        setBody(res.data);
      })
      .catch(() => setErrorMessage('Error occurred!'));
  };

  return {
    uploadFile,
    uploadProgress,
    errorMessage,
    uploadedSuccessfully,
    responseBody: body,
  };
};

export default useUploadFile;
