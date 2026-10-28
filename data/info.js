/* =========================================================================
   DICAS PRÁTICAS, FRASES E PENDÊNCIAS
   ========================================================================= */

window.TODO = [
  { id: 'aeroporto', t: 'Anotar números dos voos e o terminal de chegada em Narita (T1 ou T2)', day: 'tk0' },
  { id: 'teamlab', t: 'Comprar o ingresso do teamLab Planets — 09/12, horário de ~16h30 (site oficial)', day: 'tk4' },
  { id: 'rikimaru', t: 'Reservar o Yakiniku Rikimaru Ikebukuro — 07/12, ~19h30, 2 pessoas', day: 'tk2' },
  { id: 'vjw', t: 'Preencher o Visit Japan Web (imigração + alfândega) antes do embarque' },
  { id: 'shibuya-sky', t: 'Reservar o Shibuya Sky — horário de ~15h45 em 08/12 (pôr do sol)', day: 'tk3' },
  { id: 'shinkansen', t: 'Comprar o Shinkansen Tóquio → Kyoto (10/12) — assento E para ver o Fuji', day: 'kt0' },
  { id: 'nintendo', t: 'Salvar o QR do Nintendo Museum e lembrar do passaporte (11/12, 14h30)', day: 'kt1', done: false },
  { id: 'fuji', t: 'Decidir o bate-volta ao Monte Fuji olhando a previsão (ver Plano B)', link: '#/fuji' },
  { id: 'malas-kyoto', t: 'Confirmar guarda de malas no Hotel Resol na manhã de 13/12', day: 'kt3' },
  { id: 'cha', t: 'Decidir e reservar a cerimônia do chá / kimono em Kyoto (tarde de 12/12)', day: 'kt2' },
  { id: 'katsuoji', t: 'Conferir tabela do ônibus Hankyu nº 30 (Minoh-Kayano → Katsuo-ji) e o táxi até Minoh', day: 'os1' },
  { id: 'umeda', t: 'Mirante em Umeda: confirmar Umeda Sky Building (sugerido) para o pôr do sol de 14/12', day: 'os1' },
  { id: 'wagyu', t: 'Escolher uma refeição especial de wagyu/yakiniku e um ramen de destaque em Osaka' },
  { id: 'kix', t: 'Definir horário de saída para o KIX (sugerido ~15h45 de Namba) em 16/12', day: 'os3' },
  { id: 'pokecafe', t: '(Opcional) Pokémon Café — reservas abrem 31 dias antes e esgotam rápido' },
  { id: 'esim', t: 'Comprar eSIM / chip de dados para o Japão' },
  { id: 'suica', t: 'Adicionar a Suica na carteira do celular (Apple/Google Wallet)' },
  { id: 'adaptador', t: 'Levar adaptador de tomada (Japão usa tipo A, dois pinos chatos, 100 V)' },
  { id: 'seguro', t: 'Seguro-viagem contratado e apólice salva no celular' },
  { id: 'iluminacoes', t: 'Conferir as iluminações de inverno de 2026 (Marunouchi, Midosuji, Nakanoshima)' },
];

