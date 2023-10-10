import React from "react";

export default function Pagenation({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      {gotoPrevPage && (
        <button type="button" onClick={gotoPrevPage}>
          Previous
        </button>
      )}
      {gotoNextPage && (
        <button type="button" onClick={gotoNextPage}>
          Next
        </button>
      )}
    </div>
  );
}
