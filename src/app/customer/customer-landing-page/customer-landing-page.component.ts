import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-landing-page',
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './customer-landing-page.component.html',
  styleUrl: './customer-landing-page.component.css'
})
export class CustomerLandingPageComponent {

  currentImage: string = 'image/show-1.png'; // default image

  setImage(imagePath: string) {
    this.currentImage = imagePath;
  }
  userName: string = sessionStorage.getItem('username') || '';


  hoveredItem: any = null;

items = [
  { label: 'Interior', icon: '/image/i-1.png', image: '/image/show-1.png' , desc:'' },
  { label: 'Exterior', icon: '/image/i-2.png', image: '/image/show-2.png' },
  { label: 'Wood Finish', icon: '/image/i-3.png', image: '/image/show-3.png' },
  { label: 'Metal Finish', icon: '/image/i-4.png', image: '/image/show-4.png' },
  { label: 'Waterproofing', icon: '/image/i-5.png', image: '/image/show-5.png' },
  { label: 'Undercoat', icon: '/image/i-6.png', image: '/image/show-6.png' }
];
infoCards = [
    {
      title: 'Furniture & Floor Covering',
      icon: 'https://cdn-icons-png.flaticon.com/512/2767/2767080.png',
      description: 'We protect your floors and furniture to keep your home clean during painting.'
    },
    {
      title: 'Accurate Quotation',
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
      description: 'Get precise, product-specific estimates tailored to your painting needs.'
    },
    {
      title: 'Certified Professionals',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      description: 'Our trained experts provide supervision and color consultation throughout the project.'
    },
    {
      title: 'Modern Painting Tools',
      icon: 'https://cdn-icons-png.flaticon.com/512/1704/1704946.png',
      description: 'Enjoy a faster, cleaner paint job with low-noise, dust-free tools.'
    },
    {
      title: 'Eco-Friendly Paints',
      icon: 'https://cdn-icons-png.flaticon.com/512/2909/2909753.png',
      description: 'Safe, sustainable paint options that protect your family and the environment.'
    },
    {
      title: 'Timely Completion',
      icon: 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png',
      description: 'We ensure the painting is done on schedule with minimal disruption.'
    },
    {
      title: 'Expert Color Matching',
      icon: 'https://cdn-icons-png.flaticon.com/512/809/809957.png',
      description: 'Advanced tools and guidance to help you match and choose the perfect shades for your space.'
    },
    {
      title: 'Wide Color Palette',
      icon: 'https://cdn-icons-png.flaticon.com/512/595/595107.png',
      description: 'Choose from a diverse range of colors to reflect your personality and home style.'
    },
    {
      title: 'Color Preview & Visualization',
      icon: 'https://cdn-icons-png.flaticon.com/512/149/149852.png',
      description: 'See how your walls will look before you paint using digital previews and expert tools.'
    },
    {
      title: 'Stain & Weather Resistant Coatings',
      icon: 'https://cdn-icons-png.flaticon.com/512/5780/5780249.png',
      description: 'Long-lasting exterior coatings that resist stains, water, and harsh weather conditions.'
    }
  // ,
  //   {
  //     title: 'Odorless & Low-VOC Paints',
  //     icon: 'https://cdn-icons-png.flaticon.com/512/2622/2622947.png',
  //     description: 'Paints designed for indoor safety, comfort, and eco-friendliness — no strong smells!'
  //   }
  ];
  
  

}
