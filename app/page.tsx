export async function generateMetadata() {
  return {
    title: process.env.NEXT_PUBLIC_SITE_TITLE,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  };
}

export default async function Home() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "pages?slug=homepage"
  );
  const data = await response.json();
  const page = data[0];

  return (
    <div className="p-4">
      <div
        className="text-center flex justify-center items-center flex-col max-w-5xl mx-auto"
        dangerouslySetInnerHTML={{ __html: page?.content?.rendered ?? "" }}
      />
    </div>
  );
}
