import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Modal } from '../../modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() modalData: Modal = {title: "", type: "info", content: ""};
  opened = false;

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }
}
