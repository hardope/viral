import subprocess
import os
import sys
import traceback

lists = ["main/static/posts.js",
"viral/settings.py"
]

for i in lists:

     result = subprocess.run(f"git add {i}")
     result = subprocess.run(f"git commit -m 'Updated")

