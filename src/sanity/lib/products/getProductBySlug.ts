import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live"; // Import the sanityFetch function

export const getProductBySlug = async (slug: string) => {
    const PRODUCT_BY_ID_QUERY = defineQuery(`
    *[_type == "product"
      && slug.current == $slug]
      | order(name asc) [0]
  `);

  try {
    // Use sanityFetch to send the query with the slug as a parameter
    const products = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY ,
      params: {
       slug,
      },
    });

    // Return the products data or null if not found
    return products.data || null;
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return null;
  }
};