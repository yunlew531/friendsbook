import styled from '@emotion/styled';
import Btn from 'components/Btn';
import React from 'react';

const EventsTitle = styled.h2<IThemeProps>`
  color: ${({ theme }) => theme.color.black_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
  margin-bottom: 15px;
`;

const EventsCard = styled.div`
  /* height: 230px; */
  border-radius: 8px;
  overflow: hidden;
`;

const EventsCardMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 175px;
  background: url(${process.env.PUBLIC_URL}/images/events.jpeg) no-repeat center;
  padding: 20px;
`;

const EventsDesc = styled.p<IThemeProps>`
  font-weight: 700;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.white_100};
`;

const EventsMoreBtn = styled(Btn)<IThemeProps>`
  align-self: flex-end;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white_100};
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 5px 15px;
`;

// eslint-disable-next-line arrow-body-style
const Events: React.FC = () => {
  return (
    <>
      <EventsTitle>活動</EventsTitle>
      <EventsCard>
        <EventsCardMain>
          <EventsDesc>這裡有許多活動，<br />或許可以找到你想參加的活動！</EventsDesc>
          <EventsMoreBtn type="button" anime>了解更多...</EventsMoreBtn>
        </EventsCardMain>
      </EventsCard>
    </>
  );
};

export default Events;
