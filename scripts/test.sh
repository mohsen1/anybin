NODE_ENV=test nohup node app/server 2>&1 &
sleep 1s
mocha