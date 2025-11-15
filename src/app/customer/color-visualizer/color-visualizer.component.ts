import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-color-visualizer',
  imports: [FormsModule,CommonModule],
  templateUrl: './color-visualizer.component.html',
  styleUrl: './color-visualizer.component.css'
})
export class ColorVisualizerComponent {

  // In your .ts file
selectedColor = 'transparent';

colorOptions = [
  '#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350',
  '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c',

  // 🔵 Blue Shades
  '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5',
  '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1',

  // 🌿 Green Shades
  '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a',
  '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20',

  // 🌞 Yellow Shades
  '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58',
  '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17',

  // 🍊 Orange Shades
  '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726',
  '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100',

  // 💜 Purple Shades
  '#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc',
  '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c',

  // 💗 Pink Shades
  '#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a',
  '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f',

  // 🤎 Brown Shades
  '#efebe9', '#d7ccc8', '#bcaaa4', '#a1887f', '#8d6e63',
  '#795548', '#6d4c41', '#5d4037', '#4e342e', '#3e2723',

  // ⚪ Grey Shades
  '#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd',
  '#9e9e9e', '#757575', '#616161', '#424242', '#212121',

  // 🧊 Teal/Aqua Shades
  '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a',
  '#009688', '#00897b', '#00796b', '#00695c', '#004d40'
];


changeColor(color: string) {
  this.selectedColor = color;
}

}
