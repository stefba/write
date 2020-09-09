import React, { useContext} from 'react';

import { WriteContext } from "../write";
import { TextList } from "../components/text";

const Queue = () => {
  const { writes, deletes, saveText, delWrite, revertDelete } = useContext(WriteContext);
  return (
    <section>
      { writes.length > 0 && "Writes:"}
      <TextList texts={writes} saveFn={saveText} delFn={delWrite} />
      { deletes.length > 0 && "Deletes:"}
      <TextList texts={deletes} saveFn={saveText} delFn={revertDelete} />
    </section>
  )
}

export default Queue
