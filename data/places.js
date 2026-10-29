/* =========================================================================
   LUGARES — glossário geográfico da viagem
   -------------------------------------------------------------------------
   Cada lugar tem:
     n    nome exibido            jp   nome em japonês
     t    tipo (ver TYPES abaixo) c    cidade/região (tokyo|kyoto|osaka|fuji)
     ll   [latitude, longitude]
     w    título do artigo na Wikipedia (inglês) — usado para buscar a foto
     cs   (opcional) busca no Wikimedia Commons, se não houver artigo bom
     d    o que é (texto do glossário)
     tip  (opcional) dica prática / horário
     aka  (opcional) outros nomes que, ao aparecer no texto, viram link
     g    (opcional) nome exato que o Google Maps reconhece (verificado); sem ele, usa o nome japonês
     gmc  (opcional) true = o Google acha o nome ambíguo; "Ir até lá" usa a coordenada exata
   Depois de editar este arquivo, rode:  node tools/build.mjs
   ========================================================================= */

window.TYPES = {
  bairro:     { label: 'Bairro / região',          icon: '🏙️' },
  templo:     { label: 'Templo budista',           icon: '🛕' },
  santuario:  { label: 'Santuário xintoísta',      icon: '⛩️' },
  rua:        { label: 'Rua / viela',              icon: '🏮' },
  mercado:    { label: 'Mercado',                  icon: '🍢' },
  mirante:    { label: 'Mirante / observatório',   icon: '🔭' },
  loja:       { label: 'Loja / compras',           icon: '🛍️' },
  games:      { label: 'Games / anime',            icon: '🎮' },
  parque:     { label: 'Parque / jardim',          icon: '🌳' },
  natureza:   { label: 'Natureza',                 icon: '🍁' },
  historico:  { label: 'Marco histórico',          icon: '🏯' },
  museu:      { label: 'Museu / experiência',      icon: '🏛️' },
  monumento:  { label: 'Monumento / marco urbano', icon: '🗿' },
  estacao:    { label: 'Estação / transporte',     icon: '🚉' },
  hotel:      { label: 'Hotel (nossa base)',       icon: '🏨' },
  aeroporto:  { label: 'Aeroporto',                icon: '✈️' },
  noite:      { label: 'Vida noturna / comida',    icon: '🍶' },
};

window.CITIES = {
  tokyo: { n: 'Tóquio', jp: '東京', color: '#C8102E', soft: '#fde8ea', center: [35.685, 139.74] },
  kyoto: { n: 'Kyoto',  jp: '京都', color: '#5B7F2B', soft: '#eef4e4', center: [34.99, 135.77] },
  osaka: { n: 'Osaka',  jp: '大阪', color: '#D9771E', soft: '#fdf0e2', center: [34.68, 135.50] },
  fuji:  { n: 'Monte Fuji (Plano B)', jp: '富士山', color: '#3E6E9E', soft: '#e7eff8', center: [35.45, 138.75] },
};

