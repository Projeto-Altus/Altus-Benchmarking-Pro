import eel
import os
import sys
import threading

def resource_path(relative_path):
    base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))
    return os.path.join(base_path, relative_path)

WEB_FOLDER = resource_path('APP/dist')
sys.path.append(resource_path('.'))
sys.path.append(resource_path('API'))

print(f"--- DEBUG ALTUS ---")
print(f"Diretório base: {os.path.abspath('.')}")
print(f"Procurando Frontend em: {WEB_FOLDER}")

try:
    from API.app import create_app
    print("Backend carregado!")
except Exception as e:
    print(f"Erro no backend: {e}")
    sys.exit(1)

def run_flask():
    app = create_app()
    app.run(host='127.0.0.1', port=5000, debug=False, use_reloader=False)

threading.Thread(target=run_flask, daemon=True).start()

eel.init(WEB_FOLDER)

if __name__ == '__main__':
    print("Lançando interface desktop...")
    eel.start(
        'index.html', 
        mode='chrome',
        port=54321, 
        cmdline_args=[
            '--start-maximized', 
            '--app=http://localhost:54321/index.html', 
            '--new-window',                           
            '--disable-extensions'                  
        ],
        close_callback=lambda p, s: sys.exit()
    )