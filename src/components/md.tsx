import { markdIt } from "common/markdown";
import React from "react";

export const Mdiv: React.FC<{ data: string }> = ({ data }) => {
  return <div style={{
    width: '100%',
    overflowX: 'auto',
    backgroundColor: 'rgba(255, 255, 255, .9)',
  }}>
    <div
      id='write'
      dangerouslySetInnerHTML={{ __html: markdIt.render(data) }}
    />
  </div>;
};