import methods from '@common/methosd';
import React, { useEffect, useRef, useState } from 'react';
import css from '@style/components/selection.module.css';

export const Selection = () => {
  let [txt, setTxt] = useState(false);
  let selectDiv = useRef<HTMLDivElement>(null);
  let txtRef = useRef('');

  interface selectList {
    text: string;
    method: (text: string | undefined) => any;
  }

  const list: selectList[] = [{
    text: 'Baidu', method: (text: string | undefined) => {
      methods.openPage(`https://www.baidu.com/s?wd=${text}`);
    }
  }, {
    text: 'Google', method: (text: string | undefined) => {
      methods.openPage(`https://www.google.com/search?q=${text}`);
    }
  }, {
    text: '复制', method: (text: string | undefined) => { methods.copy(text) }
  }];

  const mup: (e: any) => void = e => {
    document.getSelection()?.removeAllRanges();

    document.body.onmouseup = (event) => {
      event = event || Event;
      const [disx, disy] = [event.pageX, event.pageY];

      if (!!e.target && !!e.target.getAttribute('data-selectiondom')) {
        return
      }

      if (!!txtRef.current) {
        txtRef.current = '';
        setTxt(false);
      }

      if (document.getSelection()?.toString()) {
        // const range: Range | undefined = document.getSelection()?.getRangeAt(0);
        // const rect: DOMRect | undefined = range?.getBoundingClientRect();
        if (selectDiv.current) {
          selectDiv.current.style.left = (disx - 27) + 'px';
          selectDiv.current.style.top = disy < 100 ? (disy + 10) + 'px' : (disy - 100) + 'px';

          txtRef.current = document.getSelection()?.toString() || '';
          setTxt(true);
        }
      } else {
        txtRef.current = '';
        setTxt(false);
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', mup, false);

    return () => {
      document.body.removeEventListener('mousedown', mup, false);
    };
  }, []);

  return <div className={css.page} ref={selectDiv} style={{
    display: !!txt ? 'flex' : 'none',
  }}>
    {!!txt ? list.map((v: selectList, i: number) => <p
      key={i}
      data-selectiondom={v.text}
      onClick={() => {
        v.method(txtRef.current);

        txtRef.current = '';
        setTxt(false);
      }}>{v.text}</p>) : null}
  </div>;
}