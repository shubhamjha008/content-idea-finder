import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './features/auth/auth.component';
import { GeneratorComponent } from './features/generator/generator.component';
import { PlannerComponent } from './features/planner/planner.component';
import { CompetitorComponent } from './features/competitor/competitor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    GeneratorComponent,
    PlannerComponent,
    CompetitorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: GeneratorComponent },
      { path: 'planner', component: PlannerComponent },
      { path: 'competitor', component: CompetitorComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
