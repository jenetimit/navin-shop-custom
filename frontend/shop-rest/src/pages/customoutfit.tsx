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

// import { CartItemType } from "./arrayindex";
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

  const otherProducts = [
    {
      id: 2,
      category: "gloves",
      description: "littile kingdom girls",
      image:  "https://image.made-in-china.com/2f0j00gpwYDHFPHloI/Welcome-Customized-Baby-Mittens-0-24m-Infants-Gloves.jpg",
      price: 51,
      title: "baby gloves",
      amount: "123",
      slug: "magnetic-designs-women-printed-fit-and-flare-dress"
      
    },
    {
      id: 3,
      category: "gloves",
      description: "littile kingdom boys",
      image: "https://5.imimg.com/data5/SELLER/Default/2020/10/CR/AX/QB/53567948/baby-hand-gloves-500x500.jpg",
      price: 85,
      title: "baby gloves",
      amount: "123",
      slug: "mango-self-striped-a-line-dress"
    }
  ]


  const nextProducts = [
    {
      id: 4,
      category: "socks",
      description: "littile kingdom girls",
      image:  "https://i.pinimg.com/originals/b1/ea/f3/b1eaf39ee7f8260757288060480f9873.jpg",
      price: 51,
      title: "baby socks",
      amount: "123",
      slug: "magnetic-designs-women-printed-fit-and-flare-dress"
      
    },
    {
      id: 5,
      category: "socks",
      description: "littile kingdom boys",
      image: "https://www.onesmallchild.com/wp-content/uploads/2014/11/Baby-Socks-for-Girls.jpg",
      price: 85,
      title: "baby socks",
      amount: "123",
      slug: "mango-self-striped-a-line-dress"
    }
  ]

const Feed =() => {
  
  const dodCart= useDodState();

  const  data = getProducts;
  
  const otherdata = otherProducts;

  const nextdata = nextProducts;

  const[activeSection,setActive] =useState('first');

  // console.log("data",data);
  
  // const getTotalItems = (items: CartItemType[]) => 
  //  items.reduce((ack: number, item) => ack + item.amount, 0);
  
  const { openDodModal } = useModalAction();

  const handleaddingtoselection =  ( clickedItem: CartItemType, clickedSection:string) => {
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
          <div style={{cursor: "pointer"}} onClick={() => setActive('first')}>Dress</div>
          <div style={{cursor: "pointer"}} onClick={() => setActive('second')}>Gloves</div>
          <div  style={{cursor: "pointer"}} onClick={() => setActive('third')}>Socks</div>
        </Card>
        {(activeSection === 'first') && 
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <DodItem item={item} section={activeSection} handleAddtoCart={handleaddingtoselection} />
            </Grid>
          ))}
        </Grid>}
        {(activeSection === 'second') && 
        <Grid container spacing={3}>
          {otherdata?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <DodItem item={item} section={activeSection} handleAddtoCart={handleaddingtoselection} />
            </Grid>
          ))}
        </Grid>}
        {(activeSection === 'third') && 
        <Grid container spacing={3}>
          {nextdata?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <DodItem item={item} section={activeSection} handleAddtoCart={handleaddingtoselection} />
            </Grid>
          ))}
        </Grid>}
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