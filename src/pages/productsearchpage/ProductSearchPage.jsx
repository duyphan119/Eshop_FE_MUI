import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { apiSearch } from '../../api/apiSearch';
import CardProduct from '../../components/cardproduct/CardProduct';
import Paginations from '../../components/pagination/Pagination';

const productsInPage = 18;

const ProductSearchPage = () => {
   const user = useSelector((state) => state.auth.currentUser);
   const [queryParams] = useSearchParams();
   const dispatch = useDispatch();
   const [products, setProducts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const keyword = queryParams.get("query");
   console.log(keyword);
   useEffect(() => {
      const api = async () => {
         try {
            const data = await apiSearch(user, keyword, "product", dispatch);
            setProducts(data);
         } catch (error) {
            console.log(error);
         }
      }
      api();
   }, [user, keyword, dispatch]);
   const renderProducts = () => {
      return [...products].splice((currentPage - 1) * productsInPage, productsInPage).map(item => {
         return <Col xs={2} className="card-product" key={item.id}>
            <CardProduct item={item} /></Col>
      })
   }
   return (
      <div style={{
         backgroundColor:"#f8f8f8",
         paddingBlock:"10px"
      }}>
         <Container>
            <Row>
               <h1 style={{
                  fontSize: "2.6rem",
                  textAlign: "center",
                  color:"var(--main-color)",
                  marginBlock:"10px"
               }}>KẾT QUẢ TÌM KIẾM SẢN PHẨM "{keyword}"</h1>
            </Row>
            <Row>
               {renderProducts()}
            </Row>
            <Row>
               <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={Math.round(products.length / productsInPage) + 1} />
            </Row>
         </Container>
      </div>
   )
}

export default ProductSearchPage