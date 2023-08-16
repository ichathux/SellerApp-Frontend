import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.css']
})
export class BarcodeReaderComponent {
  barcodeInput: string = '';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.barcodeInput += event.key;
  }

}
