import { MutableRefObject } from 'react';
import { useUploadImgMutation } from 'services/image';

const useFileUpload = (inputRef: MutableRefObject<null | HTMLInputElement>) => {
  const [uploadImgTrigger, uploadImgResult] = useUploadImgMutation();

  const uploadImg = () => {
    const formData = new FormData();
    if (!inputRef?.current) throw new Error('useFileUpload hook, input ref not found');
    const file = (<FileList>inputRef.current.files)[0];
    formData.append('image-file', file);
    uploadImgTrigger(formData);
  };

  return {
    uploadImg,
    uploadImgResult,
  };
};

export default useFileUpload;
