import type { WPPage } from "@/lib/types";
import { resolveContentLinks } from "@/lib/media";

const WP_BASE = process.env.NEXT_PUBLIC_WP_BASE_URL!;

type Props = { page: WPPage };

export default function PageTemplate({ page }: Props) {
  const elementorCoreCss = `${WP_BASE}/wp-content/plugins/elementor/assets/css/frontend.min.css`;
  const elementorPageCss = `${WP_BASE}/wp-content/uploads/elementor/css/post-${page.databaseId}.css`;

  const content = resolveContentLinks(page.content ?? "");

  return (
    <>
      <link rel="stylesheet" href={elementorCoreCss} precedence="low" />
      <link rel="stylesheet" href={elementorPageCss} precedence="default" />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
