import { create } from 'zustand'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { WriteStates, readWriteStates, storeWriteStates } from 'funcs/storage'
import Text from 'funcs/text'
import { trimList, updateList } from 'funcs/list'

interface WriteStore {
    states: WriteStates;
    readState: () => void;
    setStates: (key: string, list: Text[]) => void;
    setEntry: (key: string, t: Text) => void;
    removeEntry: (key: string, t: Text) => void;
    saveText: (t: Text) => void;
    deleteText: (t: Text) => void;
    revertDelete: (t: Text) => void;
    delWrite: (t: Text) => void;
}

const useWriteStates = create<WriteStore>()(
      (set, get) => ({
        states: readWriteStates(),
        readState: () => {
          set({states: readWriteStates()});
        },
        setStates: (key, list) => {
            let newStates = get().states;
            newStates[key] = list;
            set({ states: newStates })
            storeWriteStates(newStates)
        },
        setEntry: (key, t) => {
          console.log(key)
            let st = get().states;
            console.log(st)
            console.log(st.key)
            get().setStates(key, updateList(get().states[key].slice(), t))
        },
        removeEntry: (key, t) => {
            get().setStates(key, trimList(get().states[key].slice(), t))
        },
        saveText: (t) => {
            get().setEntry("texts", t)
            get().setEntry("writes", t)
        },
        deleteText: (t) => {
            get().removeEntry("texts", t);
            get().removeEntry("writes", t);
            get().setEntry("deletes", t);
        },
        revertDelete: (t) => {
            get().setEntry("texts", t)
            get().setEntry("writes", t)
            get().removeEntry("deletes", t)
        },
        delWrite: (t) => {
            get().removeEntry("writes", t)
        }
      }),
)

export default useWriteStates;
