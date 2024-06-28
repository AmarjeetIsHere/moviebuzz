import { watchLaterList } from "../store";

export const addToWatchLater = (movie: any) => {
  watchLaterList.update((list: any) => {
    if (!list.find((item: any) => item.id === movie.id)) {
      return [...list, movie];
    }
    return list;
  });
};

export const removeFromWatchLater = (movieId: number) => {
  watchLaterList.update((list) =>
    list.filter((movie: any) => movie.id !== movieId)
  );
};
