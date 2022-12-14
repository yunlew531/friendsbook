import React, { useEffect } from 'react';
import Card from 'components/Card';
import styled from '@emotion/styled';
import { useOutletContext, useParams } from 'react-router-dom';
import ImageList from 'pages/frontend/Index/components/ImageList';
// import { useLazyGetImgsByUidQuery } from 'services/image';
import { useAppSelector } from 'hooks';
import { useUploadImgMutation } from 'services/image';

const PhotosCard = styled(Card)`
`;

const Photos: React.FC = () => {
  const profile = useAppSelector((state) => state.userInfo.profile);
  const { uid: paramUid } = useParams();
  const { imgs, getImagesResult, refreshImages }: IOutletContext = useOutletContext();
  const [uploadImgTrigger, uploadImgResult] = useUploadImgMutation();

  const handleUploadImg = (formData: FormData) => {
    uploadImgTrigger(formData);
  };

  useEffect(() => {
    if (uploadImgResult.isSuccess) {
      refreshImages();
    }
  }, [uploadImgResult]);

  return (
    <PhotosCard>
      <ImageList
        cols={6}
        height="180px"
        images={imgs}
        isFetching={getImagesResult.isFetching}
        isSuccess={getImagesResult.isSuccess}
        isUploadShow={paramUid === profile.uid}
        handleUpload={handleUploadImg}
      />
    </PhotosCard>
  );
};

export default Photos;
