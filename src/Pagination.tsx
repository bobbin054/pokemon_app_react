import React from "react";

export default function Pagenation({
  gotoNextPage,
  gotoPrevPage,
}: {
  gotoNextPage: () => void;
  gotoPrevPage: string | (() => void);
}) {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {<button onClick={gotoNextPage}>Next</button>}
    </div>
  );
}
