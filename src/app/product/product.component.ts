import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import axios from "axios";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  productId: string | null = "";
  name = "";
  description = "";
  price = 0;
  stock = 0;
  imageUrl = "";
  cartStatus = "";
  userId: string | null = '';
  quantity = 0;
  userCart = false;
  itemInCart = false;
  cartItems: any[] = [];


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('currentUser');
    // get the parsed product id
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      console.log(this.productId); // Output the productId parameter to the console
      console.log(this.userId)
    });
    this.getProductDetails()
    this.getCart()
  }

  // get product details from the server side
  getProductDetails() {
    // axios.get(`http://10.130.14.162:3000/api/products/${this.productId}`)
      axios.get(`http://localhost:3000/api/products/${this.productId}`)
      .then(response => {
        const parsedData = response.data;
        this.name = parsedData.name;
        this.description = parsedData.description;
        this.price = parsedData.price;
        this.stock = parsedData.stock;
        this.imageUrl = parsedData.imageURL
      }).catch(error => {
      console.error('Error Fetching data:', error);
      alert('Error Fetching data:' + error)
    })
  }

  getCart() {
    axios.get(`http://localhost:3000/api/cart/${this.userId}`)
      .then(response => {
        this.userCart = true
        this.cartItems = response.data
        console.log(this.cartItems.length)
        for (let i = 0; i < this.cartItems.length; i++) {
          if (this.cartItems[i].id == this.productId){
            this.quantity = this.cartItems[i].quantity
          }
        }
      }).catch(error => {
      console.log("Hello: " + error)
      this.userCart = false
    })
  }

  addQuantity() {
    if (this.quantity < this.stock){
      this.quantity++
    }
  }

  lessQuantity() {
    if (this.quantity >= 1){
      this.quantity--
    }
  }

  addToCart() {
    this.getCart()
    if (this.userId == null) {
      this.cartStatus = "Please Log In First To Access Cart"
      return;
    }
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == this.productId) {
        this.itemInCart = true
      }
    }
    if (!this.itemInCart) {
      const data = {
        userId: this.userId,
        id: this.productId,
        quantity: this.quantity
      }
      axios.post(`http://localhost:3000/api/cart`, data)
        .then(response => {
          this.cartStatus = "Added to cart"
        }).catch(error => {
        console.log(error)
        this.cartStatus = "Error adding to cart"
      })
    } else {
      const data = {
        quantity: this.quantity,
        userId: this.userId,
        id: this.productId
      }
      axios.post(`http://localhost:3000/api/cartUpdate`, data)
        .then(response => {
          this.cartStatus = "Cart Updated"
        }).catch(error => {
        console.log(error)
        this.cartStatus = "Error updating cart"
      })
    }
    this.getCart()
  }
}
