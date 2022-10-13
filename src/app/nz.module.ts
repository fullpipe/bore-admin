import {NgModule} from '@angular/core';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';

const modules = [
  NzDividerModule,
  NzLayoutModule,
  NzTableModule,
  NzSpinModule,
  NzResultModule,
  NzMenuModule,
  NzBadgeModule,
  NzPopconfirmModule,
  NzButtonModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzFormModule,
  NzGridModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class NzModule {}
