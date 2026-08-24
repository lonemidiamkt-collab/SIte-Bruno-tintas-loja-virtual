"""Mede o hex de cada cor nas fotos das cartas em docs/cartas-de-cor/.

Por que existe: o quadrado de cor do site tem que sair da carta que o Bruno
fotografou, não do meu olho nem de catálogo da internet. Ver
docs/decisoes/ADR-005-cores-medidas-da-foto.md.

Como rodar:   SAIDA=/tmp python3 docs/ferramentas/extrai-cores.py
Precisa de:   pip3 install pillow

Sai o JSON em $SAIDA/cores.json e, para cada carta, uma folha conf-<carta>.png
com o recorte da foto ao lado da cor extraida — e a conferencia e olhar essa
folha, cor por cor, antes de levar o hex para o dados.js.

As coordenadas abaixo sao o centro de cada amostra impressa, lidas na foto de
899x1599. Foto nova = coordenadas novas.
"""
from PIL import Image, ImageDraw
import statistics, json, os

BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "cartas-de-cor")
OUT  = os.environ.get("SAIDA", "/tmp")

def grade(cols, rows, n):
    pts = []
    for y in rows:
        for x in cols:
            if len(pts) < n:
                pts.append((x, y))
    return pts

CARTAS = {
 'coral-rende-muito': dict(arq='cores Coral Rende Muito.jpg',
   pontos=grade([140,300,460,620,783],[285,470,665,865,1055,1250],27)),
 'qualy-rende-muito': dict(arq='Rende muito Qualyvinil.jpg',
   pontos=grade([178,367,558,750],[597,775,938,1095,1245],17)),
 'qualy-economica': dict(arq='Econômica Qualyvinil.jpg',
   pontos=grade([150,360,570,775],[348,524,712,880,1063],20)),
 'qualy-esmalte': dict(arq='Esmalte sintético da Qualyvinil.jpg',
   pontos=[(742,482)] + grade([165,363,548,750],[628,775,975,1150],16)),
 'maza-ferrugem': dict(arq='Maza direto na ferragem.jpg',
   pontos=grade([128,357,590,800],[720,895,1068],10)),
 'lukscolor': dict(arq="Lukscolor esmalte base d'águajpg.jpg",
   pontos=grade([242,380,512,648],[475,605,738,865],14)),
}
# a Platina da Maza e metalica: o centro e puro brilho de flash.
# amostra no rodape da chapa, onde o reflexo nao bate.
CARTAS['maza-ferrugem']['pontos'][4] = (120, 948)

# A carta da Lukscolor traz os tres acabamentos, com cores diferentes, na
# mesma folha. O Bruno estoca os tres — entao os tres sao medidos.
CARTAS['lukscolor-fosco'] = dict(arq=CARTAS['lukscolor']['arq'],
  pontos=[(365,1058), (498,1058)])
CARTAS['lukscolor-acetinado'] = dict(arq=CARTAS['lukscolor']['arq'],
  pontos=grade([240,372,500,625],[1250,1374],8))

R    = 14    # meia-aresta da amostra da cor
JAN  = 340   # meia-janela onde procuro o branco do papel ali perto
ALVO = 248.0

def amostra(px, x, y, r):
    ch = [[],[],[]]
    for dy in range(-r, r+1):
        for dx in range(-r, r+1):
            p = px[x+dx, y+dy]
            for i in range(3): ch[i].append(p[i])
    return ch

def branco_local(px, W, H, x, y):
    """papel branco na vizinhanca — corrige iluminacao desigual da foto"""
    x0,x1 = max(0,x-JAN), min(W-1,x+JAN)
    y0,y1 = max(0,y-JAN), min(H-1,y+JAN)
    ch = [[],[],[]]
    for yy in range(y0,y1+1,4):
        for xx in range(x0,x1+1,4):
            p = px[xx,yy]
            for i in range(3): ch[i].append(p[i])
    return [sorted(c)[int(len(c)*0.95)] for c in ch]

saida, estouro = {}, {}
for chave, cfg in CARTAS.items():
    im = Image.open(os.path.join(BASE, cfg['arq'])).convert('RGB')
    W,H = im.size; px = im.load()
    bruto = []
    for x,y in cfg['pontos']:
        m = [statistics.median(c) for c in amostra(px,x,y,R)]
        b = branco_local(px,W,H,x,y)
        bruto.append([m[i] * ALVO / max(1,b[i]) for i in range(3)])
    # calibra pelo Branco (indice 0 em todas as cartas): tinta branca tem que
    # sair branca. ganho escalar, para nao torcer o tom das outras cores.
    g = ALVO / max(bruto[0])
    cores, clip = [], 0
    for v in bruto:
        rgb = []
        for i in range(3):
            u = round(v[i]*g)
            if u > 255: clip += 1
            rgb.append(min(255,u))
        cores.append('#%02X%02X%02X' % tuple(rgb))
    saida[chave] = cores; estouro[chave] = clip
    print(f"{chave}: n={len(cores)} canais estourados={clip}")
    print('   ', ' '.join(cores))

    # folha de conferencia: recorte da foto x cor extraida
    n = len(cores); lin = (n+3)//4
    sheet = Image.new('RGB',(4*220, lin*130),(255,255,255)); d = ImageDraw.Draw(sheet)
    for i,(x,y) in enumerate(cfg['pontos']):
        cx,cy = (i%4)*220, (i//4)*130
        sheet.paste(im.crop((x-50,y-50,x+50,y+50)).resize((100,100)), (cx+5,cy+15))
        d.rectangle([cx+110,cy+15,cx+210,cy+115], fill=cores[i], outline=(0,0,0))
        d.text((cx+8,cy+2), f"{i}", fill=(0,0,0))
    sheet.save(f"{OUT}/conf-{chave}.png")

json.dump(saida, open(f"{OUT}/cores.json",'w'), indent=1)