window.PLACES = {

  /* ============================== TÓQUIO ============================== */

  'tokyo-city': {
    n: 'Tóquio', jp: '東京 (Tōkyō)', t: 'bairro', c: 'tokyo', ll: [35.68120, 139.76710], w: 'Tokyo',
    d: '"Capital do Leste": capital do Japão desde 1868 (antes se chamava Edo) e a maior região metropolitana do mundo, com ~37 milhões de pessoas. Não tem um centro único — é uma colcha de bairros com personalidades muito diferentes (Shinjuku, Shibuya, Asakusa, Ginza…), ligados por uma das redes de trem mais eficientes do planeta.',
    aka: ['Tokyo', 'Tóquio'],
    g: '東京都',
  },
  'hotel-tokyo': {
    n: 'APA Hotel Higashi-Shinjuku Kabukicho Tower', jp: 'アパホテル〈東新宿 歌舞伎町タワー〉',
    t: 'hotel', c: 'tokyo', ll: [35.69803, 139.70384],
    d: 'Nossa base em Tóquio (05 a 10/12). Fica na Shokuan-dori, no lado norte de Kabukicho — a parte mais animada de Shinjuku — a poucos minutos da estação Higashi-Shinjuku (linhas Oedo e Fukutoshin).',
    tip: 'Endereço: 2-31-12 Kabukicho, Shinjuku-ku, Tóquio 160-0021. Estação mais próxima: Higashi-Shinjuku (~5 min a pé). Estação Shinjuku (JR): ~15 min a pé. Mostre ao taxista: アパホテル東新宿歌舞伎町タワー',
    aka: ['APA Hotel', 'hotel APA'], g: 'APA Hotel Higashi-Shinjuku Kabukicho Tower',
  },
  'higashi-shinjuku-sta': {
    n: 'Estação Higashi-Shinjuku', jp: '東新宿駅', t: 'estacao', c: 'tokyo', ll: [35.69790, 139.70754],
    w: 'Higashi-shinjuku Station',
    d: 'Estação de metrô mais próxima do hotel. Tem duas linhas muito úteis: a Fukutoshin (vai direto a Meiji-jingumae/Harajuku e Shibuya) e a Toei Oedo (circular, cruza a cidade).',
    aka: ['Higashi-Shinjuku'],
  },
  'shinjuku': {
    n: 'Shinjuku', jp: '新宿', t: 'bairro', c: 'tokyo', ll: [35.6925, 139.7020], w: 'Shinjuku',
    d: 'Um dos grandes centros de Tóquio: arranha-céus, lojas de departamento, neon, bares minúsculos e a estação mais movimentada do mundo (mais de 3 milhões de pessoas por dia). É a nossa base na cidade — ótimo para compras, jantar e passear à noite.',
  },
  'shinjuku-sta': {
    n: 'Estação Shinjuku', jp: '新宿駅', t: 'estacao', c: 'tokyo', ll: [35.69060, 139.70040], w: 'Shinjuku Station',
    d: 'A estação mais movimentada do planeta, com dezenas de linhas (JR, metrô e trens privados) e mais de 200 saídas. Dica: sempre procure o nome da SAÍDA (East Exit, South Exit…) e siga as placas amarelas.',
    aka: ['estação de Shinjuku'],
  },
  'kabukicho': {
    n: 'Kabukicho', jp: '歌舞伎町', t: 'noite', c: 'tokyo', ll: [35.6948, 139.7025], w: 'Kabukichō',
    d: 'O distrito de entretenimento de Shinjuku: neon, restaurantes, karaokês, game centers e a famosa cabeça do Godzilla. É seguro para caminhar, mas ignore "promoters" que abordam na rua oferecendo bares.',
    aka: ['Kabukichō'],
  },
  'godzilla': {
    n: 'Cabeça do Godzilla', jp: 'ゴジラヘッド', t: 'monumento', c: 'tokyo', ll: [35.69516, 139.70193],
    w: 'Shinjuku Toho Building',
    d: 'Réplica gigante da cabeça do Godzilla no terraço do prédio Shinjuku Toho (Hotel Gracery), em Kabukicho. Um dos símbolos pop de Shinjuku — dá para ver da rua, a 5 minutos do hotel.',
    aka: ['Godzilla', 'Toho'],
  },
  'golden-gai': {
    n: 'Golden Gai', jp: 'ゴールデン街', t: 'noite', c: 'tokyo', ll: [35.69393, 139.70446], w: 'Golden Gai',
    d: 'Labirinto de seis vielas estreitas com cerca de 200 bares minúsculos (alguns cabem 6 pessoas), preservando a Tóquio do pós-guerra. Muito perto do hotel. Alguns bares cobram taxa de entrada ("cover charge").',
  },
  'omoide-yokocho': {
    n: 'Omoide Yokocho', jp: '思い出横丁', t: 'noite', c: 'tokyo', ll: [35.69300, 139.69950], w: 'Omoide Yokochō',
    d: '"Viela das Memórias": corredor estreito ao lado da estação Shinjuku, cheio de balcões de yakitori (espetinhos) fumegantes e lanternas vermelhas. Cenário clássico da Tóquio antiga à noite.',
    aka: ['Omoide Yokochō', 'Memory Lane'],
  },
  'uniqlo-shinjuku': {
    n: 'Uniqlo Shinjuku Main Store', jp: 'ユニクロ 新宿本店', t: 'loja', c: 'tokyo', ll: [35.69160, 139.70250],
    cs: 'Uniqlo store Tokyo',
    d: 'Loja-conceito da Uniqlo inaugurada em 2024 no antigo prédio Bicqlo (lado leste da estação Shinjuku), com ~4.000 m² em 3 andares. Ideal para resolver as roupas de frio: HEATTECH (segunda pele térmica), Ultra Light Down (casacos finos de pluma), luvas e gorros.',
    tip: 'Loja tax-free: com o passaporte, compras acima de ¥5.000 têm o imposto (10%) devolvido no aeroporto, na saída do Japão.',  g: 'UNIQLO 新宿本店',
  },
  'donki-kabukicho': {
    n: 'Don Quijote Kabukicho', jp: 'ドン・キホーテ 新宿歌舞伎町店', t: 'loja', c: 'tokyo', ll: [35.69375, 139.70170],
    cs: 'Don Quijote Shinjuku Kabukicho',
    d: 'Don Quijote na entrada de Kabukicho, a ~10 min a pé do hotel e aberta 24h. Boa para ir numa noite qualquer, depois do jantar.',
    g: 'ドン・キホーテ 新宿歌舞伎町店',
  },
  'gu-shinjuku': {
    n: 'GU Shinjuku Flags', jp: 'ジーユー 新宿フラッグス店', t: 'loja', c: 'tokyo', ll: [35.68992, 139.70152], img: false,
    d: 'Loja da GU (marca irmã e mais barata da Uniqlo) no 7º e 8º andares do prédio Shinjuku Flags, colado à saída sudeste da estação Shinjuku. Perto da Uniqlo Shinjuku Main Store: dá para ver as duas na manhã de compras de frio.',
    g: 'ジーユー 新宿フラッグス店',
  },
  'seria-shinjuku': {
    n: 'Seria Shinjuku (Marui Annex)', jp: 'セリア 新宿マルイアネックス店', t: 'loja', c: 'tokyo', ll: [35.69014, 139.70598], img: false,
    d: 'Loja da Seria, a rede de ¥100 de design mais delicado, no 4º andar do Shinjuku Marui Annex, perto da estação Shinjuku-sanchome, a ~15 min a pé do hotel.',
    tip: 'Fica no caminho entre o hotel e a estação Shinjuku-sanchome, usada na manhã de 09/12. Confirmar o horário do prédio.',
    g: 'セリア 新宿マルイアネックス店',
  },
  'artnia': {
    n: 'ARTNIA (Square Enix)', jp: 'アルトニア', t: 'games', c: 'tokyo', ll: [35.69611, 139.70902],
    cs: 'Square Enix headquarters Shinjuku Eastside Square',
    d: 'Café e loja oficial da Square Enix, no térreo da sede da empresa em Shinjuku. Produtos de Final Fantasy, Dragon Quest e Kingdom Hearts, drinks temáticos e um enorme cristal decorativo. Fica a ~10 min a pé do hotel.',
    tip: 'Ótimo programa para uma noite qualquer em Shinjuku. Confirmar horário perto da viagem.', aka: ['ARTNIA', 'Artnia', 'Square Enix'], g: 'ARTNIA Square Enix Shinjuku',
  },

  /* ---- Dia 1: Akihabara ---- */
  'akihabara-sta': {
    n: 'Estação Akihabara', jp: '秋葉原駅', t: 'estacao', c: 'tokyo', ll: [35.69840, 139.77310], w: 'Akihabara Station',
    d: 'Estação JR no coração de Akihabara. Da estação Shinjuku dá para vir direto pela linha JR Chuo-Sobu (amarela), ~20 min, sem baldeação.',
  },
  'akihabara': {
    n: 'Akihabara', jp: '秋葉原', t: 'bairro', c: 'tokyo', ll: [35.70020, 139.77140], w: 'Akihabara',
    d: 'O "bairro elétrico" de Tóquio e a capital mundial da cultura otaku: prédios inteiros de games, anime, mangá, figures, eletrônicos, arcades e maid cafés. Ótimo para caçar raridades e retro games.',
    aka: ['Akiba'],
  },
  'chuo-dori-akiba': {
    n: 'Chuo-dori (Akihabara)', jp: '中央通り', t: 'rua', c: 'tokyo', ll: [35.70070, 139.77120],
    cs: 'Akihabara Chuo-dori',
    d: 'Avenida principal de Akihabara, ladeada por telões e lojas de vários andares. Aos domingos à tarde (normalmente 13h–17h/18h) vira "Hokosha Tengoku" — paraíso dos pedestres, com a rua fechada para carros.',
    tip: '06/12/2026 é domingo: aproveite a rua fechada à tarde.', aka: ['Chuo-dori de Akihabara'],
    g: '秋葉原 中央通り',
  },
  'super-potato': {
    n: 'Super Potato Akihabara', jp: 'スーパーポテト', t: 'games', c: 'tokyo', ll: [35.69937, 139.77074], w: 'Super Potato', cs: 'Super Potato Akihabara',
    d: 'A loja de retro games mais famosa do Japão: três andares de cartuchos de Famicom, Super Famicom, Mega Drive, consoles antigos e um mini-fliperama retrô no último andar.',
    aka: ['Super Potato'],
    g: 'スーパーポテト 秋葉原店',
  },
  'gigo-akiba': {
    n: 'GiGO Akihabara (ex-SEGA)', jp: 'GiGO秋葉原', t: 'games', c: 'tokyo', ll: [35.69990, 139.77135],
    cs: 'Sega Akihabara',
    d: 'Game centers de vários andares (antigos fliperamas da SEGA): máquinas de pegar prêmios (UFO catcher), jogos de ritmo, cabines de purikura e arcades de luta. Uma experiência muito japonesa.',
    aka: ['GiGO'],
    g: 'GiGO 秋葉原1号館',
  },
  'radio-kaikan': {
    n: 'Akihabara Radio Kaikan', jp: '秋葉原ラジオ会館', t: 'games', c: 'tokyo', ll: [35.69975, 139.77165], w: 'Akihabara Radio Kaikan', cs: 'Akihabara Radio Kaikan',
    d: 'Prédio de 10 andares só de lojas de figures, colecionáveis, cards (Pokémon, Yu-Gi-Oh!), model kits e anime. Um dos melhores lugares de Akihabara para procurar itens específicos.',
    aka: ['Radio Kaikan'],
  },
  'yodobashi-akiba': {
    n: 'Yodobashi-Akiba', jp: 'ヨドバシAkiba', t: 'loja', c: 'tokyo', ll: [35.69880, 139.77460],
    cs: 'Yodobashi Akiba',
    d: 'Megaloja de eletrônicos com 9 andares ao lado da estação: câmeras, fones, games, brinquedos, eletrodomésticos japoneses e um andar de restaurantes no topo. Aceita tax-free.',
    aka: ['Yodobashi', 'Yodobashi Camera'],
  },

  /* ---- Dia 2: Asakusa / Kappabashi / Ueno ---- */
  'asakusa-sta': {
    n: 'Estação Asakusa', jp: '浅草駅', t: 'estacao', c: 'tokyo', ll: [35.71100, 139.79780], w: 'Asakusa Station',
    d: 'Estação das linhas Ginza (metrô), Toei Asakusa e Tobu. Fica a 2 minutos do portão Kaminarimon.',
  },
  'asakusa': {
    n: 'Asakusa', jp: '浅草', t: 'bairro', c: 'tokyo', ll: [35.71300, 139.79560], w: 'Asakusa',
    d: 'Bairro histórico de Tóquio, que guarda o clima da antiga Edo: o templo Senso-ji, ruas de comércio tradicional, riquixás, lojinhas de doces e artesanato. É o melhor lugar para sentir a Tóquio "de antigamente".',
  },
  'asakusa-tic': {
    n: 'Asakusa Culture Tourist Information Center', jp: '浅草文化観光センター', t: 'mirante', c: 'tokyo', ll: [35.71075, 139.79655],
    w: 'Asakusa Culture Tourist Information Center',
    d: 'Prédio moderno do arquiteto Kengo Kuma (o mesmo do Estádio Nacional), bem em frente ao Kaminarimon. No 8º andar há um terraço-mirante GRATUITO com vista para a Nakamise-dori, o Senso-ji e a Tokyo Skytree.',
    tip: 'Mirante normalmente aberto das 9h às 22h. Ótimo para a primeira foto do dia.', aka: ['Asakusa Culture Tourist Information Center', 'centro de informações de Asakusa'],
  },
  'kaminarimon': {
    n: 'Kaminarimon', jp: '雷門', t: 'historico', c: 'tokyo', ll: [35.71106, 139.79630], w: 'Kaminarimon',
    d: '"Portão do Trovão": a entrada monumental do Senso-ji, com a enorme lanterna vermelha de ~700 kg e as estátuas dos deuses do vento (Fujin) e do trovão (Raijin). Um dos cartões-postais de Tóquio.',
    g: '雷門 浅草寺',
  },
  'nakamise': {
    n: 'Nakamise-dori', jp: '仲見世通り', t: 'rua', c: 'tokyo', ll: [35.71270, 139.79640], w: 'Nakamise-dōri', cs: 'Nakamise Asakusa',
    d: 'Rua de pedestres de ~250 m entre o Kaminarimon e o templo, com cerca de 90 lojinhas tradicionais há séculos: ningyo-yaki (bolinhos recheados), senbei (biscoito de arroz), leques, kimonos e souvenirs.',
    tip: 'No Japão é falta de educação comer andando; coma em frente à loja onde comprou.', aka: ['Nakamise'],
  },
  'sensoji': {
    n: 'Senso-ji', jp: '浅草寺', t: 'templo', c: 'tokyo', ll: [35.71477, 139.79665], w: 'Sensō-ji',
    d: 'O templo budista mais antigo de Tóquio (fundado em 645), dedicado a Kannon, a deusa da misericórdia. Tem um pagode de 5 andares, incensário gigante (a fumaça "traz saúde") e onde se pode tirar a sorte (omikuji) por ¥100.',
    aka: ['Sensō-ji', 'Sensoji', 'Senso-ji Temple'],
  },
  'hoppy-street': {
    n: 'Hoppy Street', jp: 'ホッピー通り', t: 'noite', c: 'tokyo', ll: [35.71360, 139.79330],
    cs: 'Hoppy Street',
    d: 'Rua de izakayas populares com mesas na calçada, famosa pelo "Hoppy" (bebida tipo cerveja misturada com shochu) e pelo nikomi (ensopado de miúdos). Clima de boteco japonês tradicional.',
    aka: ['Hoppy-dori'],
  },
  'kappabashi': {
    n: 'Kappabashi', jp: 'かっぱ橋道具街', t: 'loja', c: 'tokyo', ll: [35.71350, 139.78830], w: 'Kappabashi', cs: 'Kappabashi',
    d: '"Rua dos utensílios de cozinha": ~800 m com 170 lojas que abastecem os restaurantes de Tóquio. Facas japonesas artesanais, cerâmicas, hashis, panelas, lanternas e as famosas réplicas de comida em plástico (sampuru).',
    tip: 'Muitas lojas fecham aos domingos; numa segunda-feira (07/12) a maioria está aberta, 9h–17h.', aka: ['Kappabashi-dori', 'Kappabashi Dougu-gai'],
  },
  'ueno-park': {
    n: 'Parque Ueno', jp: '上野恩賜公園', t: 'parque', c: 'tokyo', ll: [35.71480, 139.77340], w: 'Ueno Park',
    d: 'Grande parque público (1873) que abriga museus, zoológico, templos e o lago Shinobazu. No nosso roteiro é uma travessia tranquila a pé entre Kappabashi e Ameyoko.',
    aka: ['Ueno Park'],
  },
  'shinobazu': {
    n: 'Lago Shinobazu', jp: '不忍池', t: 'parque', c: 'tokyo', ll: [35.71180, 139.77020], w: 'Shinobazu Pond',
    d: 'Lago no sul do Parque Ueno com um templo numa ilhota (Bentendo). No verão fica coberto de lótus; em dezembro é um passeio calmo com patos e vista dos prédios.',
    aka: ['Shinobazu', 'Bentendo'],
    g: '不忍池弁天堂',
  },
  'ameyoko': {
    n: 'Ameyoko', jp: 'アメ横', t: 'mercado', c: 'tokyo', ll: [35.71030, 139.77450], w: 'Ameya-Yokochō',
    d: 'Mercado de rua de ~400 m sob e ao lado dos trilhos do trem, entre Ueno e Okachimachi. Nasceu como mercado negro no pós-guerra; hoje tem frutas, peixes, doces, roupas, tênis e barracas de comida com clima barulhento e popular.',
    aka: ['Ameya-Yokocho', 'Ameyoko-cho', 'Okachimachi'],
  },
  'ueno-sta': {
    n: 'Estação Ueno', jp: '上野駅', t: 'estacao', c: 'tokyo', ll: [35.71380, 139.77730], w: 'Ueno Station',
    d: 'Grande estação JR no fim do nosso dia 2. Para voltar a Shinjuku: JR Yamanote ou metrô (Google Maps indica a melhor combinação).',
  },
  'ueno-okachimachi-sta': {
    n: 'Estação Ueno-okachimachi', jp: '上野御徒町駅', t: 'estacao', c: 'tokyo', ll: [35.70770, 139.77440], w: 'Ueno-okachimachi Station',
    d: 'Estação da linha Toei Oedo no fim sul de Ameyoko. Volta direta para Higashi-Shinjuku (~20 min), sem baldeação.',
  },
  'skytree': {
    n: 'Tokyo Skytree', jp: '東京スカイツリー', t: 'mirante', c: 'tokyo', ll: [35.71006, 139.81070], w: 'Tokyo Skytree',
    d: 'Torre de 634 m, a mais alta do Japão, visível de Asakusa do outro lado do rio Sumida. Ficou FORA do roteiro de propósito (consumiria horas), mas aparece em várias fotos do dia 2.',
    aka: ['Skytree'],
  },

  'ueno': {
    n: 'Ueno', jp: '上野', t: 'bairro', c: 'tokyo', ll: [35.71280, 139.77450], w: 'Ueno',
    d: 'Bairro popular no nordeste de Tóquio, em volta da grande estação Ueno: o Parque Ueno (com museus, zoológico e o lago Shinobazu) de um lado e o mercado de rua Ameyoko do outro. Ponto final da caminhada do Dia 2.',
  },
  'sumida-river': {
    n: 'Rio Sumida', jp: '隅田川', t: 'natureza', c: 'tokyo', ll: [35.71060, 139.80010], w: 'Sumida River',
    d: 'O rio que corta o leste de Tóquio e separa Asakusa da Tokyo Skytree. Suas margens têm passeios a pé e barcos turísticos; foi a principal via de transporte da antiga Edo.',
    aka: ['Sumida', 'rio Sumida'],
  },
  'nihonbashi': {
    n: 'Nihonbashi', jp: '日本橋', t: 'bairro', c: 'tokyo', ll: [35.68400, 139.77450], w: 'Nihonbashi',
    d: '"Ponte do Japão": bairro comercial tradicional a leste da Tokyo Station, onde fica a ponte que era o ponto zero de todas as estradas do Japão no período Edo. Hoje tem lojas de departamento históricas (Mitsukoshi, Takashimaya) e a Pokémon Center Tokyo DX.',
  },
  'icho-namiki': {
    n: 'Avenida dos Ginkgos (Jingu Gaien Icho Namiki)', jp: '神宮外苑いちょう並木', t: 'natureza', c: 'tokyo', ll: [35.67430, 139.71840], w: 'Meiji Jingu Gaien',
    d: 'Avenida de ~300 m com 146 árvores ginkgo que ficam douradas entre o fim de novembro e o início de dezembro. Fica a ~15 min a pé de Omotesando — um desvio opcional no Dia 3 se ainda estiver no auge.',
    aka: ['Gaien Icho Namiki', 'Jingu Gaien Icho Namiki', 'Avenida dos Ginkgos'],
  },
  'tsukiji': {
    n: 'Tsukiji Outer Market', jp: '築地場外市場', t: 'mercado', c: 'tokyo', ll: [35.66540, 139.77070], w: 'Tsukiji fish market',
    d: 'O mercado externo do antigo mercado de peixes de Tóquio, com centenas de bancas de frutos do mar, tamagoyaki e facas. Ficou fora do roteiro (abre cedo e muitas bancas fecham às quartas e domingos).',
    aka: ['Tsukiji', 'Tsukiji Outer Market'],
  },
  'odaiba': {
    n: 'Odaiba', jp: 'お台場', t: 'bairro', c: 'tokyo', ll: [35.62700, 139.77650], w: 'Odaiba',
    d: 'Ilha artificial na baía de Tóquio, com shoppings, a réplica da Estátua da Liberdade, o Gundam gigante e vistas da Rainbow Bridge. Ficou fora do roteiro.',
    aka: ['Odaiba'],
  },
  /* ---- Dia 3: Meiji / Harajuku / Omotesando / Shibuya ---- */
  'meiji-jingumae-sta': {
    n: 'Estação Meiji-jingumae (Harajuku)', jp: '明治神宮前〈原宿〉駅', t: 'estacao', c: 'tokyo', ll: [35.66880, 139.70450],
    w: 'Meiji-jingumae Station',
    d: 'Estação de metrô (linhas Fukutoshin e Chiyoda) no cruzamento de Omotesando com Meiji-dori. Da Higashi-Shinjuku são só 3 paradas diretas pela linha Fukutoshin.',
    g: '明治神宮前駅',
  },
  'harajuku-sta': {
    n: 'Estação Harajuku', jp: '原宿駅', t: 'estacao', c: 'tokyo', ll: [35.67020, 139.70270], w: 'Harajuku Station',
    d: 'Estação JR (linha Yamanote) ao lado da entrada do Meiji Jingu e da Takeshita Street.',
  },
  'meiji-jingu': {
    n: 'Meiji Jingu', jp: '明治神宮', t: 'santuario', c: 'tokyo', ll: [35.67640, 139.69930], w: 'Meiji Shrine',
    d: 'Santuário xintoísta de 1920 dedicado ao Imperador Meiji (que modernizou o Japão) e à Imperatriz Shoken. Fica dentro de uma floresta de 70 hectares plantada à mão com 100 mil árvores. Tem um dos maiores torii de madeira do Japão e uma parede de barris de saquê.',
    tip: 'Abre ao nascer do sol e é gratuito. Pela manhã é bem mais tranquilo.', aka: ['Meiji Shrine', 'Meiji Jingū', 'Santuário Meiji'],
  },
  'harajuku': {
    n: 'Harajuku', jp: '原宿', t: 'bairro', c: 'tokyo', ll: [35.67100, 139.70500], w: 'Harajuku',
    d: 'Bairro símbolo da moda jovem e das subculturas japonesas (kawaii, lolita, streetwear). Mistura lojas excêntricas, crepes, brechós e vielas criativas.',
    g: '原宿 渋谷区',
    aka: ['Jingumae'] 
  },
  'takeshita': {
    n: 'Takeshita Street', jp: '竹下通り', t: 'rua', c: 'tokyo', ll: [35.67150, 139.70480], w: 'Takeshita Street',
    d: 'Rua estreita de pedestres (~350 m) em frente à estação Harajuku: crepes recheados, algodão-doce colorido gigante, lojas kawaii, acessórios e moda adolescente. Lota muito, especialmente à tarde.',
    aka: ['Takeshita-dori', 'Takeshita'],
  },
  'omotesando': {
    n: 'Omotesando', jp: '表参道', t: 'rua', c: 'tokyo', ll: [35.66670, 139.70950], w: 'Omotesandō',
    d: 'Avenida arborizada (zelkovas) apelidada de "Champs-Élysées de Tóquio". Concentra flagships de grifes com arquitetura assinada (Tod\'s de Toyo Ito, Prada de Herzog & de Meuron, Dior de SANAA) e o shopping Omotesando Hills, de Tadao Ando.',
    aka: ['Omotesandō'],
  },
  'cat-street': {
    n: 'Cat Street', jp: 'キャットストリート', t: 'rua', c: 'tokyo', ll: [35.66450, 139.70630],
    cs: 'Cat Street Harajuku Shibuya',
    d: 'Rua sinuosa de pedestres que liga Harajuku a Shibuya sobre um antigo rio canalizado. Streetwear, sneakers, brechós de grife e cafés — bem mais tranquila que Takeshita.',
  },
  'on-store': {
    n: 'On Tokyo (Cat Street)', jp: 'On 東京', t: 'loja', c: 'tokyo', ll: [35.66688, 139.70598],
    img: false,
    d: 'Loja e café da marca suíça de tênis On, na Cat Street. Entrou no roteiro porque fica no caminho e resolve a compra do tênis sem desvio.',
    aka: ['On Store Tokyo Cat Street', 'On Store'], g: 'On Tokyo Cat Street',
  },
  'cosme-tokyo': {
    n: '@cosme TOKYO', jp: 'アットコスメトーキョー', t: 'loja', c: 'tokyo', ll: [35.67016, 139.70313],
    cs: '@cosme TOKYO Harajuku',
    d: 'A maior loja de cosméticos de Tóquio, com cerca de 200 marcas japonesas e internacionais em 3 andares, bem em frente à estação Harajuku. Ela é a loja física do @cosme, o maior site de avaliações de beleza do Japão: as prateleiras mostram os rankings dos produtos mais votados, o que facilita muito escolher skincare, protetor solar e maquiagem.',
    tip: 'Endereço: 1-14-27 Jingumae, Shibuya-ku. Abre ~11h–21h (confirmar). Loja tax-free: levar o passaporte.',
    aka: ['@cosme', '@cosme TOKYO', 'Cosme Tokyo'], g: '@cosme TOKYO Harajuku',
  },
  'donki-shibuya': {
    n: 'MEGA Don Quijote Shibuya', jp: 'MEGAドン・キホーテ渋谷本店', t: 'loja', c: 'tokyo', ll: [35.66045, 139.69784],
    cs: 'MEGA Don Quijote Shibuya',
    d: 'Uma das maiores Don Quijote de Tóquio, com vários andares (inclusive mercado), no meio de Shibuya, pertinho da Center Gai. Abre 24h.',
    g: 'MEGAドン・キホーテ 渋谷本店',
  },
  'shibuya': {
    n: 'Shibuya', jp: '渋谷', t: 'bairro', c: 'tokyo', ll: [35.65980, 139.70000], w: 'Shibuya',
    d: 'Um dos símbolos da Tóquio contemporânea: telões, neon, multidões, lojas e vida noturna jovem. Cenário de filmes (Encontros e Desencontros), animes e games como Persona 5 e The World Ends with You.',
  },
  'shibuya-sta': {
    n: 'Estação Shibuya', jp: '渋谷駅', t: 'estacao', c: 'tokyo', ll: [35.65800, 139.70160], w: 'Shibuya Station',
    d: 'Grande estação em constante reforma. Para voltar ao hotel: linha Fukutoshin direto até Higashi-Shinjuku (~10 min).',
  },
  'hachiko': {
    n: 'Estátua de Hachiko', jp: 'ハチ公像', t: 'monumento', c: 'tokyo', ll: [35.65905, 139.70058],
    cs: 'Hachikō statue Shibuya',
    d: 'Estátua do cão Akita Hachiko, que esperou o dono (um professor que morreu em 1925) na estação Shibuya todos os dias por quase 10 anos. Virou símbolo de lealdade — e o ponto de encontro mais famoso de Tóquio. A história inspirou o filme "Sempre ao Seu Lado".',
    aka: ['Hachiko', 'Hachikō', 'Akita'],
  },
  'shibuya-crossing': {
    n: 'Shibuya Crossing', jp: '渋谷スクランブル交差点', t: 'monumento', c: 'tokyo', ll: [35.65950, 139.70050], w: 'Shibuya Crossing',
    d: 'O cruzamento de pedestres mais movimentado do mundo: quando o sinal abre, até 3.000 pessoas atravessam em todas as direções ao mesmo tempo ("scramble"). Veja de cima (Shibuya Sky, Starbucks do Tsutaya) e depois atravesse.',
    aka: ['Scramble Crossing', 'cruzamento de Shibuya'],
  },
  'center-gai': {
    n: 'Center Gai', jp: 'センター街', t: 'rua', c: 'tokyo', ll: [35.66020, 139.69840], w: 'Center Gai',
    d: 'Rua de pedestres que sai do Shibuya Crossing, cheia de lojas, fast-food, game centers e karaokês. É o coração jovem e caótico de Shibuya.',
    aka: ['Center-gai'],
    g: '渋谷センター街',
  },
  'shibuya-sky': {
    n: 'Shibuya Sky', jp: '渋谷スカイ', t: 'mirante', c: 'tokyo', ll: [35.65853, 139.70223], w: 'Shibuya Scramble Square',
    d: 'Mirante a céu aberto no topo do arranha-céu Shibuya Scramble Square (~230 m). Vista 360° de Tóquio — em dias limpos, inclusive o Monte Fuji. A experiência mais famosa é ver o pôr do sol e a cidade acendendo.',
    tip: 'Em dezembro o sol se põe por volta das 16h30. Os horários do pôr do sol esgotam: reservar online com antecedência (normalmente libera ~4 semanas antes).',
    aka: ['Shibuya Scramble Square'],
  },
  'shibuya-parco': {
    n: 'Shibuya PARCO — Nintendo TOKYO & Pokémon Center', jp: '渋谷PARCO', t: 'games', c: 'tokyo', ll: [35.66205, 139.69880],
    cs: 'Nintendo Tokyo Shibuya Parco',
    d: 'No 6º andar do shopping Shibuya PARCO fica o "Cyberspace Shibuya": a loja oficial Nintendo TOKYO, o Pokémon Center Shibuya (com um Mewtwo gigante), a Capcom Store Tokyo e a Jump Shop. É O lugar de Tóquio que junta tudo de games em um só andar.',
    tip: 'Abre ~10h–21h. Em dias cheios a Nintendo TOKYO usa senha/fila numerada na entrada.',
    aka: ['Shibuya PARCO', 'PARCO', 'Nintendo TOKYO', 'Pokémon Center Shibuya', 'Capcom Store'],
  },

  /* ---- Ikebukuro (jantar do dia 2) ---- */
  'ikebukuro': {
    n: 'Ikebukuro', jp: '池袋', t: 'bairro', c: 'tokyo', ll: [35.72950, 139.71400], w: 'Ikebukuro',
    d: 'Grande centro comercial ao norte de Shinjuku, com uma das estações mais movimentadas de Tóquio. É o polo de anime e mangá alternativo a Akihabara: Animate (a maior loja de anime do mundo), Otome Road (voltada ao público feminino), Pokémon Center Mega Tokyo e o complexo Sunshine City. Fica a só 3 paradas do hotel pela linha Fukutoshin.',
  },
  'ikebukuro-sta': {
    n: 'Estação Ikebukuro', jp: '池袋駅', t: 'estacao', c: 'tokyo', ll: [35.72950, 139.71090], w: 'Ikebukuro Station',
    d: 'Estação gigante (JR Yamanote, metrô Fukutoshin/Marunouchi/Yurakucho, Seibu, Tobu). Use a saída leste (East Exit, 東口) para o Rikimaru, a Animate e o Sunshine City. Para voltar ao hotel: linha Fukutoshin até Higashi-Shinjuku (3 paradas, ~7 min).',
  },
  'rikimaru': {
    n: 'Yakiniku Rikimaru Ikebukuro', jp: '焼肉力丸 池袋東口店', t: 'noite', c: 'tokyo', ll: [35.72880, 139.71260], img: false,
    d: 'Rede de yakiniku (churrasco japonês na grelha da mesa) nascida em Osaka, famosa pelo rodízio de carne wagyu — língua grossa "Rikimaru", kalbi e harami de wagyu. A filial de Ikebukuro (saída leste, 5º andar do prédio FLC) foi a estreia da rede em Tóquio, em julho de 2025.',
    tip: 'Endereço: 1-22-2 Minami-Ikebukuro, FLC Bldg. 5F (〒171-0022 東京都豊島区南池袋1-22-2 FLCビル5F) — ~1 min da saída leste da estação JR Ikebukuro. Tel.: 03-6685-9044. Seg–sex só jantar (16h–23h30, último pedido 23h); sáb/dom/feriados também almoço (11h30). Reserve online (Gurunavi / Savor Japan). Rodízios costumam ter limite de tempo (geralmente 90–120 min) e o pedido é feito por tablet. Posição no mapa aproximada.',
    aka: ['Rikimaru', 'Yakiniku Rikimaru'], g: '焼肉力丸 池袋東口店',
  },
  'animate-ikebukuro': {
    n: 'Animate Ikebukuro (loja principal)', jp: 'アニメイト池袋本店', t: 'games', c: 'tokyo', ll: [35.73115, 139.71545],
    cs: 'Animate Ikebukuro',
    d: 'A maior loja de anime do mundo: um prédio inteiro de mangás, produtos oficiais de anime, figures, artbooks e eventos, na "Animate-dori" de Ikebukuro, a ~7 min a pé da saída leste.',
    tip: 'Opcional antes do jantar no Rikimaru (dia 07/12). Aberta até ~21h.', aka: ['Animate'],
  },
  'pokemon-center-mega': {
    n: 'Pokémon Center Mega Tokyo', jp: 'ポケモンセンターメガトウキョー', t: 'games', c: 'tokyo', ll: [35.72889, 139.71918],
    cs: 'Pokemon Center Mega Tokyo',
    d: 'Uma das maiores Pokémon Centers do Japão, no shopping Sunshine City (Alpa, 2º andar), com estátuas gigantes de Mega Charizard e Mega Mewtwo, produtos exclusivos e área de cards. ~12 min a pé da estação.',
    tip: 'Opcional antes do jantar no Rikimaru. O Sunshine City costuma fechar às 20h.', aka: ['Pokémon Center Mega Tokyo', 'Sunshine City'],
  },

  /* ---- Dia 4: Palácio / Tokyo Station / Marunouchi / Ginza ---- */
  'otemachi-sta': {
    n: 'Estação Otemachi', jp: '大手町駅', t: 'estacao', c: 'tokyo', ll: [35.68470, 139.76630], w: 'Ōtemachi Station',
    d: 'Estação de metrô ao lado do portão Ote-mon. Da região do hotel: linha Marunouchi a partir de Shinjuku-sanchome (~15 min, direto).',
    aka: ['Otemachi'] 
  },
  'shinjuku-sanchome-sta': {
    n: 'Estação Shinjuku-sanchome', jp: '新宿三丁目駅', t: 'estacao', c: 'tokyo', ll: [35.69050, 139.70600], w: 'Shinjuku-sanchōme Station',
    d: 'Estação de metrô (linhas Marunouchi, Fukutoshin e Shinjuku) a ~12 min a pé do hotel. A linha Marunouchi vai direto para Otemachi, Tokyo Station e Ginza.',
    aka: ['Shinjuku-sanchome'],
  },
  'east-gardens': {
    n: 'Imperial Palace East Gardens', jp: '皇居東御苑', t: 'parque', c: 'tokyo', ll: [35.68700, 139.75720],
    w: 'East Gardens of the Imperial Palace',
    d: 'Jardins abertos ao público dentro do Palácio Imperial, onde ficava o núcleo do antigo Castelo de Edo — a sede dos xoguns Tokugawa por 260 anos. Muralhas de pedra gigantes, fossos, a base da antiga torre principal e um jardim japonês clássico.',
    tip: 'Entrada gratuita. FECHA às segundas e sextas. Abre às 9h; em dezembro fecha às 16h (última entrada 15h30). 09/12 é quarta: ok.',
    aka: ['Jardins do Leste do Palácio Imperial', 'East Gardens', 'Palácio Imperial'],
  },
  'otemon': {
    n: 'Portão Ote-mon', jp: '大手門', t: 'historico', c: 'tokyo', ll: [35.68580, 139.76140], w: 'Ōte-mon (Edo Castle)',
    d: 'O antigo portão principal do Castelo de Edo e hoje a entrada mais usada dos East Gardens. Um bom exemplo de "masugata": portão em L feito para atrasar invasores.',
    aka: ['Ote-mon', 'Otemon'],
    g: 'Otemon Gate Imperial Palace',
  },
  'tokyo-sta': {
    n: 'Tokyo Station', jp: '東京駅', t: 'historico', c: 'tokyo', ll: [35.68120, 139.76710], w: 'Tokyo Station',
    d: 'Estação central de Tóquio (1914), com fachada de tijolos vermelhos de 335 m restaurada em 2012 — lembra a Estação Central de Amsterdã. Dentro: as cúpulas do lado Marunouchi, a Ramen Street e a Tokyo Character Street. É também de onde saem os Shinkansen.',
    aka: ['Estação de Tóquio', 'Estação Tóquio', 'Yaesu', 'Gyoko-dori'],
    g: '東京駅丸の内駅舎',
  },
  'character-street': {
    n: 'Tokyo Character Street', jp: '東京キャラクターストリート', t: 'games', c: 'tokyo', ll: [35.68030, 139.76840],
    img: false,
    d: 'Corredor no subsolo da Tokyo Station (saída Yaesu) com ~30 lojas oficiais de personagens: Pokémon, Jump Shop (One Piece, Dragon Ball), Studio Ghibli, Hello Kitty, Snoopy, Ultraman etc. Ao lado fica a Tokyo Ramen Street.',
    aka: ['Character Street', 'Ramen Street', 'Tokyo Ramen Street'],
  },
  'pokemon-center-dx': {
    n: 'Pokémon Center Tokyo DX & Pokémon Café', jp: 'ポケモンセンタートウキョーDX', t: 'games', c: 'tokyo', ll: [35.68076, 139.77352],
    img: false,
    d: 'A maior Pokémon Center de Tóquio, no Nihonbashi Takashimaya S.C. (anexo, 5º andar), a ~10 min a pé da Tokyo Station. Ao lado fica o Pokémon Café (pratos temáticos; exige reserva online com até 31 dias de antecedência).',
    tip: 'Opcional no dia 4, se quiser um desvio curto saindo da Tokyo Station.', aka: ['Pokémon Center Tokyo DX', 'Pokémon Café', 'Pokemon Cafe'],
  },
  'kitte': {
    n: 'KITTE (terraço com vista da Tokyo Station)', jp: 'KITTE 丸の内', t: 'mirante', c: 'tokyo', ll: [35.67960, 139.76470], w: 'JP Tower',
    d: 'Shopping no antigo prédio dos Correios, em frente à Tokyo Station. O terraço-jardim do 6º andar (KITTE Garden) é gratuito e tem a melhor vista da fachada de tijolos da estação e dos trilhos do Shinkansen.',
    aka: ['KITTE', 'KITTE Garden'],
    g: 'KITTE丸の内',
  },
  'marunouchi': {
    n: 'Marunouchi', jp: '丸の内', t: 'bairro', c: 'tokyo', ll: [35.68150, 139.76400], w: 'Marunouchi',
    d: 'Distrito financeiro elegante entre a Tokyo Station e o Palácio Imperial. Prédios corporativos, lojas de grife, cafés e calçadas largas — o contraste "organizado" com bairros caóticos como Shibuya.',
  },
  'naka-dori': {
    n: 'Marunouchi Naka-dori', jp: '丸の内仲通り', t: 'rua', c: 'tokyo', ll: [35.67900, 139.76310],
    cs: 'Marunouchi Nakadori',
    d: 'Rua arborizada de paralelepípedos no centro de Marunouchi, com lojas e cafés. No inverno costuma ter a "Marunouchi Illumination": 1,2 km de árvores iluminadas em dourado (confirmar edição de 2026).',
    aka: ['Naka-dori'],
  },
  'ginza': {
    n: 'Ginza', jp: '銀座', t: 'bairro', c: 'tokyo', ll: [35.67170, 139.76500], w: 'Ginza',
    d: 'O bairro mais sofisticado de Tóquio: lojas de departamento históricas (Mitsukoshi, Wako), flagships de marcas japonesas e internacionais, galerias, restaurantes e arquitetura moderna. Tem também a Uniqlo de 12 andares e a papelaria Itoya.',
  },
  'chuo-dori-ginza': {
    n: 'Chuo-dori (Ginza)', jp: '銀座中央通り', t: 'rua', c: 'tokyo', ll: [35.67100, 139.76530],
    cs: 'Ginza Chuo-dori',
    d: 'Avenida principal de Ginza. O cruzamento Ginza 4-chome, com o relógio da loja Wako (1932), é o símbolo do bairro. Aos sábados, domingos e feriados vira rua de pedestres à tarde.',
    aka: ['Chuo-dori de Ginza', 'Wako', 'Ginza 4-chome'],
    g: '和光本館',
  },
  'ginza-six': {
    n: 'GINZA SIX', jp: 'ギンザ シックス', t: 'loja', c: 'tokyo', ll: [35.66960, 139.76410], w: 'Ginza Six',
    d: 'Maior shopping de luxo de Ginza (2017), com obras de arte gigantes no átrio, livraria Tsutaya com livros de arte e um terraço-jardim gratuito no topo com vista do bairro.',
    aka: ['Ginza Six'],
  },
  'ginza-itchome-sta': {
    n: 'Estação Ginza-itchome', jp: '銀座一丁目駅', t: 'estacao', c: 'tokyo', ll: [35.67400, 139.76730], w: 'Ginza-itchōme Station',
    d: 'Estação da linha Yurakucho (dourada) no norte de Ginza. Vai direto até Toyosu em ~7 min — é a ponte entre Ginza e o teamLab Planets.',
  },
  'toyosu-sta': {
    n: 'Estação Toyosu', jp: '豊洲駅', t: 'estacao', c: 'tokyo', ll: [35.65490, 139.79610], w: 'Toyosu Station',
    d: 'Estação das linhas Yurakucho (metrô) e Yurikamome. Do metrô até o teamLab Planets são ~10 min a pé — ou 2 paradas de Yurikamome até Shin-Toyosu. A linha Yurakucho também vai direto até Ikebukuro.',
    aka: ['Toyosu', 'Shin-Toyosu'] 
  },
  'teamlab-planets': {
    n: 'teamLab Planets TOKYO', jp: 'チームラボプラネッツ TOKYO DMM', t: 'museu', c: 'tokyo', ll: [35.64938, 139.78973],
    cs: 'teamLab Planets Tokyo',
    d: 'Museu de arte digital imersiva do coletivo teamLab, em Toyosu, na baía de Tóquio. Percorre-se descalço: salas com água até os joelhos onde peixes de luz nadam ao seu redor, uma sala de espelhos com 60 mil lâmpadas (Infinite Crystal Universe), um universo de flores flutuantes e um jardim de orquídeas suspensas. Um dos lugares mais fotografados do Japão.',
    tip: 'Ingresso com data e horário marcados, só online (site oficial teamlabplanets.dmm.com); preço dinâmico, adulto ~¥3.600–4.800 (dias úteis mais baratos). Visita de ~1h30–2h. Use bermuda ou calça que dobre acima do joelho; evite saia (há pisos espelhados). Armários gratuitos na entrada e toalhas disponíveis. Estação Shin-Toyosu (Yurikamome) a 1 min; Toyosu (metrô Yurakucho) a ~10 min a pé.',
    aka: ['teamLab Planets', 'teamLab', 'TeamLab Planets', 'teamLab Planets Tokyo'], g: 'teamLab Planets TOKYO',
  },
  'daiso-ginza': {
    n: 'Daiso Ginza (loja principal)', jp: 'ダイソー マロニエゲート銀座店', t: 'loja', c: 'tokyo', ll: [35.67371, 139.76519],
    cs: 'Marronnier Gate Ginza',
    d: 'A loja principal mundial da Daiso (a "global flagship"), aberta em 2022 no 6º andar do Marronnier Gate Ginza 2. No mesmo andar estão as marcas irmãs Standard Products (utilidades de design simples, ~¥300) e THREEPPY (decoração e itens fofos). Fica a 2 min da estação Ginza-itchome, de onde sai o metrô para o teamLab.',
    tip: 'Endereço: 3-2-1 Ginza, Marronnier Gate Ginza 2, 6º andar. O prédio abre ~11h–21h.',
    aka: ['Daiso de Ginza', 'Marronnier Gate'], g: 'DAISO マロニエゲート銀座',
  },
  'gu-ginza': {
    n: 'GU Ginza (a maior do Japão)', jp: 'ジーユー銀座店', t: 'loja', c: 'tokyo', ll: [35.67088, 139.76426], img: false,
    d: 'A maior loja da GU no Japão, com 5 andares, na 5-7-7 Ginza, perto da saída A2 da estação Ginza. Há também uma GU menor no 5º andar do Marronnier Gate Ginza 2, o mesmo prédio da Daiso.',
    tip: 'Normalmente abre ~11h–21h (confirmar). Fica no meio da tarde de compras do Dia 4.',
    g: 'GU Ginza flagship store',
  },
  'ginza-sta': {
    n: 'Estação Ginza', jp: '銀座駅', t: 'estacao', c: 'tokyo', ll: [35.67170, 139.76390], w: 'Ginza Station',
    d: 'Estação de metrô no centro de Ginza. Para voltar ao hotel: linha Marunouchi direto até Shinjuku-sanchome (~17 min).',
  },

  'shinagawa-sta': {
    n: 'Estação Shinagawa', jp: '品川駅', t: 'estacao', c: 'tokyo', ll: [35.62850, 139.73880], w: 'Shinagawa Station',
    d: 'Estação onde o Shinkansen Tokaido também para (antes da Tokyo Station, sentido Kyoto). Mais fácil de acessar a partir de Shinjuku pela linha JR Yamanote.',
    aka: ['Shinagawa'],
  },
  /* ---- Aeroportos de Tóquio ---- */
  'narita': {
    n: 'Aeroporto de Narita (NRT)', jp: '成田国際空港', t: 'aeroporto', c: 'tokyo', ll: [35.77200, 140.39290], w: 'Narita International Airport',
    d: "NOSSO AEROPORTO DE CHEGADA. Principal aeroporto internacional de Tóquio, na província de Chiba, a ~70 km de Shinjuku — bem mais longe que Haneda. Até Shinjuku: trem Narita Express (N'EX, ~80–90 min, direto, ~¥3.330), Skyliner + JR com baldeação em Nippori (~75 min) ou ônibus Limousine (~1h30–2h).",
    tip: "Pouso em 05/12 às 17h20. O N'EX não aceita Suica: compre o bilhete com assento reservado no balcão JR ou nas máquinas da estação, no subsolo do terminal.",
    aka: ['Narita', 'NRT'],
  },
  'haneda': {
    n: 'Aeroporto de Haneda (HND)', jp: '羽田空港', t: 'aeroporto', c: 'tokyo', ll: [35.54940, 139.77980], w: 'Haneda Airport',
    d: 'Aeroporto mais próximo do centro de Tóquio (~20 km). Até Shinjuku: ônibus Limousine (~50–60 min) ou trem Keikyu + JR Yamanote (~50 min) — de táxi, ~40 min.',
    aka: ['Haneda', 'HND'],
  },

  /* ============================== MONTE FUJI (Plano B) ============================== */
  'busta-shinjuku': {
    n: 'Busta Shinjuku', jp: 'バスタ新宿', t: 'estacao', c: 'tokyo', ll: [35.68830, 139.70080], w: 'Busta Shinjuku',
    d: 'Maior terminal de ônibus rodoviários do Japão, em cima da estação Shinjuku (saída New South). Daqui saem os ônibus diretos para o Lago Kawaguchi/Monte Fuji (~2h).',
  },
  'mt-fuji': {
    n: 'Monte Fuji', jp: '富士山', t: 'natureza', c: 'fuji', ll: [35.36060, 138.72740], w: 'Mount Fuji',
    d: 'Vulcão ativo de 3.776 m, montanha mais alta e símbolo sagrado do Japão (Patrimônio Mundial). Em dezembro já está nevado e o ar seco aumenta as chances de céu limpo — mas ele se esconde nas nuvens com facilidade, por isso a decisão de ir só se toma vendo a previsão.',
    aka: ['Fuji', 'Fuji-san', 'Monte Fuji'],
  },
  'kawaguchiko-sta': {
    n: 'Estação Kawaguchiko', jp: '河口湖駅', t: 'estacao', c: 'fuji', ll: [35.49853, 138.76864], w: 'Kawaguchiko Station',
    d: 'Porta de entrada da região dos Cinco Lagos do Fuji. Daqui saem ônibus turísticos (Retro Bus) que circulam pelo lago Kawaguchi.',
  },
  'kawaguchiko': {
    n: 'Lago Kawaguchi', jp: '河口湖', t: 'natureza', c: 'fuji', ll: [35.51700, 138.75500], w: 'Lake Kawaguchi',
    d: 'O mais acessível dos Cinco Lagos do Fuji, com vistas clássicas da montanha refletida na água. A margem norte (Oishi Park) tem o melhor ângulo.',
    aka: ['Kawaguchiko', 'Kawaguchi', 'Fujikawaguchiko'],
    g: 'Lake Kawaguchi',
  },
  'chureito': {
    n: 'Pagode Chureito', jp: '忠霊塔', t: 'historico', c: 'fuji', ll: [35.50149, 138.80127], w: 'Chureito Pagoda',
    d: 'Pagode vermelho de 5 andares no Parque Arakurayama Sengen, com o Monte Fuji ao fundo — talvez a foto mais famosa do Japão. São ~400 degraus até o mirante.',
    aka: ['Chureito', 'Arakurayama Sengen'],
    g: 'Chureito Pagoda',
  },
  'shimoyoshida-sta': {
    n: 'Estação Shimoyoshida', jp: '下吉田駅', t: 'estacao', c: 'fuji', ll: [35.49773, 138.80353], w: 'Shimoyoshida Station',
    d: 'Estação da ferrovia Fujikyu mais próxima do Pagode Chureito (~10 min a pé até a escadaria).',
    aka: ['Shimoyoshida'] 
  },
  'oishi-park': {
    n: 'Oishi Park', jp: '大石公園', t: 'parque', c: 'fuji', ll: [35.52329, 138.74654],
    cs: 'Oishi Park Kawaguchiko Fuji',
    d: 'Parque à beira do lago Kawaguchi, na margem norte, com vista frontal do Fuji sobre a água. Tem café e loja de produtos locais.',
    g: '大石公園 富士河口湖町',
  },

  /* ============================== KYOTO ============================== */
  'kyoto-city': {
    n: 'Kyoto', jp: '京都 (Kyōto)', t: 'bairro', c: 'kyoto', ll: [35.01160, 135.76810], w: 'Kyoto', img: 'Yasaka-dori early morning with street lanterns and the Tower of Yasaka (Hokan-ji Temple), Kyoto, Japan.jpg',
    d: 'Capital imperial do Japão por mais de mil anos (794–1868). Tem cerca de 1.600 templos, 400 santuários e 17 Patrimônios Mundiais, e foi poupada dos bombardeios da Segunda Guerra. A cidade é um tabuleiro de ruas retas, cercado de montanhas por três lados.',
    g: '京都市',
  },
  'kyoto-sta': {
    n: 'Estação Kyoto', jp: '京都駅', t: 'estacao', c: 'kyoto', ll: [34.98580, 135.75880], w: 'Kyoto Station',
    d: 'Estação central de Kyoto, onde chega o Shinkansen. Prédio futurista (1997) com escadaria gigante e terraço. Para o hotel: metrô Karasuma (2 paradas até Shijo, ~4 min) ou táxi (~10 min).',
    aka: ['Hachijo'] 
  },
  'aeon-mall-kyoto': {
    n: 'AEON Mall Kyoto', jp: 'イオンモールKYOTO', t: 'loja', c: 'kyoto', ll: [34.98272, 135.75460],
    cs: 'AEON Mall Kyoto',
    d: 'Shopping a ~5 min a pé da saída sul (Hachijo) da Kyoto Station, com um supermercado grande do grupo AEON no térreo (KOHYO, ~9h–22h), praça de alimentação, Daiso e lojas de roupa. Ótimo para jantar e fazer mercado na volta do Nintendo Museum (Dia 11), que já passa pela Kyoto Station.',
    aka: ['AEON Mall', 'Aeon Mall Kyoto'], g: 'イオンモールKYOTO',
  },
  'hotel-kyoto': {
    n: 'Hotel Resol Kyoto Shijo Muromachi', jp: 'ホテルリソル京都 四条室町', t: 'hotel', c: 'kyoto', ll: [35.00067, 135.75795],
    d: 'Nossa base em Kyoto (10 a 13/12). Fica na rua Muromachi, logo ao sul da Shijo-dori, a ~3 min da estação Shijo (metrô Karasuma) / Karasuma (trem Hankyu). Localização central: Nishiki a 10 min e Gion a ~25 min a pé.',
    tip: 'Endereço: 554 Sannocho, Shimogyo-ku, Kyoto. Mostre ao taxista: ホテルリソル京都 四条室町',
    aka: ['Hotel Resol', 'Resol'], g: 'Hotel Resol Kyoto Shijo Muromachi',
  },
  'shijo-sta': {
    n: 'Estação Shijo / Karasuma', jp: '四条駅・烏丸駅', t: 'estacao', c: 'kyoto', ll: [35.00370, 135.75950], w: 'Shijō Station (Kyoto)',
    d: 'Duas estações interligadas embaixo do cruzamento Shijo-Karasuma: Shijo (metrô linha Karasuma, para a Kyoto Station) e Karasuma (trem Hankyu, para Arashiyama e Osaka-Umeda). A ~3 min do hotel.',
    aka: ['Shijo', 'Karasuma', 'Shijo-Karasuma', 'Shijo/Karasuma'],
    g: '四条駅 京都市営地下鉄',
  },
  'nishiki': {
    n: 'Mercado Nishiki', jp: '錦市場', t: 'mercado', c: 'kyoto', ll: [35.00505, 135.76480], w: 'Nishiki Market',
    d: '"A cozinha de Kyoto": rua coberta e estreita de ~400 m com mais de 100 bancas há 400 anos. Picles (tsukemono), tofu e yuba, doces de matcha, polvinho caramelizado com ovo de codorna, facas Aritsugu e muito petisco para provar.',
    tip: 'Funciona ~10h–17h/18h; muitas bancas fecham cedo. Não é permitido comer andando.', aka: ['Nishiki Market', 'Nishiki', 'Aritsugu'],
  },
  'kawaramachi': {
    n: 'Shijo-Kawaramachi', jp: '四条河原町', t: 'bairro', c: 'kyoto', ll: [35.00380, 135.76890],
    cs: 'Shijo Kawaramachi Kyoto',
    d: 'Principal cruzamento comercial de Kyoto: lojas de departamento (Takashimaya, Daimaru), galerias cobertas (Teramachi e Shinkyogoku) e restaurantes. Fica entre o hotel e o rio Kamo.',
    aka: ['Kawaramachi', 'Shijo/Kawaramachi', 'Shijo-dori', 'Teramachi', 'Shinkyogoku'],
    g: '京都髙島屋',
  },
  'nintendo-kyoto': {
    n: 'Nintendo KYOTO (Takashimaya)', jp: 'Nintendo KYOTO', t: 'games', c: 'kyoto', ll: [35.00307, 135.76843],
    cs: 'Takashimaya Kyoto store',
    d: 'Loja oficial da Nintendo na cidade natal da empresa, no 7º andar do Kyoto Takashimaya S.C. (prédio T8), com uma cabeça gigante do Mario na entrada do térreo. A Nintendo foi fundada em Kyoto em 1889 como fabricante de baralhos hanafuda!',
    tip: 'Fica a ~10 min a pé do hotel; aberta até ~20h. Ótimo para uma noite em Kyoto.', aka: ['Nintendo KYOTO'],
  },
  'seria-kawaramachi': {
    n: 'Seria Kawaramachi (OPA)', jp: 'セリア 河原町オーパ店', t: 'loja', c: 'kyoto', ll: [35.00450, 135.76960], img: false,
    d: 'Seria no 7º andar do Kawaramachi OPA, a 1 min da estação Kyoto-Kawaramachi, entre o Mercado Nishiki e Pontocho. Abre ~11h–21h. Posição no mapa aproximada.',
    g: 'セリア 河原町オーパ店',
  },
  'pontocho': {
    n: 'Pontocho', jp: '先斗町', t: 'rua', c: 'kyoto', ll: [35.00560, 135.77090], w: 'Pontochō',
    d: 'Viela de pedra estreitíssima (~500 m) paralela ao rio Kamo, iluminada por lanternas, com casas de chá, restaurantes e, às vezes, maikos a caminho do trabalho. Um dos lugares mais atmosféricos do Japão à noite.',
    tip: 'Muitos restaurantes têm preço alto; olhe o cardápio na porta. Evite fotografar pessoas sem permissão.', aka: ['Pontochō'],
    g: '先斗町通',
  },
  'kamo-river': {
    n: 'Rio Kamo', jp: '鴨川', t: 'natureza', c: 'kyoto', ll: [35.00450, 135.77180], w: 'Kamo River',
    d: 'Rio que corta o centro de Kyoto, com margens de passeio onde moradores caminham e sentam à beira d\'água. Separa a região do hotel (oeste) de Gion (leste).',
    aka: ['Kamogawa', 'rio Kamo'],
    g: '鴨川 京都 四条大橋',
    gmc: true,
  },
  'gion': {
    n: 'Gion', jp: '祇園', t: 'bairro', c: 'kyoto', ll: [35.00370, 135.77520], w: 'Gion',
    d: 'O distrito de geikos (gueixas de Kyoto) mais famoso do Japão, com casas de madeira (machiya), ochaya (casas de chá) e ruas de pedra. A melhor hora é ao entardecer, quando as lanternas acendem.',
    tip: 'Em várias vielas privadas de Gion é PROIBIDO fotografar (multa de até ¥10.000). Nunca pare ou toque em maikos/geikos.',
  },
  'hanamikoji': {
    n: 'Hanamikoji', jp: '花見小路', t: 'rua', c: 'kyoto', ll: [35.00260, 135.77500],
    cs: 'Hanamikoji',
    d: 'A rua mais famosa de Gion: fachadas de madeira escura com treliças, restaurantes kaiseki e ochaya exclusivas. É onde há mais chance de ver uma maiko ao anoitecer.',
    aka: ['Hanamikoji-dori', 'Hanami-koji'],
  },
  'shirakawa': {
    n: 'Gion Shirakawa', jp: '祇園白川', t: 'rua', c: 'kyoto', ll: [35.00590, 135.77440],
    img: 'Fake gaisha on Shirakawa Tatsumi Bridge at Gion area in Kyoto, Japan; 変身舞妓と白川巽橋、祇園、京都 (4496533708).jpg',
    d: 'Canal ladeado por salgueiros e casas de chá, com a pequena ponte Tatsumi-bashi. Considerado por muitos o cantinho mais bonito de Kyoto — especialmente iluminado à noite.',
    aka: ['Shirakawa', 'Tatsumi-bashi'],
  },
  'yasaka-shrine': {
    n: 'Santuário Yasaka', jp: '八坂神社', t: 'santuario', c: 'kyoto', ll: [35.00365, 135.77850], w: 'Yasaka Shrine',
    d: 'Santuário xintoísta com mais de 1.350 anos, no fim da rua Shijo, protetor de Gion. Seu salão de dança é coberto por centenas de lanternas que acendem à noite — lindo depois do pôr do sol. Aberto 24h e gratuito.',
    aka: ['Yasaka Shrine', 'Yasaka-jinja', 'Yasaka'],
    g: 'Yasaka Shrine Kyoto',
  },
  'inari-sta': {
    n: 'Estação JR Inari', jp: '稲荷駅', t: 'estacao', c: 'kyoto', ll: [34.96720, 135.77000], w: 'Inari Station',
    d: 'Estação JR (linha Nara) bem em frente ao grande torii do Fushimi Inari. A linha Nara também segue direto até Uji — por isso o dia 11 flui sem voltar ao centro.',
    g: 'JR稲荷駅',
  },
  'fushimi-inari': {
    n: 'Fushimi Inari Taisha', jp: '伏見稲荷大社', t: 'santuario', c: 'kyoto', ll: [34.96714, 135.77267], w: 'Fushimi Inari-taisha',
    d: 'Santuário principal das ~30 mil filiais dedicadas a Inari, kami do arroz, da prosperidade e dos negócios. Famoso pelos ~10 mil torii vermelhos doados por empresas e pessoas, formando túneis que sobem o monte Inari. As raposas (kitsune) são as mensageiras de Inari.',
    tip: 'Aberto 24h e gratuito. Chegar antes das 8h faz toda a diferença. A subida completa leva 2–3h; o trecho principal leva ~45 min.',
    aka: ['Fushimi Inari', 'Fushimi Inari-taisha', 'Fushimi', 'Yotsutsuji'],
  },
  'senbon-torii': {
    n: 'Senbon Torii', jp: '千本鳥居', t: 'santuario', c: 'kyoto', ll: [34.96620, 135.77480],
    cs: 'Senbon Torii Fushimi Inari',
    d: '"Mil torii": os dois corredores paralelos de portais vermelhos logo atrás do salão principal do Fushimi Inari. É a imagem mais famosa do santuário. Cada torii tem escrito o nome de quem doou e a data.',
  },
  'uji-sta': {
    n: 'Estação JR Uji', jp: 'JR宇治駅', t: 'estacao', c: 'kyoto', ll: [34.88940, 135.80020], w: 'Uji Station (JR West)',
    d: 'Estação JR de Uji (linha Nara). Da estação até o Byodo-in são ~10 min a pé pela rua de lojas de chá.',
  },
  'uji': {
    n: 'Uji', jp: '宇治', t: 'bairro', c: 'kyoto', ll: [34.89100, 135.80500], w: 'Uji, Kyoto',
    d: 'Cidade ao sul de Kyoto, capital histórica do chá verde japonês (o matcha de Uji é considerado o melhor do país) e cenário dos capítulos finais do "Conto de Genji", romance do ano 1000. É também a cidade-sede do Nintendo Museum.',
    g: '宇治市',
  },
  'byodoin-omotesando': {
    n: 'Byodo-in Omotesando (rua do chá)', jp: '平等院表参道', t: 'rua', c: 'kyoto', ll: [34.89030, 135.80640],
    cs: 'Uji tea shop street',
    d: 'Rua de acesso ao Byodo-in repleta de casas de chá centenárias: matcha, sorvete de matcha, dango, soba de chá verde e doces. O lugar certo para o almoço e o matcha do dia.',
    aka: ['rua do chá', 'Omotesando de Uji', 'Nakamura Tokichi'],
  },
  'byodoin': {
    n: 'Byodo-in', jp: '平等院', t: 'templo', c: 'kyoto', ll: [34.88936, 135.80770], w: 'Byōdō-in',
    d: 'Templo budista de 1053, Patrimônio Mundial. Seu Salão da Fênix (Hoo-do), refletido no lago, é tão emblemático que está estampado na moeda de ¥10 — tenha uma no bolso para comparar! O museu Hoshokan guarda as fênix originais do telhado.',
    tip: 'Abre 8h30–17h30. Entrada ~¥700 (+ ~¥300 para o interior do salão, com horário marcado).', aka: ['Byōdō-in', 'Byodoin', 'Phoenix Hall', 'Salão da Fênix', 'Hoo-do', 'Hoshokan'],
  },
  'uji-bridge': {
    n: 'Ponte Uji e rio Uji', jp: '宇治橋', t: 'natureza', c: 'kyoto', ll: [34.89300, 135.80580], w: 'Uji Bridge',
    d: 'Uma das pontes mais antigas do Japão (fundada em 646), sobre o rio Uji, de águas rápidas e cercado de montanhas. A margem do rio é perfeita para caminhar depois do Byodo-in; há uma estátua de Murasaki Shikibu, autora do Conto de Genji.',
    aka: ['Rio Uji', 'rio Uji', 'Uji River', 'Ujibashi'],
    g: 'Uji Bridge',
  },
  'jr-ogura-sta': {
    n: 'Estação JR Ogura', jp: 'JR小倉駅', t: 'estacao', c: 'kyoto', ll: [34.88915, 135.78629],
    cs: 'JR Ogura Station Uji',
    d: 'Estação JR (linha Nara), uma parada depois de Uji (~3 min). O Nintendo Museum fica a ~8 min a pé da saída norte.',
    aka: ['Ogura', 'JR Ogura'] 
  },
  'nintendo-museum': {
    n: 'Nintendo Museum', jp: 'ニンテンドーミュージアム', t: 'museu', c: 'kyoto', ll: [34.89257, 135.78420], w: 'Nintendo Museum',
    d: 'Museu oficial da Nintendo (aberto em out/2024), instalado na antiga fábrica de baralhos hanafuda e controles em Ogura, Uji. Mostra toda a história da empresa — das cartas de 1889 ao Switch — e tem jogos interativos gigantes, além de uma loja exclusiva e café temático.',
    tip: 'NOSSO INGRESSO: 11/12/2026 (sexta), entrada entre 14h30 e 15h00. Levar o PASSAPORTE (o nome precisa bater com o do ingresso) e o QR code do ingresso. Fecha às 18h.',
    aka: ['Nintendo Museum', 'museu da Nintendo', 'Museu da Nintendo'], g: 'Nintendo Museum Uji',
  },
  'higashiyama': {
    n: 'Higashiyama', jp: '東山', t: 'bairro', c: 'kyoto', ll: [34.99850, 135.78150], w: 'Higashiyama-ku, Kyoto',
    d: '"Montanhas do Leste": o distrito histórico no sopé das colinas a leste do rio Kamo. Concentra a Kyoto mais preservada — Kiyomizu-dera, ladeiras de pedra com casas de madeira, o Pagode Yasaka, Kodai-ji e Gion. É o coração do nosso dia 12.',
    g: '京都市東山区',
  },
  'kiyomizu': {
    n: 'Kiyomizu-dera', jp: '清水寺', t: 'templo', c: 'kyoto', ll: [34.99485, 135.78504], w: 'Kiyomizu-dera',
    d: 'Templo budista fundado em 778, Patrimônio Mundial e um dos maiores ícones de Kyoto. Seu grande terraço de madeira, sustentado por 139 pilares sem nenhum prego, fica 13 m acima da encosta, com vista da cidade. Abaixo fica a fonte Otowa, cujas três águas trazem sorte.',
    tip: 'Abre às 6h. Chegando ~7h30 você pega o templo quase vazio. Entrada ~¥500.', aka: ['Kiyomizu', 'Kiyomizudera', 'Otowa', 'Fonte Otowa'],
  },
  'sannenzaka': {
    n: 'Sannenzaka', jp: '三年坂', t: 'rua', c: 'kyoto', ll: [34.99640, 135.78150], w: 'Sannenzaka',
    d: 'Ladeira de pedra com escadarias e casas de madeira preservadas do período Edo, cheia de lojas de cerâmica, doces, picles e chá. Diz a lenda que quem tropeça aqui terá 3 anos de azar — vá com calma!',
    aka: ['Sannen-zaka'],
    gmc: true,
  },
  'ninenzaka': {
    n: 'Ninenzaka', jp: '二年坂', t: 'rua', c: 'kyoto', ll: [34.99800, 135.78060],
    cs: 'Ninenzaka Kyoto',
    d: 'Continuação natural de Sannenzaka, com o mesmo clima de Kyoto antiga. Aqui fica o famoso Starbucks em uma machiya de 100 anos, com tatames.',
    aka: ['Ninen-zaka'],
    g: 'Ninenzaka Kyoto',
  },
  'yasaka-pagoda': {
    n: 'Pagode Yasaka (Hokan-ji)', jp: '八坂の塔', t: 'templo', c: 'kyoto', ll: [34.99856, 135.77920], w: 'Hōkan-ji',
    d: 'Pagode de 5 andares e 46 m (reconstruído em 1440) que desponta no meio das ruas antigas de Higashiyama. A vista dele pela rua Yasaka-dori é uma das fotos mais clássicas de Kyoto.',
    aka: ['Yasaka Pagoda', 'Hokan-ji', 'Yasaka-no-to'],
    g: 'Yasaka Pagoda Kyoto',
  },
  'nene-no-michi': {
    n: 'Nene-no-michi', jp: 'ねねの道', t: 'rua', c: 'kyoto', ll: [35.00080, 135.78020],
    cs: 'Nene no michi',
    d: 'Rua elegante de pedras claras, batizada em homenagem a Nene, viúva do unificador Toyotomi Hideyoshi, que fundou o Kodai-ji. Tranquila e fotogênica, liga Ninenzaka ao Parque Maruyama.',
    aka: ['Nene-no-Michi'],
  },
  'kodaiji': {
    n: 'Kodai-ji', jp: '高台寺', t: 'templo', c: 'kyoto', ll: [35.00060, 135.78120], w: 'Kōdai-ji',
    d: 'Templo zen (1606) construído por Nene em memória de Hideyoshi, com jardins de pedra, um bosque de bambu e salões de chá. Opcional no dia — entra se houver vontade.',
    aka: ['Kodaiji', 'Kōdai-ji'],
    g: 'Kodaiji Temple',
  },
  'maruyama': {
    n: 'Parque Maruyama', jp: '円山公園', t: 'parque', c: 'kyoto', ll: [35.00350, 135.78080], w: 'Maruyama Park',
    d: 'Parque público mais antigo de Kyoto (1886), logo atrás do Santuário Yasaka. Lago, caminhos e um famoso cerejeira-chorona. Uma pausa natural entre Higashiyama e Gion.',
    aka: ['Maruyama Park', 'Maruyama'],
  },
  'shijo-omiya-sta': {
    n: 'Estação Shijo-Omiya (Randen)', jp: '四条大宮駅', t: 'estacao', c: 'kyoto', ll: [35.00325, 135.74849], w: 'Shijō-Ōmiya Station',
    d: 'Ponto inicial do Randen (bonde Keifuku), o charmoso bondinho de uma linha só que vai até o centro de Arashiyama. A ~15 min a pé do hotel (ou 1 parada de Hankyu desde Karasuma).',
    aka: ['Shijo-Omiya', 'Omiya'],
  },
  'randen-arashiyama-sta': {
    n: 'Estação Arashiyama (Randen)', jp: '嵐山駅〈嵐電〉', t: 'estacao', c: 'kyoto', ll: [35.01522, 135.67770], w: 'Arashiyama Station (Keifuku)',
    d: 'Estação final do Randen, no meio da rua principal de Arashiyama, a 2 min do Tenryu-ji. Tem a "Kimono Forest": 600 postes iluminados com tecidos de kimono.',
    g: '嵐電 嵐山駅',
  },
  'arashiyama': {
    n: 'Arashiyama', jp: '嵐山', t: 'bairro', c: 'kyoto', ll: [35.01250, 135.67700], w: 'Arashiyama',
    d: 'Região no oeste de Kyoto, aos pés das montanhas, onde a nobreza da era Heian construía casas de veraneio. Combina o bambuzal, templos zen, o rio Hozu/Katsura, a ponte Togetsukyo e a montanha dos macacos.',
    aka: ['Arashiyama / Saga', 'Sagano'],
    g: '嵐山 京都',
  },
  'bamboo-grove': {
    n: 'Bambuzal de Arashiyama', jp: '竹林の小径', t: 'natureza', c: 'kyoto', ll: [35.01700, 135.67180], w: 'Sagano Bamboo Forest',
    d: 'Caminho de ~400 m entre bambus gigantes que chegam a 20 m de altura e fazem um som característico com o vento (está na lista oficial de "100 paisagens sonoras do Japão"). Cedo pela manhã é mágico; a partir das 9h30 lota.',
    tip: 'Aberto 24h e gratuito.', aka: ['Bamboo Grove', 'Arashiyama Bamboo Grove', 'bambuzal'],
    gmc: true,
  },
  'tenryuji': {
    n: 'Tenryu-ji', jp: '天龍寺', t: 'templo', c: 'kyoto', ll: [35.01560, 135.67360], w: 'Tenryū-ji',
    d: 'Templo zen (1339), Patrimônio Mundial e o mais importante de Arashiyama. Seu jardim de lago, desenhado pelo monge Muso Soseki, usa as montanhas ao fundo como "paisagem emprestada" (shakkei). O jardim tem saída direta para o bambuzal.',
    tip: 'Jardim abre às 8h30. Entrada ~¥500 (+¥300 para os salões).', aka: ['Tenryuji', 'Tenryū-ji'],
  },
  'okochi': {
    n: 'Okochi Sanso', jp: '大河内山荘', t: 'parque', c: 'kyoto', ll: [35.01663, 135.66959], w: 'Ōkōchi Sansō',
    d: 'Vila e jardim do ator de filmes de samurai Denjiro Okochi, construída ao longo de 30 anos no topo do bambuzal. A entrada (~¥1.000) inclui chá matcha e doce; tem vistas de Kyoto e das montanhas.',
    tip: 'Normalmente abre às 9h.', aka: ['Okochi Sanso Villa', 'Ōkōchi Sansō', 'Denjiro Okochi'],
  },
  'togetsukyo': {
    n: 'Ponte Togetsukyo', jp: '渡月橋', t: 'monumento', c: 'kyoto', ll: [35.01290, 135.67780], w: 'Togetsukyō',
    d: '"Ponte que a lua atravessa": ponte de madeira de 155 m sobre o rio Katsura, símbolo de Arashiyama, com as montanhas ao fundo. O nome vem de um imperador que viu a lua parecer cruzá-la.',
    aka: ['Togetsukyo Bridge', 'Togetsu-kyo', 'Togetsukyo'],
  },
  'hankyu-arashiyama-sta': {
    n: 'Estação Hankyu Arashiyama', jp: '阪急嵐山駅', t: 'estacao', c: 'kyoto', ll: [35.00950, 135.68120], w: 'Arashiyama Station (Hankyu)',
    d: 'Estação do trem Hankyu, do outro lado da ponte Togetsukyo. Volta para Karasuma (perto do hotel) com uma troca em Katsura (~25 min).',
  },
  'katsura-river': {
    n: 'Rio Katsura (Hozu)', jp: '桂川・保津川', t: 'natureza', c: 'kyoto', ll: [35.01250, 135.67800], w: 'Katsura River',
    d: 'O rio que passa por Arashiyama, sob a ponte Togetsukyo. Mais acima, entre as montanhas, chama-se Hozu (há passeios de barco por suas corredeiras); ao chegar à cidade vira Katsura. A estação Katsura, do trem Hankyu, é onde se faz a baldeação entre Arashiyama e o centro.',
    aka: ['Katsura', 'rio Katsura', 'Hozu', 'rio Hozu'],
  },
  'kinkakuji': {
    n: 'Kinkaku-ji (Pavilhão Dourado)', jp: '金閣寺', t: 'templo', c: 'kyoto', ll: [35.03940, 135.72920], w: 'Kinkaku-ji',
    d: 'Pavilhão revestido de folhas de ouro refletido num lago — um dos ícones de Kyoto. Está FORA do roteiro atual (fica isolado no noroeste da cidade, exigiria meio dia de deslocamento).',
    aka: ['Kinkaku-ji', 'Kinkakuji', 'Pavilhão Dourado'],
  },

  /* ============================== OSAKA ============================== */
  'osaka-city': {
    n: 'Osaka', jp: '大阪 (Ōsaka)', t: 'bairro', c: 'osaka', ll: [34.69370, 135.50220], w: 'Osaka',
    d: 'Terceira maior cidade do Japão e histórico centro comercial do país — a "cozinha do Japão". Mais barulhenta, descontraída e bem-humorada que Tóquio, com fama de ter o povo mais simpático e a melhor comida de rua (takoyaki, okonomiyaki, kushikatsu).',
    g: '大阪市',
  },
  'hotel-osaka': {
    n: 'GRIDS Premium Hotel Osaka Namba', jp: 'グリッズプレミアムホテル大阪なんば', t: 'hotel', c: 'osaka', ll: [34.66470, 135.49930],
    d: 'Nossa base em Osaka (13 a 16/12). Fica em Nambanaka, a ~1–2 min da saída 6 da estação Namba, perto da Nankai Namba (trem para o aeroporto KIX). Dotonbori a ~10 min a pé.',
    tip: 'Endereço: 1-7-7 Nambanaka, Naniwa-ku, Osaka. Posição no mapa aproximada — confirme no Google Maps. Mostre ao taxista: グリッズプレミアムホテル大阪なんば',
    aka: ['GRIDS', 'GRIDS Premium'], g: 'GRIDS PREMIUM HOTEL OSAKA NAMBA',
  },
  'namba-sta': {
    n: 'Estação Namba / Nankai Namba', jp: '難波駅・南海なんば駅', t: 'estacao', c: 'osaka', ll: [34.66270, 135.50150], w: 'Namba Station',
    d: 'Complexo de estações no coração de Namba: metrô (Midosuji, Yotsubashi, Sennichimae), Nankai (trem direto para o aeroporto KIX, inclusive o expresso Rapi:t) e Kintetsu/Hanshin.',
    aka: ['Nankai Namba', 'estação Namba'],
  },
  'namba': {
    n: 'Namba', jp: '難波', t: 'bairro', c: 'osaka', ll: [34.66550, 135.50100], w: 'Namba',
    d: 'O "Minami" (sul) de Osaka: centro de compras, comida e entretenimento que inclui Dotonbori, Shinsaibashi, Sennichimae e Den Den Town. É barulhento, colorido e muito mais descontraído que Tóquio.',
    aka: ['Minami'],
    g: 'なんば 大阪',
  },
  'namba-yasaka': {
    n: 'Namba Yasaka Jinja', jp: '難波八阪神社', t: 'santuario', c: 'osaka', ll: [34.66140, 135.49730], w: 'Namba Yasaka Shrine',
    d: 'Pequeno santuário famoso pelo palco em forma de cabeça de leão gigante (12 m de altura), cuja boca aberta "engole" os maus espíritos e atrai sorte nos estudos e nos negócios. A poucos minutos do hotel.',
    aka: ['Namba Yasaka Shrine', 'Namba Yasaka'],
  },
  'namba-parks': {
    n: 'Namba Parks', jp: 'なんばパークス', t: 'loja', c: 'osaka', ll: [34.66170, 135.50230], w: 'Namba Parks',
    d: 'Shopping com um parque em terraços que sobe por 8 andares, com plantas, cascatas e áreas de descanso — como um cânion verde no meio da cidade. Ao lado da Nankai Namba.',
  },
  'dotonbori': {
    n: 'Dotonbori', jp: '道頓堀', t: 'noite', c: 'osaka', ll: [34.66870, 135.50130], w: 'Dōtonbori',
    d: 'Canal e rua de entretenimento que é O símbolo de Osaka: letreiros gigantes e animados (caranguejo, polvo, baiacu), neon refletido na água, takoyaki, okonomiyaki e multidão. Melhor à noite.',
    aka: ['Dōtonbori'],
  },
  'glico': {
    n: 'Letreiro da Glico', jp: 'グリコサイン', t: 'monumento', c: 'osaka', ll: [34.66880, 135.50110],
    cs: 'Glico Man',
    d: 'O "Glico Man", atleta de braços erguidos cruzando a linha de chegada, iluminado desde 1935 pela fabricante de doces Glico (a do Pocky). A foto imitando a pose na ponte Ebisubashi é obrigatória.',
    aka: ['Glico', 'Glico Man', 'Ebisubashi'],
  },
  'donki-dotonbori': {
    n: 'Don Quijote Dotonbori', jp: 'ドン・キホーテ 道頓堀店', t: 'loja', c: 'osaka', ll: [34.66890, 135.50250],
    cs: 'Don Quijote Dotonbori Ebisu Tower',
    d: 'A Don Quijote "da roda-gigante" (Ebisu Tower), no canal de Dotonbori. Abre até de madrugada e fica a ~10 min do hotel. Posição no mapa aproximada.',
    g: 'ドン・キホーテ 道頓堀店',
  },
  'hozenji': {
    n: 'Hozen-ji', jp: '法善寺', t: 'templo', c: 'osaka', ll: [34.66780, 135.50250], w: 'Hōzen-ji',
    d: 'Pequeno templo escondido a uma quadra de Dotonbori. Sua estátua de Fudo Myoo está completamente coberta de musgo verde, porque os visitantes jogam água nela ao fazer pedidos.',
    aka: ['Hozenji', 'Hōzen-ji'],
  },
  'hozenji-yokocho': {
    n: 'Hozenji Yokocho', jp: '法善寺横丁', t: 'rua', c: 'osaka', ll: [34.66810, 135.50200],
    cs: 'Hozenji Yokocho',
    d: 'Viela de pedra iluminada por lanternas ao lado do templo Hozen-ji, com ~60 restaurantes pequenos (okonomiyaki, kushikatsu, oden, bares). Um pedaço da Osaka antiga a metros do caos de Dotonbori.',
  },
  'minoh-kayano-sta': {
    n: 'Estação Minoh-Kayano', jp: '箕面萱野駅', t: 'estacao', c: 'osaka', ll: [34.83239, 135.48902],
    img: false,
    d: 'Nova estação final (2024) da linha Midosuji/Kita-Osaka Kyuko — dá para vir direto de Namba sem baldeação (~40 min). Do ponto de ônibus nº 8 sai o ônibus Hankyu para o Katsuo-ji.',
    aka: ['Minoh-Kayano'] 
  },
  'katsuoji': {
    n: 'Katsuo-ji', jp: '勝尾寺', t: 'templo', c: 'osaka', ll: [34.86562, 135.49226], w: 'Katsuō-ji',
    d: 'Templo budista nas montanhas de Minoh, fundado há ~1.300 anos, conhecido como "templo da vitória". Milhares de daruma vermelhos (bonecos da perseverança) estão espalhados por toda parte: em telhados, escadas, muros e lanternas. Os visitantes compram um daruma e o deixam no templo após realizar um desejo.',
    tip: 'Ônibus Hankyu do ponto 8 de Minoh-Kayano (~25 min, só IC card, a cada ~30 min nos dias úteis). Entrada ~¥500. Fecha ~17h. Confirmar tabela perto da viagem.',
    aka: ['Katsuoji', 'Katsuō-ji'],
    g: 'Katsuoji Temple',
  },
  'minoh-falls': {
    n: 'Cachoeira de Minoh', jp: '箕面大滝', t: 'natureza', c: 'osaka', ll: [34.85389, 135.47197], w: 'Minoo Falls',
    d: 'Cachoeira de 33 m no Parque Meiji-no-Mori Minoh. A trilha de ~2,8 km a partir da estação Hankyu Minoh segue um riacho na mata, com lojinhas de momiji tempura (folhas de bordo fritas) no caminho.',
    aka: ['Minoh Falls', 'Minoo Falls', 'cachoeira de Minoh'],
    g: 'Minoo Falls',
  },
  'minoh-park': {
    n: 'Parque Minoh', jp: '箕面公園', t: 'natureza', c: 'osaka', ll: [34.84300, 135.47100], w: 'Meiji no Mori Minō Quasi-National Park',
    d: 'Parque natural nas montanhas ao norte de Osaka, famoso pelos bordos (momiji) e pelos macacos selvagens. Em meados de dezembro as folhas já caíram em sua maioria, mas a caminhada pela mata segue linda.',
    tip: 'Atenção aos macacos: não mostre comida.', aka: ['Minoh Park', 'Minoh', 'Minoo'],
    g: 'Minoo Park',
  },
  'minoh-sta': {
    n: 'Estação Hankyu Minoh', jp: '箕面駅', t: 'estacao', c: 'osaka', ll: [34.83478, 135.46824], w: 'Minoo Station',
    d: 'Estação final da linha Hankyu Minoh, no início da trilha da cachoeira. Para Umeda: Hankyu Minoh → troca em Ishibashi-handai-mae → Osaka-Umeda (~30 min).',
    g: '阪急箕面駅',
  },
  'umeda': {
    n: 'Umeda', jp: '梅田', t: 'bairro', c: 'osaka', ll: [34.70250, 135.49590], w: 'Umeda',
    d: 'O "Kita" (norte) de Osaka: centro de arranha-céus, shoppings subterrâneos gigantescos e as estações Osaka/Umeda. Mais moderno e corporativo que Namba.',
    aka: ['Kita', 'Osaka-Umeda', 'Osaka Station'],
    g: '梅田 大阪',
  },
  'umeda-sta': {
    n: 'Estação Osaka-Umeda', jp: '大阪梅田駅', t: 'estacao', c: 'osaka', ll: [34.70520, 135.49860], w: 'Osaka-umeda Station',
    d: 'Terminal dos trens Hankyu (para Kyoto, Minoh e Takarazuka), colado à estação JR Osaka e às estações Umeda do metrô (linha Midosuji, direto para Namba).',
  },
  'umeda-sky': {
    n: 'Umeda Sky Building', jp: '梅田スカイビル', t: 'mirante', c: 'osaka', ll: [34.70530, 135.49050], w: 'Umeda Sky Building',
    d: 'Duas torres de 40 andares unidas no topo por um anel — o "Floating Garden Observatory", com terraço a céu aberto e vista 360° de Osaka. Lindo ao pôr do sol e à noite. Opção de mirante para o dia 14.',
    tip: 'Aberto até ~22h30. Entrada ~¥2.000.', aka: ['Floating Garden', 'Umeda Sky', 'mirante em Umeda', 'Takimi Koji'],
  },
  'daimaru-umeda': {
    n: 'Nintendo OSAKA & Pokémon Center Osaka (Daimaru Umeda)', jp: '大丸梅田店 13F', t: 'games', c: 'osaka', ll: [34.70191, 135.49645],
    cs: 'Daimaru Umeda',
    d: 'O 13º andar da loja de departamento Daimaru Umeda (colada à estação JR Osaka) reúne a Nintendo OSAKA (a maior das lojas oficiais Nintendo), o Pokémon Center Osaka e a Capcom Store. Encaixa perfeito no fim do dia 14.',
    tip: 'Abre ~10h–20h (segue o horário da Daimaru).', aka: ['Nintendo OSAKA', 'Pokémon Center Osaka', 'Daimaru Umeda'],
    g: 'Nintendo OSAKA',
  },
  'osaka-castle': {
    n: 'Castelo de Osaka', jp: '大阪城', t: 'historico', c: 'osaka', ll: [34.68730, 135.52620], w: 'Osaka Castle',
    d: 'Construído em 1583 por Toyotomi Hideyoshi, o unificador do Japão, foi palco da batalha final que deu o país aos Tokugawa (1615). A torre atual (1931, reformada) tem 8 andares com museu e mirante; o parque ao redor tem muralhas imensas e fossos.',
    tip: 'Torre/museu ~9h–17h, entrada ~¥1.200. O parque é gratuito.', aka: ['Osaka Castle', 'Osaka-jo'],
  },
  'tanimachi4-sta': {
    n: 'Estação Tanimachi 4-chome', jp: '谷町四丁目駅', t: 'estacao', c: 'osaka', ll: [34.68350, 135.51800], w: 'Tanimachi Yonchōme Station',
    d: 'Estação de metrô (linhas Tanimachi e Chuo) a ~15 min a pé da torre do castelo, entrando pelo portão Otemon.',
  },
  'kuromon': {
    n: 'Mercado Kuromon', jp: '黒門市場', t: 'mercado', c: 'osaka', ll: [34.66530, 135.50660], w: 'Kuromon Market',
    d: '"A cozinha de Osaka": galeria coberta de ~600 m com ~150 bancas de frutos do mar, wagyu grelhado na hora, frutas, tamagoyaki, ouriço, morangos gigantes e doces. Ideal para almoçar beliscando várias coisas.',
    tip: 'Funciona ~9h–17h/18h. Fica a ~10 min a pé do hotel.', aka: ['Kuromon Market', 'Kuromon'],
  },
  'nippombashi-sta': {
    n: 'Estação Nippombashi', jp: '日本橋駅', t: 'estacao', c: 'osaka', ll: [34.66680, 135.50740], w: 'Nippombashi Station',
    d: 'Estação de metrô ao lado do Mercado Kuromon (linhas Sakaisuji e Sennichimae).',
    g: '日本橋駅 大阪メトロ',
    aka: ['Nippombashi'],
  },
  'den-den-town': {
    n: 'Den Den Town', jp: 'でんでんタウン', t: 'games', c: 'osaka', ll: [34.65900, 135.50590], w: 'Den Den Town',
    d: 'A "Akihabara de Osaka", ao longo da rua Sakaisuji em Nipponbashi: lojas de eletrônicos, retro games, figures, model kits, cards, anime e cosplay. Mais compacta e tranquila que Akihabara.',
    aka: ['Nipponbashi', 'Den-Den Town', 'Sakaisuji'],
  },
  'super-potato-osaka': {
    n: 'Super Potato Osaka', jp: 'スーパーポテト 大阪日本橋店', t: 'games', c: 'osaka', ll: [34.66189, 135.50507],
    cs: 'Den Den Town Nipponbashi',
    d: 'Filial de Osaka da famosa loja de retro games, em Den Den Town: cartuchos, consoles antigos e acessórios de Famicom, Super Nintendo, Mega Drive, PlayStation e muito mais.',
    aka: ['Super Potato Osaka'],
    gmc: true,
  },
  'shinsekai': {
    n: 'Shinsekai', jp: '新世界', t: 'bairro', c: 'osaka', ll: [34.65220, 135.50620], w: 'Shinsekai',
    d: '"Mundo Novo": bairro criado em 1912 inspirado em Paris e Nova York, que parou no tempo. Hoje é a Osaka retrô e popular: letreiros exagerados, baiacus gigantes, arcades antigos, jogos de shogi na rua e dezenas de restaurantes de kushikatsu.',
    g: 'Shinsekai Osaka',
  },
  'tsutenkaku': {
    n: 'Tsutenkaku', jp: '通天閣', t: 'mirante', c: 'osaka', ll: [34.65254, 135.50632], w: 'Tsūtenkaku',
    d: 'Torre de 103 m no centro de Shinsekai (versão atual de 1956), símbolo de Osaka. No mirante mora Billiken, o "deus das coisas como deveriam ser" — esfregar a sola dos pés dele dá sorte. Tem um escorregador-tubo que desce pelo lado de fora!',
    aka: ['Tsūtenkaku', 'Billiken'],
    g: 'Tsutenkaku Tower',
  },
  'shinsaibashi': {
    n: 'Shinsaibashi', jp: '心斎橋', t: 'loja', c: 'osaka', ll: [34.67450, 135.50130], w: 'Shinsaibashi',
    d: 'Shinsaibashi-suji é uma galeria comercial coberta de ~600 m que vai de Dotonbori para o norte: drogarias (cosméticos japoneses), Uniqlo, lojas de departamento, tênis e souvenirs. Ideal para as compras finais sem tomar chuva.',
    aka: ['Shinsaibashi-suji'],
    g: 'Shinsaibashi-suji Shopping Street',
  },
  'gu-shinsaibashi': {
    n: 'GU Shinsaibashi', jp: 'ジーユー心斎橋店', t: 'loja', c: 'osaka', ll: [34.67125, 135.50161], img: false,
    d: 'Loja grande da GU dentro da galeria coberta Shinsaibashi-suji, a poucos minutos de Dotonbori e do hotel. Encaixa nas compras finais do último dia.',
    g: 'ジーユー心斎橋店',
  },
  'gu-umeda': {
    n: 'GU LINKS UMEDA', jp: 'ジーユー LINKS UMEDA店', t: 'loja', c: 'osaka', ll: [34.70445, 135.49619], img: false,
    d: 'Loja grande da GU no shopping LINKS UMEDA, ligado às estações de Umeda. Fica no caminho do fim de tarde em Umeda (Dia 14).',
    g: 'ジーユー LINKS UMEDA店',
  },
  'daimaru-shinsaibashi': {
    n: 'Pokémon Center Osaka DX (Daimaru Shinsaibashi)', jp: 'ポケモンセンターオーサカDX', t: 'games', c: 'osaka', ll: [34.67296, 135.50077],
    cs: 'Shinsaibashi-suji',
    d: 'Pokémon Center "DX" com o Pokémon Café ao lado, no 9º andar da loja de departamento Daimaru Shinsaibashi, no meio da galeria Shinsaibashi-suji. Perfeito para as compras do último dia.',
    tip: 'Pokémon Café exige reserva online (abre 31 dias antes, esgota rápido).', aka: ['Pokémon Center Osaka DX', 'Daimaru Shinsaibashi'],
    g: 'ポケモンセンターオーサカDX',
  },
  'kix': {
    n: 'Aeroporto de Kansai (KIX)', jp: '関西国際空港', t: 'aeroporto', c: 'osaka', ll: [34.43200, 135.23040], w: 'Kansai International Airport',
    d: 'Aeroporto internacional de Osaka, numa ilha artificial na baía. Da Nankai Namba: expresso Rapi:t (~38 min, assento reservado) ou Airport Express (~45 min). Para voo internacional, chegar ~3h antes.',
    aka: ['KIX', 'aeroporto de Kansai'],
  },
};
