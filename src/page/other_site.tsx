import methods from '@/common/methosd';
import { useQuery } from '@/route/getSearch';
import React, { useEffect } from 'react';

function OtherSite() {
  let url = useQuery('target');

  useEffect(() => {
      methods.openModal(
        {
          title: '跳转提示',
          style: {
            width: 400
          },
          okText: '马上跳转'
        },
        <>
          <p>页面即将跳转至</p>
          <p>{url}</p>
          <br />
          <p>是否确认跳转？</p>
        </>,
        () => window.location.href = url,
        () => {
          window.opener = null;
          window.close();
        }
      )
  }, []);

  return url ? <></> : null;
};

export default OtherSite;