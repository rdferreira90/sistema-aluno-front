
import * as Icons from 'lucide-react';

export function getLucideIcon(name: string) {
  return (Icons as Record<string, React.FC<{ className?: string }>>)[name] || Icons.Circle;
}
