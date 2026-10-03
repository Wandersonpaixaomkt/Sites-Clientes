import { createServerFn } from "@tanstack/react-start";

export type LegalHeadline = {
  title: string;
  url: string;
  source: string;
  date: string;
};

const FEEDS = [
  "https://news.google.com/rss/search?q=STF+OR+TST+OR+%22OAB+Par%C3%A1%22+OR+TJPA+OR+%22direito+do+trabalho%22+when:7d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  "https://news.google.com/rss/search?q=site:stf.jus.br+when:7d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
];

function parseRss(xml: string): LegalHeadline[] {
  const items: LegalHeadline[] = [];
  const blocks = xml.split(/<item>/i).slice(1);
  for (const block of blocks) {
    const title = unwrap(block, "title");
    const link = unwrap(block, "link");
    const date = unwrap(block, "pubDate");
    const source = unwrap(block, "source") || sourceFromTitle(title);
    if (!title || !link) continue;
    items.push({
      title: cleanTitle(title, source),
      url: link,
      source,
      date: formatDate(date),
    });
  }
  return items;
}

function unwrap(block: string, tag: string) {
  const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i"));
  if (cdata) return cdata[1].trim();
  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return plain ? plain[1].replace(/<[^>]+>/g, "").trim() : "";
}

function sourceFromTitle(title: string) {
  const i = title.lastIndexOf(" - ");
  return i > 0 ? title.slice(i + 3).trim() : "Google News";
}

function cleanTitle(title: string, source: string) {
  const suffix = ` - ${source}`;
  return title.endsWith(suffix) ? title.slice(0, -suffix.length).trim() : title;
}

function formatDate(raw: string) {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export const getLegalNews = createServerFn({ method: "GET" }).handler(async () => {
  const seen = new Set<string>();
  const out: LegalHeadline[] = [];
  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed, {
        headers: { "User-Agent": "Mozilla/5.0 OliveiraSampaioSite/1.0", Accept: "application/rss+xml, text/xml" },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      for (const item of parseRss(xml)) {
        const key = item.title.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(item);
      }
    } catch {
      /* try next feed */
    }
  }
  return out.slice(0, 16);
});
