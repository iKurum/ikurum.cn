import React from "react";
import { md } from './markdownIt';

export default function Md(props) {
  return <div style={{
    width: '100%',
    overflowX: 'auto',
    backgroundColor: 'rgba(255, 255, 255, .9)',
  }}>
    <div id='wirte' dangerouslySetInnerHTML={{ __html: md.render(props?.data) }} />
  </div>;
};