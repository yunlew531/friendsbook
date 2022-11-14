import { DeltaOperation } from 'quill';
import { Quill } from 'react-quill';

export const trimDeltaOps = (deltaOps: DeltaOperation[]) => {
  const lastOpIdx = deltaOps.length - 1;
  const trimDeltaOpsTemp = deltaOps?.reduce((prev, op, idx) => {
    if (idx === lastOpIdx && typeof op.insert === 'string') {
      const insertSplitArr = op.insert.split('').reverse();
      const lastNewLineSignIdx = insertSplitArr.findIndex((opSplit: string) => opSplit !== '\n');
      insertSplitArr.splice(0, lastNewLineSignIdx);
      const trimInsert = insertSplitArr.reverse().join('');
      prev.push({ insert: trimInsert });
    } else prev.push(op);

    return prev;
  }, [] as DeltaOperation[]);

  return trimDeltaOpsTemp;
};

export default (deltaOps: DeltaOperation[]) => {
  const container = document.createElement('div');
  if (deltaOps) {
    const trimDeltaOpsTemp = trimDeltaOps(deltaOps);
    const quill = new Quill(container, { readOnly: true });
    const delta = quill.getContents();

    delta.ops = trimDeltaOpsTemp;
    quill.setContents(delta);
  }
  return container;
};
