import React, {
  memo, useEffect, useRef, useState,
} from 'react';
import styled from '@emotion/styled';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Quill } from 'quill';

const PublishPanelEditor = styled.div<IThemeProps & { show: boolean }>`
  /* display: ${({ show }) => (show ? 'block' : 'none')}; */
  height: ${({ show }) => (show ? 'auto' : '0px')};
  overflow: hidden;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray_200};
  margin: ${({ show }) => (show ? '10px 0' : '0')};
  transition: .2s cubic-bezier(0,1.02,.93,.8);
  .ql-editor{
    transition: .2s cubic-bezier(0,1.02,.93,.8);
    height: ${({ show }) => (show ? '80px' : '0px')};
  }
`;

interface IQuillEditorProps {
  isPublishShow: boolean;
}

const QuillEditor: React.FC<IQuillEditorProps> = ({ isPublishShow }) => {
  const [value, setValue] = useState('');
  const reactQuillRef = useRef(null);
  const quill = useRef<Quill>();

  useEffect(() => {
    quill.current = (reactQuillRef.current as unknown as ReactQuill).getEditor();
  }, []);

  return (
    <PublishPanelEditor show={isPublishShow}>
      <ReactQuill ref={reactQuillRef} theme="bubble" placeholder="填寫你想發佈的內容..." value={value} onChange={setValue} />
    </PublishPanelEditor>
  );
};

export default memo(QuillEditor);
