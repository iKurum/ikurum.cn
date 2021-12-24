## 激活说明
- KMS 激活有 180 天期限
- 默认情况下，系统每 7 天自动进行一次激活续订尝试；在续订客户端激活之后，激活有效间隔重新开始
- 只要不超过 180 天以上无法连接互联网，系统会自行续期保持激活状态

## windows
- 各版本windows的[安装程序密钥 (GVLK)](https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys?_blank)
- 管理员运行`cmd`   
  ```cmd
  > slmgr -skms kms.ikurum.cn
  > slmgr -ipk 版本对应秘钥（可选，第3步报错时再执行此步骤）
  > slmgr -ato
  ```

## microsoft office
- office2019和0ffice2016的[通用批量许可证密钥 (GVLK)](https://docs.microsoft.com/zh-cn/deployoffice/vlactivation/gvlks?_blank)
- 进入安装目录
  ```cmd
  > cd "C:\Program Files (x86)\Microsoft Office\Office16"
  ```

  - 32 位默认一般为 `C:\Program Files (x86)\Microsoft Office\Office16`
  - 64 位默认一般为 `C:\Program Files\Microsoft Office\Office16`
    ```cmd
    Office16 是 Office 2016 / Office 2019
    Office15 是 Office 2013
    Office14 是 Office 2010
    ```
  - 打开以上所说的目录，应该有个 `OSPP.VBS` 文件
- 注册KMS服务
  ```cmd
  > cscript ospp.vbs /sethst:kms.ikurum.cn
  ```
- 激活 Office
  ```cmd
  > cscript ospp.vbs /act
  ```