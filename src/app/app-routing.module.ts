import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// Componentes
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { ProductsComponent } from "src/app/components/products/products.component";
import { AddProductComponent } from "src/app/components/add-product/add-product.component";
import { EditProductComponent } from "src/app/components/edit-product/edit-product.component";
import { InvoiceComponent } from "src/app/components/invoice/invoice.component";
import { OrdersComponent } from "src/app/components/orders/orders.component";
import { ProfileComponent } from "src/app/components/profile/profile.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { AccompanimentsComponent } from "src/app/components/accompaniments/accompaniments.component";
import { AdditionalComponent } from "src/app/components/additional/additional.component";
import { TamanosComponent } from "src/app/components/tamanos/tamanos.component";
import { ResumeComponent } from "src/app/components/resume/resume.component";
import { SaboresComponent } from "src/app/components/sabores/sabores.component";
import { OrdersHistoryComponent } from "src/app/components/orders-history/orders-history.component";
import { ReceiptComponent } from "src/app/components/receipt/receipt.component";
import { HelpComponent } from "src/app/components/help/help.component";
import { FaqComponent } from "src/app/components/faq/faq.component";
import { ForgottenPasswordComponent } from "src/app/components/forgotten-password/forgotten-password.component";
import { TermsComponent } from "src/app/components/terms/terms.component";
import { Error404Component } from "src/app/components/error404/error404.component";
import { ZonasComponent } from "src/app/components/zonas/zonas.component";
import { PreviewProfileComponent } from 'src/app/components/preview-profile/preview-profile.component';
import { PreviewProductComponent } from 'src/app/components/preview-product/preview-product.component';
import { Error503Component } from "./components/error503/error503.component";

// Servicio de bloqueo de rutas
import { AuthGuard } from "src/app/guards/auth/auth.guard";
import { SesionActivaGuard } from "src/app/guards/sesion-activa/sesion-activa.guard";

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "help/terms", component: TermsComponent, canActivate: [AuthGuard] },
  {
    path: "products/add",
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products/edit/:id",
    component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  { path: "invoice", component: InvoiceComponent, canActivate: [AuthGuard] },
  { path: "products/sabores", component: SaboresComponent, canActivate: [AuthGuard] },
  {
    path: "invoice/receipt/:factID",
    component: ReceiptComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "orders/history",
    component: OrdersHistoryComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "invoice/resume",
    component: ResumeComponent,
    canActivate: [AuthGuard]
  },
  { path: "orders", component: OrdersComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "zonas", component: ZonasComponent, canActivate: [AuthGuard] },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "products/accompaniments",
    component: AccompanimentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products/additional",
    component: AdditionalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products/size",
    component: TamanosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "help",
    component: HelpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "help/faq",
    component: FaqComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "preview/profile",
    component: PreviewProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "preview/product/:id",
    component: PreviewProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "forgotten-password",
    component: ForgottenPasswordComponent
  },
  {
    path: "error503",
    component: Error503Component
},
  {
    path: "**",
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
