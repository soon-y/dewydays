import { useEffect, useState } from 'react';

export default function ActiveLocalStorage() {
  const [value, set] = useState(false);
  useEffect(() => {
    window.addEventListener('storage', (e) => set(e.newValue));
    return () => {
      window.removeEventListener('storage', (e) => set(e.newValue));
    };
  }, [value]);

  const update = (newValue) => {
    window.localStorage.setItem("Active", newValue);
    let event = new Event('storage');
    event.newValue = newValue;
    window.dispatchEvent(event);
  };
  return [value, update];
}