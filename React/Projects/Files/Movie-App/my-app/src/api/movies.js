
const API_URL = "https://ghibliapi.vercel.app/films";

const localPosters = {
  "Castle in the Sky": "castleinthesky.jpg",
  "Grave of the Fireflies": "Grave_of_the_Fireflies_Japanese_poster.jpg",
  "My Neighbor Totoro": "thenieghbortotoro_.jpg",
  "Kiki's Delivery Service": "Kiki's Delivery Servicea.jpg",
  "Only Yesterday": "Only Yesterday.jpg",
  "Porco Rosso": "Porco_Rosso_(Movie_Poster).jpg",
};

export async function getMovies() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("دریافت فیلم‌ها با خطا مواجه شد");
  }

  const data = await response.json();

  return data
    .filter((movie) => localPosters[movie.title])
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? Number(movie.release_date) : null,

      // تصاویر مستقیماً از پوشه public بارگذاری می‌شوند
      poster: `/${localPosters[movie.title]}`,

      backdrop: "",
      rating: Number(movie.rt_score || 0) / 10,
      genre: "Animation",
      duration: movie.running_time
        ? `${movie.running_time} دقیقه`
        : "نامشخص",
      description:
        movie.description || "توضیحی برای این فیلم موجود نیست.",
    }));
}
