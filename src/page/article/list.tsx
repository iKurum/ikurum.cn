import methods from "common/methosd";
import { useCallback, useEffect, useRef, useState, useContext } from "react"
import { Link, Routes, Route, useParams } from "react-router-dom";
import port from "@/axios/service";
import { Mdiv } from "components/md";
import Detail from "./detail";
import css from 'style/page/article/list.module.css';
import { TopContext } from "components/createContext";
import { Top } from "components/top";

function List() {
  let [article, setArticle] = useState<any>(null);
  let [more, setMore] = useState(false);
  let list = useRef<any>([]);
  let page = useRef(1);
  let { archive } = useParams<any>();
  let goTop = useContext(TopContext);
  let menu = [
    { id: 3, title: '刷新', icon: 'icon-jiazai_shuaxin', cb: () => window.location.reload() },
    { id: 2, title: '返回首页', icon: 'icon-fanhui4', cb: () => methods.goPage('/') },
    { id: 1, title: '回到顶部', icon: 'icon-dingbu', cb: goTop },
  ];

  const getArticle = useCallback((more = false) => {
    port.fetch('articleList', {
      archive: archive || null,
      page: more ? ++page.current : page.current,
      size: 5
    }).then((res: any) => {
      if (res?.data) {
        res.data = res.data.map((item: any) => ({
          ...item,
          image: methods.getRandomIntInclusive(1, 320),
        }));

        if (more) {
          list.current = [...list.current, ...res?.data];
        } else {
          list.current = [...res?.data];
        }

        setArticle(Object.assign([], list.current));
        setMore(res?.more);
      }
    });
  }, [archive]);

  useEffect(() => { getArticle() }, [getArticle]);

  return article ? <div className={css.page}>
    <ul className={css.pul}>
      {archive ? <li style={{
        backgroundImage: 'none',
        boxShadow: 'none',
      }}>
        <div className={css.blm}>
          <button>
            <a onClick={() => window.history.back()}>返回详情</a>
          </button>
          <button>
            <Link to='/article'>返回列表</Link>
          </button>
        </div>
      </li> : null}
      {article.map((v: any, i: number) => <li key={i}>
        <Link to={`/article/${v.id}/${v.title}`}>
          <div className={css.flex}>
            <div>
              <p className={['col666', css.title].join(' ')}>{v.title}</p>
              <p className={['col999', css.tip].join(' ')}>
                <span>发布时间: {methods.formatDateTime(v.addTime, 'yyyy-MM-dd')}</span>
                <span>{methods.getSize(v.size || 0)}</span>
              </p>
              {v.archive ? <p className={['col999', css.tip].join(' ')}>
                <span>标签: </span>
                <span>{v.archive.split(',').map((item: string) => <span key={item}>{item}</span>)}</span>
              </p> : null}
              <div>
                <Mdiv data={v?.note} />
              </div>
            </div>
            <div style={{
              backgroundImage: `url("${methods.getImgUrl(v.image)}")`,
            }}>
            </div>
          </div>
        </Link>
      </li>)}
    </ul>
    {more ? <div className={css.btn}>
      <button onClick={() => { getArticle(more) }}>下一页</button>
    </div> : null}
    <Top menu={menu} />
  </div> : null;
};

export default function Article() {
  return <Routes>
    <Route path='/' element={<List />} />
    <Route path='/archive/:archive' element={<List />} />
    <Route path='/:id/:name' element={<Detail />} />
  </Routes>;
};