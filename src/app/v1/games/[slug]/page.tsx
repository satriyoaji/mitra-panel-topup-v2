"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { TProductItem } from "@/Type";
import Loading from "@/app/loading";
import Header from "./header";
import ProductList from "./(product)/product-list";
import Promo from "./(promo)/promo-list";
import { useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";
import FormAccount from "./(form-id)/form-account";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import FormConfirmation from "./(account-confirmation)/form-confirmation";
import CheckoutAction from "./(checkout)/checkout-action";
import Payment from "./(payment-method)/payment";
import { useSession } from "next-auth/react";
import Swal from "@/components/swal";

function Page({ params }: { params: { slug: string } }) {
  const { data: session } = useSession();
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [products, setProducts] = useState<TProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const formRef = useRef<HTMLDivElement>(null);
  const productListRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);
  const couponRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    setLoading(true);
    var res = await fetch(`/api/products/categories/${params.slug}?`);

    if (res.ok) {
      var result = await res.json();
      if (result.data) {
        dispatch({
          action: "SET_CATEGORY",
          payload: result.data,
        });
        // setProducts(uniqeProduct(result.data.products));

        res = await fetch(`/api/products/items/${params.slug}?`);
        if (res.ok) {
          result = await res.json();
          setProducts(result.data);

          var selectedItem = searchParams.get("item");
          if (result.data && selectedItem) {
            dispatch({
              action: "SET_PRODUCT",
              payload: result.data.find(
                (i: TProductItem) => i.key == selectedItem
              ),
            });
          }
        }
      }
    } else
      dispatch({
        action: "SET_CATEGORY",
        payload: null,
      });

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (session)
      dispatch({
        action: "SET_ACCOUNT",
        payload: {
          email: session.profile.email,
          noWhatsapp: session.profile.phone,
        },
      });
  }, [session]);

  if (loading) return <Loading />;

  if (data.category === null) return <NotFound />;
  else if (data.category !== null && data.category !== undefined)
    return (
      <div className="md:grid md:grid-cols-5 md:gap-4">
        <div className="col-span-2 my-0.5">
          <div>
            <Header category={data.category} />
          </div>
        </div>
        <div className="col-span-3">
          {data.category.forms && (
            <Card ref={formRef} className="w-full my-4 md:mt-2">
              <CardContent className="mt-3">
                <FormAccount forms={data.category.forms} />
              </CardContent>
            </Card>
          )}
          <div ref={productListRef}>
            <ProductList
              number={data.category.forms ? 2 : 1}
              // category={data.category.name}
              nextRef={methodRef}
              products={products}
              // productSelected={data.product}
            />
          </div>
          <div className="my-4" ref={methodRef}>
            <Payment number={data.category.forms ? 3 : 2} />
          </div>
          <Card className="w-full my-4" ref={couponRef}>
            <CardContent>
              <div className="flex gap-2 items-center mt-3">
                <div className="bg-theme-primary-100 p-2 w-7 h-7 flex justify-center items-center rounded-full">
                  <h4 className="font-bold rounded-full text-theme-primary-500">
                    {data.category.forms ? 4 : 3}
                  </h4>
                </div>
                <h4 className="font-medium ml-1">Promo</h4>
              </div>
              <Separator className="my-3" />
              <Promo
                onPromoSelected={(e) =>
                  dispatch({
                    action: "SET_PROMO",
                    payload: e,
                  })
                }
                listProductId={products.map((i) => i.key)}
                categoryUuid={params.slug}
                // product={data.product}
              />
            </CardContent>
          </Card>
          <div ref={confirmationRef}>
            <FormConfirmation number={data.category.forms ? 5 : 4} />
          </div>
          <CheckoutAction
            confirmationRef={confirmationRef}
            formRef={formRef}
            paymentRef={methodRef}
          />
        </div>
      </div>
    );
}

export default Page;
