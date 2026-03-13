# Usa uma imagem oficial do Python
FROM python:3.10-slim

# Instala o Ghostscript
RUN apt-get update && apt-get install -y ghostscript && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY requirements.txt .

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o resto do código da aplicação
COPY server.py .
COPY PDFX_def.ps . 

# Expõe a porta que o Flask vai rodar
EXPOSE 10000

# Comando para rodar a aplicação usando gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "server:app"]
