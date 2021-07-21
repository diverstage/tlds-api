# TLDs API
トップレベルドメインをJSONとして返すだけのシンプルなAPIです。
`Github Actions` で週次にリストを取得し更新を行います。
当APIは `Github Pages` を利用しJSONをGetで取得できるものにはなっておりますが、ドメインやシステムに制約がある場合はCloneした上で別CIにて `AWS Cloudfront` 等をご利用いただければと思います。

## API V1
### 通常版
GET https://diverstage.github.io/tlds-api/v1/index.json
### Minify版
GET https://diverstage.github.io/tlds-api/v1/index.min.json

## 利用方法
### javascript fetch の場合
```
fetch('https://diverstage.github.io/tlds-api/v1/index.min.json')
  .then(response => response.json())
  .then(tlds => console.log(tlds.data));
```

## サンプル
https://diverstage.github.io/tlds-api/