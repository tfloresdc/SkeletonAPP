import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInSpanishPipe } from './pipes/date-in-spanish.pipe';

@NgModule({
  declarations: [DateInSpanishPipe],
  imports: [CommonModule],
  exports: [DateInSpanishPipe]
})
export class SharedModule { }