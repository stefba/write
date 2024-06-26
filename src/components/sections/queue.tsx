import React from 'react';
import { TextList } from '../text';

import { ModFuncs } from '../../helper';
import Text from '../../funcs/text';

type QueueProps = {
    writes: Text[];
    deletes: Text[];
    modFuncs: ModFuncs;
}

function Queue({writes, deletes, modFuncs}: QueueProps) {
    return (
        <section>
        { writes.length > 0 && "Writes:"}
        <TextList texts={writes} saveFn={modFuncs.saveText} delFn={modFuncs.delWrite} />
        { deletes.length > 0 && "Deletes:"}
        <TextList texts={deletes} saveFn={modFuncs.saveText} delFn={modFuncs.revertDelete} />
        </section>
    )
}

export default Queue
