import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { getTranslate } from '../../../lang';

interface optionInterface {
  label: string;
  value: string;
  icon?: string;
}
@Component({
  selector: 'ngx-table-dropdown',
  templateUrl: './table-dropdown.component.html',
  styleUrls: ['./table-dropdown.component.scss'],
})
export class TableDropdownComponent implements OnInit {
  @Input() label: string =  getTranslate('choise');
  @Input() options: optionInterface[];
  @Output() onActionSelected = new EventEmitter();

  isOpened: boolean = false;

  openDropdown() {
    this.isOpened = true;
  }

  closeDropdown() {
    this.isOpened = false;
  }

  selectAction(value) {
    this.onActionSelected.emit(value);
  }

  constructor() {}

  ngOnInit() {
  }
}
