#!/bin/bash

LANG=$1
cd /sandbox

TIMEOUT=3

run_with_limit () {
  timeout $TIMEOUT bash -c "$1" 2>err.txt
  if [ $? -eq 124 ]; then
    echo "TIME_LIMIT_EXCEEDED"
    exit 124
  fi
}

case $LANG in
  c)
    gcc main.c -o main 2>err.txt || { cat err.txt; exit 1; }
    run_with_limit "./main < input.txt"
    ;;
  cpp)
    g++ main.cpp -o main 2>err.txt || { cat err.txt; exit 1; }
    run_with_limit "./main < input.txt"
    ;;
  java)
    javac Main.java 2>err.txt || { cat err.txt; exit 1; }
    run_with_limit "java Main < input.txt"
    ;;
  python)
    run_with_limit "python3 main.py < input.txt"
    ;;
  js)
    run_with_limit "node main.js < input.txt"
    ;;
  php)
    run_with_limit "php main.php < input.txt"
    ;;
  *)
    echo "Unsupported Language"
    exit 1
    ;;
esac
