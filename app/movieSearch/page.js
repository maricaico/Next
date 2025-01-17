'use client';

import { useState } from 'react';

export default function MoviesPage() {
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `http://www.omdbapi.com/?apikey=f1cbc41e&s=${searchKey}&type=${type}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.Response === "True") {
        setResults(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("Ocorreu um erro ao buscar os filmes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Formulário de Pesquisa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor="titleSearchKey">Título</label>
          <input
            id="titleSearchKey"
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Digite o título"
            required
          />
        </div>
        <div>
          <label htmlFor="type">Tipo</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="movie">Filme</option>
            <option value="series">Série</option>
            <option value="episode">Episódio</option>
          </select>
        </div>
        <button type="submit">Pesquisar</button>
      </form>

      {/* Resultados da Pesquisa */}
      <div>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && results.length > 0 && (
          <div>
            <h2>Resultados:</h2>
            <ul>
              {results.map((item) => (
                <li key={item.imdbID}>
                  <strong>{item.Title}</strong> ({item.Year}) - {item.Type}
                  {item.Poster !== "N/A" && (
                    <div>
                      <img
                        src={item.Poster}
                        alt={`Pôster de ${item.Title}`}
                        style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!loading && !error && results.length === 0 && <p>Sem resultados.</p>}
      </div>
    </div>
  );
}

