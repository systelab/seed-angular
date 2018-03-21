#!/bin/sh

if [ -z ${BACKEND+x} ]; then
    echo "BACKEND is unset. Default value will be used.";
else
    echo "BACKEND is set to '$BACKEND'.";
    sed -i -e "s~http://127.0.0.1:8080~$BACKEND~g" /usr/share/nginx/html/main.*.bundle.js
fi

nginx -g "daemon off;"