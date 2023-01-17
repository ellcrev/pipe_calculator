import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import { AppData } from "../../src/types";
import buildEmailTemplate from "../../src/buildEmailTemplate";
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.log("NO SENDGRID API KEY PROVIDED");
}

type Data = {
  operation: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const report = req.body.report as AppData;
  const imgb64 = req.body.imageURL.replace("data:image/png;base64,", "");
  const d = new Date();
  const formattedDate = d.getMonth() + 1 + "/" + d.getDate();
  const subj = report.info.meter_number + " Meter Report | " + formattedDate;
  const msg = {
    to: report.email + "@stanford.edu",
    from: "no-reply@meterlogger.com",
    subject: subj,
    html: buildEmailTemplate(report),
    attachments: [
      {
        filename: subj + ".png",
        content: imgb64,
        content_id: "report",
      },
    ],
  };
  try {
    await sgMail.send(msg);
    res.status(200).json({ operation: "Success" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ operation: "Failure" });
  }
}
