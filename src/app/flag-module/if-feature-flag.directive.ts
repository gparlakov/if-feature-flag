import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeatureFlagService } from './feature-flag.service';

@Directive({
  selector: '[ifFeature]',
})
export class IfFeatureFlagDirective<IfTemplate, ElseTemplate> {
  elseTemplate?: TemplateRef<ElseTemplate>;
  flag?: string;

  private s?: Subscription;

  constructor(
    private template: TemplateRef<IfTemplate>,
    private viewContainerRef: ViewContainerRef,
    private flags: FeatureFlagService
  ) {}

  @Input('ifFeature')
  set ifFeatureFlag(flag: string) {
    this.flag = flag;
    this.updateView();
  }

  @Input('ifFeatureElse')
  set ifFeatureFlagNotPresent(t: TemplateRef<ElseTemplate>) {
    this.elseTemplate = t;
  }

  private updateView() {
    if (this.flag == null || this.s != null) {
      return;
    }

    this.s = this.flags.checkIsOn(this.flag).subscribe((on) => {
      this.viewContainerRef.clear();
      if (on) {
        this.viewContainerRef.createEmbeddedView(this.template);
      } else if (this.elseTemplate != null) {
        this.viewContainerRef.createEmbeddedView(this.elseTemplate);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.s?.unsubscribe === 'function') {
      this.s.unsubscribe();
    }
  }
}
