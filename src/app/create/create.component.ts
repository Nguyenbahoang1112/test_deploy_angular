import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductItem } from '../shared/types/productItem';
import { BlogService } from '../../services/BlogService';
import { NgIf } from '@angular/common';

@Component({
  selector: 'create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  product = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private blogService: BlogService) {}

  get name() {
    return this.product.get('name')!;
  }

  get price() {
    return this.product.get('price')!;
  }
  handleAddCart() {
    if (this.name?.hasError('required') || this.price?.hasError('required')) return;
    const blogItem = {
      id: Math.random(),
      title: String(this.name?.value),
      body: String(this.price?.value),
      author: 'Mario',
    };
    this.blogService.postBlog(blogItem).subscribe(({ data }: any) => {
      if (data.id) {
        this.router.navigate(['/']);
      }
    });
  }
}
