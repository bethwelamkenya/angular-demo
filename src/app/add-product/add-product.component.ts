import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import axios from "axios";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private router: Router) {
  }

  prodStatus = "";
  name = "";
  description = "";
  price = 0;
  stock = 0;

  isAdminLoggedIn = false;
  // @ts-ignore
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  ngOnInit() {
    const currentAdmin = sessionStorage.getItem('currentAdmin');
    if (!currentAdmin) {
      // User is not logged in, redirect to login page or show appropriate message
      this.router.navigate(['/admins']);
      this.isAdminLoggedIn = false;
    } else {
      // User is logged in, continue with component initialization
      console.log(currentAdmin)
      this.isAdminLoggedIn = true;
      // ...
    }
  }

  addProduct() {
    console.log("submitted")
    // @ts-ignore
    var file: File = this.fileInput.nativeElement.files.item(0)
//     const image = fs.readFileSync(file.webkitRelativePath);
// // Convert to binary format
//     const imageData = Buffer.from(image);

    // Read the file
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = reader.result as ArrayBuffer;

      // Convert to binary format
      const imageData = new Uint8Array(fileData);

      // Prepare the data for sending to the server
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('price', this.price.toString());
      formData.append('stock', this.stock.toString());
      formData.append('image', new Blob([imageData]));

      // Send the image data to the server for insertion into MySQL

      console.log("Submiting")
      axios.post('http://localhost:3000/api/products', formData)
        .then(response => {
          console.log('Image inserted successfully');
          this.prodStatus = "Product Inserted Successfully";
          this.name = "";
          this.description = "";
          this.price = 0;
          this.stock = 0;
          alert(response)
        })
        .catch(error => {
          console.error('Error inserting data:', error);
          alert(error)
        });
    };
    reader.readAsArrayBuffer(file);
  }
}
