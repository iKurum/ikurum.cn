import Other from '@/page/other';
import css from '@style/page/tools/text.module.css';
import React, { useEffect, useRef, useState } from 'react';
import NotFound from '@components/notFound';
import port from '@/axios/service';
import methods from '@common/methosd';

const md = "- 仅支持文字（不包括表格之类）\r\n- 不支持文字分段识别\r\n- 使用文字清晰的图片\r\n- 调用百度云接口\r\n";

export default function OCR_Text(props: any) {
  let [imgURL, setImgURL] = useState<string | null>(null);
  let [data, setData] = useState<any>(null);
  let [dlist, setDlist] = useState<Array<any>>([]);
  let input = useRef<HTMLInputElement | null>(null);
  let im = useRef<Blob | null>(null)

  const fileChange = (e: any) => {
    let file = e?.target?.files ? e.target.files[0] : {};
    if (file.type.indexOf("image") === 0) {
      im.current = file;

      let reader = new FileReader(); //创建FileReader对象实例reader
      reader.readAsDataURL(file); //将图片url转换为base64码
      reader.onload = (e: any) => {
        if (e?.target?.result && e.target.result.indexOf('base64,')) {
          setImgURL(e.target.result)
        }
      }
    }
  };

  useEffect(() => {
    port.ocrList().then((res: any) => setDlist(res?.data || []))
  }, []);

  useEffect(() => {
    if (imgURL && im.current) {
      port.fetch(
        'ocrText',
        { image: im.current },
        { contentType: 2, notClearSpace: true }
      ).then((res: any) => setData(res?.data))
    } else {
      setData(null);
    }
  }, [imgURL]);

  return <div>
    <Other md={md} h1={props?.name.split('_').join(' ').toUpperCase()} />
    <div className={css.page}>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className={css.file}
        value=""
        onChange={fileChange}
      />
      <div className={[css.imgBox, imgURL ? css.del : null].join(' ')}>
        {imgURL ? <div>
          <img src={imgURL} width='500' alt='ocr_img' />
          <div className={css.choosed}>
            <button onClick={() => { setImgURL(null) }}>删除图片</button>
            <button onClick={() => { input.current?.click() }}>重新选择</button>
          </div>
        </div> : <div>
          <NotFound />
          <button className={css.btn} onClick={() => { input.current?.click() }}>上传图片</button>
        </div>}
      </div>
      {imgURL ? <div className={css.detail}>
        <h2>
          <span>译文: </span>
          {data ? <button onClick={() => { methods.copy(data) }}>复制</button> : null}
        </h2>
        <p>{data || 'ORC ...'}</p>
      </div> : null}
    </div>
  </div>
};
