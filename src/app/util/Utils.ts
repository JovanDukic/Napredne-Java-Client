import { AbstractControl, FormGroup } from "@angular/forms";
import { HttpResponse } from "../network/HttpResponse";

export class Utils {

    public static printMessage(httpResponse: HttpResponse) {
        alert(httpResponse.message == null ? httpResponse.reasone : httpResponse.message);
    }

    public static printErrorMessage(httpResponse: HttpResponse) {
        if(httpResponse.data != null) {
            let messages = httpResponse.data.values as String[];

            for(let i = 0; i < messages.length; i++) {
                alert(messages[i]);
            }
        } else {
            alert(httpResponse.reasone);
        }
    }

    public static checkInput(formGroup: FormGroup): boolean {
        for(let item in formGroup.controls) {
            let formControl = formGroup.get(item);
            if(!formControl.valid) {
                alert(this.getControlName(formControl) + " is required!");
                return true;    
            }     
        }
        return false;
    }
    
    public static getControlName(c: AbstractControl): string | null {
        const formGroup = c.parent.controls;
        return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }

}