# assets

利用するファイルを配置する  

## 環境設定ファイル(setting.json)

TODO: (リリース時作業)環境に応じて切り替える  
リリース先の環境に応じた設定の記述で`setting.json`の内容を上書きすること。  
デフォルトではローカル開発環境用の設定を記述している

## 各環境別の設定ファイルと内容について

ディレクトリ`setting`下に各環境別の設定内容を記述したjsonファイルを配置している。  

```shell-session
setting_local.json : ローカル開発環境用
```
  
各値の内容に対する説明は以下である  
`API_SERVER_URL`: APIサーバのアクセス先  
`LOCAL_MODE`: trueでローカル実験用の挙動、falseで外部サーバー利用する挙動  
`DUMMY_USER_ID`: ダミーユーザー名を設定

## ソースコード上での環境設定ファイルの活用方法

`.vue`ソースコードで以下のように記述し、利用することができる

```vue
<script>
import settings from '../assets/setting.json'
</script>
```

dataに定義後は、vueの各プロパティ内のロジックで以下のように設定値を参照できる

```vue
settings.API_SERVER_URL
settings.LOCAL_MODE
settings.DUMMY_USER_ID
```
