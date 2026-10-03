import NewsChannel from "./news-channel";
import { listPublishedStories } from "./cms";
import { stories } from "./news-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    return <NewsChannel initialStories={await listPublishedStories()} />;
  } catch {
    return <NewsChannel initialStories={stories} />;
  }
}
