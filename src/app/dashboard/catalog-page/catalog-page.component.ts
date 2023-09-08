import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from 'src/app/axios.service';
import { CatalogDto } from './catalogDto';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from 'src/app/dialog/confim-dialog/confim-dialog.component';
import { AppConfig } from 'src/app/config';
import { EditInventoryItemComponent } from '../dialog-dashboard/edit-inventory-item/edit-inventory-item.component';
import { ViewInventoryItemComponent } from '../dialog-dashboard/view-inventory-item/view-inventory-item.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable, Observer, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';
import { VariantList } from './dto/variant.list.payload';
import { Inventory } from './dto/inventory.payload';
import { ImageUploadResponse } from './dto/upload-response.payload';
import { VariantListFinal } from './dto/variant-list-final.paylaod';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],
})
export class CatalogPageComponent implements OnInit {
  catalogForm!: FormGroup;
  productName!: string;

  categories: Array<any> = [];
  subCategories: Array<any> = [];
  brands: Array<any> = [];

  itemName: string = '';
  category: any;
  subCategory: any;
  description: string = '';
  img: any;
  brand: string = '';

  formData: FormData = new FormData();

  selectedFile: File | undefined;
  imageUrl?: string | ArrayBuffer | null;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;

  variants: string[] = [];
  allVariants: string[] = [
    'Color',
    'Size',
    'Weight',
    'Thickness',
    'Flavor',
    'Scent',
    'Material',
    'Capacity',
    'Model',
    'Shape',
    'Edition',
  ];
  listOfVariants: string[][] = [];
  panelOpenState = false;

