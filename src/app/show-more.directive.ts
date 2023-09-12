import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowMore]',
})
export class ShowMoreDirective implements OnInit {
  @Input() characterLimit = 100; // Default character limit
  private isExpanded = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.toggleContent();
  }

  toggleContent(): void {
    const content = this.el.nativeElement.textContent;
    const truncatedContent = this.isExpanded
      ? content
      : content.slice(0, this.characterLimit) + '...';

    this.renderer.setProperty(
      this.el.nativeElement,
      'textContent',
      truncatedContent
    );
    this.isExpanded = !this.isExpanded;
  }
}
