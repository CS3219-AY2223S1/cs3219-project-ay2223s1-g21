import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function sendEmail(email, subject, payload, template) {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        transporter.sendMail(options(), (err, info) => {
            if (err) {
                return err;
            } else {
                return res.status(200).json({ message: "Send email success!"  });
            }
        });
    } catch (err) {
        console.log(`ERROR: Send email : ${err}`);
        return err;
    }
};