import React, { useState, useEffect, useRef } from 'react';
import { Link }  from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import { makeKey } from "../funcs/date";
import DeleteIcon from '@material-ui/icons/ClearSharp';
import Error from './error';

export const TextList = ({ texts, saveFn, delFn }) => {
  if (!texts || texts.length === 0) {
    return (
      <Error message={<>No <samp>Texts</samp> found.</>} />
    )
  }
  return (
    texts.map((text, i) => (
      <Text key={makeKey(text.id)} text={text} saveFn={saveFn} delFn={delFn} />
    ))
  )
}

const Info = ({ text, delFn }) => {
  return (
    <header className="info">
      <Link className="name" to={"/texts/" + text.id + ".txt"}>{text.id + ".txt"}</Link>
      <button className="mod">{text.mod.toString(16).substr(-6)}</button>
      { delFn && <Del text={text} delFn={delFn} /> }
    </header>
  )
}

export const Text = ({ text, saveFn, delFn, minRows, focus }) => {
  const [body, setBody] = useState(text.body);

  useEffect(() => {
      setBody(text.body)
  }, [text.body]);

  const textRef = useRef(null);

  useEffect(() => {
    if (focus) {
      textRef.current.focus({preventScroll:true});
    }
  }, [focus]);

  const handleTyping = event => {
    setBody(event.target.value);
  }

  const submit = e => {
    if (body === "") {
      return
    }
    /*
    const target = e.target;
    if (target.classList.value !== "mod") {
      return;
    }
    */
    text.mod  = Date.now();
    text.body = body;
    saveFn(text);
  }

  if (!minRows) {
    minRows = 1
  }

  if (minRows > 5) {
    minRows = Math.round(window.screen.height/(2.25*16)) - 6;
  }

  // autoFocus={focus ? true : false}

  return (
    <article className="text">
      <Info text={text} delFn={delFn} />
      <TextareaAutosize
        inputRef={textRef}
        minRows={minRows}
        value={body}
        onChange={handleTyping}
        onBlur={submit}
        />
    </article>
  )
}

const Del = ({ text, delFn }) => {
  const del = () => {
    if (window.confirm("Delete this text?")) {
      delFn(text);
    }
  }
  return <button className="del" onClick={del}><DeleteIcon /></button>
}

