
// import * as Icons from 'lucide-react';

// export function getLucideIcon(name: string) {
//   return (Icons as Record<string, React.FC<{ className?: string }>>)[name] || Icons.Circle;
// }


import * as Icons from 'lucide-react';
import type {LucideIcon} from 'lucide-react';

export function getLucideIcon(name: string): LucideIcon {
  const iconsMap = Icons as unknown as Record<string, LucideIcon>;
  return iconsMap[name] || Icons.Circle;  
}