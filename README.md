# vue-cli-web-template

Vue CLI利用webアプリケーションテンプレート  
マルチページアプリケーションに対応

## node.jsのインストール

公式からインストーラをダウンロードしインストール  
コマンドプロンプトとPowershellにてnpmコマンドが使えるようになる  

2023/01作業時点では以下のバージョンを使用  
`node-v18.13.0-x64.msi`

## vue-cliのインストール

スタートメニューからNode.js command promptを起動  
インストールを行う

```shell-session
$npm install -g @vue/cli
$npm install -g @vue/cli-service-global
```

## 必要なライブラリのインストール

必要なライブラリをインストールする

```shell-session
$cd プロジェクトの階層(sinpan-sien-web-vue-cli)
$npm ci
```

実行すると、自動生成される`node_modules`ディレクトリに  
package-lock.json参照して各ライブラリのファイルがインストールされる。  

(参考)ライブラリのインストール状況  
`\README-about-node_modules.md`  
開発中に新たなライブラリをインストールした場合は上記手順書を更新すること。  

## Vueプロジェクトのルートディレクトリ以外でファイルを作ってもエラーが起きないようにする

vs-codeの`setting.json`に以下記述を追加

```Json
"eslint.workingDirectories": [
    {"mode": "auto"}
],
```

## vue-cliのプロジェクトの実行方法(ローカル)

vs-codeのターミナルにCommand Promptを表示し、そこで実行すると便利です。

```shell-session
$cd プロジェクトの階層(sinpan-sien-web-vue-cli)
$npm run serve
```

実行するとローカルサーバーが起動し、表示されているアドレスでweb資材が利用可能となる

```shell-session
App running at:
- Local:   http://localhost:8080/
- Network: http://192.168.0.14:8080/
```

停止したい場合は`Ctrl + C`

### Compiles and minifies for production

```shell-session
$npm run build
```

実行後、`\dist`に成果物が生成される

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
