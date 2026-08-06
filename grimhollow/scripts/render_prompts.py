#!/usr/bin/env python3
# Renderiza PROMPTS.md numa página HTML estática em public/prompts/index.html.
# Rodado no CI (e localmente) antes do build; o Vite copia public/ para dist/,
# então a página fica publicada em .../nethergloam/prompts/.
import re, os, markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # .../grimhollow
SRC = os.path.join(ROOT, "PROMPTS.md")
OUTDIR = os.path.join(ROOT, "public", "prompts")
OUT = os.path.join(OUTDIR, "index.html")

def gh_slug(value, separator="-"):
    s = value.strip().lower()
    s = re.sub(r"[^\w\s-]", "", s, flags=re.UNICODE)  # remove emoji/pontuação, mantém acentos
    s = re.sub(r"\s", "-", s)                          # cada espaço vira hífen (estilo GitHub)
    return s

def main():
    md_text = open(SRC, encoding="utf-8").read()
    conv = markdown.Markdown(
        extensions=["tables", "fenced_code", "attr_list", "sane_lists", "toc"],
        extension_configs={"toc": {"slugify": gh_slug, "separator": "-"}},
    )
    body = conv.convert(md_text)
    os.makedirs(OUTDIR, exist_ok=True)
    open(OUT, "w", encoding="utf-8").write(TEMPLATE.replace("__BODY__", body))
    print("prompts page ->", OUT, len(body), "bytes de corpo")
    escreve_sql(md_text)


def escreve_sql(md_text: str) -> None:
    """
    Despeja o SQL da §30 num ARQUIVO DE TEXTO PURO, ao lado da página.

    O botão Copiar passa por HTML, JS e área de transferência, e cada um desses
    degraus já mexeu no texto alheio alguma vez — quebra de linha injetada onde a
    linha dobrou na tela, espaço que virou espaço-duro. Num prompt de arte isso
    não faz diferença; em SQL, faz o banco recusar tudo.

    Um .sql servido cru não tem degrau nenhum: abre no navegador como texto,
    seleciona tudo, cola. É o caminho que sobra quando o outro falha — e sai
    daqui mesmo, do mesmo PROMPTS.md, p/ não virar uma segunda cópia que envelhece
    sozinha.
    """
    ini = md_text.index("## 30 · SUPABASE")
    # PARA NA PRÓXIMA SEÇÃO. Antes ia até o fim do arquivo, e no dia em que a §31
    # entrou (folhas de ícones) os prompts de ARTE foram parar dentro do .sql —
    # "do título até o fim" só parecia certo enquanto a §30 era a última.
    fim = md_text.find("\n## ", ini + 1)
    sec = md_text[ini:fim if fim > 0 else len(md_text)]
    blocos = re.findall(r"```\n(.*?)```", sec, re.S)
    if not blocos:
        print("AVISO: nenhum bloco SQL achado na §30")
        return
    cab = (
        "-- Nethergloam - tabelas do Supabase\n"
        "-- Cole TUDO no SQL Editor do projeto e rode (Run).\n"
        "-- Pode rodar de novo quantas vezes quiser: e' tudo if-not-exists.\n"
    )
    saida = os.path.join(OUTDIR, "nethergloam.sql")
    open(saida, "w", encoding="utf-8").write(cab + "\n" + "\n".join(blocos))
    print("sql ->", saida)

