import { useState, useEffect, useCallback } from "react";

/**
 * Hook genérico para peticiones a la API simulada.
 * Reutilizable en todas las vistas (igual que en la versión web con React).
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

/**
 * Hook para favoritos persistidos en memoria de sesión.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(new Set());

  const toggle = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.has(id),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}
