import eel
import os
import sys
import threading
import asyncio
import ctypes

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    myappid = 'Altus.Benchmarking.Pro.v1'
    ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(myappid)

if getattr(sys, 'frozen', False):
    os.environ['PLAYWRIGHT_BROWSERS_PATH'] = os.path.join(sys._MEIPASS, 'playwright', 'driver', 'package', '.local-browsers')

def resource_path(relative_path):
    base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))
    return os.path.join(base_path, relative_path)

WEB_FOLDER = resource_path('APP/dist')
sys.path.append(resource_path('.'))
sys.path.append(resource_path('API'))

from API.app import create_app

def run_flask():
    app = create_app()
    app.run(host='127.0.0.1', port=5000, debug=False, use_reloader=False)

threading.Thread(target=run_flask, daemon=True).start()

eel.init(WEB_FOLDER)

if __name__ == '__main__':
    eel.start(
        'index.html', 
        mode='chrome',
        port=54321, 
        cmdline_args=[
            '--start-maximized', 
            '--app=http://localhost:54321/index.html', 
            '--disable-extensions'
        ]
    )