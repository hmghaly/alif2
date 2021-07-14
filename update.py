#!/usr/bin/python
import os
import subprocess



print "Content-type:text/html\r\n\r\n"
print "Hello world<br>"
proc = subprocess.Popen(["./git.sh"], stdout=subprocess.PIPE, shell=True)
(out, err) = proc.communicate()
print "program output:", out
# try:
# 	if not os.path.exists("alif_laam"): #git clone https://github.com/hmghaly/alif2.git alif2
# 		proc = subprocess.Popen(["git clone https://github.com/hmghaly/alif2.git alif_laam"], stdout=subprocess.PIPE, shell=True)
# 	else:
# 		proc = subprocess.Popen(["git fetch"], stdout=subprocess.PIPE, shell=True,cwd="alif_laam")

# 	(out, err) = proc.communicate()
# 	print "program output:", out
# except Exception, e:
# 	print str(e)

#print "What?"