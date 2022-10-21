import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Quill } from 'quill';

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

  useEffect(() => {
    quill.current?.focus();
  }, [isPublishShow]);

  return (
    <PublishPanelEditor show={isPublishShow}>
      <ReactQuill ref={reactQuillRef} theme="bubble" placeholder="填寫你想發佈的內容..." value={value} onChange={setValue} />
    </PublishPanelEditor>
  );
};

export default QuillEditor;
