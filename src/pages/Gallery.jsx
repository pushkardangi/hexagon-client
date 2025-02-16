import React, { useState, useEffect } from "react";

import { Loader, Card, FormField } from "../components";

const RenderCards = ({data, title}) =>{
  if(data?.length > 0){
    return data.map((post) => <Card key={post._id} {...post}/>)
  }
  return(
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">
      {title}
    </h2>
  )
}

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const [allImages, setAllImages] = useState(null);
  
  const [searchText, setSearchText] = useState('abc');

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>

        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning images generated by DALL-E 2.0
        </p>

        <div className="mt-16">
          <FormField/>
        </div>

        {/* if Loading-true(show Loader) else (show Showing results for "xyz") */}
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader/>
            </div>
          ) : (
            <>
              {searchText &&
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                showing results for <span className="text-[#333238]">{searchText}</span>
              </h2> }
            </>
          )}

          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            {searchText ? (
              <RenderCards 
                data={[]}
                title="No search results found"
                />
            ) : (
              <RenderCards data={[]}
              title="No Post found" />
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Gallery;
