#! /bin/bash

NODE_ENV=test node app/server & jobpid=$!
sleep 1s
mocha
kill $jobpid