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
    <div className="min-h-screen px-4 md:px-8">
      <ProductDetail product={product} themeColors={themeColors} />
      <ProductReviews reviews={product.reviews ?? []} productId={product.id} />
    </div>
  );
}

// -------------------- SSR --------------------
export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context) => {
  let slug = context.params?.slug;

  // Ensure slug is a string
  if (Array.isArray(slug)) slug = slug[0];

  if (!slug) {
    return { notFound: true };
  }

  try {
    const product = await fetchProductBySlug(slug);

    if (!product) {
      return { notFound: true };
    }

    return {
      props: {
        product,
        themeKey: "light", // You can dynamically determine this if needed
      },
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return { notFound: true };
  }
};
