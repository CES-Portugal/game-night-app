import { writable } from 'svelte/store';

let _user = localStorage.getItem('amplifyUser');
export const store = writable(_user ? JSON.parse(_user) : null);
store.subscribe((value) => {
  if (value) localStorage.setItem('amplifyUser', JSON.stringify(value));
  else localStorage.removeItem('amplifyUser'); // for logout
});
