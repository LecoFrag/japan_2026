# Japão 2026 — Roteiro interativo

Aplicativo (HTML) do roteiro da viagem de **Leandro & Monique** — Tóquio, Kyoto e Osaka, 05 a 16/12/2026.

## Abrir no computador

Dê **dois cliques em `index.html`**. Ele abre no navegador e funciona direto do arquivo, sem instalar nada
(precisa de internet para os mapas e as fotos).

## O que tem no app

| Seção | O que mostra |
|---|---|
| **Início** | Contagem regressiva, linha da viagem, hotéis, reservas fixas e mapa do Japão |
| **Roteiro** | Cada dia com linha do tempo, mapa interativo (rotas reais a pé, trens, áreas exploradas), distâncias, atrações com fotos e links do Google Maps por trecho |
| **Mapa** | Todos os lugares; filtros por cidade/tipo; "ordenar por proximidade" usando o GPS do celular |
| **Glossário** | Lugares (bairro? templo? rua?) e termos culturais, com foto e explicação. Palavras sublinhadas em qualquer texto abrem o glossário |
| **Games** | Lojas Nintendo, Pokémon, Capcom, Square Enix, retro games… e em que dia cada uma já está no caminho |
| **Monte Fuji** | Plano B com roteiro, mapa, previsão de nuvens ao vivo e como trocar os dias |
| **Dicas** | Entrada no país, dinheiro, clima, etiqueta, emergências, frases com áudio e checklist de pendências |

## Como editar o roteiro

Todo o conteúdo está em `data/` (arquivos de texto simples):

- `data/trip.js` — os dias: horários, atividades, rota do mapa, atrações
- `data/places.js` — os lugares (nome, coordenadas, descrição do glossário)
- `data/terms.js` — termos culturais do glossário
- `data/info.js` — dicas, frases e pendências

Depois de mudar rotas ou adicionar lugares, rode (precisa de Node.js e internet):

```bash
node tools/build.mjs
```

Isso recalcula as rotas a pé reais (OpenStreetMap/OSRM) e busca fotos novas (Wikimedia Commons),
gravando em `data/generated.js`.

## Publicar para abrir no celular

O app é só uma pasta de arquivos estáticos, então qualquer hospedagem gratuita serve.

**Opção recomendada — GitHub Pages (grátis, link fixo):**

1. Crie um repositório no GitHub (ex.: `japao-2026`). Para usar o Pages de graça ele precisa ser **público**
   (o conteúdo — nomes dos hotéis e datas — fica visível para quem tiver o link).
2. Envie esta pasta para o repositório (os `.docx` ficam de fora pelo `.gitignore`).
3. No GitHub: *Settings → Pages → Source: Deploy from a branch → Branch `main` / pasta `/ (root)`*.
4. Em ~1 minuto o link fica pronto: `https://SEU-USUARIO.github.io/japao-2026/`.
5. No celular, abra o link e use **"Adicionar à tela de início"**: o app ganha ícone próprio e
   passa a funcionar **offline** depois da primeira visita (há também um botão "Preparar para uso offline" em Dicas).

Para atualizar depois de qualquer mudança, basta enviar os arquivos de novo — o link continua o mesmo.

**Alternativas:** Netlify ou Cloudflare Pages (arrastar a pasta para o site também funciona).

## Créditos

Fotos: Wikimedia Commons (autor e licença aparecem em cada foto) · Mapas: Esri, © OpenStreetMap ·
Rotas a pé: OSRM · Previsão do tempo: Open-Meteo · Biblioteca de mapas: Leaflet.
