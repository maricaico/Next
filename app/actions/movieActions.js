'use server';

export async function searchMovies(formData) {
    const titleSearchKey = formData.get("titleSearchKey");
    const typeSearchKey = formData.get("typeSearchKey");

    if (!titleSearchKey || titleSearchKey.trim() === '') return { Search: [] };

    try {
        const baseUrl = `http://www.omdbapi.com/?apikey=f1cbc41e`;
        const query = `s=${encodeURIComponent(titleSearchKey)}${typeSearchKey ? `&type=${typeSearchKey}` : ''}`;
        const httpRes = await fetch(`${baseUrl}&${query}`);
        const jsonRes = await httpRes.json();

        return jsonRes;
    } catch (err) {
        return { error: `Erro na requisição: ${err}` };
    }
};
