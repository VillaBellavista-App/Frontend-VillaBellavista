import {AfterViewInit, Component, ElementRef, Input} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.services";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  isLoading: boolean = false;

  userFormGroup = new FormGroup({
    user_nombre: new FormControl('',[Validators.required]),
    user_apellidos: new FormControl('',[Validators.required]),
    user_email: new FormControl('',[Validators.required]),
    user_password: new FormControl('',[Validators.required])
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

  register(){
    if(this.userFormGroup.valid) {
      this.isLoading = true;
      this.userService.create(this.userFormGroup.value).subscribe(
        (response) => {
          console.log("REGISTER SUCCESSFUL");
          this.route.navigate(['/login']);
          this.isLoading=false;
        },
        (error) => {
          console.log("REGISTER NOT SUCCESSFUL");
          this.isLoading=false;
        }
      );
    }
  }
}
