import { NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"

const resendApiKey = process.env.RESEND_API_KEY

const contactSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	message: z.string().min(10),
})

export async function POST(request: Request) {
	if (!resendApiKey) {
		return NextResponse.json(
			{ error: "Resend API key not configured" },
			{ status: 500 }
		)
	}

	let json: unknown
	try {
		json = await request.json()
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
	}

	const parseResult = contactSchema.safeParse(json)
	if (!parseResult.success) {
		return NextResponse.json(
			{ error: "Validation failed", details: parseResult.error.flatten() },
			{ status: 400 }
		)
	}

	const { name, email, message } = parseResult.data

	try {
		const resend = new Resend(resendApiKey)

		const subject = `New message from ${name}`
		const html = `
		  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#0f172a">
		    <h2 style="margin:0 0 12px">New contact form submission</h2>
		    <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
		    <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
		    <p style="margin:12px 0 0"><strong>Message:</strong></p>
		    <p style="white-space:pre-wrap;margin:6px 0 0">${escapeHtml(message)}</p>
		  </div>
		`

		await resend.emails.send({
			from: "Portfolio Contact <onboarding@resend.dev>",
			to: process.env.CONTACT_TO_EMAIL ?? "umarfarukmahama@gmail.com",
			subject,
			replyTo: email,
			html,
		})

		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error("Resend send error", error)
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 }
		)
	}
}

function escapeHtml(input: string): string {
	return input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
}

export const dynamic = "force-dynamic"

