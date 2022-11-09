import React from 'react';
import PublishPanel from 'components/PublishPanel';
import Articles from 'pages/frontend/MyPage/components/Articles';

// eslint-disable-next-line arrow-body-style
const ClubIndex: React.FC = () => {
  return (
    <>
      <PublishPanel onPublished={() => {}} />
      <Articles />
    </>
  );
};

export default ClubIndex;
