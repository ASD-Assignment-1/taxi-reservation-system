import { Component } from '@angular/core';

@Component({
  selector: 'app-status-toggle',
  templateUrl: './status-toggle.component.html',
  styleUrls: ['./status-toggle.component.scss']
})
export class StatusToggleComponent {

  currentStatus: string = 'Available'; // Initial status
  status: boolean = true; // true for Available, false for Busy

  onStatusChange(event: any): void {
    // Toggle between 'Available' and 'Busy' based on the slider value
    this.currentStatus = event.checked ? 'Available' : 'Busy';
  }
}
