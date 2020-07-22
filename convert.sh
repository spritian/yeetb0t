#!/bin/bash
cd mp3/
for f in *.wav ; do ffmpeg -i "$f" "${f%.*}.mp3"; done
