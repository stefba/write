import React from 'react';

import { TextList } from '../text';
import { SectionProps } from '../../helper';
import useWriteStates from 'state';

function Texts({texts}: SectionProps) {
    const { deleteText, saveText } = useWriteStates();
    return <TextList texts={texts} saveFn={saveText} delFn={deleteText} />
}

export default Texts;
