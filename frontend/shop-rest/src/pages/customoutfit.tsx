import React from "react";
import { useState } from "react";
import DodItem from "src/item/items";
import  Grid  from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Wrapper } from "src/item/item.styles";
import { useModalAction } from "@components/ui/modal/modal.context";
import Navbar from "@components/layout/navbar/navbar";
import {Item} from "../contexts/quick-cart/cart.utils";
import { useDodState } from "src/pages/customoutfit.context";
import AddToCartBtn from "@components/product/add-to-cart/add-to-cart-btn";
import { useCart } from "@contexts/quick-cart/cart.context";
import dynamic from "next/dynamic";
import { useProductsQuery } from "@data/product/use-products.query";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { Category } from "@material-ui/icons";

const Neon = dynamic(() => import("@components/product/product-card/neon"));
const Xenon = dynamic(() => import("@components/product/product-card/xenon"));

// import { CartItemType } from "./arrayindex";
const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);

const renderProductCard = (product: any) => {
  switch (product?.type?.slug) {
    case "grocery":
      return <Neon product={product} />;
    default:
      return <Xenon product={product} />;
  }
};

export type CartItemType ={
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: string;
    // sizes: string;
    slug: string;
  }
  
const getProducts = [
    {
      id: 0,
      category: "clothes",
      description: "littile kingdom girls",
      image: "/babygirl.jpg",
      price: 51,
      title: "baby girls dress",
      amount: "123",
      slug: "magnetic-designs-women-printed-fit-and-flare-dress"
      
    },
    {
      id: 1,
      category: "clothes",
      description: "littile kingdom boys",
      image: "/bap.png",
      price: 85,
      title: "baby boy dresss",
      amount: "123",
      slug: "mango-self-striped-a-line-dress"
    }
  ]

const Feed = () => {

  const showProds = (section:string) => {
    // setActive(section);

    // const {
    //   isFetching: loading,
    //   isFetchingNextPage: loadingMore,
    //   fetchNextPage,
    //   hasNextPage,
    //   data,
    //   error,
    // }
    var prodData = useProductsQuery({
      type: "clothing",
      text: '',
      category: section,
      limit: 21,
    });

    console.log(prodData);
  }

  const dodCart= useDodState();

  //const  data = getProducts;

  const[activeSection,setActive] =useState('main-dress-boys');

  const {
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({
    type: "clothing",
    text: '',
    category: 'main-dress-boys',
    limit: 21,
  });

  console.log("data",data);
  console.log("D2",data?.pages);

  // const getTotalItems = (items: CartItemType[]) => 
  //  items.reduce((ack: number, item) => ack + item.amount, 0);
  
  
  const { openDodModal } = useModalAction();

  const dodSelect =  ( clickedItem: CartItemType, clickedSection:string) => {
    openDodModal("PRODUCT_DETAILS_DOD",clickedItem.slug, clickedSection);
  };

  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();

  const handleDod2Cart = () => {
    dodCart.dodItems?.map((dod) => {
      addItemToCart(dod, 1);
    } );
  }



  // const handleRemovefromCart = (id: number) =>{
  //   setCartItems(prev => (
  //     prev.reduce((ack,item) =>{
  //       if(item.id === id) {
  //         if(item.amount === 1) return ack;
  //         return [...ack,{...item,amount:item.amount - 1}];
  //       }
  //       else{
  //         return [...ack,item]
  //       }
  //     }, [] as CartItemType[])
  //   ))
  // };


  return(
    <div>
      <Navbar /> 
      <Wrapper>
        {/* <Card style={{float: 'right',position: 'absolute',right: 0,overflow:"scroll"}}>
          <Cart 
          cartItems={cartItems}
          addToCart={handleAddtoCart}
          removeFromCart={handleRemovefromCart}
          />
        </Card> */}
        {/* <StyledButton onClick={() => setCartOpen(true)} >
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartOutlined />
          </Badge>
        </StyledButton> */}
        <Card>
          <div style={{cursor: "pointer"}} onClick={() => showp('caps-boys')}>Main Dress</div>
          <div style={{cursor: "pointer"}} onClick={() => setActive('caps-boys')}>Caps for Boys</div>
          <div  style={{cursor: "pointer"}} onClick={() => setActive('socks-boys')}>Socks/Booties for Boys</div>
          <div  style={{cursor: "pointer"}} onClick={() => setActive('gloves-boys')}>Gloves for Boys</div>
        </Card>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
        {loading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} />
        ) : (
          <>
            {data?.pages?.map((products, _idx) => (
              <Fragment key={_idx}>
                {products?.data?.map((product) => (
                  <motion.div key={product.id}>
                    {renderProductCard(product)}
                  </motion.div>
                ))}
              </Fragment>
            ))}
          </>
        )}
      </div>
        {/* <Grid container spacing={3}>
          {dat?.map((item:any) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <DodItem item={item} section={activeSection} handleAddtoCart={dodSelect} />
            </Grid>
          ))}
        </Grid> */}
        <Card >
          Items:
         
        {dodCart?.dodItems?.length!<=0? (
          <span>Empty</span>
        ):(
          <ul id="dod-cart">{dodCart.dodItems?.map(dod => 
          <li><small>{dod.productId}</small><br/>
          <img src={dod.image} alt={dod.title} />
          </li>
        )}</ul>
        )}
         
         <AddToCartBtn id="btn-dod2cart" variant="dodcart" onClick={handleDod2Cart}/>
        </Card>
      </Wrapper>
      </div>
  );
  
}

export default Feed;