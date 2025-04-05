export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODZkODMzNjFjOTVkOGU1OWViNWQxODA3MTljYTBjNCIsIm5iZiI6MTc0MzQ5NzQ5Mi4xMjcsInN1YiI6IjY3ZWJhOTE0MDNiYWJkY2VkMjdhYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VS9KwDXZJrcDk7sorwnR8vTdXRv-Y4B7jC2hdxvMWBU`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;


  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });


  if (!response.ok) {
     //throw new Error("Failed to Fetch Movies", response.statusText);
  }

  const data = await response.json();


  return data.results;
};

