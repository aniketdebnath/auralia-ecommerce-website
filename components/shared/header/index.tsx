import Image from "next/image";
import Link from "next/link";
import Search from "./search";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import CategoryDrawer from "./category-drawer";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoryDrawer />
          <Link
            href="/"
            className="flex-start ml-4">
            <Image
              src="/images/logo.png"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority
            />
          </Link>
          <span className="hidden font-bold text-2xl ml-3 lg:block">
            {APP_NAME}
          </span>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};
export default Header;