window.INFO = {
  climate: [
    { city: 'tokyo', min: 5, max: 13, note: 'Seco e ensolarado, com vento frio à noite.' },
    { city: 'kyoto', min: 2, max: 11, note: 'O mais frio dos três (cidade num vale). Manhãs geladas.' },
    { city: 'osaka', min: 4, max: 12, note: 'Parecido com Tóquio; um pouco mais úmido.' },
  ],

  sections: [
    { icon: '🛂', t: 'Entrada no Japão', items: [
      'Brasileiros com passaporte comum ELETRÔNICO (com chip) não precisam de visto para turismo de até 90 dias — a isenção foi prorrogada até 29/09/2029. Passaporte sem chip ainda exige visto.',
      'Preencha o Visit Japan Web antes de viajar: ele gera os QR codes de imigração e alfândega e agiliza a chegada.',
      'Confira as regras oficiais no site da Embaixada do Japão no Brasil perto da viagem.',
    ]},
    { icon: '💴', t: 'Dinheiro e pagamentos', items: [
      'Cartão de crédito e pagamento por aproximação funcionam na maioria dos lugares, mas templos, barracas de mercado, ônibus locais e restaurantes pequenos ainda pedem dinheiro.',
      'Saque ienes nos caixas do 7-Eleven (Seven Bank) e dos Correios (Japan Post) — aceitam cartões estrangeiros, 24h no caso do 7-Eleven.',
      'O cartão IC (Suica/ICOCA) também paga konbinis, máquinas de bebida e armários de bagagem.',
      'O troco/pagamento vai numa bandejinha no balcão — não entregue na mão.',
      'Tax-free: a partir de 01/11/2026 o Japão passou a usar um sistema de REEMBOLSO — paga-se o preço cheio na loja (mostrando o passaporte) e o imposto é devolvido na saída do país, após a conferência da alfândega no aeroporto. Leve as compras tax-free na bagagem de mão e chegue com folga ao KIX.',
    ]},
    { icon: '🧥', t: 'Clima em dezembro', items: [
      'Tóquio: ~5 °C a 13 °C · Kyoto: ~2 °C a 11 °C · Osaka: ~4 °C a 12 °C. Dias geralmente secos e de céu azul.',
      'O sol se põe cedo: ~16h30 em Tóquio e ~16h50 em Kyoto/Osaka. Planeje mirantes e fotos para o fim da tarde.',
      'Use camadas: HEATTECH por baixo, casaco leve de pluma e um corta-vento. Os ambientes internos são bem aquecidos.',
      'No início de dezembro ainda pode haver folhas de outono (momiji vermelhos em Kyoto, ginkgos amarelos em Tóquio).',
    ]},
    { icon: '🔌', t: 'Tomadas, internet e celular', items: [
      'Tomada tipo A (dois pinos chatos), 100 V. O padrão brasileiro (tipo N) não encaixa — leve adaptador. Carregadores de celular e notebook são bivolt.',
      'eSIM de dados é a solução mais simples. Wi-Fi gratuito existe em estações e konbinis, mas é instável.',
      'Apps úteis: Google Maps (trens!), Google Tradutor (modo câmera para cardápios), GO (táxi), SmartEX (Shinkansen), Tabelog (restaurantes).',
    ]},
    { icon: '🙇', t: 'Etiqueta essencial', items: [
      'Não existe gorjeta. Nunca. Um "arigatou gozaimasu" sorridente basta.',
      'Nos trens: silêncio, sem ligações; mochila na frente do corpo em horário de pico.',
      'Escada rolante: em Tóquio fica-se parado à ESQUERDA; em Osaka, à DIREITA (Kyoto varia — siga a fila).',
      'Evite comer andando na rua. Coma em frente à loja ou em áreas de descanso.',
      'Há pouquíssimas lixeiras: leve um saquinho para o seu lixo (konbinis costumam ter lixeiras).',
      'Tire os sapatos onde houver tatame ou um degrau na entrada (templos, alguns restaurantes, provadores).',
      'Hashi: nunca espete em pé no arroz nem passe comida de hashi para hashi (lembram rituais funerários).',
      'Em Gion, respeite as placas de proibição de fotos em vielas privadas e nunca aborde maikos.',
      'Filas são sagradas — inclusive para entrar no trem, nas marcações do chão da plataforma.',
    ]},
    { icon: '🚇', t: 'Transporte', items: [
      'Com a Suica/ICOCA no celular você só encosta na catraca. Funciona em Tóquio, Kyoto e Osaka.',
      'Use o Google Maps no modo transporte: ele indica plataforma, horários exatos e a melhor saída da estação.',
      'Grandes estações têm dezenas de saídas: siga o NOME/NÚMERO da saída (placas amarelas), não só a direção.',
      'Não há catraca de saída "livre": se errar a tarifa, use a máquina "Fare Adjustment" (精算機) antes da catraca.',
      'Táxi: porta automática, aceita cartão, motoristas raramente falam inglês — mostre o endereço em japonês.',
    ]},
    { icon: '🆘', t: 'Emergências', items: [
      'Polícia: 110 · Ambulância e bombeiros: 119 (atendem em inglês com intérprete).',
      'Japan Visitor Hotline (JNTO, 24h, inglês): 050-3816-2787.',
      'Postos policiais de bairro (koban) estão por toda parte e ajudam até com direções.',
      'Anote o contato da Embaixada do Brasil em Tóquio e do seu seguro-viagem.',
    ]},
  ],

  phrases: [
    { pt: 'Olá / boa tarde', jp: 'こんにちは', ro: 'Konnichiwa' },
    { pt: 'Obrigado(a)', jp: 'ありがとうございます', ro: 'Arigatou gozaimasu' },
    { pt: 'Com licença / desculpe', jp: 'すみません', ro: 'Sumimasen' },
    { pt: 'Isto, por favor (apontando)', jp: 'これをください', ro: 'Kore o kudasai' },
    { pt: 'Quanto custa?', jp: 'いくらですか？', ro: 'Ikura desu ka?' },
    { pt: 'Aceita cartão?', jp: 'カードで大丈夫ですか？', ro: 'Kaado de daijoubu desu ka?' },
    { pt: 'A conta, por favor', jp: 'お会計お願いします', ro: 'Okaikei onegaishimasu' },
    { pt: 'Tem cardápio em inglês?', jp: '英語のメニューはありますか？', ro: 'Eigo no menyuu wa arimasu ka?' },
    { pt: 'Onde fica o banheiro?', jp: 'トイレはどこですか？', ro: 'Toire wa doko desu ka?' },
    { pt: 'Não preciso de sacola', jp: '袋はいりません', ro: 'Fukuro wa irimasen' },
    { pt: 'Não entendo', jp: 'わかりません', ro: 'Wakarimasen' },
    { pt: 'Antes de comer ("bom apetite")', jp: 'いただきます', ro: 'Itadakimasu' },
    { pt: 'Depois de comer ("estava ótimo")', jp: 'ごちそうさまでした', ro: 'Gochisousama deshita' },
    { pt: 'Delicioso!', jp: 'おいしい！', ro: 'Oishii!' },
    { pt: 'Duas pessoas', jp: '二人です', ro: 'Futari desu' },
    { pt: 'Até mais!', jp: 'またね', ro: 'Mata ne' },
  ],

  apps: [
    { t: 'Visit Japan Web', u: 'https://www.vjw.digital.go.jp/' },
    { t: 'Previsão do tempo (Tóquio)', u: 'https://www.google.com/search?q=previs%C3%A3o+do+tempo+T%C3%B3quio' },
  ],
};
