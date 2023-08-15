import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import {
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})

export class AdminProductComponent implements OnInit {
  public addForm: boolean = false;
  public editStatus = false;
  public editID!: number;
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;
  private currentProductId = 0;
  public isUploaded = false;
  public uploadPercent!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.initProductForm();
    this.loadProducts();
  }

  showForm(): void {
    this.addForm = !this.addForm;
  }

  loadProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.adminProducts = data;
    });
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
    });
  }

  addProduct(): void {
    if (this.editStatus) {
      this.productService
        .update(this.productForm.value, this.currentProductId)
        .subscribe(() => {
          this.loadProducts();
        });
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProducts();
      });
    }
    this.editStatus = false;
    this.addForm = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.productForm.reset();
  }

  editProduct(category: IProductResponse): void {
    this.productForm.patchValue({
      category: category.category,
      name: category.name,
      ingredients: category.ingredients,
      weight: category.weight,
      price: category.price,
      path: category.path,
      imagePath: category.imagePath,
    });
    this.editStatus = true;
    this.currentProductId = category.id;
    this.isUploaded = true;
    this.addForm = true;
  }

  deleteProduct(category: IProductResponse): void {
    this.productService.delete(category.id).subscribe(() => {
      this.loadProducts();
    });
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then((data) => {
        this.productForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async uploadFile(
    folder: string,
    name: string,
    file: File | null
  ): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe((data) => {
          this.uploadPercent = data.progress;
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.productForm.patchValue({
        imagePath: null,
      });
    });
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
