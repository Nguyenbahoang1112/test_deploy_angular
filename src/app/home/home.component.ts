import { Component } from '@angular/core';
import { ProductItem } from '../shared/types/productItem';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductItemComponent } from '../shared/product-item/productItem.component';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/BlogService';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ProductItemComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: ProductItem[] = [
    { id: 1, name: 'Iphone', price: 100000, imageUrl: 'banner/flip-vang_1.webp', quantity: 1 },
    { id: 2, name: 'Adidas', price: 2020202020, imageUrl: 'banner/photo1.jpg', quantity: 1 },
    { id: 3, name: 'Sầu riêng', price: 999999, imageUrl: 'banner/photo1.jpg', quantity: 1 },
    { id: 4, name: 'Đậu xanh', price: 300000, imageUrl: 'banner/photo1.jpg', quantity: 1 },
  ];

  isDisabled = false;

  isVisible = true;

  getBlogApi: Subscription;

  constructor(private blogService: BlogService) {
    this.getBlogApi = new Subscription();
  }
  ngOnInit() {
    // console.log('Products:', this.products);
    this.getBlogApi = this.blogService
      .getBlogs()
      .pipe(
        map(({ data }) => {
          return data
            .map((item: any) => {
              return {
                ...item,
                name: item.title,
                price: Number(item.body),
                imageUrl: 'banner/photo1.jpg',
                quantity: 1,
              };
            })
            .filter((product) => product.price >= 300000);
        })
      )
      .subscribe((res: ProductItem[]) => {
        this.products = res;
      });
  }

  ngOnDestroy() {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
    }
  }

  handleClick() {
    alert('Button clicked!');
  }

  handleDelete(id: number) {
    this.blogService.deleteBlog(id).subscribe(({ data }: any) => {
      if (data == 1) this.products = this.products.filter((p) => p.id != id);
    });
  }

  handleVisible() {
    this.isVisible = !this.isVisible;
  }
}
