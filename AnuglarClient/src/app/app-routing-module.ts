import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
//main


const routes: Routes = [
    { path: 'app', component: AppComponent,
      children: [
        //{ path: "products/heatexchanger",  component: Heatexchanger, }

      ]
    }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
