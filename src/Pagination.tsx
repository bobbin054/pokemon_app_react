import React from "react";

export default function Pagenation({
  gotoNextPage,
  gotoPrevPage,
}: {
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}) {
  return (
    <div>
      {gotoPrevPage && (
        <button type="button" onClick={gotoPrevPage}>
          Previous
        </button>
      )}
      {
        <button type="button" onClick={gotoNextPage}>
          Next
        </button>
      }
    </div>
  );
}
