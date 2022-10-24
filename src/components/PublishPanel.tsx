import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Quill } from 'quill';
import Card from 'components/Card';

const PublishPanelHeader = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: ${({ theme }) => theme.color.gray_500};
  }
  .expand-less-icon, .expand-more-icon, p {
    cursor: default;
  }
`;

const PublicPanelFooter = styled.div<{ show:boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: end;
`;

const PublishBtn = styled.button<IThemeProps>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.gray_200};
  border-radius: 5px;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.s};
  background-color: ${({ theme }) => theme.color.secondary};
  transition: filter .2s ease-in-out, transform .2s ease-in-out;
  padding: 5px 15px;
  .send-icon {
    margin-left: 5px;
    font-size: ${({ theme }) => theme.fontSizes.fs_4};
  }
  &:hover {
    filter: brightness(0.97);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const PublishPanelEditor = styled.div<IThemeProps & { show: boolean }>`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray_200};
  margin: ${({ show }) => (show ? '10px 0' : '0')};
  .ql-editor{
    opacity: ${({ show }) => (show ? '1' : '0')};
    transition: height .2s cubic-bezier(0,1.02,.93,.8);
    height: ${({ show }) => (show ? '200px' : '0px')};
    padding: ${({ show }) => (show ? '15px' : '0')};
  }
  .ql-editor {
  }
`;

const PublishPanel: React.FC = () => {
  const [value, setValue] = useState('');
  const reactQuillRef = useRef(null);
  const quill = useRef<Quill>();
  const [isPublishShow, setIsPublishShow] = useState(false);

  useEffect(() => {
    quill.current = (reactQuillRef.current as unknown as ReactQuill).getEditor();
  }, []);

  useEffect(() => {
    quill.current?.focus();
  }, [isPublishShow]);

  return (
    <Card>
      <PublishPanelHeader onClick={() => setIsPublishShow(!isPublishShow)}>
        <div />
        <p>Tom , 你想發佈些什麼 ?</p>
        {isPublishShow ? <span className="material-icons-outlined expand-less-icon">expand_less</span>
          : <span className="material-icons-outlined expand-more-icon">expand_more</span>}
      </PublishPanelHeader>
      <PublishPanelEditor show={isPublishShow}>
        <ReactQuill ref={reactQuillRef} theme="bubble" placeholder="填寫你想發佈的內容..." value={value} onChange={setValue} />
      </PublishPanelEditor>
      <PublicPanelFooter show={isPublishShow}>
        <PublishBtn type="button">發佈
          <span className="material-icons-outlined send-icon">send</span>
        </PublishBtn>
      </PublicPanelFooter>
    </Card>
  );
};

export default PublishPanel;
