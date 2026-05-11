import type { WPPage } from "@/lib/types";

const WP_BASE = process.env.NEXT_PUBLIC_WP_BASE_URL!;

type Props = { page: WPPage };

export default function PageTemplate({ page }: Props) {
  const elementorCoreCss = `${WP_BASE}/wp-content/plugins/elementor/assets/css/frontend.min.css`;
  const elementorPageCss = `${WP_BASE}/wp-content/uploads/elementor/css/post-${page.databaseId}.css`;

  // Rewrite internal WP absolute links to root-relative paths so navigation stays in Next.js
  const escaped = WP_BASE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const content =
    page.content?.replace(new RegExp(`href="${escaped}`, "g"), `href="`) ?? "";

  return (
    <>
      <link rel="stylesheet" href={elementorCoreCss} precedence="low" />
      <link rel="stylesheet" href={elementorPageCss} precedence="default" />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
