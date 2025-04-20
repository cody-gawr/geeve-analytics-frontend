import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PracticeInsightRoutingModule } from './practice-insights.routing.module';
import { AppLayoutModule } from '../layout/app-layout.module';
import { PracticeInsightPageComponent } from './practice-insights.page.component';
import { PracticeInsightRecallAttendanceComponent } from './components/recall-attendance/recall-attendance.chart.component';
import { PracticeInsightAttritionRateComponent } from './components/attrition-rate/attrition-rate.chart.component';
import { PracticeInsightLifeTimeValueComponent } from './components/lifetime-value/lifetime-value.chart.component';
import { PracticeInsightOverduesComponent } from './components/overdues/overdues.chart.component';
import { PracticeInsightService } from './services/practice-insights.service';

@NgModule({
  imports: [CommonModule, SharedModule, AppLayoutModule, PracticeInsightRoutingModule],
  declarations: [
    PracticeInsightPageComponent,
    PracticeInsightRecallAttendanceComponent,
    PracticeInsightAttritionRateComponent,
    PracticeInsightLifeTimeValueComponent,
    PracticeInsightOverduesComponent,
  ],
  providers: [PracticeInsightService],
})
export class PracticeInsightModule {}
