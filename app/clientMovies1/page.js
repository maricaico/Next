"use client";

import React, { useState, useCallback } from "react";

export default function Home() {
    const [resultMovies, setResultMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = useCallback(async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const httpRes = await fetch(`/api/searchMovies?titleSearchKey=${searchKey}`);
            const jsonRes = await httpRes.json();

            if (httpRes.ok) {
                setResultMovies(jsonRes);
            } else {
                console.error(jsonRes.error);
                alert(`Erro: ${jsonRes.error}`);
            }
        } catch (error) {
            console.error("Erro ao chamar a API interna:", error);
            alert("Erro ao buscar filmes. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    }, [searchKey]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
                Busca de Filmes
            </h1>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                <MovieForm
                    handleAction={handleAction}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    isLoading={isLoading}
                />
                <MovieTable movies={resultMovies} />
            </div>
        </div>
    );
}

const MovieForm = ({ handleAction, searchKey, setSearchKey, isLoading }) => (
    <form
        onSubmit={handleAction}
        className="mb-6 flex flex-col md:flex-row gap-4 items-center"
    >
        <div className="flex flex-col flex-grow">
            <label
                htmlFor="idTitleSearchKey"
                className="text-gray-700 font-semibold mb-2"
            >
                Título do Filme
            </label>
            <input
                id="idTitleSearchKey"
                name="titleSearchKey"
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Digite o título do filme"
            />
        </div>
        <button
            type="submit"
            disabled={isLoading || searchKey.trim() === ""}
            className={`px-6 py-2 mt-2 md:mt-0 rounded-lg transition-colors ${
                isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
            {isLoading ? "Pesquisando..." : "Pesquisar"}
        </button>
    </form>
);

const MovieTable = ({ movies }) => (
    <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-md">
            <thead>
                <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 px-4 py-2">Título</th>
                    <th className="border border-gray-300 px-4 py-2">Ano</th>
                    <th className="border border-gray-300 px-4 py-2">Poster</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie.imdbID} className="text-center even:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{movie.Title}</td>
                        <td className="border border-gray-300 px-4 py-2">{movie.Year}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                                alt={movie.Title}
                                className="w-24 h-auto mx-auto"
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
