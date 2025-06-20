import { FadeInDirective } from './fade-in.directive';

describe('FadeInDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as any;
    const mockRenderer2 = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle', 'addClass', 'removeClass', 'setAttribute', 'removeAttribute', 'listen', 'selectRootElement', 'createElement', 'createComment', 'createText', 'appendChild', 'insertBefore', 'removeChild', 'parentNode', 'nextSibling']);
    const directive = new FadeInDirective(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});
