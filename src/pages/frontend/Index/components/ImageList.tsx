import styled from '@emotion/styled';
import { useAppSelector } from 'hooks';
import useFileUpload from 'hooks/useFileUpload';
import React, { useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

interface ImageListStyleProps {
  cols: number;
  height: string;
}

const ImageListStyle = styled.ul<ImageListStyleProps>`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  grid-auto-rows: ${({ height }) => height};
  gap: 5px;
  list-style: none;
  li {
    line-height: 0;
  }
  img {
    height: 100%;
    border-radius: 3px;
  }
  .empty-box {
    grid-column-start: 1;
    grid-column-end: 4;
    text-align: center;
    img {
      margin: 30px 0;
      width: 50px;
      height: 50px;
      filter: grayscale(1);
    }
  }
  .img-skeleton {
    height: 130px;
    border-radius: 3px;
  }
`;

const UploadImgBtn = styled.button<IThemeProps>`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dashed ${({ theme }) => theme.color.gray_100};
  border-radius: 3px;
  line-height: 0;
  transition: filter .1s ease-in-out;
  &:hover {
    filter: brightness(1.03);
  }
  &:active {
    filter: brightness(0.97);
  }
  input[type=file] {
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }  
`;

interface IPhotoListProps {
  cols: number;
  height?: string;
  images: IImage[];
  isFetching: boolean;
  isSuccess: boolean;
  isUploadShow?: boolean;
  handleUpload?: (formData: FormData) => void;
}

const PhotoList: React.FC<IPhotoListProps> = ({
  cols, height = '150px', images, isFetching, isSuccess, isUploadShow = false, handleUpload,
}) => {
  const profile = useAppSelector((state) => state.userInfo.profile);
  const { uid: paramUid } = useParams();
  const inputRef = useRef(null);
  const { createFormData } = useFileUpload(inputRef);

  const uploadImage = () => {
    if (!handleUpload) throw new Error('ImageList Props handleUpload not found');
    handleUpload(createFormData());
  };

  return (
    <ImageListStyle cols={cols} height={height}>
      {isUploadShow && !isFetching && (
      <li>
        <UploadImgBtn type="button">
          <span className="material-icons-outlined">add</span>
          <input ref={inputRef} type="file" onChange={uploadImage} />
        </UploadImgBtn>
      </li>
      )}
      {isFetching ? (
        <>
          <div><Skeleton className="img-skeleton" height={height} /></div>
          <div><Skeleton className="img-skeleton" height={height} /></div>
          <div><Skeleton className="img-skeleton" height={height} /></div>
          <div><Skeleton className="img-skeleton" height={height} /></div>
          <div><Skeleton className="img-skeleton" height={height} /></div>
          <div><Skeleton className="img-skeleton" height={height} /></div>
          <div><Skeleton className="img-skeleton" height={height} /></div>
          <div><Skeleton className="img-skeleton" height={height} /></div>
          <div><Skeleton className="img-skeleton" height={height} /></div>
        </>
      ) : images.map((image) => (
        <li key={image.id}>
          <img src={image.url} alt={image.url} />
        </li>
      )) }
      {profile.uid !== paramUid && isSuccess && images?.length === 0
        && (
        <li className="empty-box">
          <img src={`${process.env.PUBLIC_URL}/images/empty-box.png`} alt="empty box" />
        </li>
        )}
    </ImageListStyle>
  );
};

PhotoList.defaultProps = {
  height: '150px',
  isUploadShow: false,
  handleUpload: undefined,
};

export default PhotoList;
