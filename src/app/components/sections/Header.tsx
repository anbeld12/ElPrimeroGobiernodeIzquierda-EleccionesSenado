import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

const NAV_SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "composicion", label: "Composición" },
  { id: "pacto", label: "Pacto Histórico" },
  { id: "mapa", label: "Geografía" },
  { id: "colapso", label: "Umbral" },
  { id: "movilizacion", label: "Movilización" },
  { id: "gobernabilidad", label: "Gobernabilidad" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleNav = (id: string) => {
    setSheetOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className="h-14 md:h-[72px] border-b border-border-default bg-ivory safe-top">
        <div className="section-container flex items-center justify-between h-full">
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-slate truncate mr-2">
            BOG-2029789-1-2026-01 · EL PRIMER GOBIERNO DE IZQUIERDA EN COLOMBIA
          </span>

          <div className="flex items-center gap-2">
            <span className="hidden md:block font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-slate">
              Análisis Territorial de Datos · Congreso 2026
            </span>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación" className="md:hidden size-8">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-ivory border-l border-border-default w-72">
                <SheetHeader>
                  <SheetTitle className="font-mono text-[10px] tracking-[0.12em] uppercase text-slate text-left">
                    Navegación · Congreso 2026
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1" aria-label="Navegación principal">
                  {NAV_SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleNav(s.id)}
                      className="text-left px-4 py-3 text-sm text-ink hover:bg-soft rounded-md transition-colors font-medium"
                    >
                      {s.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
