/* =========================================================================
   DICAS PRÁTICAS, FRASES E PENDÊNCIAS
   ========================================================================= */

window.TODO_GROUPS = [
  { id: 'prep', icon: '📄', t: 'Documentos e preparação', sub: 'Antes de viajar' },
  { id: 'book', icon: '🎟️', t: 'Reservas e ingressos', sub: 'Têm data — comprar com antecedência' },
  { id: 'trip', icon: '🧳', t: 'Logística durante a viagem', sub: 'Lembretes para cada dia' },
];

/* Cada pendência: t (título), g (grupo), when (quando fazer), x (informações extras),
   links (opcional), day (dia do roteiro), done (já feito por padrão) */
window.TODO = [
  /* ------------------------------------------------------------ preparação */
  { id: 'passaporte', g: 'prep', t: 'Passaporte com chip, válido durante toda a viagem', when: 'Agora',
    x: [
      'Brasileiros com passaporte comum ELETRÔNICO (com chip) não precisam de visto para turismo de até 90 dias — a isenção vale até 29/09/2029. Passaporte sem chip exige visto.',
      'O passaporte precisa estar válido durante toda a estadia. Confira a data de validade dos dois.',
      'Andem sempre com o passaporte físico no Japão: os hotéis são obrigados a registrá-lo no check-in, ele é exigido no tax-free e no Nintendo Museum (o nome precisa bater com o do ingresso).',
    ] },
  { id: 'vjw', g: 'prep', t: 'Preencher o Visit Japan Web (imigração + alfândega)', when: '1 a 2 semanas antes do voo',
    x: [
      'Site oficial do governo japonês. Cada um faz o seu cadastro (ou um cadastra o outro como acompanhante).',
      'Pede: dados do passaporte, número do voo de chegada (05/12, Narita) e o endereço do primeiro hotel: APA Hotel Higashi-Shinjuku Kabukicho Tower, 2-31-12 Kabukicho, Shinjuku-ku, Tokyo.',
      'No fim, ele gera dois QR codes: um para a imigração e outro para a alfândega. Tirem print dos dois — no aeroporto o sinal pode falhar.',
    ],
    links: [{ t: 'Visit Japan Web', u: 'https://www.vjw.digital.go.jp/' }] },
  { id: 'seguro', g: 'prep', t: 'Contratar seguro-viagem e salvar a apólice no celular', when: 'Antes do embarque',
    x: [
      'O Japão não exige seguro para entrar, mas atendimento médico particular é caro para turistas sem cobertura.',
      'Priorize boa cobertura médica e hospitalar; bagagem e cancelamento são extras úteis.',
      'Salve no celular (offline) a apólice e o telefone 24h da seguradora.',
    ] },
  { id: 'dinheiro', g: 'prep', t: 'Cartões habilitados para o exterior + ienes em espécie', when: '1 a 2 semanas antes',
    x: [
      'Avisem os bancos / habilitem uso no exterior nos apps dos cartões.',
      'Levem pelo menos 2 cartões de bandeiras diferentes (Visa e Mastercard). Contas globais em moeda estrangeira costumam ter câmbio melhor que o cartão de crédito comum — comparem IOF e spread.',
      'Dinheiro vivo ainda é necessário em templos, barracas de mercado, alguns ônibus e restaurantes pequenos. Ter uns ¥20.000–30.000 por pessoa para começar é confortável.',
      'No Japão, os caixas do 7-Eleven (Seven Bank) e dos Correios (Japan Post) aceitam cartões estrangeiros.',
    ] },
  { id: 'remedios', g: 'prep', t: 'Conferir regras para levar remédios', when: 'Antes de fazer a mala',
    x: [
      'Remédios de uso pessoal em quantidade pequena (em geral até cerca de 1 mês de uso) costumam entrar sem papelada. Acima disso é preciso uma autorização prévia (Yunyu Kakunin-sho), pedida com pelo menos 2 semanas de antecedência — as fontes divergem entre 1 e 2 meses, então confirmem.',
      'Estimulantes (anfetaminas e alguns remédios para TDAH) são proibidos ou exigem autorização especial. Alguns antigripais com pseudoefedrina também são restritos.',
      'Levem os remédios nas caixas originais, com a receita, de preferência na bagagem de mão.',
      'Na dúvida, consultem o site da Embaixada do Japão no Brasil ou do Ministério da Saúde japonês (MHLW).',
    ] },
  { id: 'esim', g: 'prep', t: 'Comprar e instalar eSIM de dados para o Japão', when: 'Instalar antes do embarque; ativar ao pousar',
    x: [
      'Confiram se os iPhones estão desbloqueados e aceitam eSIM.',
      'Um plano de ~10–20 GB para 12 dias é suficiente (mapas, Google Maps e fotos). Há várias empresas (Airalo, Ubigi, Holafly etc.).',
      'Instalem em casa, com Wi-Fi. Ao pousar, ativem os dados da linha do eSIM e desliguem os dados da linha brasileira (deixem só para receber SMS do banco).',
    ] },
  { id: 'suica', g: 'prep', t: 'Adicionar a Suica na Carteira (Wallet) do iPhone', when: 'Antes do embarque',
    x: [
      'No iPhone: app Carteira → "+" → Cartão de transporte → Suica. Cada pessoa precisa da sua.',
      'A recarga é pelo Apple Pay. Cartões Mastercard e Amex costumam funcionar melhor; alguns Visa estrangeiros falham, dependendo do banco — testem uma recarga pequena antes de viajar.',
      'Se a recarga falhar, dá para recarregar em dinheiro nas máquinas das estações e nos caixas dos konbinis.',
      'A Suica funciona em trens, metrôs e ônibus de Tóquio, Kyoto e Osaka, e paga konbinis e armários. O Narita Express e o Shinkansen exigem bilhete à parte (o Shinkansen pode ser vinculado à Suica pelo SmartEX).',
    ] },
  { id: 'adaptador', g: 'prep', t: 'Levar adaptador de tomada (tipo A)', when: 'Na mala',
    x: [
      'No Japão a tomada é tipo A (dois pinos chatos), 100 V. O plugue brasileiro (tipo N) não encaixa.',
      'Carregadores de celular e notebook são bivolt e funcionam normalmente.',
      'Levem 2 adaptadores e, se possível, uma régua/filtro de linha para carregar tudo à noite.',
    ] },
  { id: 'tradutor', g: 'prep', t: 'Baixar japonês offline no Google Tradutor + apps úteis', when: 'Antes de viajar',
    x: [
      'Google Tradutor: baixem o pacote de japonês para usar sem internet. O modo câmera traduz cardápios e placas.',
      'Google Maps: é o melhor app para trens no Japão (plataforma, horário, saída da estação).',
      'GO: app de táxi muito usado no Japão (cadastrem antes).',
      'Safety tips: app oficial da agência de turismo japonesa com alertas de terremoto e emergências, em inglês.',
    ] },
  { id: 'app-offline', g: 'prep', t: 'Instalar este app no iPhone e preparar o uso offline', when: 'Perto da viagem (repetir na véspera)',
    x: [
      'No Safari, abram https://lecofrag.github.io/japan_2026/ → Compartilhar → "Adicionar à Tela de Início".',
      'Abram sempre pelo ícone. Com internet, toquem em Dicas → "Preparar para uso offline" (baixa fotos e os mapas das áreas de cada dia).',
      'Sem internet, o roteiro, as fotos e os mapas continuam funcionando. O botão "Ir até lá" (Google Maps) e a previsão do tempo precisam de conexão.',
      'O iPhone pode apagar os dados de apps que ficam semanas sem uso — por isso, repitam o passo na véspera.',
    ] },

  /* ------------------------------------------------------------ reservas */
  { id: 'shinkansen', g: 'book', t: 'Comprar o Shinkansen Tóquio → Kyoto (10/12) — assento E', day: 'kt0', when: 'Até ~1 mês antes; para garantir o assento E, 1–2 semanas antes',
    x: [
      'O que é: o trem-bala da linha Tokaido. O Nozomi (o mais rápido) faz Shinagawa/Tóquio → Kyoto em ~2h10–2h15, por cerca de ¥14.000–14.500 por pessoa com assento reservado.',
      'Melhor forma: app/site oficial SmartEX (JR Central), em inglês, aceita cartões estrangeiros — alguns cartões falham no cadastro, então tenham um segundo cartão à mão. Dá para vincular a Suica ao bilhete e passar direto na catraca, ou retirar o bilhete de papel nas máquinas da estação.',
      'Alternativa: comprar na hora, nas máquinas ou no balcão da estação Shinagawa (ou Tokyo). Num dia útil de dezembro costuma haver lugar, mas o assento E pode acabar.',
      'Assento E = janela do lado direito indo para Kyoto. O Monte Fuji aparece ~40–45 min depois de sair de Tóquio, se o céu estiver limpo. Nos carros comuns, as fileiras são A-B-C | D-E.',
      'Malas grandes: se a soma de altura + largura + profundidade passar de 160 cm, é preciso reservar um assento com espaço para bagagem grande (última fileira do vagão) na própria compra. Malas menores vão no bagageiro acima dos bancos.',
      'O JR Pass não compensa neste roteiro (há só uma viagem longa de trem-bala).',
    ],
    links: [{ t: 'SmartEX (oficial)', u: 'https://smart-ex.jp/en/' }] },
  { id: 'shibuya-sky', g: 'book', t: 'Reservar o Shibuya Sky — 08/12, horário de ~15h40–16h00', day: 'tk3', when: 'Assim que as vendas abrirem (a maioria das fontes indica ~4 semanas antes, à meia-noite do Japão)',
    x: [
      'Mirante a céu aberto no topo do Shibuya Scramble Square. O pôr do sol em 08/12 é por volta das 16h28.',
      'Os horários do fim de tarde esgotam rápido. Online o ingresso sai ~¥2.500; na bilheteria (~¥3.000) costuma estar esgotado no mesmo dia.',
      'Antes de subir ao terraço, bolsas, chapéus e objetos soltos ficam em armários (confiram as regras no site).',
      'Com chuva ou vento forte o terraço fecha, mas o andar interno continua aberto.',
      'Atenção: meia-noite no Japão = meio-dia em Brasília (o Japão está 12 horas à frente).',
    ],
    links: [{ t: 'Shibuya Sky (oficial)', u: 'https://www.shibuya-scramble-square.com/sky/' }] },
  { id: 'teamlab', g: 'book', t: 'Comprar o teamLab Planets — 09/12, horário de ~17h30', day: 'tk4', when: '1 a 3 semanas antes',
    x: [
      'Ingresso só online, com data e horário marcados, no site oficial. Preço dinâmico: adulto ~¥3.600–4.800 (dia útil à noite tende a ser mais barato).',
      'A visita dura ~1h30–2h e é feita descalço. Há salas com água até os joelhos: usem bermuda ou calça que dobre acima do joelho e evitem saia (há pisos espelhados). Armários gratuitos na entrada.',
      'A última entrada costuma ser 1 hora antes do fechamento.',
      'Se o Monte Fuji tomar o lugar do Dia 4, o teamLab precisa mudar de data — vejam na compra se o ingresso permite trocar.',
    ],
    links: [{ t: 'teamLab Planets (oficial)', u: 'https://teamlabplanets.dmm.com/en' }] },
  { id: 'rikimaru', g: 'book', t: 'Reservar o Yakiniku Rikimaru Ikebukuro — 07/12, ~19h30', day: 'tk2', when: '1 a 2 semanas antes',
    x: [
      'Reserva online pelo Gurunavi ou pelo Savor Japan (em inglês), ou pelo telefone 03-6685-9044.',
      'Endereço: 1-22-2 Minami-Ikebukuro, FLC Bldg. 5F — a 1 min da saída leste (East Exit) da estação Ikebukuro.',
      'Em dias úteis abre só para o jantar, a partir das 16h. O rodízio costuma ter limite de tempo (90–120 min) e o pedido é por tablet.',
      'Restaurantes no Japão levam a pontualidade a sério: cheguem no horário.',
    ],
    links: [{ t: 'Gurunavi', u: 'https://gurunavi.com/en/gjkm700/rst/' }, { t: 'Savor Japan', u: 'https://savorjapan.com/0031737128/' }] },
  { id: 'nintendo', g: 'book', t: 'Nintendo Museum — 11/12, entrada 14h30–15h00 (ingresso garantido)', day: 'kt1', when: 'Já comprado ✓ — preparar na véspera',
    x: [
      'Salvem o QR code do ingresso no celular (e um print, para não depender de internet).',
      'Levem o passaporte: o nome precisa bater com o do ingresso. Não há venda de ingressos na porta.',
      'Cheguem à porta por volta das 14h20. Caminho: trem JR Nara até a estação JR Ogura e 8 min a pé (use o "Ir até lá").',
      'O museu fecha às 18h. Loja e café ficam lá dentro.',
    ] },
  { id: 'cha', g: 'book', t: 'Decidir e reservar a cerimônia do chá / kimono em Kyoto (12/12)', day: 'kt2', when: '1 a 2 semanas antes, se forem fazer',
    x: [
      'Cerimônia do chá: há casas com sessões curtas em inglês (~45 min, ~¥4.000–5.000 por pessoa) em Gion e Higashiyama — por exemplo, a Camellia, perto de Ninenzaka. O melhor encaixe é a tarde de 12/12 (~15h), entre o Yasaka e Gion.',
      'Aluguel de kimono: várias lojas perto do Kiyomizu-dera e de Gion (~¥3.000–5.000, com penteado). A devolução costuma ser até ~17h–18h.',
      'Atenção: o Dia 3 em Kyoto é o mais longo a pé; andar o dia todo de kimono e tamanco cansa. Uma opção é alugar só para a tarde.',
    ] },
  { id: 'pokecafe', g: 'book', t: '(Opcional) Reservar o Pokémon Café', when: 'Tradicionalmente 31 dias antes, às 18h do Japão; em 2026 há relatos de liberação mensal no dia 1º às 18h (JST)',
    x: [
      'Existem dois: Tóquio (Nihonbashi, perto da Tokyo Station — encaixa em 09/12) e Osaka (Daimaru Shinsaibashi — encaixa nas compras de 16/12).',
      'As reservas esgotam em minutos. Confiram na página oficial quando os horários de dezembro serão liberados.',
      '18h no Japão = 6h da manhã em Brasília.',
    ],
    links: [{ t: 'Pokémon Café (oficial)', u: 'https://www.pokemon-cafe.jp/en/' }] },

  /* ------------------------------------------------------------ logística */
  { id: 'aeroporto', g: 'trip', t: 'Anotar números dos voos e o terminal de chegada em Narita (T1 ou T2)', day: 'tk0', when: 'Antes do embarque',
    x: [
      'O terminal aparece no cartão de embarque / app da companhia. O Narita Express para nos dois terminais.',
      'Façam o check-in online e confiram a franquia de bagagem da volta (as compras pesam!).',
      'Na volta (16/12), o voo sai do Aeroporto de Kansai (KIX) às 20h — confiram o terminal também.',
    ] },
  { id: 'nex', g: 'trip', t: "Comprar o Narita Express (N'EX) até Shinjuku ao chegar", day: 'tk0', when: 'Na chegada, 05/12 (ou online antes)',
    x: [
      "Todos os assentos do N'EX são reservados e ele NÃO aceita Suica: é preciso comprar o bilhete.",
      "Onde: máquinas exclusivas do N'EX ou o balcão JR EAST Travel Service Center, no subsolo do terminal. Turistas com passaporte estrangeiro podem ter desconto nas máquinas (mostrando o passaporte).",
      'Também dá para reservar antes, pelo site JR-EAST Train Reservation.',
      'Preço normal ~¥3.330 por pessoa até Shinjuku, ~80–90 min. À noite os trens saem a cada 30–60 min.',
      'Da estação Shinjuku até o hotel: táxi pela saída leste (East Exit), ~10 min.',
    ],
    links: [{ t: "Narita Express (JR East)", u: 'https://www.jreast.co.jp/en/multi/nex/tickets/' }] },
  { id: 'malas-kyoto', g: 'trip', t: 'Pedir ao Hotel Resol para guardar as malas na manhã de 13/12', day: 'kt3', when: 'No check-in em Kyoto (10/12)',
    x: [
      'Plano do dia 13: check-out às ~7h, Arashiyama de manhã e volta ao hotel por volta das 13h30 para buscar as malas.',
      'Peçam na recepção para guardar as malas até a tarde (hotéis japoneses costumam oferecer isso gratuitamente).',
      'Alternativa: armários (coin lockers) das estações — os grandes acabam cedo.',
    ] },
  { id: 'fuji', g: 'trip', t: 'Decidir o bate-volta ao Monte Fuji pela previsão do tempo', link: '#/fuji', when: 'Na noite anterior',
    x: [
      'A aba Monte Fuji mostra a previsão de nuvens para Kawaguchiko nos próximos dias. Abaixo de ~30% de nuvens pela manhã, boa chance de ver a montanha.',
      'Se forem: reservem o ônibus Shinjuku → Kawaguchiko (Highway Bus) para ~7h45, ou o trem Fuji Excursion.',
      'O dia mais fácil de trocar é o Dia 4 (09/12) — lembrem de remarcar o teamLab.',
    ] },
  { id: 'katsuoji', g: 'trip', t: 'Conferir o ônibus para o Katsuo-ji e o táxi até a cachoeira de Minoh', day: 'os1', when: 'Na véspera (13/12)',
    x: [
      'Ônibus Hankyu linha 30, do ponto nº 8 da estação Minoh-Kayano, ~25 min. Pagamento só com cartão IC (Suica funciona). Em dias úteis passa a cada ~30 min — confiram a tabela.',
      'Katsuo-ji: aberto ~8h–17h, entrada ~¥500.',
      'Do templo até a cachoeira: táxi (~15 min). Peçam na recepção do templo para chamar um, ou usem o app GO.',
    ] },
  { id: 'umeda', g: 'trip', t: 'Umeda Sky Building no pôr do sol de 14/12', day: 'os1', when: 'Compra na hora',
    x: [
      'Floating Garden Observatory, a céu aberto. Ingresso na bilheteria (~¥2.000); não precisa reservar.',
      'Cheguem por volta das 16h15 — o pôr do sol em Osaka é ~16h50. Aberto até ~22h30.',
      'No subsolo do prédio fica a Takimi Koji, uma viela retrô cheia de restaurantes, boa para o jantar.',
    ] },
  { id: 'wagyu', g: 'trip', t: 'Escolher uma refeição especial de wagyu/yakiniku e um ramen em Osaka', when: 'Antes ou durante os dias em Osaka',
    x: [
      'Usem o Google Maps ou o Tabelog (o "TripAdvisor" japonês; nota acima de 3,5 já é muito boa) filtrando perto do hotel, em Namba/Dotonbori.',
      'Já estão no roteiro: kushikatsu em Shinsekai (15/12), okonomiyaki e takoyaki em Dotonbori (13/12) e o mercado Kuromon (15/12).',
      'Para wagyu de qualidade, almoço costuma ter menus bem mais baratos que o jantar.',
    ] },
  { id: 'kix', g: 'trip', t: 'Saída para o Aeroporto de Kansai (KIX) em 16/12 — ~15h45', day: 'os3', when: 'No último dia',
    x: [
      'Voo às 20h. Saiam do hotel por volta das 15h45 e cheguem ao aeroporto até ~17h (3 horas antes).',
      'Trem Nankai a partir da Nankai Namba (ao lado do hotel): expresso Rapi:t (~38 min, assento reservado — bilhete no guichê/máquina da Nankai) ou Airport Express (~45 min, aceita Suica).',
      'Tax-free: pelo sistema novo, as compras tax-free precisam ser apresentadas à alfândega no aeroporto para o reembolso. Levem-nas na bagagem de mão e façam isso antes do check-in.',
    ] },
  { id: 'iluminacoes', g: 'trip', t: 'Conferir as iluminações de inverno de 2026', when: 'Perto da viagem',
    x: [
      'Marunouchi Illumination (Tóquio): árvores douradas na Naka-dori, normalmente de novembro a fevereiro — encaixa na noite de 09/12.',
      'Osaka: a avenida Midosuji costuma ser iluminada em dezembro, e o Osaka Hikari Renaissance acontece em Nakanoshima, normalmente a partir de meados de dezembro.',
      'As datas mudam todo ano — confirmem as edições de 2026.',
    ] },
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

/* =========================================================================
   OPCIONAIS — lojas de rede que queremos visitar em algum momento
   branches: filiais que ficam no caminho do roteiro (ids de places.js)
   q: busca no Google Maps ("perto de mim" no celular)
   ========================================================================= */
window.SHOPS = [
  { id: 'cosme', n: '@cosme TOKYO', jp: 'アットコスメ', icon: '💄', common: 'Loja única', commonK: 'unique',
    what: 'A maior loja de cosméticos de Tóquio, organizada pelos rankings do maior site de avaliações de beleza do Japão.',
    buy: 'Skincare japonês e coreano, protetores solares, maquiagem, kits exclusivos.',
    branches: ['cosme-tokyo'], where: 'Já está no roteiro: Dia 3, em frente à estação Harajuku.', q: '@cosme TOKYO' },
  { id: 'daiso', n: 'Daiso', jp: 'ダイソー', icon: '🧺', common: 'Muito comum', commonK: 'common',
    what: 'A maior rede de lojas de ¥100 (a maioria dos itens sai por ¥110 com imposto; há linhas de ¥300 a ¥1.000).',
    buy: 'Utensílios de cozinha, potes de bentô, papelaria, itens de viagem e organização, lembrancinhas baratas.',
    branches: ['daiso-ginza'], where: 'A loja principal mundial fica em Ginza (Dia 4), a 2 min do metrô para o teamLab. Há Daisos em quase todo bairro e shopping.', q: 'Daiso' },
  { id: 'gu', n: 'GU', jp: 'ジーユー', icon: '👕', common: 'Muito comum', commonK: 'common',
    what: 'Marca irmã e mais barata da Uniqlo (mesmo grupo), com roupas que seguem mais a moda do momento.',
    buy: 'Roupas básicas e de tendência, pijamas, tênis e acessórios a preços baixos. Lojas tax-free (levar o passaporte).',
    branches: ['gu-ginza', 'gu-shinjuku', 'gu-shinsaibashi', 'gu-umeda'], where: 'A maior do Japão fica em Ginza (Dia 4, tarde de compras). Em Shinjuku, a GU Flags fica colada à estação, perto da Uniqlo (Dia 1). Em Osaka: Shinsaibashi (16/12) e LINKS UMEDA (14/12). Em Kyoto não há loja grande confirmada no centro.', q: 'GU ジーユー' },
  { id: 'seria', n: 'Seria', jp: 'セリア', icon: '🎀', common: 'Menos comum no centro', commonK: 'rare',
    what: 'Concorrente da Daiso, também de ¥100, com produtos de design mais delicado e "fofo".',
    buy: 'Organização da casa, papelaria, artigos de festa e decoração, utensílios de cozinha bonitos.',
    branches: ['seria-shinjuku', 'seria-kawaramachi'], where: 'Tóquio: Shinjuku Marui Annex, perto do hotel. Kyoto: Kawaramachi OPA, no caminho do Dia 10 (entre o Nishiki e Pontocho).', q: 'Seria 100円ショップ' },
  { id: 'matsukiyo', n: 'Matsumoto Kiyoshi', jp: 'マツモトキヨシ', icon: '💊', common: 'Em todo lugar', commonK: 'common',
    what: 'A drogaria mais famosa do Japão ("MatsuKiyo"): remédios, cosméticos, skincare e higiene.',
    buy: 'Protetor solar (Biore, Anessa), máscaras faciais, colírios, remédios sem receita, cosméticos.',
    branches: [], where: 'Há várias em Shinjuku, Ginza, Harajuku, Shibuya e na galeria Shinsaibashi-suji (Osaka, Dia 16). Vale comparar preços com a Sundrug.', q: 'マツモトキヨシ' },
  { id: 'sundrug', n: 'Sundrug', jp: 'サンドラッグ', icon: '💊', common: 'Em todo lugar', commonK: 'common',
    what: 'Outra grande rede de drogarias, muitas vezes com preços um pouco menores que a MatsuKiyo.',
    buy: 'Os mesmos itens de drogaria; compare antes de comprar em quantidade.',
    branches: [], where: 'Muito comum perto de estações em Tóquio, Kyoto e Osaka.', q: 'サンドラッグ' },
  { id: 'donki', n: 'Don Quijote', jp: 'ドン・キホーテ', icon: '🐧', common: 'Em todo lugar', commonK: 'common',
    what: 'Loja de descontos caótica e abarrotada ("Donki"), aberta até tarde ou 24h.',
    buy: 'Doces e KitKats de sabores, cosméticos, eletrônicos baratos, souvenirs, fantasias.',
    branches: ['donki-kabukicho', 'donki-shibuya', 'donki-dotonbori'], where: 'Kabukicho (perto do hotel, qualquer noite), MEGA Shibuya (Dia 3) e Dotonbori (13 e 16/12).', q: 'Don Quijote' },
  { id: 'machioka', n: 'Okashi no Machioka', jp: 'おかしのまちおか', icon: '🍬', common: 'Comum em Tóquio; raro em Kyoto/Osaka', commonK: 'mid',
    what: 'Rede de doces e salgadinhos com desconto, com ~200 lojas concentradas na região de Tóquio.',
    buy: 'KitKat e Pocky de sabores, balas e chicletes japoneses, dagashi (docinhos baratos) para levar de presente.',
    branches: [], where: 'Melhor comprar ainda em Tóquio. Há loja na região da estação Ikebukuro (Dia 2, antes do jantar) — confirmar no site oficial.', q: 'おかしのまちおか' },
  { id: 'aeon', n: 'AEON', jp: 'イオン', icon: '🛒', common: 'Comum (em formatos diferentes)', commonK: 'mid',
    what: 'O maior grupo de supermercados e shoppings do Japão.',
    buy: 'Comidas, doces, chás, temperos e snacks a preço de supermercado — bem mais barato que lojas de souvenir.',
    branches: ['aeon-mall-kyoto'], where: 'O AEON Mall Kyoto fica a 5 min da Kyoto Station: encaixa na volta do Nintendo Museum (Dia 11). No centro de Tóquio o grupo aparece mais em minimercados de bairro.', q: 'AEON イオン' },
  { id: 'gyomu', n: 'Gyomu Super', jp: '業務スーパー', icon: '📦', common: 'Comum, mas fora das áreas turísticas', commonK: 'mid',
    what: 'Supermercado "atacadista" para o público local: congelados, importados e embalagens grandes.',
    buy: 'Curiosidade e preço: temperos, molhos, snacks e chás em embalagens grandes.',
    branches: [], where: 'Em Osaka há uma em Nipponbashi (~9h–21h), perto de Den Den Town (Dia 15). Só se der tempo.', q: '業務スーパー' },
];
