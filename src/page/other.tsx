import Md from '@/components/md';
import React, { useEffect, useState } from 'react';
import css from '@/style/page/other.module.css';
import { useParams } from 'react-router';

const MdTs: React.FC<any> = Md as any;

const mdV2 = "- 定期分享`vmess`\r\n- [私人服务器状态](https://v2ray.ikurum.cn?_blank)\r\n- [Project V官方网站](https://www.v2ray.com?_blank)，不能访问则需要魔法";
const mdKMS = "## 激活说明\r\n  - KMS 激活有 180 天期限\r\n  - 默认情况下，系统每 7 天自动进行一次激活续订尝试；在续订客户端激活之后，激活有效间隔重新开始\r\n  - 只要不超过 180 天以上无法连接互联网，系统会自行续期保持激活状态\r\n\r\n## windows\r\n  - 各版本windows的[安装程序密钥(GVLK)](https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys?_blank)\r\n  - 管理员运行`cmd`\r\n```cmd\r\n> slmgr -skms kms.ikurum.cn\r\n> slmgr -ipk 版本对应秘钥（可选，第3步报错时再执行此步骤）\r\n> slmgr -ato\r\n  ```\r\n\r\n## microsoft office\r\n  - office2019和0ffice2016的[通用批量许可证密钥(GVLK)](https://docs.microsoft.com/zh-cn/deployoffice/vlactivation/gvlks?_blank)\r\n  - 进入安装目录\r\n```cmd\r\n> cd \"C:\\Program Files (x86)\\Microsoft Office\\Office16\"\r\n  ```\r\n\r\n  - 32 位默认一般为`C:\\Program Files (x86)\\Microsoft Office\\Office16`\r\n  - 64 位默认一般为`C:\\Program Files\\Microsoft Office\\Office16`\r\n    ```cmd\r\n    Office16 是 Office 2016 / Office 2019\r\n    Office15 是 Office 2013\r\n    Office14 是 Office 2010\r\n    ```\r\n  - 打开以上所说的目录，应该有个`OSPP.VBS` 文件\r\n  - 注册KMS服务\r\n\r\n```cmd\r\n> cscript ospp.vbs /sethst:kms.ikurum.cn\r\n  ```\r\n  - 激活 Office\r\n```cmd\r\n> cscript ospp.vbs /act\r\n  ```"

interface props {
  md: string | null
  h1: string | null
}
export default function Other(props: props) {
  let [md, setMd] = useState<String>('');
  let [h, setH] = useState<String>('');
  let { name } = useParams<any>();

  useEffect(() => {
    let h: string | null, m: string | null;
    if (props?.md) {
      h = props?.h1;
      m = props?.md;
    } else {
      h = name === 'kms' ? 'kms.ikurum.cn' : name === 'v2ray' ? '暂无端口开放' : '';
      m = name === 'kms' ? mdKMS : name === 'v2ray' ? mdV2 : '';
    }

    setH(h || '')
    setMd(m || '')
  }, [props, name]);

  return <div className={css.page}>
    <h1>{h}</h1>
    {!!md ? <div>
      <MdTs data={md} islist={false} />
    </div> : null}
  </div>
};