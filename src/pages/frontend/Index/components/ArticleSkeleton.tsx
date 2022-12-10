import React from 'react';
import {
  ArticleCard, ArticleHeader, MoreBtnContainer, CommentList, ArticleContent, ArticleFooter,
  CommentListContainer, InputSection,
} from 'components/StyleComponents';
import Skeleton from 'react-loading-skeleton';

const ArticleSkeleton: React.FC = () => (
  <li>
    <ArticleCard>
      <ArticleHeader>
        <Skeleton className="photo-skeleton" width={55} height={55} circle />
        <div>
          <Skeleton width={80} />
          <Skeleton width={120} />
        </div>
        <MoreBtnContainer>
          <Skeleton width={30} height={16} />
        </MoreBtnContainer>
      </ArticleHeader>
      <ArticleContent>
        <Skeleton width="50%" height={16} />
        <Skeleton width="80%" height={16} />
        <Skeleton width="70%" height={16} />
        <Skeleton width="60%" height={16} count={2} />
        <Skeleton width="30%" height={16} />
      </ArticleContent>
      <ArticleFooter>
        <Skeleton className="footer-btn" width={40} height={40} count={3} borderRadius={8} inline />
      </ArticleFooter>
      <CommentListContainer>
        <CommentList>
          <Skeleton className="photo-skeleton" width={30} height={30} circle inline />
          <Skeleton className="comment-skeleton" width="30%" height={80} borderRadius={8} inline />
          <br />
          <Skeleton className="photo-skeleton" width={30} height={30} circle inline />
          <Skeleton className="comment-skeleton" width="30%" height={80} borderRadius={8} inline />
          <br />
          <Skeleton className="photo-skeleton" width={30} height={30} circle inline />
          <Skeleton className="comment-skeleton" width="30%" height={80} borderRadius={8} inline />
        </CommentList>
      </CommentListContainer>
      <InputSection>
        <Skeleton className="photo-skeleton" width={30} height={30} circle inline />
        <div className="input-skeleton">
          <Skeleton width="100%" height={25} borderRadius={5} />
        </div>
        <Skeleton width={50} height={25} borderRadius={5} />
      </InputSection>
    </ArticleCard>
  </li>
);

export default ArticleSkeleton;
