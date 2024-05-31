import React from 'react';
import { TextList } from '../text';

import Text from '../../funcs/text';
import useWriteStates from 'state';

type QueueProps = {
    writes: Text[];
    deletes: Text[];
}

function Queue({writes, deletes}: QueueProps) {
    const { delWrite, saveText, revertDelete } = useWriteStates()
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
