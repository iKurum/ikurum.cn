import methods from "common/methosd";
import { useState } from "react";
import css from 'style/components/modal.module.css';

let o: null | Function = null, c: null | Function = null;
export function Modal() {
  let [obj, setObj] = useState<any>({});

  function of(obj: any) {
    setObj(Object.assign({}, obj));
  };
  o = of;

  function cf() {
    setObj(Object.assign({}, {}));
  };
  c = cf;

  function ok() {
    if (obj.onOk) obj.onOk();
    cf();
  };

  function cancel() {
    if (obj.onCancel) obj.onCancel();
    cf();
  }

  return Object.keys(obj)?.length ?
    <div className={css.page} onContextMenu={e => {
      methods.clickNoBobble(e);
      
      e = e || Event;
      e.preventDefault();
    }}>
      <div className={css.content} style={{ ...obj.style }}>

        {obj.title ? <div className={css.header}>{obj.title}</div> : null}

        <div className={css.body} {...obj.bodyStyle}>
          {obj.template}
        </div>

        {obj.footer ? <div className={css.footer}>
          <button onClick={ok}>{obj.okText || '确认'}</button>
          <a onClick={cancel}>{obj.cancelText || '取消'}</a>
        </div> : null}

      </div>
    </div>
    : null;
};

export function open(obj: any) {
  if (o) o(obj);
};

export function close() {
  if (c) c();
};
