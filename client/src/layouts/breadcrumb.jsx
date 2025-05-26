import { Link, useLocation } from "react-router-dom";
import { House } from "lucide-react";
import { slugToNameMap } from "../utils/categoriesMap";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="w-full max-w-[90%]">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/" className="flex items-center gap-1">
              <House size={20} />
              Trang chủ
            </Link>
          </li>

          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={index}>
                {isLast ? (
                  <span>{slugToNameMap.get(name)}</span>
                ) : (
                  <Link to={`${routeTo}?page=1`}>
                    {slugToNameMap.get(name)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
