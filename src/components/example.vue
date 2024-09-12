<template>
<div id='main-area' class='main-area d-flex flex-column'>
    <!-- アラート・確認ダイアログ -->
    <!-- 確認ダイアログ -->
    <div v-if='alertDialog.kind === "confirm"'>
        <div class='overlay'>
        <div class='alert alert-light disp-alert-dialog'>
            <div class='icon-circle-flat icon-color-confirm mx-auto'>
            ?
            </div>
            <div class='disp-alert-message d-flex align-items-center justify-content-center'>
            <p v-html='alertDialog.message'></p>
            </div>
            <div class='d-flex align-items-center justify-content-center'>
            <button class='btn btn-secondary mx-4 fix-btn-size' v-on:click='actionAlertDialog(alertDialog.plans[0].methodName)'>
                {{ alertDialog.plans[0].msg }}
            </button>
            <button class='btn btn-primary mx-4 fix-btn-size' v-on:click='actionAlertDialog(alertDialog.plans[1].methodName)'>
                {{ alertDialog.plans[1].msg }}
            </button>
            </div>
        </div>
        </div>
    </div>
    <!-- メッセージ無し警告ダイアログ -->
    <div v-if='alertDialog.kind === "alertNoMsg"'>
        <div class='overlay'>
        <div class='alert alert-light disp-alert-dialog' :style='{ width: alertDialog.width+"px", height: alertDialog.height+"px" }'>
            <div class='icon-circle-flat icon-color-alert mx-auto'>
            !
            </div>
            <div class='disp-alert-message d-flex align-items-center justify-content-center'>
            <p v-html='alertDialog.message'></p>
            </div>
            <div class='d-flex align-items-center justify-content-center'>
            <button class='btn btn-primary mx-4 fix-btn-size' v-on:click='actionAlertDialog(alertDialog.plans[0].methodName)'>
                {{ alertDialog.plans[0].msg }}
            </button>
            </div>
        </div>
        </div>
    </div>
    <!-- メッセージあり警告ダイアログ -->
    <div v-if='alertDialog.kind === "alertWithMsg"'>
        <div class='overlay'>
            <div class='alert alert-light disp-alert-dialog-with-data' :style='{ width: alertDialog.width+"px", height: alertDialog.height+"px" }'>
                <div class='icon-circle-flat icon-color-alert mx-auto'>
                !
                </div>
                <div class='disp-alert-message-with-data d-flex align-items-center justify-content-center'>
                <p v-html='alertDialog.message'></p>
                </div>
                <div class='disp-alert-data align-items-center justify-content-center'>
                <label for='example-form-control-textarea1' class='form-label'>
                    {{ alertDialog.dataCaption }}
                </label>
                <textarea class='form-control not-resize' id='example-form-control-textarea1' rows='3' v-model='alertDataToLine'></textarea>
                </div>
                <div class='d-flex align-items-center justify-content-center'>
                <button class='btn btn-primary mx-4 fix-btn-size' v-on:click='actionAlertDialog(alertDialog.plans[0].methodName)'>
                    {{ alertDialog.plans[0].msg }}
                </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import settings from '../assets/setting.json'

