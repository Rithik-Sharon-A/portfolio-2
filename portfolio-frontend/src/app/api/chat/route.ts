import { NextRequest, NextResponse } from 'next/server';
import {
  fetchHero,
  fetchAbout,
  fetchProjects,
  fetchStackItems,
  fetchServices,
  fetchContact,
} from '@/lib/strapi';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-exp:free';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

async function buildPortfolioContext(): Promise<string> {
  const [hero, about, projects, stackItems, services, contact] = await Promise.all([
    fetchHero(),
    fetchAbout(),
    fetchProjects(),
    fetchStackItems(),
    fetchServices(),
    fetchContact(),
  ]);

  const sections: string[] = [];

  if (hero) {
    sections.push(`## Intro\n${hero.bioLeft ?? ''} ${hero.bioRight ?? ''}\n${hero.counterLabel ?? ''}: ${hero.counterValue ?? ''}`);
  }

  if (about) {
    sections.push(
      `## About\n${[about.para1, about.para2, about.para3].filter(Boolean).join('\n')}\n` +
        `Stats: ${about.stat1Label}: ${about.stat1Value} · ${about.stat2Label}: ${about.stat2Value} · ${about.stat3Label}: ${about.stat3Value}`
    );
  }

  if (projects?.length) {
    sections.push(
      '## Projects\n' +
        projects
          .map(
            (p: { title: string; category: string; description: string; techStack: string; liveUrl: string }) =>
              `- ${p.title} (${p.category})\n  ${p.description ?? ''}\n  Tech: ${p.techStack ?? ''}${p.liveUrl ? `\n  Live: ${p.liveUrl}` : ''}`
          )
          .join('\n')
    );
  }

  if (stackItems?.length) {
    sections.push(
      '## Tech stack\n' +
        stackItems.map((s: { name: string; cricketRole: string }) => `- ${s.name} (${s.cricketRole})`).join('\n')
    );
  }

  if (services?.length) {
    sections.push(
      '## Services offered\n' +
        services.map((s: { name: string; description: string }) => `- ${s.name}: ${s.description}`).join('\n')
    );
  }

  if (contact) {
    sections.push(
      `## Contact\nEmail: ${contact.email ?? ''}\nGitHub: ${contact.github ?? ''}\nLinkedIn: ${contact.linkedin ?? ''}\nPhone: ${contact.phone ?? ''}\n${contact.availabilityText ?? ''}`
    );
  }

  return sections.join('\n\n');
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: 'Chat is not configured yet — the site owner needs to set OPENROUTER_API_KEY.' },
      { status: 200 }
    );
  }

  let body: { message?: string; history?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: 'Invalid request.' }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ reply: 'Ask me something!' }, { status: 200 });
  }

  let context: string;
  try {
    context = await buildPortfolioContext();
  } catch {
    context = '(Portfolio content is temporarily unavailable.)';
  }

  const systemPrompt = `You are the AI assistant on Rithik Sharon A's portfolio website. Answer visitor questions about Rithik using ONLY the portfolio content below. Be friendly and concise (2-4 sentences unless more detail is asked for). If a question can't be answered from the content, say you don't have that information and suggest contacting Rithik directly via the email in the contact info. Never invent facts, projects, or opinions.

# Portfolio content
${context}`;

  // Keep the last 8 turns of history to bound the prompt size
  const history = (body.history ?? []).slice(-8).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[chat] OpenRouter error', res.status, errText);
      return NextResponse.json(
        { reply: 'The assistant hit a snag talking to its model. Try again in a moment.' },
        { status: 200 }
      );
    }

    const data = await res.json();
    const reply: string | undefined = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      reply: reply || "I couldn't come up with a reply — try rephrasing?",
    });
  } catch (err) {
    console.error('[chat] request failed', err);
    return NextResponse.json(
      { reply: 'Connection to the assistant failed. Try again shortly.' },
      { status: 200 }
    );
  }
}
