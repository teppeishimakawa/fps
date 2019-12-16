#!/usr/bin/bash

watch -n 1 rsync -r -e "'ssh -i /Users/shimakawateppei/Documents/fps/sima_fps.pem'" ec2-user@18.176.134.220:fps/tmp/ /Users/shimakawateppei/Documents/fps/forAWS/tmp/


