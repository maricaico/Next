export default async function Home({ searchParams }) {
  // Aguarde a resolução de `searchParams`
  const resolvedSearchParams = await searchParams;

  // Atribua valores com fallback após a resolução
  const titleSearchKey = resolvedSearchParams?.titleSearchKey || 'bagdad';
  const type = resolvedSearchParams?.type || '';
  const year = resolvedSearchParams?.year || '';
  const page = resolvedSearchParams?.page || '1';

  const apiUrl = `http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}&type=${type}&y=${year}&page=${page}`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  if (data.Response === "False") {
    return (
      <div>
        <h1>Erro na busca</h1>
        <p>{data.Error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Resultados da Pesquisa</h1>
      <p>
        <strong>Tipo:</strong> {type || "Todos os tipos"}
      </p>
      <p>
        <strong>Página:</strong> {page}
      </p>
      <div>
        {data.Search.map((m) => (
          <div
            key={m.imdbID}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Título:</strong> {m.Title}
            </p>
            <p>
              <strong>Ano:</strong> {m.Year}
            </p>
            <p>
              <strong>Tipo:</strong> {m.Type}
            </p>
            {m.Poster !== "N/A" ? (
              <img
                src={m.Poster}
                alt={`Pôster de ${m.Title}`}
                style={{ width: "150px", height: "auto", borderRadius: "5px" }}
              />
            ) : (
              <p>
                <em>Pôster não disponível</em>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

  