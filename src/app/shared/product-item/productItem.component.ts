import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '../pipes/CurrencyPipe.pipe';
import { UppercasePipe } from '../pipes/UppercasePipe.pipe';
import { ProductItem } from '../types/productItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'productItem',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, UppercasePipe, RouterLink, CommonModule],
  templateUrl: './productItem.component.html',
  styleUrl: './productItem.component.css',
})
export class ProductItemComponent implements OnChanges {
  @Input() products: ProductItem[] = [];

  @Output() dataEvent = new EventEmitter<number>();

  get totalPrice(): string {
    const total = this.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return `Price total: ${total.toLocaleString('vi-VN')} ₫`;
  }

  constructor() {
    console.log('ProductItemComponent initialized');
  }

  ngOnInit() {
    console.log('Products:', this.products);
    // this.http
    //   .get<any>('https://ninedev-api.vercel.app/blogs')
    //   .subscribe((data) => console.log(data));
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Current values:', changes['products'].currentValue);
    // console.log('Previous values:', changes['products'].previousValue);
  }

  ngOnDestroy() {
    console.log('ProductItemComponent destroyed');
  }

  trackByProductId(index: number, product: any): number {
    return product.id;
  }

  handleDelete = (id: number) => {
    console.log('Deleted product with id:', id);
    this.dataEvent.emit(id);
  };

  decrease(product: any) {
    product.quantity--;
  }

  increase(product: any) {
    product.quantity++;
  }
}
