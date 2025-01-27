import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getCart, removeFromCart } from "../services/Api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { notify } from "../utils/notification";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const columns = [
    { field: "name", body: () => {}, header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];
  const {
    data: cartProducts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartproducts"],
    queryFn: getCart,
  });
  useEffect(() => {
    if (cartProducts) {
      console.log(cartProducts);
      setProducts(cartProducts.products);
    }
  }, [cartProducts]);
  const removeFromCarttMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", data.message);
        refetch()
      }
      else{
        notify("error", data.message)
      }
    },
  });
  return (
    <>
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
        <Column
          body={(rowData) => {
            return (
              <>
                <span>{rowData.productId.name}</span>
              </>
            );
          }}
          header="Product Name"
        />
        <Column
          body={(rowData) => {
            return (
              <>
                <span>{rowData.quantity}</span>
              </>
            );
          }}
          header="Product Quantity"
        />
        <Column
          header="Action"
          body={(rowData)=>{
            return (
                <>
                    <Button
                        label="Remove"
                        className="p-button p-button-danger mr-2"
                        onClick={() => {
                            console.log(rowData)
                            console.log(rowData._id)
                            removeFromCarttMutation.mutate({id:rowData._id})
                        }}
                    />
                </>
            )
          }}
        />
      </DataTable>
    </>
  );
};

export default Cart;
