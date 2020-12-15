import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { AddtodoComponent } from '../app/parts/addTodo/addTodo.component';
//main


const routes: Routes = [
    { path: 'app', component: AppComponent},
    { path: 'new', component: AddtodoComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
