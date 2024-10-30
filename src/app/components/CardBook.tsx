"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CardBook({
  title,
  author,
  imagesArray,
  oldPrice,
  newPrice,
  discount,
}: {
  title: string;
  author: string;
  imagesArray: StaticImageData[];
  oldPrice: string;
  newPrice: string;
  discount: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const images = imagesArray;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const previous = () => {
    const condition = selectedIndex > 0;
    const nextIndex = condition ? selectedIndex - 1 : images.length - 1;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };
  const next = () => {
    const condition = selectedIndex < images.length - 1;
    const nextIndex = condition ? selectedIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const whatsappMessage = `Hola! Me comunico a través de la página de libros usados, quería saber la disponibilidad de: ${title}. Muchas gracias!`;

  const whatsappURL = `https://wa.me/+543564506853?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      <article className="w-full hidden  lg:flex flex-col md:flex-row justify-between border-b-2 pb-1 mt-2">
        <p className="w-3/12">{title}</p>
        <p className="w-2/12">{author}</p>
        <p className="w-1/12 line-through text-center">$ {oldPrice}</p>
        <p className="w-1/12 text-center">- {discount}%</p>
        <p className="w-1/12 bg-green-300 font-semibold p-1 rounded-full text-center">
          $ {newPrice}
        </p>
        <div className="w-2/12 flex justify-center">
          <button
            className="w-fit bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            onClick={openModal}
          >
            Ver Imágenes
          </button>
        </div>
        <div className="w-2/12 flex justify-center">
          <Link
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            Consultar por WhatsApp
          </Link>
        </div>
      </article>
      <article className="w-full max-w-96 mb-4 flex lg:hidden flex-col border-2 border-green-400 bg-green-50 gap-y-4 py-2 rounded-md">
        <p className="text-center font-semibold text-2xl">{title}</p>
        <p className="text-center text-lg">{author}</p>
        <p className="line-through text-center">Precio Nuevo: $ {oldPrice}</p>
        <p className="text-center">
          Descuento aplicado: <span className="font-bold">- {discount}%</span>
        </p>
        <p className="bg-green-300 text-xl font-semibold p-1 rounded-full text-center w-fit mx-auto px-4 py-2">
          $ {newPrice}
        </p>
        <div className="flex justify-center">
          <button
            className="w-fit bg-blue-500 text-white text-xl py-1 px-3 rounded hover:bg-blue-600"
            onClick={openModal}
          >
            Ver Imágenes
          </button>
        </div>
        <div className="flex justify-center">
          <Link
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-xl bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            Consultar por WhatsApp
          </Link>
        </div>
      </article>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full h-full flex flex-row justify-center items-center gap-x-6">
            {images.length > 1 && (
              <button
                className="text-4xl font-semibold text-white h-min w-fit hover:scale-125"
                onClick={previous}
              >
                {"<"}
              </button>
            )}
            <Image
              loading="lazy"
              className=" w-auto max-h-[95vh] max-w-[73vw]"
              src={selectedImage}
              alt="Libro en venta"
            />
            {images.length > 1 && (
              <button
                className="text-4xl font-semibold text-white h-min hover:scale-125"
                onClick={next}
              >
                {">"}
              </button>
            )}
            <button
              className="absolute top-4 right-4 text-4xl font-semibold text-white hover:scale-125"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
