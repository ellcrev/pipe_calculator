import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
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
  // console.log("running on server");
  // console.log(req.body.imageBlob);
  const msg = {
    to: "crevier@stanford.edu",
    from: "ejcrevier@gmail.com",
    subject: "Super cool email :)",
    html: `Wow it <strong>works</strong>!`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email Sent.");
    res.status(200).json({ operation: "Success" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ operation: "Failure" });
  }
}
