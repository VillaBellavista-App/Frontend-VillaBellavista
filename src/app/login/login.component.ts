import {AfterViewInit, Component, ElementRef, Input} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {

  isLoading: boolean = false;

  userFormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(private route: Router, private elementRef: ElementRef, private userService: UserService) {
    
  }

  ngAfterViewInit() {}

  togglePasswordVisibility() {
    const lockIcon = document.getElementById("lock") as HTMLElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    if (passwordInput.type !== "password") {
      passwordInput.type = "password";
      lockIcon.classList.remove("bxs-lock-open-alt");
      lockIcon.classList.add("bxs-lock-alt");
    } else {
      passwordInput.type = "text";
      lockIcon.classList.remove("bxs-lock-alt");
      lockIcon.classList.add("bxs-lock-open-alt");
    }
  }

  login(){
    if(this.userFormGroup.valid) {
      this.isLoading = true;
      this.userService.authenticate(this.userFormGroup.get("email")?.value, this.userFormGroup.get("password")?.value).subscribe(
        (response) => {
          // local storage
          localStorage.setItem('id', String(response.id));
          //localStorage.setItem('name', response.name);

          console.log('LOGIN SUCCESSFUL');

          this.route.navigate(['/departures']);
          this.isLoading=false;
        },
        (error) => {
          this.userFormGroup.setValue({email: '', password: ''})
          this.isLoading=false;
        }
      );
    }
  }

}
