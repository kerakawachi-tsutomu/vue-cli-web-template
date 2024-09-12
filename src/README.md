# 新規ページ作成方法

## エントリポイントとなるページ、ルートコンポーネントを作成する

`\pages`下に機能名でディレクトリを作成し、そこに以下2ファイルを配置する

* main.js (エントリポイント)

```JavaScript
import { createApp } from 'vue'
import App from './[機能名].vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App);
app.config.productionTip = false;
app.mount('#main-contents');
```

* [機能名].vue (ルートコンポーネント)

```JavaScript
<template>
  <[機能名] title='[機能名]'/>
</template>

<script>
import top from '../../components/[機能名].vue'

export default {
  name: 'App',
  components: {
    'top': top
  }
}
</script>

<style>
@import '../../css/[外部読み込みしたいcssファイル名]';
</style>
```

## テンプレートファイルの作成

ルートコンポーネントから呼ぶテンプレートファイルを  
`\\[リポジトリのルート]\components`下作成し配置する。

* [機能名].vue (テンプレートファイル)

```JavaScript
<template>
<div id='main-area' class='ms-2 main-area'>
  <!-- 画面の内容 -->
</div>
</template>
<script>
export default {
    // 変数定義
    data() {
      return {
      }
    },
    // カスタムディレクティブをローカルに登録
    // directives: {
    // },
    // インスタンス生成時に実行したい処理を記述
    created() {
    },
    // 算出プロパティ。動的に変化する値のgetterなど記述
    computed: {
    },
    // 監視プロパティ。ほかの値が変化したときに計算しなおしたい値がある場合に記述
    watch: {
    },
    // ロジック部
    methods: {
    }
}
</script>
<style scoped>
<!-- スタイルシート -->
</style>
```

# vue.config.jsの編集

作ったページの表示設定を行う  
`\\[リポジトリのルート]\vue.config.js`を編集する。

```JavaScript
pages: {
    ・
    ・
    ・
    // 追加する
    [機能名]: {
      entry: 'src/pages/[機能名]/main.js', // エントリーポイントとなるjs
      template: 'public/index.html', // テンプレートのHTML
      filename: '[機能名].html', // build時に出力されるファイル名
    },
  },
```

## (optional)開発用TOPページにハイパーリンクを張る

`\\[リポジトリのルート]\components\top.vue`に作ったページのリンクを張る。  
開発中にTOPページだけブックマークしておけば使いやすい

```HTML
<template>
<div id='main-area' class='ms-2 main-area'>
    ・
    ・
    ・
    <!-- 追加 -->
    <a href='./[機能名].html'>機能名</a>
    <br>
</div>
</template>
```
