import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfFeatureFlagDirective } from './if-feature-flag.directive';



@NgModule({
  declarations: [
    IfFeatureFlagDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IfFeatureFlagDirective
  ]
})
export class FlagModule { }
