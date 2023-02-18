import Head from 'next/head';
import Image from 'next/image';
import images from 'src/assets/images';
import config from '../config';
import MainCarousel from '@/common/components/Carousel';
import Intro from '@/common/components/Intro';
import Products from '@/modules/product/components/Products';
import Button from '@/common/components/UI/Button';

import { getDiscountProducts, getHotProducts, getTrouserProducts, getTShirtProducts } from '@/services/productRequests';
import { getIntroImages } from '@/services/imageRequests';
import { getReadyToSellEvent } from '@/services/eventRequests';

import 'lightgallery.js/dist/css/lightgallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home({
  hotProducts,
  discountProducts,
  tshirtProducts,
  trouserProducts,
  introImages,
  readyToSellEvent,
}) {
  return (
    <>
      <Head>
        <title>Brother Shop - Cửa Hàng Online Quần Áo Thời Trang Nam Nữ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="xl:px-[3%]">
        <div className="animate-image flex justify-center pt-[70px] lg:pt-[79px]">
          <Image to={config.routes.home} alt="Discount" src={images.banner} priority />
        </div>
        <MainCarousel events={readyToSellEvent} />

        <Intro images={introImages} />

        <div className="text-center">
          <p className="text-2xl pt-5 pb-2">Top sản phẩm HOT</p>
          <p>Những sản phẩm thời trang mới nhất/Hot nhất</p>
        </div>
        <Products products={hotProducts} />
        <div className="flex justify-center">
          <Image
            src="https://cmsv2.yame.vn/uploads/91ecb60f-ecf4-4572-9a80-7ba29483cd97/Banner_MB_13.01_(G)_02.jpg?quality=80&w=0&h=0"
            alt=""
            width={1000}
            height={1000}
            className="w-full"
          />
        </div>

        <Products products={tshirtProducts} />
        <div className="text-center my-3">
          <Button>Xem tất cả áo thun</Button>
        </div>

        <div className="flex justify-center mt-3">
          <Image
            src="https://cmsv2.yame.vn/uploads/7c59b59c-11d3-44ae-b7b0-aa93b9a7deec/Thum_MB_06.01_(04).jpg?quality=80&w=0&h=0"
            alt=""
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>

        <Products products={trouserProducts} />
        <div className="text-center my-3">
          <Button>Xem tất cả quần</Button>
        </div>

        <div className="text-center">
          <p className="text-2xl pt-5 pb-2">Các sản phẩm giảm giá</p>
          <p>Đừng bỏ lỡ - Hãy mua ngay</p>
        </div>
        <Products products={discountProducts} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const promises = [
    getHotProducts(),
    getDiscountProducts(),
    getTShirtProducts(),
    getTrouserProducts(),
    getIntroImages(),
    getReadyToSellEvent(),
  ];
  const [hotProducts, discountProducts, tshirtProducts, trouserProducts, introImages, readyToSellEvent] =
    await Promise.all(promises);

  return {
    props: {
      hotProducts,
      discountProducts,
      tshirtProducts,
      trouserProducts,
      introImages,
      readyToSellEvent,
    },
  };
}
