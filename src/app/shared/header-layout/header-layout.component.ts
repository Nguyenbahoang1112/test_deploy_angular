import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header-layout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.css',
})
export class HeaderLayoutComponent {
  title = {
    name: 'angular_app',
    version: '1.0.0',
  };
  isDisabled = false;

  handleClick() {
    alert('Button clicked!');
  }
}
