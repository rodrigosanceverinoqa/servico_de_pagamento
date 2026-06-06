---
💳 Serviço de Pagamento — CI com GitHub Actions
Projeto Node.js com testes unitários automatizados usando Mocha, integrado a uma pipeline de Integração Contínua (CI) via GitHub Actions.

---
📁 Estrutura do Projeto

servico_de_pagamento/
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline de CI
├── src/
│   └── servicoDePagamento.js
├── test/
│   └── servicoDePagamento.test.js
├── package.json
└── README.md

---
⚙️ Como a Pipeline Funciona
A pipeline está definida em `.github/workflows/ci.yml` e executa os seguintes passos:
Passo	                    O que faz
`checkout`	                Baixa o código do repositório
`setup-node`	            Configura o Node.js 20 com cache de dependências
`npm install`	            Instala as dependências do projeto
`mocha --reporter json`	    Roda os testes e gera um relatório em JSON
`upload-artifact`	        Faz upload do relatório como artifact da pipeline
`Validar resultado`	        Lê o relatório e falha o job se houver testes reprovados

---
🚀 Formas de Disparo
A pipeline pode ser acionada de 3 formas diferentes:
1. 🔀 Push (automático)
Disparada automaticamente sempre que há um `push` nas branches `main` ou `master`.
```yaml
on:
  push:
    branches:
      - main
      - master
```
> **Conceito:** Integração Contínua — a cada mudança no código, os testes rodam automaticamente, garantindo que nada foi quebrado.
---
2. ⏰ Agendado (schedule)
Disparada automaticamente toda segunda-feira às 08:00 UTC, usando sintaxe `cron`.
```yaml
on:
  schedule:
    - cron: '0 8 * * 1'
```
> **Conceito:** Execuções periódicas garantem que dependências externas ou mudanças de ambiente não quebraram silenciosamente o projeto, mesmo sem novos commits.
Leitura do cron: `0 8 * * 1` = minuto 0, hora 8, qualquer dia do mês, qualquer mês, segunda-feira (1).
---
3. 🖱️ Manual (workflow_dispatch)
Pode ser disparada manualmente pela aba "Actions" no GitHub, clicando em "Run workflow".
```yaml
on:
  workflow_dispatch:
```
> **Conceito:** Útil para reexecutar testes sob demanda, sem precisar fazer um commit, por exemplo antes de uma release ou para verificar um ambiente específico.

---
📊 Relatório de Testes
O Mocha gera um relatório no formato JSON com informações detalhadas sobre a execução:
```bash
npx mocha --reporter json > test-results/report.json
```
O relatório é então salvo como artifact da pipeline usando a action `upload-artifact`:
```yaml
- uses: actions/upload-artifact@v4
  with:
    name: relatorio-testes
    path: test-results/report.json
    retention-days: 30
```

Estrutura do relatório JSON:
```json
{
  "stats": {
    "tests": 5,
    "passes": 5,
    "failures": 0,
    "duration": 120
  },
  "tests": [ ... ]
}
```

---
🧪 Executando os Testes Localmente
```bash
# Instalar dependências
npm install

# Rodar os testes
npx mocha

# Rodar os testes com relatório JSON
npx mocha --reporter json > test-results/report.json
```

---
💡 Conceitos Aplicados
Conceito	                    Descrição
Integração Contínua (CI)	    Prática de integrar e validar o código automaticamente a cada alteração
GitHub Actions	                Plataforma de automação nativa do GitHub para CI/CD
Workflow	                    Arquivo YAML que define os gatilhos e etapas da pipeline
Job	                            Conjunto de steps que rodam em um mesmo runner
Runner	                        Máquina virtual onde a pipeline executa (`ubuntu-latest`)
Artifact	                    Arquivo gerado pela pipeline e armazenado no GitHub para consulta posterior
Cron	                        Expressão que define agendamentos de execução periódica
workflow_dispatch	            Gatilho que permite execução manual da pipeline
Mocha	                        Framework de testes unitários para Node.js

---
🔧 Dependências
```json
{
  "dependencies": {
    "mocha": "^11.7.5"
  }
}
```
---
Projeto desenvolvido como atividade prática da disciplina de Integração Contínua, Git e DevOps.