import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RoadmapComponent } from './roadmap.component';

@NgModule({
  declarations: [RoadmapComponent],
  imports: [SharedModule],
})
export class RoadmapModule {}
