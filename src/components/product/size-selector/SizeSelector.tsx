"use client";
import { Size } from "@/interfaces";
import { cn } from "@/utils/mergeStyles";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeSelected: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeSelected,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4 ">Tallas disponibles</h3>
      <div className="flex">
        {availableSizes.map(size => (
          <button
            onClick={() => onSizeSelected(size)}
            key={size}
            className={cn(
              `mx-2 hover:underline text-lg`,
              size === selectedSize && "underline"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
