"use client";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { Rnd } from "react-rnd";

const CustomDesign = () => {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://via.placeholder.com/150"
  );
  const imageDimensions = { width: 600, height: 400 };

  const [renderedDimension, setRenderedDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 150,
    y: 205,
  });

  console.log(renderedPosition); // for detection of image position

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center pt-5">
      <div>
        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div ref={containerRef} className="relative h-[600px] overflow-hidden">
        <div
          ref={phoneCaseRef}
          className="relative w-60 h-[480px] bg-neutral-600"
        >
          <Image
            src="/case-template.png"
            alt="Phone Image"
            layout="fill"
            objectFit="contain"
            className="pointer-events-none z-50 select-none"
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: renderedDimension.height / 4,
            width: renderedDimension.width / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          className="absolute z-20 border-[3px] border-primary"
        >
          <div className="w-full h-full relative">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Your Image"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        </Rnd>
      </div>
    </div>
  );
};

export default CustomDesign;
