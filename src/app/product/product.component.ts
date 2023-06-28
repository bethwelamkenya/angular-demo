import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import axios from "axios";

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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // get the parsed product id
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      console.log(this.productId); // Output the productId parameter to the console
    });
    this.getProductDetails()
  }

  // get product details from the server side
  getProductDetails() {
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
}
