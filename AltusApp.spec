# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_all

# Lista de bibliotecas que vamos forçar para dentro do .exe
libs_to_force = [
    'flask', 'flask_cors', 'eel', 'playwright', 
    'pydantic', 'pydantic_core', 'validators', 'google', 'openai',
    'jinja2', 'werkzeug', 'itsdangerous', 'click'
]

datas = [('APP/dist', 'APP/dist'), ('API', 'API')]
binaries = []
hiddenimports = ['API.app', 'API.routes', 'API.services']

# Coleta tudo dessas bibliotecas para evitar erros de "ModuleNotFound"
for lib in libs_to_force:
    tmp_ret = collect_all(lib)
    datas += tmp_ret[0]
    binaries += tmp_ret[1]
    hiddenimports += tmp_ret[2]

a = Analysis(
    ['main.py'],
    pathex=['.'],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='Altus Benchmarking Pro',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False, # Mude para True se quiser ver o terminal de debug
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements=None,
    # icon='logo.ico' # Descomente e coloque o caminho se tiver um ícone
)