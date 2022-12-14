import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Btn from 'components/Btn';
import Navbar from 'components/Navbar';
import { Outlet, useParams } from 'react-router-dom';
import { useLazyGetUserByUidQuery } from 'services/user';
import useFileUpload from 'hooks/useFileUpload';
import { postAvatarImg, postBannerImg } from 'slices/userInfoSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useLazyGetImgsByUidQuery } from 'services/image';
import Skeleton from 'react-loading-skeleton';

const Wrap = styled.div`
  max-width: 1140px;
  margin: -21px auto 0;
`;

interface IBannerProps {
  url?: string;
  isFetching: boolean;
}

const Banner = styled.div<IBannerProps>`
  height: 400px;
  display: flex;
  justify-content: end;
  align-items: end;
  background: url(${({ url, isFetching }) => (isFetching ? `${process.env.PUBLIC_URL}/images/banner.jpeg` : url || `${process.env.PUBLIC_URL}/images/banner.jpeg`)}) no-repeat center;
  background-size: cover;
  border-radius: 0 0 3px 3px;
  padding: 10px;
  .use-onerror-img {
    display: none;
  }
`;

const UploadBannerImgBtnContainer = styled.div<IThemeProps>`
  position: relative;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.white_100};
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  padding: 5px 10px;
  input[type=file] {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
  }
`;

const Header = styled.div<IThemeProps>`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.s};
  padding: 0 50px;
`;

const PhotoSection = styled.div`
  position: relative;
  width: 150px;
  margin-right: 30px;
`;

const PhotoContainer = styled.div<IThemeProps>`
  position: absolute;
  top: -75px;
  width: 100%;
  height: 150px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 100%;
  border: 3px solid ${({ theme }) => theme.color.white_100};
  input[type=file] {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    border-radius: 100%;
    z-index: 10;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    transition: filter .2s ease-in-out;
  }
  &:hover {
    img {
      filter: brightness(0.9);
    }
  }
  &:active {
    img {
      filter: brightness(0.8);
    }
  }
`;

const HeaderMain = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  height: 85px;
`;

const HeaderTextSection = styled.div`
  margin-right: auto;
`;

const Title = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const HeaderBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  color: ${({ theme }) => theme.color.white_100};
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 5px;
  margin-right: 10px;
  padding: 5px 15px 5px 12px;
  &:last-of-type {
    margin-right: 0;
  }
  .material-icons, .material-icons-round {
    margin-right: 3px;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
`;

const User: React.FC = () => {
  const { uid: paramUid } = useParams();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const dispatch = useAppDispatch();
  const avatarInputRef = useRef(null);
  const { uploadAvatarImg, uploadAvatarImgResult } = useFileUpload(avatarInputRef);
  const [getUserProfileByUidTrigger, getUserProfileByUidResult] = useLazyGetUserByUidQuery();
  const [getImgsTrigger, getImagesResult] = useLazyGetImgsByUidQuery();
  const bannerInputRef = useRef(null);
  const { uploadBannerImg, uploadBannerImgResult } = useFileUpload(bannerInputRef);
  const [imgs, setImgs] = useState<IImage[]>([]);
  const [user, setUser] = useState<IProfile>();

  const navLinks = [
    {
      title: '貼文',
      to: `/${paramUid}`,
    },
    {
      title: '關於',
      to: `/${paramUid}/about`,
    },
    {
      title: '相片',
      to: `/${paramUid}/photos`,
    },
    {
      title: '好友',
      to: `/${paramUid}/friends`,
    },
    {
      title: '社團',
      to: `/${paramUid}/clubs`,
    },
    {
      title: '說讚的內容',
      to: `/${paramUid}/fans`,
    },
  ];

  const refreshImages = () => {
    if (paramUid) getImgsTrigger(paramUid);
  };

  useEffect(() => {
    if (paramUid) {
      getImgsTrigger(paramUid);
      getUserProfileByUidTrigger(paramUid);
    }
  }, [paramUid]);

  useEffect(() => {
    const handleGetUserByUid = () => {
      const { isSuccess, data } = getUserProfileByUidResult;
      if (!isSuccess) return;
      setUser(data.profile);
    };

    handleGetUserByUid();
  }, [getUserProfileByUidResult]);

  useEffect(() => {
    const handleUploadBannerImg = () => {
      const { isSuccess, data: { url = '' } = {} } = uploadBannerImgResult;
      if (!isSuccess) return;
      dispatch(postBannerImg(url));
      if (!paramUid) return;
      getImgsTrigger(paramUid);
      getUserProfileByUidTrigger(paramUid);
    };

    handleUploadBannerImg();
  }, [uploadBannerImgResult]);

  useEffect(() => {
    const handleUploadAvatarImg = () => {
      const { isSuccess, data: { url = '' } = {} } = uploadAvatarImgResult;
      if (!isSuccess) return;
      dispatch(postAvatarImg(url));
      if (!paramUid) return;
      getImgsTrigger(paramUid);
      getUserProfileByUidTrigger(paramUid);
    };

    handleUploadAvatarImg();
  }, [uploadAvatarImgResult]);

  useEffect(() => {
    const handleGetImgsApi = () => {
      const { isSuccess } = getImagesResult;
      if (!isSuccess) return;
      const { data: { images } } = getImagesResult;
      const sortImagesByTime = [...images].sort((a, b) => b.created_at! - a.created_at!);
      setImgs(sortImagesByTime);
    };

    handleGetImgsApi();
  }, [getImagesResult]);

  return (
    <Wrap>
      <Banner url={user?.banner_url} isFetching={getUserProfileByUidResult.isFetching}>
        {
          user?.uid === profile?.uid && (
          <UploadBannerImgBtnContainer>
            <p>封面相片</p>
            <input ref={bannerInputRef} type="file" onChange={uploadBannerImg} />
          </UploadBannerImgBtnContainer>
          )
        }
        { /* this <img> is a helper, because "background-image" did not fire a "onerror" event */ }
        <img
          className="use-onerror-img"
          src={profile.banner_url}
          alt="banner"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            setUser((prev) => ({
              ...prev,
              banner_url: '',
            }));
          }}
        />
      </Banner>
      <Header>
        <PhotoSection>
          <PhotoContainer>
            {profile?.uid === user?.uid
             && <input ref={avatarInputRef} type="file" onChange={uploadAvatarImg} />}
            {
              getUserProfileByUidResult.isFetching
                ? <Skeleton width={150} height={150} borderRadius={50} />
                : (
                  <img
                    src={user?.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
                    alt={user?.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`;
                    }}
                  />
                )
             }
          </PhotoContainer>
        </PhotoSection>
        <HeaderMain>
          <HeaderTextSection>
            {getUserProfileByUidResult.isFetching
              ? <Skeleton width={150} height={40} borderRadius={8} />
              : <Title>{user?.nickname || user?.name}</Title>}
          </HeaderTextSection>
          {
            profile.uid && (paramUid !== profile.uid) && (
            <HeaderBtn type="button" anime>
              <span className="material-icons-round">question_answer</span>
              傳送訊息
            </HeaderBtn>
            )
          }
        </HeaderMain>
      </Header>
      <Navbar links={navLinks} />
      <Outlet context={{
        imgs, refreshImages, getImagesResult,
      }}
      />
    </Wrap>
  );
};

export default User;
