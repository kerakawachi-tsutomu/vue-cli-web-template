<template>
  <zikenkanri/>
</template>

<script>
import example from '../../components/example.vue'

export default {
  name: 'App',
  components: {
    'example': example,
    'example2': example,
    'example3': example,
    'example4': example
  },
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

<style>
@import '../../css/common/loading.css';
@import '../../css/component/dialog/dialog.css';
@import '../../css/common/common.css';
@import '../../css/example/example.css';
</style>
