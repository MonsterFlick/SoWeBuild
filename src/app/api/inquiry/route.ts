import { NextResponse } from "next/server";

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

    // Webhook URL must be provided securely via environment variables (never committed to git)
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error(
        "[Inquiry API] DISCORD_WEBHOOK_URL environment variable is not configured."
      );
      return NextResponse.json(
        {
          error:
            "Inquiry notification service is currently unconfigured. Please connect directly via WhatsApp (@sowebuild.in) or call +91 77568 98550.",
        },
        { status: 503 }
      );
    }

    // Construct high-impact Discord embed message
    const discordPayload = {
      username: "SoWeBuild Studio Leads",
      avatar_url: "https://raw.githubusercontent.com/MonsterFlick/SoWeBuild-assets/main/logos/sowebuild-symbol.png",
      embeds: [
        {
          title: "[New Project Inquiry Received]",
          description: "A new client has submitted an inquiry on **sowebuild.in**.",
          color: 12335085, // #BC37ED (Electric Violet)
          fields: [
            {
              name: "Client Name",
              value: name.trim(),
              inline: true,
            },
            {
              name: "Work Email",
              value: email.trim(),
              inline: true,
            },
            {
              name: "Phone / WhatsApp",
              value: `\`${formattedPhone}\``,
              inline: true,
            },
            {
              name: "Project Type",
              value: projectType ? String(projectType) : "Not specified",
              inline: true,
            },
            {
              name: "Requirements & Details",
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
