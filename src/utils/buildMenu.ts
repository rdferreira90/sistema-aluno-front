
import { MENU_ITEMS, MenuItem } from '../types/menuItem';

export function buildMenu(permissions: string[]): MenuItem[] {
  const filterByPermission = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter(item => !item.permission || permissions.includes(item.permission))
      .map(item => ({
        ...item,
        children: item.children ? filterByPermission(item.children) : undefined,
      }))
      .filter(item => !item.children || item.children.length > 0);
  };

  return filterByPermission(MENU_ITEMS);
}
