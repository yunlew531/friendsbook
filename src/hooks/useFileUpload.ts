import { MutableRefObject } from 'react';
import { useUploadImgMutation, usePostBannerImgMutation } from 'services/image';

type InputRef = MutableRefObject<null | HTMLInputElement>;

const useFileUpload = (inputRef: InputRef) => {
  const [uploadImgTrigger, uploadImgResult] = useUploadImgMutation();
  const [uploadBannerImgTrigger, uploadBannerImgResult] = usePostBannerImgMutation();

  const createFormData = (inputElRef: InputRef) => {
    const formData = new FormData();
    if (!inputElRef?.current) throw new Error('useFileUpload hook, parameter "inputRef" not found');
    const file = (<FileList>inputElRef.current.files)[0];
    formData.append('image-file', file);
    return formData;
  };

  const uploadImg = () => uploadImgTrigger(createFormData(inputRef));
  const uploadBannerImg = () => uploadBannerImgTrigger(createFormData(inputRef));

  return {
    uploadImg,
    uploadBannerImg,
    uploadImgResult,
    uploadBannerImgResult,
  };
};

export default useFileUpload;
