import React from 'react';
import Image from 'gatsby-image';

import { useGraphQL } from '../hooks';

const Hero = () => {
  const {
    heroImage: {
      childImageSharp: { fluid: heroImageSrc },
    },
    site: {
      siteMetadata: { title, description },
    },
  } = useGraphQL();

  return (
    <div className="relative overflow-hidden">
      <Image
        fluid={heroImageSrc}
        style={{ minHeight: '20rem', maxHeight: '35rem' }}
      />
      <div className="absolute inset-0 w-full h-full px-4 sm:px-6">
        <div className="flex items-center justify-center w-full h-full max-w-sm mx-auto">
          <div className="flex flex-col px-4 py-8 leading-none text-center text-white sm:px-6 bg-transparent-black-50">
            <span className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10">
              {title}
            </span>
            <span className="max-w-2xl mx-auto mt-3 text-xl leading-7 sm:mt-4">
              {description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero };
