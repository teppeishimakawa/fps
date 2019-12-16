#!/bin/bash

#echo "hello"
# $?:一つ前の処理　　-ne:not equal , 0はエラーなし
#open -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome https://teppeishimakawa-fps.glitch.me
#mkdir /Users/shimakawateppei/Desktop/lock
#if [ $? -ne 0 ]; then
#        echo "already load"
#        exit 1

#else
#バックスラッシュのescapeでスペース入れてる
# -Wはchrome立ち上がっていない場合にアプリ開くoption

#open -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chromefps

open -a 'Google Chrome'
#appleScriptでchrome画面アクティブ、url入力、エンター
osascript -e 'tell application "Google Chrome" to activate' -e 'tell application "System Events" to keystroke "https://fpssima.name"&return'

#open "http://yahoo.co.jp"

#https://teppeishimakawa-fps.glitch.me
# "https://teppeishimakawa-fps.glitch.me"
#      launchctl unload ~/Library/LaunchAgents/test.plist
#      sleep 1
#      launchctl load ~/Library/LaunchAgents/test.plist
#rmdir /Users/shimakawateppei/Desktop/lock
#fi

