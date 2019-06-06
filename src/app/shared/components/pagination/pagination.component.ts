import { Component, OnInit, SimpleChanges, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() limit = 10;
  @Input() isEmptyNext: boolean;
  @Output() pageChange = new EventEmitter();
  @Output() pageInit = new EventEmitter();
  currentPage = 1;
  isPrevDisabled: boolean;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
  ) { }


  ngOnInit() {
    if (this._activeRoute.snapshot.queryParams.page) {
      this.currentPage = parseInt(this._activeRoute.snapshot.queryParams.page, null);
    }

    this.pageInitFired();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isEmptyNext.currentValue === true || changes.isEmptyNext.previousValue === false ) {
      this.prev();
      this.isPrevDisabled = this.currentPage === 1 ? true : false;
    }
  }

  pageInitFired() {
    this.pageInit.emit({
      start: this.limit * (this.currentPage - 1),
      end: this.limit,
      currentPage: this.currentPage,
      limit: this.limit,
    });

    this.isPrevDisabled = this.currentPage === 1 ? true : false;
  }

  prepareNext() {
    this.isPrevDisabled = this.currentPage === 1 ? true : false;

    this.pageChange.emit({
      start: this.limit * ( this.currentPage - 1 ),
      end: this.limit,
      currentPage: this.currentPage,
      limit: this.limit,
    });
  }

  prev() {
    if (this.currentPage === 1) {
      this.isPrevDisabled = true;
     return;
    } else {
     this.isPrevDisabled = false;
      this._router.navigate(
        [],
        {
          relativeTo: this._activeRoute,
          queryParams: { page: this.currentPage - 1 },
          queryParamsHandling: 'merge',
        },
      );
      this.currentPage -= 1;
      this.prepareNext();
    }

  }

  next() {
    this.isPrevDisabled = false;
    if (this.isEmptyNext === true) {
      return;
    }
    this._router.navigate(
      [],
      {
        relativeTo: this._activeRoute,
        queryParams: { page: this.currentPage + 1 },
        queryParamsHandling: 'merge',
    });
    this.currentPage += 1;
    this.prepareNext();
  }

}
