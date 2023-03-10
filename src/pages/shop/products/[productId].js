import PageContainer from '@/common/components/Layout/PageContainer';
import ProductInfor from '@/modules/product/components/ProductInfor';
import RelatedProducts from '@/modules/product/components/RelatedProducts';
import { getAllProducts, getProductById, getProductsByType } from '@/services/productRequests';

function ProductInforPage({ product, relatedProducts }) {
  const headTitle = `Sản phẩm ${product.name} | Brother Shop`;

  return (
    <PageContainer barTitle={product.name} headTitle={headTitle}>
      <ProductInfor product={product} />
      <RelatedProducts products={relatedProducts} />
    </PageContainer>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();
  const productIds = products.map((product) => ({ params: { productId: product._id } }));

  return {
    paths: productIds,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = await getProductById(productId);

  const type = product.name.split(' ')[0];
  const relatedProducts = await getProductsByType(type);

  return {
    props: {
      product,
      relatedProducts,
    },
  };
}

export default ProductInforPage;
