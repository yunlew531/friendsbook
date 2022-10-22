import React from 'react';
import styled from '@emotion/styled';
import { MoreBtn } from 'components/Btn';
import CardTitle from 'components/CardTitle';

const StoriesHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const StoriesTitle = styled(CardTitle)<IThemeProps>`
  margin-right: auto;
`;

const StoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  list-style: none;
  margin-bottom: 35px;
`;

const Story = styled.li<IThemeProps & { imgUrl: string }>`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 210px;
  border-radius: 8px;
  background: url(${({ imgUrl }) => imgUrl}) center no-repeat;
  background-size: cover;
`;

const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StoryUserPhotoContainer = styled.div<IThemeProps>`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.white_100};
  border: 2px solid ${({ theme }) => theme.color.primary};
  padding: 1px;
  margin-bottom: 5px;
`;

const StoryUserPhoto = styled.img`
  border-radius: 100%;
  width: 100%;
  height: 100%;
`;

const StoryAuthor = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.white_100};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;

// eslint-disable-next-line arrow-body-style
const Stories: React.FC = () => {
  return (
    <>
      <StoriesHeader>
        <StoriesTitle>限時動態</StoriesTitle>
        <MoreBtn type="button" anime>
          <span className="material-icons-outlined more-horiz-icon">more_horiz</span>
        </MoreBtn>
      </StoriesHeader>
      <StoryList>
        {
        new Array(3).fill(null).map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Story key={idx} imgUrl="https://images.unsplash.com/photo-1666195379088-29435b89bdf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
            <StoryContent>
              <StoryUserPhotoContainer>
                <StoryUserPhoto src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
              </StoryUserPhotoContainer>
              <StoryAuthor>Tom Tom</StoryAuthor>
            </StoryContent>
          </Story>
        ))
}
      </StoryList>
    </>
  );
};

export default Stories;
