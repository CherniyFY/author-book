import { NgModule } from "@angular/core";
import {
  DashboardOutline,
  FormOutline,
  MenuFoldOutline,
  MenuUnfoldOutline
} from "@ant-design/icons-angular/icons";
import { NZ_ICONS } from "ng-zorro-antd";

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline
];

@NgModule({
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsProviderModule {}
