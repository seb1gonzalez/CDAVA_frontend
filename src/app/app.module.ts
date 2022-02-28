import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {ChartModule} from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TreeTableModule} from 'primeng/treetable';
import {TableModule} from 'primeng/table';
import {GMapModule} from 'primeng/gmap';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import {globals} from "./global"
import { MessageService } from 'primeng/components/common/messageservice';
import { LeftbarComponent } from './leftbar/leftbar.component';
import {SliderModule} from 'primeng/slider';
import { SelectedCrashService } from './helpers/SelectedCrashService';
import { EditCrashComponent } from './edit-crash/edit-crash.component';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import { ChargesComponent } from './charges/charges.component';
import { PersonComponent } from './person/person.component';
import { AllowedValues } from './helpers/AllowedValues';
import { UnitComponent } from './unit/unit.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { DialogModule, CardModule } from 'primeng/primeng';
import { GisAnalysisComponent } from './gis_analysis/gis-analysis.component';
import { CrashTypingComponent } from './crash-typing/crash-typing.component';
import { CountermeasuresComponent } from './countermeasures/countermeasures.component';
import {TabMenuModule} from 'primeng/tabmenu';

import { MapViewComponent } from './map-view/map-view.component';
import {ListboxModule} from 'primeng/listbox';
import {CheckboxModule} from 'primeng/checkbox';
import {SidebarModule} from 'primeng/sidebar'
import {SplitButtonModule} from 'primeng/splitbutton';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { FiltersComponent } from './filters/filters.component';
import { TrasferFilteredDataService } from './helpers/TransferFilteredDataService';
import { TableDialogService } from './helpers/TableDialogService';
import {MenuModule} from 'primeng/menu';
import {MegaMenuModule} from 'primeng/megamenu';
import { ScorecardComponent } from './scorecard/scorecard.component';
import {SafeHtmlPipe} from './pipe/SafeHtmlPipe';
import {PasswordModule} from 'primeng/password';
import { FilterRangeComponentComponent } from './filter-range-component/filter-range-component.component'
import { FilterChangeEventService } from './helpers/FilterChangeEventService';
import { ResetFilterEventService } from './helpers/ResetFilterEventService';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeftbarComponent,
    EditCrashComponent,
    ChargesComponent,
    PersonComponent,
    UnitComponent,
    GisAnalysisComponent,
    CrashTypingComponent,
    CountermeasuresComponent,
    MapViewComponent,
    FiltersComponent,
    ScorecardComponent,
    SafeHtmlPipe,
    FilterRangeComponentComponent,
    AdminComponent,
    NotFoundComponent
  ],
  imports: [
    PasswordModule,
    SplitButtonModule,
    CheckboxModule,
    ScrollPanelModule,
    ListboxModule,
    TabMenuModule,
    MenuModule,
    MegaMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    OverlayPanelModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    TreeTableModule,
    TableModule,
    SliderModule,
    GMapModule,
    TabViewModule,
    CalendarModule,
    SelectButtonModule,
    FieldsetModule,
    DropdownModule,
    MultiSelectModule,
    NgxJsonViewerModule,
    ConfirmDialogModule,
    DialogModule,
    CardModule,
    CalendarModule,
    SidebarModule,
    ChartModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [globals.restApiURL], // where to go
        blacklistedRoutes: [`${globals.restApiURL}${globals.restLogin}`], // don't put token in login
        authScheme: "Bearer " // Default value
      }
    })

  ],
  providers: [MessageService,SelectedCrashService,AllowedValues,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ConfirmationService,TrasferFilteredDataService,TableDialogService, FilterChangeEventService, ResetFilterEventService],
  bootstrap: [AppComponent]

})
export class AppModule { }
