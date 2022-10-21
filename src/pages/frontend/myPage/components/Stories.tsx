import styled from '@emotion/styled';
import { MoreBtn } from 'components/Btn';
import React from 'react';

const Wrap = styled.div`
  flex-shrink: 0;
  width: 360px;
`;

const StoriesHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const StoriesTitle = styled.h2<IThemeProps>`
  color: ${({ theme }) => theme.color.black_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
  margin-right: auto;
`;

const StoryList = styled.ul`
  list-style: none;
`;

const Story = styled.li`
  
`;

// eslint-disable-next-line arrow-body-style
const Stories: React.FC = () => {
  return (
    <Wrap>
      <StoriesHeader>
        <StoriesTitle>限時動態</StoriesTitle>
        <MoreBtn type="button" anime>
          <span className="material-icons-outlined more-horiz-icon">more_horiz</span>
        </MoreBtn>
      </StoriesHeader>
      <StoryList>
        <Story>1</Story>
      </StoryList>
    </Wrap>
  );
};

export default Stories;
