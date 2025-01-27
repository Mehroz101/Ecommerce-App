import React, { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct, addToCart, getProducts } from "../services/Api";
import { Dialog } from "primereact/dialog";
import { notify } from "../utils/notification";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [allproducts, setAllproducts] = useState([]);

  const method = useForm({
    defaultValues: {
      quantity: 0,
    },
  });

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const addToCarttMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", data.message);
        method.reset();
        setVisible(false)
      }
    },
  });
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", data.message);
        method.reset();
        refetch();
        setVisible(false)
      }
    },
  });
  const onsubmit = (data) => {
    addProductMutation.mutate({
      name:data.productTitle,
      description:data.description,
      price:data.price
    });
  };
  useEffect(()=>{
  console.log(products)
if(products){
  setAllproducts(products)
}
  },[products])
  return (
    <>
      <div className="home">
        <div className="page_top flex justify-content-between align-items-center">
          <h1>Product Page</h1>
          <Button label="Add Product" onClick={() => setVisible(true)} />
        </div>

        <div className="products flex justify-content-start align-items-center gap-2 flex-wrap">
        
          {
            allproducts?.map((product, index) => {
              return (
                <Card
                  title={`${product.name}`}
                  className="md:w-25rem"
                  key={index}
                >
                  <p className="m-0 text-sm">{product.description}</p>
                  <p className="my-2 text-right text-lg">{product.price}</p>
                  <div className="card_footer flex justify-content-between align-items-end">
                    <Button label="add to cart" onClick={()=>{
                      addToCarttMutation.mutate({
                        productId:product._id,
                        quantity:parseInt(method.getValues(`quantity_${index}`))
                      })
                    }} />
                    <CustomTextInput
                      control={method.control}
                      name={`quantity_${index}`}
                      type="number"
                      placeholder="quantity"
                    />
                  </div>
                </Card>
              );
            })}
        </div>
        <Dialog
          header="Add Product"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <form onSubmit={method.handleSubmit(onsubmit)}>
            <CustomTextInput
              control={method.control}
              name="productTitle"
              label=" Product Title"
              placeholder="Enter title"
              className="w-full"
              rules={{ required: "Title is required" }}
            />
            <br />
            <CustomTextInput
              control={method.control}
              name="description"
              label=" Product Description"
              placeholder="Enter description"
              className="w-full"
              rules={{ required: "Description is required" }}
            />
            <br />
            <CustomTextInput
              control={method.control}
              name="price"
              type="number"
              label=" Product Price"
              placeholder="price"
              rules={{ required: "Description is required" }}
            />
            <br />
            <Button label="Submit" type="submit" />
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default Home;
