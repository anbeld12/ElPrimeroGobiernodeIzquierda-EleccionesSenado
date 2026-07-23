import { ReactNode } from "react";
import { SectionNum } from "./SectionNum";

interface Props {
  num: string;
  title: string;
  entrada: string;
  children: ReactNode;
  analisis: string | ReactNode;
  pie?: string;
  className?: string;
  bg?: string;
}

export function SectionNarrative({ num, title, entrada, children, analisis, pie, className = "", bg = "bg-ivory" }: Props) {
  return (
    <section className={`${bg} ${className}`}>
      <div className="section-container py-10 md:py-16">
        <div className="flex items-baseline mb-1.5">
          <SectionNum n={num} />
          <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
            {title}
          </h2>
        </div>
        <p className="text-xs md:text-[13px] text-slate mb-8 pl-0 md:pl-12 leading-[1.7] max-w-[680px]">
          {entrada}
        </p>
        <div className="pl-0 md:pl-12">
          {children}
        </div>
        <div className="pl-0 md:pl-12 mt-8">
          <div className="text-xs md:text-[13px] text-slate leading-[1.8] max-w-[680px] font-sans">
            {analisis}
          </div>
          {pie && (
            <p className="font-mono text-[10px] text-slate/60 mt-6 border-t border-border-default pt-4 leading-[1.6]">
              {pie}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
