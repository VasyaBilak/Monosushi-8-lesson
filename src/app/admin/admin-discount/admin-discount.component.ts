import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from '../../shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import {
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss'],
})
export class AdminDiscountComponent implements OnInit {
  public addForm: boolean = false;
  public editStatus = false;
  public editID!: number;
  public adminDiscounts: Array<IDiscountResponse> = [];
  public discountForm!: FormGroup;
  private currentDiscountId = 0;
  public isUploaded = false;
  public uploadPercent!: number;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  showForm(): void {
    this.addForm = !this.addForm;
  }

  getDate() {
    let day = new Date().getDate().toString();
    let year = new Date().getUTCFullYear().toString();

    if (day.length === 1) day = '0' + day;
    if (year.length === 1) year = '0' + year;

    return day + '.' + year;
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe((data) => {
      this.adminDiscounts = data;
    });
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      date: [this.getDate()],
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: ['', Validators.required],
    });
  }

  addDiscount(): void {
    this.discountForm.value.date = this.getDate();
    if (this.editStatus) {
      this.discountService
        .update(this.discountForm.value, this.currentDiscountId)
        .subscribe(() => {
          this.loadDiscounts();
        });
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscounts();
      });
    }
    this.editStatus = false;
    this.addForm = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.discountForm.reset();
  }

  editDiscount(category: IDiscountResponse): void {
    this.discountForm.patchValue({
      date: category.date,
      name: category.name,
      title: category.title,
      description: category.description,
      imagePath: category.imagePath,
    });
    this.editStatus = true;
    this.currentDiscountId = category.id;
    this.isUploaded = true;
    this.addForm = true;
  }

  deleteDiscount(category: IDiscountResponse): void {
    this.discountService.delete(category.id).subscribe(() => {
      this.loadDiscounts();
    });
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then((data) => {
        this.discountForm.patchValue({
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
      this.discountForm.patchValue({
        imagePath: null,
      });
    });
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}
