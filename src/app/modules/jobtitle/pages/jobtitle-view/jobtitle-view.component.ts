import { JobTitleService } from './../../../../core/services/http/jobtitle/jobtitle.service';
import { JobtitleCreateComponent } from './../jobtitle-create/jobtitle-create.component';
import { ToastrService } from './../../../../shared/services/toastr.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { getTranslate } from '../../../../lang';
@Component({
  selector: 'ngx-jobtitle-view',
  templateUrl: './jobtitle-view.component.html',
  styleUrls: ['./jobtitle-view.component.scss']
})
export class JobtitleViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  lastPageInfo;
  tableActions = [
    {
      label: getTranslate('edit') ,
      value: 'edit',
      icon: 'nb-edit',
    }
  ];

  jobtitles: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private _httpJobTitle: JobTitleService,
  ){}

  ngOnInit(): void {
    this.renderJobTitles();
  }

  renderJobTitles() {
    this._httpJobTitle.getJobTitles({}).subscribe(res =>{
        this.jobtitles = res['data'];
        this.isPaginationNextEmpty = false;
      },
      err => {
        this.isPaginationNextEmpty = true;
      }
    );
  }

  doAction(event, item) {
     if (event === 'edit') {
      this.dialogService.open(JobtitleCreateComponent, {
        context: {
          item: item
        },
      }).onClose.subscribe(res => {
        this.renderJobTitles();
      });
    }
  }

  openCreateDialog(){
    this.dialogService.open(JobtitleCreateComponent, {
      context: {},
    }).onClose.subscribe(res => {
      this.renderJobTitles();
    });
  }

}
