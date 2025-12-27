// pages/products/[slug].tsx
import { GetServerSideProps } from "next";
import ProductDetail from "@/components/ProductDetails";
import ProductReviews from "@/components/ProductReviews";
import { Product, Review } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import { fetchProductBySlug, fetchReviews } from "@/lib/api";

interface ProductPageProps {
  product: Product;
  reviews: Review[];
  themeKey: ThemeKey;
}

export default function ProductPage({ product, reviews, themeKey }: ProductPageProps) {
  const themeColors = colors.product[themeKey];

  return (
    <>
      <ProductDetail product={product} themeColors={themeColors} />
      <ProductReviews reviews={reviews} />
    </>
  );
}

// Server-side fetch
export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  try {
    const product = await fetchProductBySlug(slug);
    const reviews = await fetchReviews(product.id); // use ID internally

    return {
      props: {
        product,
        reviews,
        themeKey: "light",
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true }; // product not found
  }
};
