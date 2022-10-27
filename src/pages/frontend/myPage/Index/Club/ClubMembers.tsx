import styled from '@emotion/styled';
import Card from 'components/Card';
import React from 'react';
import Search from 'components/Search';
import UserCard from 'components/UserCard';

const MemberListCard = styled(Card)<IThemeProps>`
  .title {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    font-weight: 700;
    margin-right: 5px;
  }
  .members-qty {
    margin: 0 5px;
  }
`;

const MemberListCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const MemberSubTitle = styled.h3`

`;

const MemberList = styled.ul<IThemeProps>`
  list-style: none;
`;

// eslint-disable-next-line arrow-body-style
const ClubMembers: React.FC = () => {
  return (
    <MemberListCard>
      <MemberListCardHeader>
        <h2 className="title">成員</h2> ．
        <p className="members-qty">30</p>
        <p>位</p>
      </MemberListCardHeader>
      <Search placeholder="搜尋社團成員" />
      <MemberSubTitle>管理員</MemberSubTitle>
      <MemberList>
        <UserCard />
      </MemberList>
      <MemberSubTitle>成員</MemberSubTitle>
      <MemberList>
        {
            new Array(10).fill(null).map((item, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <UserCard key={idx} />
            ))
          }

      </MemberList>
    </MemberListCard>
  );
};

export default ClubMembers;
