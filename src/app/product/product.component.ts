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
  constructor(private route: ActivatedRoute) {
  }

  productId: string | null = "";
  name = "";
  description = "";
  price = 0;
  stock = 0;
  // @ts-ignore
  image: Blob;
  imageData: any;
  imageUrl = "";

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      console.log(this.productId); // Output the productId parameter to the console
    });
    this.getProductDetails()
  }

  getProductDetails() {
    axios.get(`http://localhost:3000/api/products/${this.productId}`)
      .then(response => {
        console.log(response)
        const parsedData = response.data;
        // const parsedData = JSON.parse(response.data);
        console.log('Product Fetched successfully: ' + parsedData.imageURL);
        // this.imageData = response;
        this.name = parsedData.name;
        this.description = parsedData.description;
        this.price = parsedData.price;
        this.stock = parsedData.stock;
        // this.imageUrl = `data:image/jpeg;base64,${parsedData.image.toString('base64')}`
        // this.imageUrl = `data:image/jpeg;base64,${parsedData.image}`
        this.image = parsedData.imageURL;
        this.imageUrl = parsedData.imageURL
      }).catch(error => {
      console.error('Error Fetching data:', error);
      alert('Error Fetching data:' + error)
    })
  }
}
