# Gerador de Folheto (Web App -> PDF/X-1a)

Este projeto é uma aplicação de geração de folhetos promocionais, projetada para farmácias, perfumarias ou lojas de cosméticos. Ele permite visualizar o folheto em uma interface Web construída com **React**, customizar produtos, alterar cores, inserir logos e exportar o resultado final em **PDF/X-1a**, um padrão ouro para gráficas e impressão profissional.

O projeto é dividido em duas partes:
1. **Frontend (React + Vite + TailwindCSS)**: Onde ocorre a customização visual do panfleto e a geração do PDF base do navegador.
2. **Backend (Python + FastAPI)**: Responsável por receber o PDF do navegador e, utilizando a ferramenta **Ghostscript**, convertê-lo para o formato PDF/X-1a em padrão de cores CMYK.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** com **TypeScript** e **Vite**
- **Tailwind CSS 4** para estilização
- **Zustand** para o gerenciamento de estado global (produtos, logo, cores)
- **html2canvas** + **jsPDF** para capturar a DOM e gerar o PDF base.

### Backend (Conversão PDF/X-1a)
- **Python** e **FastAPI**
- **Ghostscript** para a conversão do PDF para PDF/X-1a e modificação da intenção de cor
- Arquivos de Perfil de Cor **ICC (CGATS21_CRPC6)** para conversão CMYK fidedigna.

---

## 🚀 Como Rodar o Projeto

Para o fluxo completo de "Visualizar e Exportar em PDF/X-1a", você precisará rodar **tanto a aplicação React quanto o servidor Python**.

### Pré-requisitos
1. **Node.js** (v18+) instalado - [Baixar NodeJS](https://nodejs.org/)
2. **Python** (v3.9+) instalado - [Baixar Python](https://www.python.org/)
3. **Ghostscript** instalado e adicionado ao `PATH` das Variáveis de Ambiente do seu sistema:
   - [Baixar Ghostscript para Windows](https://ghostscript.com/releases/gsdnld.html)
   - Certifique-se que comandos como `gs`, `gswin64c` ou `gswin32c` possam ser rodados em qualquer terminal.

---

### Passo 1: Iniciando o Frontend (React)

No terminal, estando na raiz do projeto (pasta `folheto`):

```bash
# 1. Instalar as dependências do React
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```
A aplicação abrirá no seu navegador, geralmente em `http://localhost:5173`.

---

### Passo 2: Iniciando o Backend (Python)

Abra uma **nova janela ou nova aba no seu terminal**, entre na raiz do projeto e siga os passos abaixo para subir a API responsável pela conversão do PDF:

```bash
# 1. Entre na pasta do backend
cd python_backend

# 2. Crie um ambiente virtual (recomendado)
python -m venv venv

# 3. Ative o ambiente virtual
# No Windows (PowerShell/CMD):
.\venv\Scripts\activate
# No Mac/Linux:
# source venv/bin/activate

# 4. Instale as bibliotecas necessárias
pip install -r requirements.txt

# 5. Inicie o servidor FastAPI
uvicorn app:app --reload
```
A API ficará rodando no endereço `http://localhost:8000`.

*(Na primeira execução ele vai baixar automaticamente um Perfil ICC Padrão para arquivos do tipo CMYK).*

---

## 📸 Como Exportar o PDF/X-1a

1. Com o Frontend (`npm run dev`) e o Backend (`uvicorn`) rodando, abra o site do folheto (`http://localhost:5173`).
2. Adicione imagens, mude textos, personalize o preço e modifique cores direto na tela.
3. Clique no botão de **"Gerar Arquivo de Impressão (PDF/X-1a)"** que está logo acima da visualização principal.
4. Aguarde a conversão. A aplicação enviará o modelo para o Python e irá lhe devolver o download do arquivo `folheto_final_pdfx1a.pdf`.

Este arquivo estará apto para ser levado a qualquer gráfica offset.

---

## 📂 Estrutura Principal do Projeto

```text
folheto/
├── python_backend/           # Servidor de Conversão de PDF/X-1a
│   ├── app.py                # Rotas e integração com Ghostscript subproc
│   ├── PDFX_def.ps           # Definições PostScript para adequação à norma
│   └── requirements.txt      # Dependências do Python (FastAPI, uvicorn...)
├── src/
│   ├── components/
│   │   └── Canvas.tsx        # O componente visual principal do folheto
│   ├── store/
│   │   └── usePamphletStore.ts # Estado unificado com zustand
│   ├── App.tsx               # Entrypoint da aplicação e lógica HTML2Canvas
│   ├── index.css             # Entradas do Tailwind CSS
│   └── main.tsx
├── package.json              # Módulos dependentes do site (html2canvas, react...)
└── vite.config.ts            # Configurações do Bundle Web
```

---

*Desenvolvido como um modelo flexível para automação de criação de arquivos para o mercado gráfico promocional e impresso.*
