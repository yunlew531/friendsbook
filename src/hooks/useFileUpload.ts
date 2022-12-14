import { MutableRefObject } from 'react';
import { useUploadImgMutation, usePostBannerImgMutation, usePostAvatarImgMutation } from 'services/image';

type InputRef = MutableRefObject<null | HTMLInputElement>;

const useFileUpload = (inputRef: InputRef) => {
  const [uploadImgTrigger, uploadImgResult] = useUploadImgMutation();
  const [uploadBannerImgTrigger, uploadBannerImgResult] = usePostBannerImgMutation();
  const [uploadAvatarImgTrigger, uploadAvatarImgResult] = usePostAvatarImgMutation();

  const createFormData = () => {
    const formData = new FormData();
    if (!inputRef?.current) throw new Error('useFileUpload hook, parameter "inputRef" not found');
    const file = (<FileList>inputRef.current.files)[0];
    formData.append('image-file', file);
    return formData;
  };

  const uploadImg = () => uploadImgTrigger(createFormData());
  const uploadBannerImg = () => uploadBannerImgTrigger(createFormData());
  const uploadAvatarImg = () => uploadAvatarImgTrigger(createFormData());

  return {
    uploadImg,
    uploadBannerImg,
    uploadAvatarImg,
    createFormData,
    uploadImgResult,
    uploadBannerImgResult,
    uploadAvatarImgResult,
  };
};

export default useFileUpload;
