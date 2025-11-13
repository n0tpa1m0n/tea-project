import { Component } from '@angular/core';
import {Tea, TeaService} from "../../services/tea.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private readonly _router: Router,
              private readonly  _service : TeaService) {



  }

  protected  _search(value?:string){
    if(!value?.length){
return
    }
        this._service.getTeas(value).subscribe(data=>{
          console.log(data);
          this._router.navigate(['/catalog']);
        })
  }
}
