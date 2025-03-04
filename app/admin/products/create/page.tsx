import { Metadata } from "next";

import CreateProductForm from "@/components/admin/product-form";
export const metadata: Metadata = {
  title: "Create Product",
  description: "Create a new product",
};
const CreateProductPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <CreateProductForm type="create" />
      </div>
    </>
  );
};
export default CreateProductPage;
