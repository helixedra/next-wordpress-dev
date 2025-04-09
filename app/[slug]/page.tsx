import { notFound } from "next/navigation";

async function fetchPageData(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}pages?slug=${slug}`
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const pageData = await fetchPageData(params.slug);
  if (!pageData) {
    return {
      title: process.env.NEXT_PUBLIC_SITE_TITLE,
      description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    };
  }
  return {
    title: `${process.env.NEXT_PUBLIC_SITE_TITLE} | ${
      pageData?.title.rendered ?? ""
    }`,
    description: `${process.env.NEXT_PUBLIC_SITE_DESCRIPTION} | ${
      pageData?.content.rendered ?? ""
    }`,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const pageData = await fetchPageData(params.slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      <h1>{pageData.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
    </div>
  );
}
