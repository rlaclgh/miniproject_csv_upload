interface ProductProps {
  id: number;
  name: string;
  nameEng: string;
  description: string;
  createdAt: string;
}
const Product = (props: ProductProps) => {
  const { id, name, nameEng, description, createdAt } = props;
  return (
    <>
      <div className="pl-4 pr-4 pt-2 pb-2 border">
        <div className="flex">
          <div className="pr-2">{name}</div>
          <div>{`(${nameEng})`}</div>
        </div>
        <div className="">{description}</div>
      </div>
    </>
  );
};

export default Product;
