import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import React, { useEffect, useState } from "react";
import { marked } from 'marked';
import hljs from "highlight.js";

marked.setOptions({
  renderer: new marked.Renderer(),
  // `highlight` example uses https://highlightjs.org
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  gfm: true, // 允许 GitHub标准的markdown.
  pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
  breaks: false, // 允许回车换行（该选项要求 gfm 为true）
  smartLists: true, // 使用比原生markdown更时髦的列表
  smartypants: false, // 使用更为时髦的标点
});

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={prism}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        showLineNumbers={true}
        startingLineNumber={1}
        {...props}
      />
    ) : (
      <code className='hcode' {...props}>{children}</code>
    )
  }
};

export default function Md(props) {
  let [detail, setDetail] = useState(null);
  let [islist, setIsList] = useState(false);

  useEffect(() => {
    setDetail(props?.data);
    setIsList(!!props.islist);
  }, [props]);

  useEffect(() => {
    if (detail) {
      let aTagArr = [].slice.apply(document.getElementsByTagName("a"));

      aTagArr.forEach(e => {
        if (e.href.indexOf("_blank") > -1) {
          e.setAttribute('href', e.href.replace(/\?_blank/, ''));
          e.setAttribute('target', '_blank');
        }
      });
    }
  }, [detail]);

  return detail ? <div style={{
    width: '100%',
    overflowX: 'auto',
    backgroundColor: 'rgba(255, 255, 255, .9)',
  }}>
    <div className="show-html" dangerouslySetInnerHTML={{ __html: marked.parse(detail) }} />
    {/* <ReactMarkdown
      components={components}
      style={islist ? coy : prism}
      children={detail}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[gfm]}
    /> */}
  </div> : null;
};