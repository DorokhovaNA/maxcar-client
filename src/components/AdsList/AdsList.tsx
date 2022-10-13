import { IAds } from "../../types";
import { AdsItem } from "../AdsItem/AdsItem";
import usePagination from "../../hooks/usePagination";

export const AdsList = ({ ads }: { ads: IAds[] }) => {
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 5,
    count: ads.length,
  });
  return (
    <section className="d-flex flex-column">
      <ul className="list-group mt-4">
        {ads.slice(firstContentIndex, lastContentIndex).map((ad, index) => (
          <AdsItem key={ad._id as string} ad={ad} index={index + 1} />
        ))}
      </ul>
      {ads.length ? (
        <>
          <div className="pagination m-auto">
            <button
              onClick={prevPage}
              className={`btn page ${page === 1 && "disabled"}`}
            >
              &larr;
            </button>
            <button
              onClick={() => setPage(1)}
              className={`btn page ${page === 1 && "disabled"}`}
            >
              1
            </button>
            {gaps.before ? "..." : null}
            {/* @ts-ignore */}
            {gaps.paginationGroup.map((el) => (
              <button
                onClick={() => setPage(el)}
                key={el}
                className={`btn page ${page === el ? "active" : ""} `}
              >
                {el === 1}
              </button>
            ))}
            {gaps.after ? "..." : null}
            <button
              onClick={() => setPage(totalPages)}
              className={`btn page ${totalPages === 1 ? "d-none" : ""} ${
                page === totalPages && "disabled"
              }`}
            >
              {totalPages}
            </button>
            <button
              onClick={nextPage}
              className={`btn page ${page === totalPages && "disabled"}`}
            >
              &rarr;
            </button>
          </div>
          <p className="text text-center mb-3">
            Страница {page} из {totalPages}
          </p>
        </>
      ) : (
        ""
      )}
    </section>
  );
};