export default {
    // 変数定義
    data() {
        return {
            FUNCTION_NAME: '機能名',
            SCREEN_NAME: '画面名',

            // 環境設定値
            settings: settings,
            /**
             * 内部処理用
             */

            // ダイアログ表示用
            dialogFlag: '',

            /**
             * アラート・確認ダイアログ
             * @description 配列の１要素として格納するオブジェクトに必要な変数
             * @property {string} kind
             * 確認ダイアログ：conform  
             * メッセージ無し警告ダイアログ：alertNoMsg  
             * メッセージあり警告ダイアログ：alertWithMsg
             * @property {string} message
             * 表示メッセージ
             * @property {string} dataCaption
             * メッセージあり警告ダイアログ用  
             * 表示データの見出し(文字列)
             * @property {string[]} data
             * メッセージあり警告ダイアログ用  
             * 表示データ(文字列配列)
             * @property {object} plans
             * ボタンの挙動設定(インスタンス配列)  
             * 例）  
             * [  
             *   {  
             *     msg: 'キャンセル', // ボタンに表示したい文字列  
             *     methodName: 'alertDialogClose', // ボタンを押したときに実行するメソッド  
             *   },  
             *   {  
             *     msg: 'OK',  
             *     methodName: 'alertDialogClose',  
             *   },  
             * ]
             */
            alertDialog: {
                kind: '',
                message: '',
                dataCaption: '',
                data: [],
                plans: [
                    {
                    msg: '',
                    methodName: '',
                    },
                ],
            },

            /**
             * メッセージ定義
             */
            MSG_REQUEST_ERROR: '通信エラーが発生しました',
        }
    },
    // カスタムディレクティブをローカルに登録
    // directives: {
    // },
    // インスタンス生成時に実行したい処理を記述
    created() {
        // ページのタイトルを機能名に書き換え
        document.title = this.FUNCTION_NAME;
        document.getElementById('function-name').innerHTML = this.SCREEN_NAME;
    },
    // 算出プロパティ。動的に変化する値のgetterなど記述
    computed: {
    },
    // 監視プロパティ。ほかの値が変化したときに計算しなおしたい値がある場合に記述
    watch: {
    },
    // ロジック部
    methods: {
        /**
         * ファイルをサーバーに送信
         */
        upload: function() {
            // URLパラメータ
            const url = settings.API_SERVER_URL.concat('/targetpath');

            // axiosの関数内ではthisの参照先が変わるため、この時点でのthisを利用するためには変数に退避が必要
            let self = this;

            // FormData を利用して File を POST する
            let formData = new FormData();
            // formData.append('name', this.なにか);
            let config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios
                .post(url, formData, config)
                .then(function(response) {
                    // response 処理
                    // 通信に成功した場合
                })
                // eslint-disable-next-line
                .catch(function(error) {
                    // error 処理
                    self.openAlertNoMsgDialogResize(self.MSG_REQUEST_ERROR, 350, 200);
                })
        },
        /**
         * *************  ユーティリティ *************
         *  */
        /**
         * 数字のみ入力させる
         * @param {string} n 文字列
         * @returns {string} 半角数字のみに変換された文字列
         */
        inputNumberOnly(n) {
            return this.zenkakuToHankaku(n).replace(/[^0-9]/g, '').substr(0, 8);
        },
        /**
         * 全角文字を半角文字に変換
         * @param {string} str 文字列
         * @returns {string} 全角が半角に変換された文字列
         */
        zenkakuToHankaku(str) {
            return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            });
        },
        /**
         * 半角文字を全角文字に変換する
         * @param {string} str 文字列
         * @returns {string} 半角数字を全角数字に変換した文字列
         */
        replaceHalfToFull(str) {
            return str.replace(/[!-~]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
            });
        },
        /**
         * 和暦文字列を西暦文字列に変換する
         * @param {String} warekiStr 令和○○年○○月○○日 形式
         * @returns {String} 西暦に変換した文字列 yyyy/mm/dd 形式(不正値の場合空文字列)
         */
        convWarekiToSeireki(warekiStr) {
            let value = '';
            // 年と日を分割
            const splitYear = warekiStr.split('年', 2);

            // 年を処理
            const selectedYear = splitYear[0].charAt(0);
            const year = this.inputNumberOnly(splitYear[0]);
            // 数値チェック
            if(year.match(/^\d+$/)) {
                let seireki = '';
                let yearInt = Number(year);
                if(selectedYear == '20') {
                    let tmpYear = ''.concat('00', year)
                    seireki = selectedYear.concat(tmpYear.slice(-2));
                }
                else if(selectedYear == '令') {
                    // 令和元年は2019年
                    seireki = 2019 + yearInt - 1;
                }
                else if(selectedYear == '平') {
                    // 平成元年は1989年
                    seireki = 1989 + yearInt - 1;
                }
                else if(selectedYear == '昭') {
                    // 昭和元年は1926年
                    seireki = 1926 + yearInt - 1;
                }
                else if(selectedYear == '大') {
                    // 大正元年は1912年
                    seireki = 1912 + yearInt - 1;
                }
                else if(selectedYear == '明') {
                    // 明治元年は1868年
                    seireki = 1868 + yearInt - 1;
                }
                else {
                    // 不正値の場合は空文字を返却
                    return '';
                }

                // 月日を処理
                const splitMonth = splitYear[1].split('月', 2);
                const month = ('00'.concat(this.inputNumberOnly(splitMonth[0]))).slice(-2);
                const day = ('00'.concat(this.inputNumberOnly(splitMonth[1]))).slice(-2);

                value = ''.concat(seireki, '/', month, '/', day);
            }

            return value;
        },
        /**
         * ダイアログ制御用
         * @param {String} dispText 表示するメッセージ
         * @param {String} methodName 実行するメソッド名
         */
        openDialog(dispText, methodName) {
          this.openConfirmDialog(dispText, methodName);
        },
        closeDialog() {
          this.dialogFlag = '';
        },
        /**
         * *************  ダイアログ表示制御共通部品 *************
         *  */
        /**
         * アラート・確認ダイアログ表示内容作成
         * @param {string} kind
         * 確認ダイアログ：conform  
         * メッセージ無し警告ダイアログ：alertNoMsg  
         * メッセージあり警告ダイアログ：alertWithMsg
         * @param {string} message
         * 表示メッセージ
         * @param {string} dataCaption
         * メッセージあり警告ダイアログ用  
         * 表示データの見出し
         * @param {string[]} data
         * メッセージあり警告ダイアログ用  
         * 表示データ
         * @param {object} plans
         * ボタンの挙動設定(インスタンス配列)  
         * 例）  
         * [  
         *   {  
         *     msg: 'キャンセル', // ボタンに表示したい文字列  
         *     methodName: 'alertDialogClose', // ボタンを押したときに実行するメソッド  
         *   },  
         *   {  
         *     msg: 'OK',  
         *     methodName: 'alertDialogClose',  
         *   },  
         * ]
         * */
        createAlertConfirmDialog(kind, message, dataCaption, data, plans) {
          this.alertDialog = {
              kind: kind,
              message: message,
              dataCaption: dataCaption,
              data: data,
              plans: plans
          };
        },
        /**
         * アラート・確認ダイアログ表示内容作成
         * @param {string} kind
         * 確認ダイアログ：conform  
         * メッセージ無し警告ダイアログ：alertNoMsg  
         * メッセージあり警告ダイアログ：alertWithMsg
         * @param {string} message
         * 表示メッセージ
         * @param {string} dataCaption
         * メッセージあり警告ダイアログ用  
         * 表示データの見出し
         * @param {string[]} data
         * メッセージあり警告ダイアログ用  
         * 表示データ
         * @param {object} plans
         * ボタンの挙動設定(インスタンス配列)  
         * 例）  
         * [  
         *   {  
         *     msg: 'キャンセル', // ボタンに表示したい文字列  
         *     methodName: 'alertDialogClose', // ボタンを押したときに実行するメソッド  
         *   },  
         *   {  
         *     msg: 'OK',  
         *     methodName: 'alertDialogClose',  
         *   },  
         * ]
         * @param {number} width 設定したい幅
         * @param {number} height 設定したい高さ
         * */
        createAlertConfirmDialogResize(kind, message, dataCaption, data, plans, width, height) {
            this.alertDialog = {
                kind: kind,
                message: message,
                dataCaption: dataCaption,
                data: data,
                plans: plans,
                width: width,
                height: height
            };
        },
        /**
         * 確認ダイアログの表示
         * @param {string} msg 表示したいメッセージ
         * @param {string} func OKを押したときに実行したい機能名
         */
        openConfirmDialog(msg, func) {
            this.createAlertConfirmDialog(
                'confirm',
                msg,
                '',
                [],
                [
                {
                    msg: 'キャンセル',
                    methodName: 'alertDialogClose',
                },
                {
                    msg: 'OK',
                    methodName: func,
                },
                ]
            )
        },
        /**
         * メッセージ無し警告ダイアログの表示
         * @param {string} msg 表示したいメッセージ
         */
        openAlertNoMsgDialog(msg) {
            this.createAlertConfirmDialog(
                'alertNoMsg',
                msg,
                '',
                [],
                [
                {
                    msg: 'OK',
                    methodName: 'alertDialogClose',
                },
                ]
            )
        },
        /**
         * メッセージ無し警告ダイアログの表示（サイズ指定）
         * @param {string} msg 表示したいメッセージ
         * @param {number} width 設定したい幅
         * @param {number} height 設定したい高さ
         */
        openAlertNoMsgDialogResize(msg, width, height) {
            this.createAlertConfirmDialogResize(
                'alertNoMsg',
                msg,
                '',
                [],
                [
                {
                    msg: 'OK',
                    methodName: 'alertDialogClose',
                },
                ],
                width,
                height
            )
        },
        /**
         * メッセージあり警告ダイアログの表示
         * @param {string} msg 表示したいメッセージ
         * @param {string} dataCaption 表示データの見出し
         * @param {string[]} data 表示データ
         */
        openAlertWithMsgDialog(msg, dataCaption, data) {
            this.createAlertConfirmDialog(
                'alertWithMsg',
                msg,
                dataCaption,
                data,
                [
                {
                    msg: 'OK',
                    methodName: 'alertDialogClose',
                },
                ]
            )
        },
        /**
         * アラート・確認ダイアログ制御
         * @param {string} doMethodName 処理したいメソッド名
         */
        actionAlertDialog(doMethodName) {
            // 以下、本画面特有の処理
            if(doMethodName == 'clearAllResult') {
                this.clearAllResult();
            } else if(doMethodName == 'clearRowResult') {
                this.clearRowResult();
            } else if(doMethodName == 'restoreForm') {
                this.restoreForm();
            } else if(doMethodName == 'restoreFormFromRireki') {
                this.restoreForm();
                this.closeKensakuRireki();
            } else if(doMethodName == 'restoreFormFromRirekiAndKensaku') {
                this.restoreForm();
                this.doSearch();
                this.closeKensakuRireki();
            }

            // ダイアログを閉じる
            this.alertDialogClose();
        },
        /**
         * アラート・確認ダイアログを閉じる
         */
        alertDialogClose() {
            this.createAlertConfirmDialog(
                '',
                '',
                '',
                [],
                [
                    {
                    msg: '',
                    methodName: '',
                    },
                ]
            );
        },
        /*
         * *************  終了時処理 *************
         */

        /**
         * 画面破棄時の処理
         */
        destroy() {
            this.$destroy();
        },
    },
    mounted: function () {
        // 終了時処理用
    },
}
</script>
<style scoped>
</style>
