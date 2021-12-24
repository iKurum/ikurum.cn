import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router";
import port from "@/axios/service";
import css from '@/style/page/article/detail.module.css';
import Md from "@/components/md";
import methods from "@/common/methosd";
import { Link } from "react-router-dom";
import { Top } from "@/components/top";
import { TopContext } from "@/components/createContext";

const MdTs: React.FC<any> = Md as any;

export default function Detail() {
  let [detail, setDetail] = useState<any>(null);
  let detailRef = useRef<HTMLDivElement | null>(null);
  let { id } = useParams<any>();
  let goTop = useContext(TopContext);
  let menu = [
    { id: 4, title: '刷新', icon: 'icon-jiazai_shuaxin', cb: () => window.location.reload() },
    { id: 3, title: '返回首页', icon: 'icon-fanhui4', cb: () => methods.goPage('/') },
    { id: 2, title: '返回列表', icon: 'icon-fanhui3', cb: () => methods.goPage('/article') },
    { id: 1, title: '回到顶部', icon: 'icon-dingbu', cb: goTop },
  ];

  useEffect(() => {
    if (id) {
      port.fetch('detail', { id: id }).then((res: any) => {
        setDetail(res?.data);
      });
    }
  }, [id]);

  return detail ? <div className={css.page} ref={detailRef}>
    <div className={css.blm}>
      <button>
        {detail.previous ?
          <Link to={`/article/${detail.previous}/${detail.previousTitle}`}>
            上一篇：{detail.previousTitle}
          </Link>
          : '没有更多数据'}
      </button>
      <button>
        {detail.next ?
          <Link to={`/article/${detail.next}/${detail.nextTitle}`}>
            下一篇：{detail.nextTitle}
          </Link>
          : '没有更多数据'}
      </button>
    </div>
    <div className={css.cont}>
      <h1>{detail.title}</h1>
      <div className={css.arc_box}>
        {detail.archive ? <p className={css.archive}>
          标签：
          {detail.archive.split(',').map((item: string) => <span key={item}>
            <Link to={`/article/archive/${item}`}>{item}</Link>
          </span>)}
        </p> : null}
        <p>最后更新时间：{methods.formatDateTime(detail.upTime, 'yyyy-MM-dd HH:mm')}</p>
      </div>
      <MdTs data={detail?.content} />
    </div>
    <Top menu={menu} />
  </div> : null;
};