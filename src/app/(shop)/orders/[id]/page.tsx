import Image from "next/image";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { cn } from "@/utils/mergeStyles";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

type Params = Promise<{ id: string }>;

export default async function OrdersPage(props: { params: Params }) {
  const { id } = await props.params;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div
              className={cn(
                `flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5`,
                // "bg-red-500",
                "bg-green-700"
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>

            {productsInCart.map(product => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} X 3</p>
                  <p className="font-bold">Subtotal: ${product.price}</p>
                </div>
              </div>
            ))}
          </div>
          {/* cHECKOUT CARD */}
          <div className="bg-white rounded-xl shadow-xl p-7 ">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Omar Rendón</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Ciudad de México</p>
              <p>123.123.123</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumén de orden</h2>
            <div className="grid  grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right"> 3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$100.00</span>

              <span>Impuestos (15%)</span>
              <span className="text-right"></span>

              <span className="mt-5 text-2xl">Total: </span>
              <span className="mt-5 text-2xl text-right">$100.00</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={cn(
                  `flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5`,
                  // "bg-red-500",
                  "bg-green-700"
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
