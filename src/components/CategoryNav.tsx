import { fetchCategories } from "@/lib/api";
import type { Category } from "@/types/product";

import CategoryNavItem from "./CategoryNavItem";

export default async function CategoryNav() {
  let categories: Category[] = [];

  try {
    categories = await fetchCategories();
  } catch {
    categories = [];
  }

  return (
    <nav aria-label="পণ্যের বিভাগ" className="h-full overflow-hidden">
      <div className="mx-auto flex h-full max-w-[1152px] items-center overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-center gap-1">
          {/* Home */}
          <CategoryNavItem href="/" icon="🏠" label="হোম" />

          {/* Categories */}
          {categories.map((category) => (
            <CategoryNavItem
              key={category.id}
              href={`/category/${category.slug}`}
              icon={category.icon}
              label={category.nameBn}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
