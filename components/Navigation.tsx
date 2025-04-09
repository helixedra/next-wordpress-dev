import useWPAuth from "@/hooks/useWPAuth";

export default async function Navigation() {
  const { authHeader } = useWPAuth();
  const url = process.env.NEXT_PUBLIC_API_URL + "menu-locations";
  // const url2 =
  //   "https://testsite.codebase.stream/wp-json/wp/v2/menus?slug=mainmenu";
  const menuendpoint =
    "https://testsite.codebase.stream/wp-json/wp/v2/menu-items?menus?slug=mainmenu";
  const response = await fetch(menuendpoint, {
    headers: authHeader,
  });
  const data = await response.json();
  const slug = (url: string) => {
    return "/" + url.split("/")[3];
  };

  return (
    <nav
      className="main-navigation max-w-5xl mx-auto"
      aria-label="Primary navigation"
    >
      <ul className="nav-list flex gap-4 justify-center items-center">
        {data?.map((item: any) => (
          <li className="nav-item" key={item.id}>
            <a href={slug(item.url)} className="nav-link">
              {item.title.rendered}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
