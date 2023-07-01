import {Component} from '@angular/core';
import axios from "axios";
import {response} from "express";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  userCart = false
  cartItems: any[] = []
  productCartItems: any[] = []
  userId = ''
  cartStatus = ''

  ngOnInit() {
    // @ts-ignore
    this.userId = sessionStorage.getItem('currentUser')
    this.getCart()
  }

  getCart() {
    axios.get(`http://localhost:3000/api/cart/${this.userId}`)
      .then(response => {
        this.userCart = true
        this.cartItems = response.data
        if (this.cartItems.length == 0){
          this.cartStatus = "No Items In Cart"
        }
        this.getProducts()
      }).catch(error => {
      console.log("Hello: " + error)
      this.userCart = false
    })
  }

  getProducts() {
    for (let i = 0; i < this.cartItems.length; i++) {
      axios.get(`http://localhost:3000/api/products/${this.cartItems[i].id}`)
        .then(response => {
          this.productCartItems.push(response.data)
        }).catch(error => {
        console.log(error)
      })
    }
    // this.cartItems.forEach(value => {
    //   axios.get(`http://localhost:3000/api/products/${value.id}`)
    //     .then(response => {
    //       this.productCartItems.push(response.data)
    //     }).catch(error => {
    //     console.log(error)
    //   })
    // })
  }

  getProductQuantity(id: number): number {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == id) {
        return this.cartItems[i].quantity
      }
    }
    return 0
  }

  getTotal(): number {
    let total = 0
    for (let i = 0; i < this.productCartItems.length; i++) {
      total += this.productCartItems[i].price * this.getProductQuantity(this.productCartItems[i].id)
    }
    return total
  }

  checkOut() {
    const data = {
      userId: this.userId
    }
    axios.post('http://localhost:3000/api/cartDelete', data)
      .then(response => {
        this.updateStock()
        this.cartStatus = "Checkout done"
        this.cartItems = []
        this.productCartItems = []
        this.userCart = false
      }).catch(error => {
      console.log(error)
    })
  }

  updateStock() {
    for (let i = 0; i < this.productCartItems.length; i++) {
      let remStock = 0;
      remStock = this.productCartItems[i].stock - this.getProductQuantity(this.productCartItems[i].id)
      let data = {
        id: this.productCartItems[i].id,
        stock: remStock
      }
      axios.post('http://localhost:3000/api/productsUpdate/stock', data)
        .then(response => {
          console.log("Updated Stock")
        }).catch(error => {
        console.log(error)
      })
    }
  }
}
