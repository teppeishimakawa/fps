fps使い方

--サーバ側--------------
■サーバにindex.html,fps.js,fpsnode.js格納。node.js本体とmultipartyの
　パッケージもサーバにインストール。
-----------------------

——ローカル側——----------
■AppleScriptエディタ有効化
システム環境設定→セキュリティとプライバシー
→アクセシビリティ→プライバシーの中にAppleScriptエディタ(スクリプトエディタ)を登録

■/Users/shimakawateppei/Library/LaunchAgents
(/Library/LaunchAgents)に.plistファイル配置。plistのディレクトリは
ユーザー名のところ変更必要。

■Automator有効
基本自動で有効だが、chrome起動しなかったらfpsLoadをクリック。止める
時はfpsUnload
----------------------

*bash,chromeopen.sh,test.plistのpermission chmod 755忘れずに
*利用システム:node.js,multiparty,automator,launchd,bash,AppleScript