  @ViewChild('fruitInput') fruitInput?: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    private axios: AxiosService,
    private toater: ToastrService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allVariants.slice()
      )
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getCategories();
    this.getBrand();
    this.getInventory();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.variants.push(value);
    }
    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.variants.indexOf(fruit);
    if (index >= 0) {
      this.variants.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.variants.push(event.option.viewValue);
    this.fruitCtrl.setValue(null);
    // console.log(this.variants);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allVariants.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  addVariantType(event: MatChipInputEvent, i: number): void {
    const value = (event.value || '').trim();
    if (typeof this.listOfVariants[i] === 'undefined') {
      this.listOfVariants.push([]);
    }
    if (value) {
      this.listOfVariants[i].push(value);
    }
    event.chipInput!.clear();
    this.generateVariantList();
  }

  removeVariantType(variant: string, i: number): void {
    const index = this.listOfVariants[i].indexOf(variant);

    if (index >= 0) {
      this.listOfVariants[i].splice(index, 1);

      this.announcer.announce(`Removed ${variant}`);
    }
    this.generateVariantList();
  }

  editVariantType(fruit: string, event: MatChipEditedEvent, i: number) {
    const value = event.value.trim();

    if (!value) {
      this.remove(fruit);
      return;
    }
    const index = this.listOfVariants[i].indexOf(fruit);
    if (index >= 0) {
      this.listOfVariants[i][index] = value;
    }
    this.generateVariantList();
  }
  getVariantsTypesToDisplay(i: number): string[] {
    return this.listOfVariants[i];
  }
  currentCombination: string[] = [];
  vTypesNew: VariantList[] = [];
  generateVariantList() {
    this.vTypesNew = [];
    this.generateUniqueCombinations([], 0);
  }

  generateUniqueCombinations(currentCombination: string[], rowIndex: number) {
    if (rowIndex === this.listOfVariants.length) {
      this.vTypesNew.push(
        new VariantList(
          currentCombination.join(' '),
          currentCombination,
          0,
          0,
          false,
          null,
          null
        )
      );
      return;
    }
    const currentRow = this.listOfVariants[rowIndex];
    for (const item of currentRow) {
      if (!currentCombination.includes(item)) {
        const updatedCombination = [...currentCombination, item];
        this.generateUniqueCombinations(updatedCombination, rowIndex + 1);
      }
    }
  }

  onSelectedFileVariantImage(event: any, i: number) {
    this.selectedFile = event.target.files[0];
    this.vTypesNew[i].image = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.vTypesNew[i].imgUrl = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  // isToggled: boolean = false;

  toggleValue(i: number, isToggled: boolean): void {
    const v: VariantList = this.vTypesNew[i];
    this.vTypesNew[i].useImage = isToggled;
    // console.log(this.vTypesNew);
  }
  // --------------------------------------------------------------------------------------------------------

  variant: any;
  variantListArray: Array<CatalogDto> = [];
  variantArray: Array<String> = [];
  // qtyV : any[] = [];
  qtyArray: number[] = [];
  priceArray: number[] = [];
  currentVariant: string = '';

  getVariants(data: any) {
    this.variantArray = data.list;
    this.currentVariant = data.name;
  }

  getCategories() {
    this.axios
      .request('GET', 'api/inventory/getCategories', '')
      .then((response) => {
        // console.log(response);
        this.categories = response.data;
      })
      .catch((error) => {
        // console.log(error);
        this.toater.error('error occurred ', error);
      });
  }

  getSubCategories(cat: any) {
    this.spinner.show();
    this.axios
      .requestWithParams('GET', 'api/inventory/getSubCategories', { id: cat })
      .then((response) => {
        this.subCategories = response.data;
        this.spinner.hide();
      })
      .catch((error) => {
        // console.log(error);
        this.toater.error(error);
        this.spinner.hide();
      });
  }

  getBrand() {
    this.axios
      .request('GET', 'api/inventory/getBrands', '')
      .then((response) => {
        // console.log(response)
        this.brands = response.data;
      })
      .catch((error) => {
        this.toater.error(error);
        // console.log(error);
      });
  }

  pages: Array<number> | undefined;
  private page: number = 0;
  private size: number = 5;
  items: Array<any> = [];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  finalVariantList: VariantListFinal[] = [];

  async generateUploadRequest() {
    this.spinner.show();
    for (const element of this.vTypesNew) {
      console.log(this.imgMap);
      console.log(element.name);
      const file = element.image;
      if (file) {
        if (this.imgMap.has(file.name)) {
          console.log(this.imgMap.get(file.name)?.img_url);
          console.log(this.imgMap.get(file.name)?.public_id);
        } else {
          // const formData = new FormData();
          // formData.append('file', file);
          // formData.append('upload_preset', 'timlw13j');
          // const url = `${AppConfig.cloudinaryApiPrefix}${AppConfig.cloudinaryCloudName}${AppConfig.cloudinaryApiPostfix}`;
          const response = await this.uploadRequest(file).toPromise();
          this.imgMap.set(
            file.name,
            new ImageUploadResponse(response.secure_url, response.public_id)
          );
        }
      }
    }
    this.generateFileList();
  }
  async generateFileList() {
    for (const element of this.vTypesNew) {
      const file = element.image;
      if (file) {
        const img: ImageUploadResponse | undefined = this.imgMap.get(file.name);
        const v = new VariantListFinal(
          element.name,
          element.variants,
          element.price,
          element.qty,
          element.useImage,
          img?.img_url,
          img?.public_id
        );
        this.finalVariantList.push(v);
      }
    }
    const lowestValue = this.finalVariantList.reduce(
      (min, obj) => (obj.price < min ? obj.price : min),
      this.finalVariantList[0].price
    );
    const totalQty = this.finalVariantList.reduce(
      (accumulator, obj) => accumulator + obj.qty,
      0
    );
    const mainImg: File | undefined = this.selectedFile;

    let mainImgUrl: string | null | undefined = '';
    let mainImgPublicId: string | null | undefined = '';

    if (mainImg) {
      if (this.imgMap.has(mainImg.name)) {
        mainImgUrl = this.imgMap.get(mainImg.name)?.img_url;
        mainImgPublicId = this.imgMap.get(mainImg.name)?.public_id;
      } else {
        const response = await this.uploadRequest(mainImg).toPromise();
        mainImgUrl = response.secure_url;
        mainImgPublicId = response.public_id;
      }
    }

    const inventory: Inventory = new Inventory(
      this.itemName,
      this.subCategory,
      this.brand,
      this.description,
      mainImgUrl,
      mainImgPublicId,
      this.finalVariantList,
      lowestValue,
      totalQty
    );

    // console.log(inventory);
    this.sendAddingRequest(inventory);
  }

  // addSingleItem() {
  //   this.spinner.show();
  //   if (this.selectedFile) {
  //     this.loopVariants()
  //       .then(() => {
  //         if (this.selectedFile) {
  //           this.uploadRequest(this.selectedFile).subscribe((r) => {
  //             let imgUrl: string | ArrayBuffer | null | undefined =
  //               r.secure_url;
  //             let publicId: string | null | undefined = r.public_id;
  //             const lowestValue = this.finalVariantList.reduce(
  //               (min, obj) => (obj.price < min ? obj.price : min),
  //               this.finalVariantList[0].price
  //             );
  //             const totalQty = this.finalVariantList.reduce(
  //               (accumulator, obj) => accumulator + obj.qty,
  //               0
  //             );
  //             const inventory: Inventory = new Inventory(
  //               this.itemName,
  //               this.subCategory,
  //               this.brand,
  //               this.description,
  //               imgUrl,
  //               publicId,
  //               this.finalVariantList,
  //               lowestValue,
  //               totalQty
  //             );
  //             this.sendAddingRequest(inventory);
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         this.toater.error(error);
  //         this.spinner.hide();
  //       });
  //   }
  // }

  // loopVariants(): Promise<any[]> {
  //   const promises: Promise<any>[] = [];
  //   for (const element of this.vTypesNew) {
  //     const file = element.image;
  //     if (file) {
  //       const promise = this.uploadRequest(file)
  //         .toPromise()
  //         .then((response) => {
  //           let imgUrl = response.secure_url;
  //           let publicId = response.public_id;
  //           const v = new VariantListFinal(
  //             element.name,
  //             element.variants,
  //             element.price,
  //             element.qty,
  //             element.useImage,
  //             imgUrl,
  //             publicId
  //           );
  //           this.finalVariantList.push(v);
  //         });
  //       promises.push(promise);
  //     }
  //   }
  //   return Promise.all(promises);
  // }
  imgMap = new Map<string, ImageUploadResponse>();

  uploadRequest(img: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', img);
    formData.append('upload_preset', 'timlw13j');
    const url = `${AppConfig.cloudinaryApiPrefix}${AppConfig.cloudinaryCloudName}${AppConfig.cloudinaryApiPostfix}`;
    return this.http.post<any>(url, formData);
  }

  // getData(response?: ImageUploadResponse | null): Observable<number> {
  //   return new Observable((observer: Observer<any>) => {
  //     const alreadyContain = true; // The data you want to emit
  //     const data = {
  //       alreadyContain: true,
  //       imgUrl: response?.img_url,
  //       publicId: response?.public_id,
  //     };
  //     observer.next(data);
  //     observer.complete();
  //   });
  // }

  sendAddingRequest(inventory: Inventory) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'), // Replace with your actual token
      }),
    };
    this.http
      .post<any>(
        AppConfig.apiUrl + 'api/inventory/addSingleItemTest',
        inventory,
        httpOptions
      )
      .subscribe((res) => {
        // console.log(res);
        this.getInventory();
        this.spinner.hide();
        this.toater.success('Added');
        this.formData = new FormData();
        this.vTypesNew = [];
      });
  }

  getInventory() {
    this.spinner.show();
    this.axios
      .requestWithParams('GET', 'api/inventory/getAllItems', {
        page: this.page,
        size: this.size,
      })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.totalPages);
        this.items = response.data.content;
        this.pages = new Array(response.data.totalPages);
        this.spinner.hide();
      })
      .catch((error) => {
        // console.log(error);
        this.toater.error(error);
        this.spinner.hide();
      });
  }

  setPage(i: number, event: any) {
    this.page = i;
    this.getInventory();
  }

  selectedOption: string | undefined;

  selectOption(option: string) {
    this.selectedOption = option;
  }

  openConfirmationDialog(id: any, name: string): void {
    const dialogRef = this.dialog.open(ConfimDialogComponent, {
      data: { action: 'Delete', itemName: name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(id);
      } else {
      }
    });
  }

  deleteItem(item: any) {
    this.spinner.show();
    this.axios
      .requestWithParams('DELETE', 'api/inventory/deleteInventoryItem', {
        itemId: item,
      })
      .then((response) => {
        this.toater.success('Item Deleted');
        this.getInventory();
        this.spinner.hide();
      })
      .catch((error) => {
        this.toater.error(error);
        this.spinner.hide();
      });
  }

  openEditDialog(item: any) {
    const dialogRef = this.dialog.open(EditInventoryItemComponent, {
      data: { inventory: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getInventory();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  openViewDialog(item: any) {
    const dialogRef = this.dialog.open(ViewInventoryItemComponent, {
      data: { inventory: item },
    });

    // dialogRef.afterClosed().subscribe(result => {

    // });
  }
}
