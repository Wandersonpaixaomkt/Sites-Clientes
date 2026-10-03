# Sites Clientes

Repositorio central de todos os sites criados para clientes, organizado para apresentacao.

## Estrutura

```
Sites-Clientes/
  README.md            Este guia
  clientes/
    README.md          Lista de clientes e status
    _modelo/           Modelo para copiar a cada novo cliente
      README.md        Ficha do cliente (briefing, feedbacks)
      site/
        index.html     Arquivos do site
    nome-do-cliente/   Uma pasta por cliente
```

## Fluxo para cada novo site

1. Duplique a pasta `clientes/_modelo` com o nome do cliente (minusculo, sem espacos, ex: `padaria-sol`).
2. Preencha a ficha em `README.md` da pasta do cliente.
3. Coloque o site dentro de `site/`. O ponto de entrada deve ser `index.html`.
4. Registre o cliente na tabela de `clientes/README.md`.
5. Para versoes novas, use uma branch ou tag (ex: `padaria-sol-v2`) e anote o feedback na ficha.

## Regras

Nunca guardar senhas, chaves de API ou dados pessoais de clientes finais no repositorio. Manter o repositorio privado enquanto houver material nao aprovado.
