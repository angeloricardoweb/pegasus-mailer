import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

const nodemailer = require("nodemailer");
var mandrillTransport = require("nodemailer-mandrill-transport");

export default async function sendContact(req: NextApiRequest, res: NextApiResponse<any>) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    
  const transport = nodemailer.createTransport(
    mandrillTransport({
      auth: {
        apiKey: process.env.NODEMAILER_AUTH_PASS,
      },
    })
  );

  transport
    .sendMail({
      from: "Solicitação de contato<angeloengcomp@gmail.com",
      to: "Contato Contato <katroenssia@gmail.com>",

      subject: "Novo E-mail via Site",
      html: [
        `<div style="font-family: sans-serif; font-size:16px; color: #111;">`,
        `<p>Assunto: Interesse em veículo</P> `,
        `<p>Veículo: ${req.body.veiculo}</P> `,
        `<p>Cliente: ${req.body.nome}</P> `,
        `<p>E-mail: ${req.body.email}</P> `,
        `<p>telefone: ${req.body.telefone}</P> `,
        `</div>`,
      ].join("\n"),
    })
    .then((info: any) => {
      console.log(info);
      console.log("req");
      console.log(req.body);
      res.send("Email enviado com sucesso");
    })
    .catch((err: any) => {
      console.log(err);

      res.send("Erro no envio do email");
    });
}
