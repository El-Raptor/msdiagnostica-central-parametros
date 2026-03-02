import { fetchDREGroups } from "./model/dre-groups.js";
import { initSidebarCategoryList } from "./components/sidebar-category-list.js";

document.addEventListener("DOMContentLoaded", () => {
  const groups = fetchDREGroups();
  console.log(groups);

  initSidebarCategoryList(groups)
});

