import { writable } from "svelte/store";

const isBrowser = typeof window !== "undefined"; // Check if the code is running in the browser

const createWritableStore = <T>(key: string, startValue: T) => {
  const { subscribe, set, update } = writable(startValue); // Destructure writable store methods

  return {
    subscribe,
    set,
    update,
    useLocalStorage: () => {
      if (!isBrowser) return; // Exit if not running in the browser

      const json = localStorage.getItem(key);
      if (json && json !== "undefined" && json !== "null") {
        set(JSON.parse(json));
      }

      subscribe((current) => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    },
  };
};

export const count = createWritableStore<number>("count", 0);

export const users = createWritableStore<
  { username: string; password: string }[]
>("users", []);
if (isBrowser) users.useLocalStorage();

export const user = createWritableStore<object>("user", {});
if (isBrowser) user.useLocalStorage();

export const isAuthenticated = writable<boolean>(false);

export const clearWritableStore = () => {
  user.set({});
  isAuthenticated.set(false);
};

export const watchLaterList = writable([]);
