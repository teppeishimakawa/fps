fps使い方


■serverのurl => ここにアクセスしたカメラ映像を取得
■serverのurl/index2.html =>リモート制御して1ps伝送start,stop


--サーバ側--------------
■サーバにindex.html,index2.html,fps.js,fpsnode.js,tmpフォルダを格納。
node.js本体とmultiparty,socket.ioのパッケージもサーバにインストール。
port8080使用
-----------------------


↓以下はautoフォルダ内のファイルに記述されるurl変更すればkeepAliveする設定です。
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

*利用システム:node.js,multiparty,automator,launchd,bash,AppleScript
*bash,chromeopen.sh,test.plistのpermission chmod 755忘れずに

