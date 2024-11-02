"use client";
import { books } from "./data";
import CardBook from "./components/CardBook";
import { useState } from "react";
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  function normalizeText(text: string) {
    return text
      .normalize("NFD") // Descompone caracteres con tildes
      .replace(/[\u0300-\u036f]/g, "") // Elimina marcas diacríticas
      .toLowerCase(); // Convierte a minúsculas
  }

  const filteredBooks = books.filter((book) => {
    const search = normalizeText(searchTerm);
    return (
      normalizeText(book.title).includes(search) ||
      normalizeText(book.author).includes(search)
    );
  });
  return (
    <section className="w-[95%] mx-auto mb-32 flex lg:block items-center flex-col">
      <p className="text-4xl font-bold text-center my-10">
        Mis libros en venta:
      </p>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por título o autor"
        className="w-full mb-4 p-2 border border-gray-300 rounded mt-10 max-w-96"
      />

      <div className="w-full hidden  lg:flex flex-col md:flex-row justify-between mt-6 mb-4 text-xl font-semibold">
        <p className="w-3/12">Título</p>
        <p className="w-2/12">Autor/a</p>
        <p className="w-1/12 text-center">Precio nuevo</p>
        <p className="w-1/12 text-center">Descuento</p>
        <p className="w-1/12 text-center">Valor de venta</p>
        <p className="w-4/12"></p>
      </div>
      {filteredBooks.map((book) => (
        <CardBook
          key={book.title}
          title={book.title}
          author={book.author}
          imagesArray={book.imagesArray}
          oldPrice={book.oldPrice}
          newPrice={book.newPrice}
          discount={book.discount}
          sold={book.sold}
        />
      ))}
    </section>
  );
}
