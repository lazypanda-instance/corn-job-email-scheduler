import { Request, Response } from "express";
import { EmailScheduler } from "../../jobs/email-scheduler/emailScheduler";


export default [
    {
        path: "/send-email",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const emailJob = new EmailScheduler();
                res.status(200).send("Jobs are Initiated");
            }
        ]
    }
]