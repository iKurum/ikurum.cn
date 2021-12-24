import React, { useState } from 'react';
import Md from '@/components/markdown/md';
import css from '@/style/page/tools/format.module.css';
import Other from '../other';

const MdTs: React.FC<any> = Md as any;

export default function Format(props: any) {
  let [text, setText] = useState<string>("");

  return <div className={css.page}>
    <Other h1={props?.name.split('_').join(' ').toUpperCase()} />
    <textarea spellCheck='false' className={css.text} onChange={(e: any) => {
      let t: any;
      try {
        t = JSON.parse(e.target.value);
      } catch (error) {
        t = (error as any)?.message;
      }
      setText(JSON.stringify(t, null, 4));
    }} />
    {text && <MdTs data={"```json\r\n" + text} />}
  </div>
};
