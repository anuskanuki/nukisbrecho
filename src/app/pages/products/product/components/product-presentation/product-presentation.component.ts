import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-product-presentation',
  templateUrl: './product-presentation.component.html',
  styleUrls: ['./product-presentation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPresentationComponent {
  @Input() photo1?: string;
  @Input() photo2?: string;
  @Input() photo3?: string;
  @Input() photo4?: string;
}
