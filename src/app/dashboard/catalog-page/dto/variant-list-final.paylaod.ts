export class VariantListFinal {
  constructor(
    public name: string,
    public variants: string[],
    public price: number,
    public qty: number,
    public useImage: boolean,
    public imgUrl?: string | null,
    public public_id?: string | null
  ) {}
}
