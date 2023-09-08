import { VariantListFinal } from './variant-list-final.paylaod';

export class Inventory {
  constructor(
    public name: string,
    public subCategoryId: string,
    public brand: string,
    public itemDescription: string,
    public imgUrl: string | ArrayBuffer | null | undefined,
    public delete_url: string | null | undefined,
    public variants: VariantListFinal[],
    public lowestPrice: number,
    public qty: number
  ) {}
}
