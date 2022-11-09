import { DeltaOperation } from 'quill';
import { Quill } from 'react-quill';

export default (deltaOps: DeltaOperation[]) => {
  if (!deltaOps) return null;
  const container = document.createElement('div');
  const quill = new Quill(container, { readOnly: true });
  const delta = quill.getContents();
  delta.ops = deltaOps;
  quill.setContents(delta);
  return container;
};
