import React from "react";
import SearchList from "./search-list";

function PublicPage() {
  return (
    <div className="bg-no-repeat bg-center rounded-xl">
      <div className="h-full min-h-[80vh] flex md:pt-8 md:px-0 items-center flex-col">
        <div className="max-w-[60rem] bg-opacity-90 min-h-full w-full">
          <div className="px-4 hidden md:block">
            <p className="text-3xl max-w-[40rem] font-semibold hidden md:block">
              Cek Pesananku
            </p>
          </div>
          <SearchList />
        </div>
      </div>
    </div>
  );
}

export default PublicPage;
