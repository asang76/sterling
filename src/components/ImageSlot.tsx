import Image from "next/image";
import { images, type ImageKey } from "@/content/images";

/**
 * Renders a registered image, or a clearly labelled placeholder while no licensed photo exists.
 * Set `priority` on the single above-the-fold (LCP) image only.
 */
export function ImageSlot({ name, priority = false, sizes = "(min-width: 1024px) 480px, 100vw", className = "" }: { name: ImageKey; priority?: boolean; sizes?: string; className?: string }) {
  const img = images[name];
  if (!img.src) {
    return (
      <div
        role="img"
        aria-label={`Image placeholder: ${img.alt}`}
        style={{ aspectRatio: `${img.width} / ${img.height}` }}
        className={`flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-[#2b4f7c] bg-gradient-to-br from-[#1d3f68] to-[#112b4a] p-6 text-center text-[15px] text-on-navy ${className}`}
      >
        <span>[Licensed photo goes here: {img.alt}]</span>
      </div>
    );
  }
  return <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority={priority} sizes={sizes} style={{ aspectRatio: `${img.width} / ${img.height}` }} className={`h-auto w-full rounded-lg object-cover ${className}`} />;
}
