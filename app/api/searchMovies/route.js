export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const titleSearchKey = searchParams.get("titleSearchKey");

    if (!titleSearchKey) {
        return new Response(
            JSON.stringify({ error: "A chave de pesquisa é obrigatória." }),
            { status: 400 }
        );
    }

    try {
        const httpRes = await fetch(
            `http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}`
        );
        const jsonRes = await httpRes.json();

        if (jsonRes.Response === "False") {
            return new Response(
                JSON.stringify({ error: jsonRes.Error }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(jsonRes.Search), { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar filmes na API OMDB:", error);
        return new Response(
            JSON.stringify({ error: "Erro interno do servidor." }),
            { status: 500 }
        );
    }
}
