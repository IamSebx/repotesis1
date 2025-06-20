
import { Directive, ElementRef, OnInit, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFadeIn]'
})
export class FadeInDirective implements OnInit {
  @HostBinding('class')
  elementClass = 'fade-in-section'; // Clase inicial para ocultar el elemento

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'is-visible');
          observer.unobserve(this.el.nativeElement); // Dejar de observar una vez que es visible
        }
      });
    }, {
      threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    });

    observer.observe(this.el.nativeElement);
  }
}