TEMPLATE = '''<!doctype html><html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Nethergloam — Prompts de Arte</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=MedievalSharp&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  :root{--bg:#0e0b08;--panel:#171009;--edge:rgba(201,162,39,.28);--amber:#e8b24a;--amber2:#f4d074;--ink:#e8dcc0;--dim:#b6a074;}
  *{box-sizing:border-box}
  html,body{margin:0;background:radial-gradient(120% 80% at 50% 0%,#1c140c,#0b0806 70%);color:var(--ink);
    font-family:"MedievalSharp","Trebuchet MS",serif;line-height:1.6;-webkit-text-size-adjust:100%}
  .wrap{max-width:860px;margin:0 auto;padding:20px 18px 80px}
  .topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;padding:10px 0 12px;margin-bottom:6px;
    background:linear-gradient(#0e0b08 70%,rgba(14,11,8,0));backdrop-filter:blur(2px)}
  .back{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;text-decoration:none;color:#12100a;font-family:"Cinzel",serif;
    font-weight:700;font-size:13px;padding:8px 14px;border-radius:10px;background:linear-gradient(#f4d074,#c9922a);
    box-shadow:0 1px 3px #000, inset 0 1px 0 rgba(255,255,255,.35)}
  h1,h2,h3,h4{font-family:"Cinzel",serif;color:#f6e7c2;line-height:1.2;text-shadow:0 2px 6px #000;scroll-margin-top:64px}
  h1{font-size:26px;font-weight:800;letter-spacing:1px;margin:.2em 0 .1em}
  h2{font-size:21px;margin:1.5em 0 .5em;padding-top:.9em;border-top:1px solid var(--edge);color:var(--amber2)}
  h3{font-size:17px;margin:1.3em 0 .4em;color:var(--amber)}
  h4{font-size:14px;margin:1em 0 .3em;color:#d8c48a}
  a{color:#8fb8ff;text-decoration:none}a:hover{text-decoration:underline}
  p,li{font-size:15px}
  hr{border:0;border-top:1px solid var(--edge);margin:1.8em 0}
  code{font-family:"JetBrains Mono",monospace;font-size:12.5px;background:rgba(201,162,39,.12);color:#f0d68a;
    padding:1px 5px;border-radius:5px}
  pre{position:relative;background:#0a0806;border:1px solid var(--edge);border-radius:12px;padding:14px;
    overflow-x:auto;box-shadow:inset 0 0 20px #000}
  pre code{display:block;background:none;color:#e6e0cf;padding:0;font-size:12.5px;line-height:1.55;white-space:pre-wrap;word-break:break-word}
  .copybtn{position:absolute;top:8px;right:8px;font-family:"Cinzel",serif;font-weight:700;font-size:11px;color:#12100a;cursor:pointer;
    padding:5px 11px;border:none;border-radius:8px;background:linear-gradient(#f4d074,#c9922a);box-shadow:0 1px 3px #000;opacity:.9}
  .copybtn:active{transform:scale(.95)}.copybtn.ok{background:linear-gradient(#8fdf7a,#3a9a2a)}
  table{border-collapse:collapse;width:100%;margin:1em 0;font-size:13.5px;display:block;overflow-x:auto}
  th,td{border:1px solid var(--edge);padding:7px 10px;text-align:left}
  th{background:rgba(201,162,39,.12);color:var(--amber2);font-family:"Cinzel",serif;font-weight:600}
  tr:nth-child(even) td{background:rgba(255,255,255,.02)}
  blockquote{border-left:3px solid var(--amber);margin:1em 0;padding:.2em 1em;color:var(--dim);background:rgba(201,162,39,.06)}
  ul,ol{padding-left:1.3em}
  .foot{margin-top:50px;padding-top:16px;border-top:1px solid var(--edge);color:var(--dim);font-size:12px;text-align:center}
  img{max-width:100%}
</style></head>
<body><div class="wrap">
<div class="topbar"><a class="back" href="../">◄ Voltar ao jogo</a><span style="color:var(--dim);font-size:12px">Nethergloam · Prompts de Arte</span></div>
__BODY__
<div class="foot">Nethergloam — referência de arte gerada a partir de PROMPTS.md · atualiza sozinho a cada deploy do jogo</div>
</div>
<script>
document.querySelectorAll('pre').forEach(function(pre){
  var b=document.createElement('button');b.className='copybtn';b.textContent='Copiar';
  b.addEventListener('click',function(){
    /* textContent, e nao innerText: o innerText devolve o texto COMO FOI
       DESENHADO, e em alguns navegadores isso injeta uma quebra de linha onde a
       linha dobrou na tela. Num prompt de arte ninguem nota; num SQL, parte um
       comando no meio e o banco recusa. O textContent devolve a fonte. */
    var el=pre.querySelector('code');
    var t;
    if(el){t=el.textContent;}
    else{var c=pre.cloneNode(true);var x=c.querySelector('.copybtn');if(x)x.remove();t=c.textContent;}
    navigator.clipboard.writeText(t).then(function(){b.textContent='Copiado!';b.classList.add('ok');
      setTimeout(function(){b.textContent='Copiar';b.classList.remove('ok');},1400);});
  });
  pre.appendChild(b);
});
</script>
</body></html>'''

if __name__ == "__main__":
    main()
