import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import fs from "fs/promises"
import path from "path"

const OWNER_EMAIL = "gianni-ramdjiawan@gmail.com"

function buildDate() {
  return new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric" }).format(new Date())
}

function buildTime() {
  return new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit" }).format(new Date())
}

function cleanPhone(phone: string) {
  const digits = phone.replace(/\D/g, "")
  if (digits.startsWith("0")) return "31" + digits.slice(1)
  if (digits.startsWith("31")) return digits
  return digits
}

function fill(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce(
    (t, [k, v]) => t.replaceAll(`{{${k}}}`, v),
    template
  )
}

export async function POST(req: NextRequest) {
  try {
    const { fname, lname, email, phone, message } = await req.json()

    if (!fname || !lname || !email || !message) {
      return NextResponse.json({ error: "Verplichte velden ontbreken" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Ongeldig e-mailadres" }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Bericht te kort" }, { status: 400 })
    }

    const [customerTpl, internalTpl] = await Promise.all([
      fs.readFile(path.join(process.cwd(), "emails/confirmation-customer.html"), "utf-8"),
      fs.readFile(path.join(process.cwd(), "emails/notification-internal.html"), "utf-8"),
    ])

    const vars = {
      VOORNAAM: fname,
      ACHTERNAAM: lname,
      EMAIL: email,
      TELEFOON: phone || "—",
      TELEFOON_CLEAN: phone ? cleanPhone(phone) : "",
      BERICHT: message,
      DATUM: buildDate(),
      TIJD: buildTime(),
    }

    const customerHtml = fill(customerTpl, vars)
    const internalHtml = fill(internalTpl, vars)

    const port = Number(process.env.SMTP_PORT ?? 587)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    })

    await Promise.all([
      transporter.sendMail({
        from: `"ARA-Techniek" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Bedankt voor uw bericht — ARA-Techniek",
        html: customerHtml,
      }),
      transporter.sendMail({
        from: `"Website ARA-Techniek" <${process.env.SMTP_USER}>`,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `Nieuwe aanvraag van ${fname} ${lname}`,
        html: internalHtml,
      }),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact/route]", err)
    return NextResponse.json({ error: "Verzending mislukt" }, { status: 500 })
  }
}
