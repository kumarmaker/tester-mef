from fontTools import varLib
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.ttLib import TTFont

def setname(font, fam, sub, bold=False, italic=False):
    full = f"{fam} {sub}".strip()
    ps = f"{fam}-{sub}".replace(" ", "")
    name = font["name"]
    for nid, val in [(1,fam),(2,sub),(4,full),(6,ps),(16,fam),(17,sub)]:
        name.setName(val, nid, 3, 1, 0x409)
    head = font["head"]; os2 = font["OS/2"]
    macStyle = 0; fsSel = 0
    if bold: macStyle |= 0x1; fsSel |= 0x20
    if italic: macStyle |= 0x2; fsSel |= 0x1
    if not (bold or italic): fsSel |= 0x40
    head.macStyle = macStyle
    os2.fsSelection = (os2.fsSelection & ~0x61) | fsSel

def make(src, axes, fam, sub, bold, out):
    f = TTFont(src)
    instantiateVariableFont(f, axes, inplace=True)
    setname(f, fam, sub, bold=bold)
    f.save(out)
    print("wrote", out)

make("Inter-VF.ttf", {"wght":400,"opsz":14}, "Inter", "Regular", False, "Inter-Regular.ttf")
make("Inter-VF.ttf", {"wght":700,"opsz":14}, "Inter", "Bold", True, "Inter-Bold.ttf")
make("Oswald-VF.ttf", {"wght":500}, "Oswald", "Regular", False, "Oswald-Regular.ttf")
make("Oswald-VF.ttf", {"wght":600}, "Oswald", "Bold", True, "Oswald-Bold.ttf")
