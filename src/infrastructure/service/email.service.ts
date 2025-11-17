import nodemailer from "nodemailer";
import { config } from "../../shared/config";
import { IEmailService } from "../../domain/service-interfaces/email-service.interface";
import { EVENT_EMMITER_TYPE } from "../../shared/constants";
import { injectable } from "tsyringe";
import { eventBus } from "../../shared/eventBus";

@injectable()
export class EmailService implements IEmailService{ 
    private transporter;

    
    constructor(){
        this.transporter=nodemailer.createTransport({
          service:"gmail",
          auth:{
            user:config.email.user,
            pass:config.email.pass
          }
        });
        console.log("email started")
        this._registerEventListener()
        

    }
    private _registerEventListener():void{
        eventBus.on(EVENT_EMMITER_TYPE.SENDMAIL,this.sendMail.bind(this))
    }
    async sendMail(to: string, subject: string, html: string): Promise<void> {
        const mailOptions={
            from:"Mentor X",
            to,
            subject,
            html,
        };
        await this.transporter.sendMail(mailOptions)
        console.log("email triggered")
    }
}