export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    const options = {
        method: "GET",
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
        }
    };
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
    const data = await res.json()

    return Response.json({ data })
}