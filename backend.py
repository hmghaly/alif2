#!/usr/bin/python
import os, sys, shelve, json
#import subprocess

stdin=sys.stdin.read()

data_dir="../game_data"


print "Content-type:text/html\r\n\r\n"
print "Hello world<br>"
print stdin
try:
	if not os.path.exists(data_dir): os.makedirs(data_dir)
except Exception, e:
	print str(e)

print "backend<br>"