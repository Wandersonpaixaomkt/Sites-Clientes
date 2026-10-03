import { useEffect, useState } from "react";
import { getLegalNews, type LegalHeadline } from "@/lib/legal-news";

export function DailyLegalNews({ limit = 4 }: { limit?: number }) {
  const [items, setItems] = useState<LegalHeadline[] | null>(null);

  useEffect(() => {
    let live = true;
    getLegalNews()
      .then((data) => {
        if (live) setItems(data);
      })
      .catch(() => {
        if (live) setItems([]);
      });
    return () => {
      live = false;
    };
  }, []);

  if (items === null) {
    return <p className="text-sm text-muted">Carregando atualizações jurídicas…</p>;
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted">
        Não foi possível carregar as manchetes agora. Tente novamente em instantes.
      </p>
    );
  }

  return (
    <ul className="news-list">
      {items.slice(0, limit).map((item) => (
        <li key={item.url}>
          <p className="news-meta">
            {item.date} · {item.source}
          </p>
          <a href={item.url} target="_blank" rel="noreferrer" className="news-title">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
