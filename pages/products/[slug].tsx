// pages/products/[slug].tsx
import { GetServerSideProps } from "next";
import ProductDetail from "@/components/ProductDetails";
import ProductReviews from "@/components/ProductReviews";
import { Product } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import { fetchProductBySlug } from "@/lib/api";

interface ProductPageProps {
  product: Product;
  themeKey: ThemeKey;
}

export default function ProductPage({ product, themeKey }: ProductPageProps) {
  const themeColors = colors.product[themeKey];

  return (
    <>
      <ProductDetail product={product} themeColors={themeColors} />
      <ProductReviews reviews={product.reviews ?? []} />
    </>
  );
}

// Server-side fetch
export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  try {
    const product = await fetchProductBySlug(slug);

    return {
      props: {
        product,
        themeKey: "light",
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};
