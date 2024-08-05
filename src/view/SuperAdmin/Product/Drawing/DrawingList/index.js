import React, { useEffect } from "react";
import {
  Container,
  DoubleSidedImage,
  Loading,
} from "../../../../../components/shared";
import { isEmpty } from "lodash";
import { useLocation } from "react-router-dom";
import NewDrawingDialog from "./components/NewDrawingDialog";
import { injectReducer } from "../../../../../store";
import productDetailsReducer from "./store";
import DrawingTable from "./components/DrawingTable";
import { Card } from "../../../../../components/ui";
import DrawingTableTools from "./components/DrawingTableTools";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrawingsByProductId } from "./store/dataSlice";
import ProductDetail from "./components/ProductDetails";

injectReducer("product_details", productDetailsReducer);

const ProductDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product_details.data.drawingList);
  const loading = useSelector((state) => state.product_details.data.loading);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const product_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (product_id) {
      await dispatch(getAllDrawingsByProductId({ product_id }));
    }
  };

  return (
    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(data) && (
          <>
            <ProductDetail data={data} />
            <div className="w-full">
              <Card>
                <div className="mb-4">
                  <DrawingTableTools />
                </div>
                <DrawingTable data={data} />
              </Card>
              {/* <NewDrawingDialog data={data} fetchData={fetchData} /> */}
            </div>
          </>
        )}
      </Loading>
      {!loading && isEmpty(data) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No product found!"
          />
          <h3 className="mt-8">Product Not found!</h3>
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
