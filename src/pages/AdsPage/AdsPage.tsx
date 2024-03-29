import { useStore } from "effector-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAdsFx } from "../../api/AdsClient";
import { $ads, setAds } from "../../context";
import { Spinner } from "../../components/Spinner/Spinner";
import { AdsList } from "../../components/AdsList/AdsList";
import { CreateAds } from "../../components/CreateAds/CreateAds";
import { $auth } from "../../context/auth";
import { FilterBlock } from "../../components/FilterBlock/FilterBlock";

export const AdsPage = () => {
  const [spinner, setSpinner] = useState(false);
  const store = useStore($ads);
  const isLoggedIn = useStore($auth);
  const shouldLoadAds = useRef(true);

  useEffect(() => {
    if (shouldLoadAds.current) {
      shouldLoadAds.current = false;
      handleGetAds();
    }
  }, []);

  const handleGetAds = async () => {
    setSpinner(true);

    const ads = await getAdsFx({
      url: "/ads",
    });

    setSpinner(false);
    setAds(ads);
  };

  return (
    <div className="container" style={{ flex: "1 0 auto" }}>
      {isLoggedIn ? <CreateAds /> : ""}
      <FilterBlock />
      <section style={{ position: "relative" }}>
        {spinner && <Spinner top={0} left={450} />}
        {useMemo(
          () => (
            <AdsList ads={store} />
          ),
          [store]
        )}
        {!spinner && !store.length && (
          <h4 className="title-empty">Список объявлений пуст</h4>
        )}
      </section>
    </div>
  );
};
