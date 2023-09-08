export class VariantList{
    // id : number;
    constructor(public name : string,
        public variants: string[],
        public price: number,
        public qty: number,
        public useImage:boolean,
        public image: File | null, 
        public imgUrl ?: string | ArrayBuffer | null,
        public public_id ?: string | null){}

}