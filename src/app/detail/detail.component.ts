import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from '../shared/types/productItem';
import { BlogService } from '../../services/BlogService';

@Component({
  selector: 'detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  id = '';
  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  detailProduct: ProductItem = {
    id: 1,
    name: '',
    price: 0,
    imageUrl: '',
    quantity: 1,
  };

  ngOnInit() {
    this.blogService.detailBlog(Number(this.id)).subscribe(({ data }: any) => {
      this.detailProduct.id = data.id;
      this.detailProduct.name = data.title;
      this.detailProduct.price = Number(data.body);
      this.detailProduct.imageUrl = 'banner/flip-vang_1.webp';
      this.detailProduct.quantity = 1;
    });
  }
}
