import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import React, { useEffect, useState } from "react";

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    console.log('match', match);
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
          e.setAttribute('href', `/other_site?target=${e.href.replace(/_blank/, '')}`);
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
    <ReactMarkdown
      components={components}
      style={islist ? coy : prism}
      children={detail}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[gfm]}
    />
  </div> : null;
};