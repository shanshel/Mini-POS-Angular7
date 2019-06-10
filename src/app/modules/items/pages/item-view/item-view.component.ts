import { ItemCreateComponent } from './../item-create/item-create.component';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';
import { BankService } from '../../../../core/services/http/bank/bank.service';
import { ItemService } from '../../../../core/services/http/item.service';
@Component({
  selector: 'ngx-items-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  lastPageInfo;
  tableActions = [
    {
      label: 'تعديل',
      value: 'edit',
      icon: 'nb-edit',
    }
  ];

  items: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private _httpItems : ItemService,
  ){}

  ngOnInit(): void {
    this.render();
  }

  render() {
    this._httpItems.GetItems({}).subscribe(res =>{
        this.items = res['data'];
        this.isPaginationNextEmpty = false;
      },
      err => {
        this.isPaginationNextEmpty = true;
      }
    );
  }

  doAction(event, item) {
     if (event === 'edit') {
      this.dialogService.open(ItemCreateComponent, {
        context: {
          item: item
        },
      }).onClose.subscribe(res => {
        this.render();
      });
    }
  }

  openCreateDialog(){
    this.dialogService.open(ItemCreateComponent, {
      context: {},
    }).onClose.subscribe(res => {
      this.render();
    });
  }

}
