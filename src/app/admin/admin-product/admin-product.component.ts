// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { IProductResponse } from '../../shared/interfaces/product/product.interface';
// import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
// import { ProductService } from 'src/app/shared/services/product/product.service';
// import { CategoryService } from 'src/app/shared/services/category/category.service';
// import {
//   deleteObject,
//   getDownloadURL,
//   percentage,
//   ref,
//   Storage,
//   uploadBytesResumable,
// } from '@angular/fire/storage';

// @Component({
//   selector: 'app-admin-product',
//   templateUrl: './admin-product.component.html',
//   styleUrls: ['./admin-product.component.scss']
// })

// export class AdminProductComponent implements OnInit {

//   public adminProducts: Array<IProductResponse> = [];
//   public adminCategories: Array<ICategoryResponse> = [];
//   public addForm: boolean = false;
//   public editStatus = false;
//   public editID!: number;
//   public productForm!: FormGroup;
//   private currentProductId = 0;
//   public isUploaded = false;
//   public uploadPercent!: number;

//   constructor(
//     private fb: FormBuilder,
//     private productService: ProductService,
//     private categoryService: CategoryService,
//     private storage: Storage
//   ) {}

//   ngOnInit(): void {
//     this.initProductForm();
//     this.loadCategories();
//     this.loadProducts();
//   }

//   initProductForm(): void {
//     this.productForm = this.fb.group({
//       category: [null, Validators.required],
//       name: [null, Validators.required],
//       ingredients: [null, Validators.required],
//       weight: [null, Validators.required],
//       price: [null, Validators.required],
//       path: [null, Validators.required],
//       imagePath: ['', Validators.required],
//     });
//   }

//   loadCategories(): void {
//     this.categoryService.getAll().subscribe(data => {
//       this.adminCategories = data;
//       this.productForm.patchValue({
//         category: this.adminCategories[0].id
//       })
//     })
//   }

//   loadProducts(): void {
//     this.categoryService.getAll().subscribe(data => {
//       this.adminCategories = data;
//       this.productForm.patchValue({
//         category: this.adminCategories[0].id
//       })
//     })
//   }

//   addProduct(): void {
//     if (this.editStatus) {
//       this.productService
//         .update(this.productForm.value, this.currentProductId)
//         .subscribe(() => {
//           this.loadProducts();
//         });
//     } else {
//       this.productService.create(this.productForm.value).subscribe(() => {
//         this.loadProducts();
//       });
//     }
//     this.editStatus = false;
//     this.addForm = false;
//     this.isUploaded = false;
//     this.uploadPercent = 0;
//     this.productForm.reset();
//   }

//   editProduct(category: IProductResponse): void {
//     this.productForm.patchValue({
//       category: category.category,
//       name: category.name,
//       ingredients: category.ingredients,
//       weight: category.weight,
//       price: category.price,
//       path: category.path,
//       imagePath: category.imagePath,
//     });
//     this.editStatus = true;
//     this.currentProductId = category.id;
//     this.isUploaded = true;
//     this.addForm = true;
//   }

//   deleteProduct(category: IProductResponse): void {
//     this.productService.delete(category.id).subscribe(() => {
//       this.loadProducts();
//     });
//     this.isUploaded = false;
//     this.uploadPercent = 0;
//   }

//   upload(event: any): void {
//     const file = event.target.files[0];
//     this.uploadFile('images', file.name, file)
//       .then((data) => {
//         this.productForm.patchValue({
//           imagePath: data,
//         });
//         this.isUploaded = true;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   async uploadFile(
//     folder: string,
//     name: string,
//     file: File | null
//   ): Promise<string> {
//     const path = `${folder}/${name}`;
//     let url = '';
//     if (file) {
//       try {
//         const storageRef = ref(this.storage, path);
//         const task = uploadBytesResumable(storageRef, file);
//         percentage(task).subscribe((data) => {
//           this.uploadPercent = data.progress;
//         });
//         await task;
//         url = await getDownloadURL(storageRef);
//       } catch (e: any) {
//         console.error(e);
//       }
//     } else {
//       console.log('wrong format');
//     }
//     return Promise.resolve(url);
//   }

//   deleteImage(): void {
//     const task = ref(this.storage, this.valueByControl('imagePath'));
//     deleteObject(task).then(() => {
//       console.log('File deleted');
//       this.isUploaded = false;
//       this.uploadPercent = 0;
//       this.productForm.patchValue({
//         imagePath: null,
//       });
//     });
//   }

//   valueByControl(control: string): string {
//     return this.productForm.get(control)?.value;
//   }

//   showForm(): void {
//     this.addForm = !this.addForm;
//   }
  
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup; 
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  public isOpen = false;
  private currentProductId = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['', Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadProduct(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  addProduct(): void {
    if(this.editStatus){
      this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
        this.loadProduct();
        this.isOpen = false;
        this.editStatus = false;
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
        this.isOpen = false;
        this.editStatus = false;
      })
    }
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
        category: product.category,
        name: product.name,
        ingredients: product.ingredients,
        weight: product.weight,
        price: product.price,
        path: product.path,
        imagePath: product.imagePath,
    });
    this.isOpen = true;
    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProduct();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  toggleOpenForm(): void {
    this.isOpen = !this.isOpen;
  }

}
