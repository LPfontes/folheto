import subprocess
import sys
import os

def convert_to_pdf_x1a(input_pdf, output_pdf):
    """
    Converte um arquivo PDF normal para o padrão PDF/X-1a focado em impressão gráfica
    usando o Ghostscript.
    """
    # Define o comando correto do Ghostscript dependendo do sistema operacional
    # No Windows geralmente é gswin64c, no Linux/MacOS é gs
    gs_cmd = "gswin64c" if os.name == 'nt' else "gs"
    
    # Comando de configuração para garantir o padrão X-1a de forma básica:
    # - Compatibilidade 1.3
    # - Conversão para CMYK
    command = [
        gs_cmd,
        "-dPDFX=1",
        "-dSAFER",
        "-dNOPAUSE",
        "-dBATCH",
        "-sDEVICE=pdfwrite",
        "-sColorConversionStrategy=CMYK",
        "--permit-file-read=/home/lpfontes/pdf/",
        "-dPrinted=true",
        "-dPDFACompatibilityPolicy=1",
        f"-sOutputFile={output_pdf}",
        "PDFX_def.ps",
        input_pdf
    ]
    
    try:
        print(f"Iniciando conversão para PDF/X-1a usando Ghostscript...")
        print(f"Comando sendo executado: {' '.join(command)}")
        
        # Executa o subprocesso; capture_output pega a resposta do console
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        
        print("\nConversão concluída com sucesso!")
        print(f"Arquivo pronto para gráfica salvo em: {output_pdf}")
        
    except subprocess.CalledProcessError as e:
        print("\n[!] Erro durante a conversão do arquivo.")
        print(f"Código de erro: {e.returncode}")
        print("Saída do Ghostscript:")
        print(e.stderr if e.stderr else e.stdout)
        
    except FileNotFoundError:
        print(f"\n[!] Erro crítico: O executável do Ghostscript ('{gs_cmd}') não foi encontrado no sistema.")
        print("Para que este script funcione, é estritamente necessário instalar o Ghostscript.")
        print("\nPassos para instalar no Windows:")
        print("1. Baixe em: https://ghostscript.com/releases/gsdnld.html")
        print("2. Instale a versão de 64 bits.")
        print("3. Adicione a pasta 'bin' da instalação (ex: C:\\Program Files\\gs\\gs10.X.X\\bin) às Variáveis de Ambiente (PATH) do Windows.")
        print("4. Reinicie o terminal e tente novamente.")

if __name__ == "__main__":
    print("=========================================")
    print("   Conversor de PDF para PDF/X-1a (CMYK) ")
    print("=========================================")
    
    if len(sys.argv) < 3:
        print("\nInstruções de uso:")
        print("python convert_pdf_x1a.py <arquivo_entrada.pdf> <arquivo_saida.pdf>")
        print("\nExemplo:")
        print("python convert_pdf_x1a.py folheto_completo.pdf folheto_grafica_x1a.pdf")
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    if not os.path.exists(input_file):
        print(f"\n[!] Erro: O arquivo '{input_file}' não foi encontrado.")
        sys.exit(1)
        
    convert_to_pdf_x1a(input_file, output_file)
