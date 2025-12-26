import os
import sys
import subprocess
import platform

def run_command(command, description):
    print(f"\n>>> {description}...")
    try:
        subprocess.check_call(command, shell=True)
        print("    [OK]")
    except subprocess.CalledProcessError:
        print(f"    [ERRO] Falha ao executar: {command}")
        sys.exit(1)

def main():
    os_name = platform.system()
    print(f"--- Instalador Automático (Sistema detectado: {os_name}) ---")

    run_command(f"{sys.executable} -m pip install --upgrade pip", "Atualizando pip")

    run_command(f"{sys.executable} -m pip install -r requirements.txt", "Instalando bibliotecas do Python")

    run_command(f"{sys.executable} -m playwright install", "Baixando navegadores do Playwright")

    if os_name == "Linux":
        print("\n>>> Verificando dependências do sistema Linux (pode pedir senha)...")
        try:
            subprocess.check_call("sudo playwright install-deps", shell=True)
        except subprocess.CalledProcessError:
             print("    [AVISO] Falha no sudo. Se der erro ao abrir o navegador, rode 'sudo playwright install-deps' manualmente.")
    
    print("\n" + "="*40)
    print("INSTALAÇÃO CONCLUÍDA COM SUCESSO!")
    print("Para iniciar, rode: python app.py")
    print("="*40)

if __name__ == "__main__":
    main()