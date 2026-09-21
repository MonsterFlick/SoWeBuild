import { NextResponse } from "next/server";

const DEFAULT_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1551442838720479332/z_UHR6w_Yg0CoJ5okNuetY-Dd1M0mtKwWigQb8FXJv75DxkU7DsBSkvWowLJQPTlkuC0";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, countryCode, phone, projectType, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Strict 10-digit numeric phone validation
    const digitsOnly = String(phone || "").replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      return NextResponse.json(
        { error: "Phone number must contain exactly 10 numeric digits." },
        { status: 400 }
      );
    }

    const cCode = countryCode && typeof countryCode === "string" && countryCode.trim()
      ? countryCode.trim()
      : "+91";

    const formattedPhone = `${cCode} ${digitsOnly}`;

    // Get Webhook URL from server environment variable (never exposed to client/network tab)
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

    // Construct high-impact Discord embed message
    const discordPayload = {
      username: "SoWeBuild Studio Leads",
      avatar_url: "https://sowebuild.in/brand/sowebuild-symbol.png",
      embeds: [
        {
          title: "🚀 New Project Inquiry Received!",
          description: "A new client has submitted an inquiry on **sowebuild.in**.",
          color: 12335085, // #BC37ED (Electric Violet)
          fields: [
            {
              name: "👤 Client Name",
              value: name.trim(),
              inline: true,
            },
            {
              name: "✉️ Work Email",
              value: email.trim(),
              inline: true,
            },
            {
              name: "📱 Phone / WhatsApp",
              value: `\`${formattedPhone}\``,
              inline: true,
            },
            {
              name: "🛠️ Project Type",
              value: projectType ? String(projectType) : "Not specified",
              inline: true,
            },
            {
              name: "📝 Requirements & Details",
              value: message && message.trim() ? message.trim() : "No additional details provided.",
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "SoWeBuild Automated Lead Dispatcher · sowebuild.in",
          },
        },
      ],
    };

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!discordRes.ok) {
      const errText = await discordRes.text();
      console.error("Discord webhook dispatch error:", discordRes.status, errText);
      return NextResponse.json(
        { error: "Failed to dispatch inquiry to notification service." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project inquiry received and dispatched successfully.",
    });
  } catch (error) {
    console.error("Inquiry handler exception:", error);
    return NextResponse.json(
      { error: "Internal server error processing inquiry." },
      { status: 500 }
    );
  }
}
