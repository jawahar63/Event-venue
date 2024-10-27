import { TemplateRef } from "@angular/core"



interface status{
    Open: {
        status: 'Open';
        time: string;
    };
    Closed:'Closed'
}
export interface Event{
    eventName:String,
    Status:status,
    venue:String,
    Map:TemplateRef<any>
}