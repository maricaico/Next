import sqlite3 from "better-sqlite3";

const db = new sqlite3("./database.db", { verbose: console.log });

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;

    // Obtém parâmetros da query
    const titleSearchKey = searchParams.get("titleSearchKey");
    const yearSearchKey = searchParams.get("yearSearchKey");

    try {
        // Constrói a consulta dinamicamente
        let query = "SELECT * FROM movies WHERE 1=1";
        const params = [];

        if (titleSearchKey) {
            query += " AND title LIKE ?";
            params.push(`%${titleSearchKey}%`);
        }

        if (yearSearchKey) {
            query += " AND year = ?";
            params.push(Number(yearSearchKey));
        }

        // Executa a consulta
        const stmt = db.prepare(query);
        const movies = stmt.all(...params);

        // Retorna os dados no formato JSON
        return new Response(JSON.stringify(movies), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);

        return new Response(
            JSON.stringify({ error: "Erro ao acessar o banco de dados" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
