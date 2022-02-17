import { useState } from 'react';
import css from 'style/components/spin.module.css';

/**
 * 遮罩层组件
 * 调用methods中的 openSpin和closeSpin来调用
 */
let o: any, c: any;
export const SpinComponent = () => {
  const [show, setShow] = useState(false);

  o = function () {
    setShow(true);
  };

  c = function () {
    setShow(false);
  };

  return <div className={css.page} style={{ display: show ? '' : 'none' }}>
    <div className={css.warp} />
    <div className={css.loading}>
      <div>
        <div className={css.loading_f}>
          <div className={[css.loading_cir, css.loading_cir1].join(' ')}></div>
          <div className={[css.loading_cir, css.loading_cir2].join(' ')}></div>
          <div className={[css.loading_cir, css.loading_cir3].join(' ')}></div>
          <div className={[css.loading_cir, css.loading_cir4].join(' ')}></div>
          <div className={[css.loading_cir, css.loading_cir3].join(' ')}></div>
          <div className={[css.loading_cir, css.loading_cir2].join(' ')}></div>
          <div className={[css.loading_cir, css.loading_cir1].join(' ')}></div>
        </div>
      </div>
    </div>
  </div>;
};

export function oSpin() {
  if (o) o();
};

export function cSpin() {
  if (c) c();
};
