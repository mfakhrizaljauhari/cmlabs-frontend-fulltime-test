import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-on-surface-variant font-body-sm font-medium">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={`capitalize ${isLast ? 'text-on-surface' : ''}`}>
                {item.label}
              </span>
            )}
            
            {!isLast && <span className="opacity-50">/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
