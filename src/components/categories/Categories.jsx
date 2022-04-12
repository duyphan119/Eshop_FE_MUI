import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAllCategories } from "../../api/apiCategory";
import { apiGetProductsByCategorySlug, apiGetProductsByCollectionId, apiGetProductsByStatistics } from "../../api/apiProduct";
import { TiArrowUnsorted } from "react-icons/ti";
import "./categories.scss";
const Categories = () => {
  const user = useSelector(state => state.auth.currentUser);
  const buyerTypes = useSelector(state => state.buyerType.list);
  const collectionProducts = useSelector(state => state.collectionProduct.list);
  const categories = useSelector(state => state.category.list);
  const [indexClick, setIndexClick] = useState(0);
  const dispatch = useDispatch();
  const bestSellerProducts = (statisticType) => {
    apiGetProductsByStatistics(user, statisticType, dispatch);
    setIndexClick(0);
  }

  useEffect(() => {
    apiGetProductsByStatistics(user, "best-seller", dispatch);
    apiGetAllCategories(dispatch)
  }, [user, dispatch])

  const collection = collectionProducts.find(item => item.isMain);

  const productsByCategorySlug = (buyerType, index) => {
    apiGetProductsByCategorySlug(user, buyerType.slug, "", dispatch);
    setIndexClick(index);
  }
  const productsByCollection = (collection, index) => {
    apiGetProductsByCollectionId(user, collection.id, "", dispatch);
    setIndexClick(index);
  }

  const checkActive = (index) => {
    if (index === indexClick) return "active"
    return "";
  }

  return (
    <>
      <div className="categories">
        <button className={`category ${checkActive(0)}`} onClick={() => bestSellerProducts("best-seller")}>Bán chạy nhất</button>
        {buyerTypes.map((buyerType, index) => <button key={buyerType.id} className={`category ${checkActive(1 + index)}`}
          onClick={() => productsByCategorySlug(buyerType, 1 + index)}>{buyerType.name}</button>)}
        {collection &&
          <button
            key={collection.id}
            className={`category ${checkActive(1 + buyerTypes.length)}`}
            onClick={() => productsByCollection(collection, 1 + buyerTypes.length)}>{collection.shortName}</button>}
        <button
          className={`category ${checkActive(2 + buyerTypes.length)}`}
          onClick={() => productsByCategorySlug(categories.length === 0 ? "" : categories[0].slug, 2 + buyerTypes.length)}
        >{categories.length === 0 ? "" : categories[0].name}</button>
      </div>
      <div className="categories__mobile">
        <label htmlFor="id-categories__mobile" className="categories__mobile-text">Vlue <TiArrowUnsorted />
          <input type="checkbox" id="id-categories__mobile" hidden />
          <div className="categories__mobile-others">
            <div className="categories__mobile-other">Vlasd wqe</div>
            <div className="categories__mobile-other">Vla 123 312sd wqe</div>
            <div className="categories__mobile-other">123 Vla 00 213</div>
          </div>
        </label>
      </div>
    </>
  );
};

export default Categories;
