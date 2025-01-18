"use client";

import { searchMovies } from "../actions/movieActions";
import Form from "next/form";
import { useState } from "react";

export default function Home() {
    const [data, setData] = useState({});

    async function handleAction(formData) {
        const res = await searchMovies(formData);
        setData(res);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Busca de Filmes, Séries e Episódios</h1>
            <MovieForm actionHandler={handleAction} />
            {data.Search && data.Search.length > 0 ? (
                <MovieTable movies={data.Search} />
            ) : (
                <p className="text-center text-gray-500 mt-4">Nenhum resultado encontrado</p>
            )}
        </div>
    );
}

export function MovieTable({ movies }) {
    return (
        <div className="mt-6 overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">Título</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Ano</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.imdbID} className="even:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{movie.Title}</td>
                            <td className="border border-gray-300 px-4 py-2 capitalize">{movie.Type}</td>
                            <td className="border border-gray-300 px-4 py-2">{movie.Year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function MovieForm({ actionHandler }) {
    return (
        <Form action={actionHandler} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="idTitleSearchKey" className="block text-gray-700 font-medium mb-2">Título:</label>
                <input 
                    id="idTitleSearchKey" 
                    name="titleSearchKey" 
                    placeholder="Digite o título" 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>
            <div className="mb-4">
                <label htmlFor="idTypeSearchKey" className="block text-gray-700 font-medium mb-2">Tipo:</label>
                <select 
                    id="idTypeSearchKey" 
                    name="typeSearchKey" 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todos</option>
                    <option value="movie">Filme</option>
                    <option value="series">Série</option>
                    <option value="episode">Episódio</option>
                </select>
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
                Pesquisar
            </button>
        </Form>
    );
}




