import { useState } from "react";
import css from "style/components/top.module.css";

interface props {
  menu: Array<any>
}

export function Top(props: props) {
  let [active, setActive] = useState(false);

  return props.menu && <div className={css.page} onClick={() => setActive(!active)}>
    <svg className={['icon', active ? css.icon_a : css.icon].join(' ')} aria-hidden='true' >
      <use href='#icon-cuowu'></use>
    </svg>
    <ul>
      {props.menu.map((item: any) => <li
        key={item.title}
        className={[css.li, active ? css.li_a : css.li_n].join(' ')}
        style={{
          transition: `all 1s ease ${(item.id - 1).div(10)}s`,
        }}
      >
        <div className={css.icon_li} onClick={() => item.cb && item.cb()}>
          <span>{item.title}</span>
          <svg className={['icon', css.li_i].join(' ')} aria-hidden='true' >
            <use href={`#${item.icon || 'icon-cuowu'}`}></use>
          </svg>
        </div>
      </li>)}
    </ul>
  </div>
}