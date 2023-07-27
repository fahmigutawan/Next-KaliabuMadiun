import React from 'react';
import { AiFillHome } from 'react-icons/ai';

interface BreadcrumbProps {
  page: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ page }) => {
  return (
    <div className='flex flex-row gap-4 items-center font-semibold text-secondary800 mb-4 text-xs md:text-base'>
      <AiFillHome />
      {page.map((pageTitle, index) => (
        <React.Fragment key={pageTitle}>
          <span>/</span>
          <span>{pageTitle}</span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;