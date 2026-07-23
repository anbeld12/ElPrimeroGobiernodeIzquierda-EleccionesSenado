import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function TransitionText({ children }: Props) {
  return (
    <div className="section-container py-6 md:py-10">
      <p className="text-xs md:text-[13px] text-slate/60 leading-[1.8] max-w-[640px] font-editorial text-center mx-auto">
        {children}
      </p>
    </div>
  );
}
