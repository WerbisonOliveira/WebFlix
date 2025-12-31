import axios from "axios";

export const tmdbService = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzJmNGFmYTVhNmY1MTIwNTNlOTQ0ZTM4NWY0YTQwOCIsIm5iZiI6MTc2NDMwMDc0NS44MTYsInN1YiI6IjY5MjkxN2M5YWZhNjc2ZDNjNTI0OTczMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-f7ipTo3ac1oCdaWeGX725fM_6OF0-60JhURiS9U7bY"
    }
});