import os
import sys

if getattr(sys, 'frozen', False):
    base_path = os.path.dirname(sys.executable)
    playwright_path = os.path.join(base_path, "..", "..", "playwright")
else:
    playwright_path = None 

if playwright_path:
    os.environ['PLAYWRIGHT_BROWSERS_PATH'] = playwright_path