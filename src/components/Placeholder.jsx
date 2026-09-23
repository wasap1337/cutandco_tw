import { Scissors } from "lucide-react";

export default function Placeholder({ className = "" }) {
  return (
    <div className={`flex items-center justify-center bg-[#e8e4dc] text-[#777269] ${className}`}>
      <div className="text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#aaa39a]">
          <Scissors size={18} />
        </div>
        <span className="text-xs uppercase tracking-[.18em]"> фото</span>
        <p className="mt-1 text-[11px] normal-case tracking-normal">
         КАРТИНКИ
        </p>
      </div>
    </div>
  );
}
