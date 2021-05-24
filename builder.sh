#!/usr/bin/env sh

npm run build

rsync -av build/ palermo:apps/knmi/htdocs/
