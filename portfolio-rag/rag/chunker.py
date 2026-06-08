import sqlite3
import os
from typing import List, Dict, Any

# Path to Strapi SQLite database
# Same machine: go up one folder from portfolio-rag to find portfolio-cms
SQLITE_PATH = os.getenv(
    "SQLITE_PATH",
    "../portfolio-cms/.tmp/data.db"
)

def get_connection():
    """Get SQLite connection"""
    if not os.path.exists(SQLITE_PATH):
        raise FileNotFoundError(
            f"SQLite DB not found at {SQLITE_PATH}. "
            f"Make sure Strapi has been run at least once."
        )
    conn = sqlite3.connect(SQLITE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def inspect_tables() -> List[str]:
    """List all tables in the SQLite database — useful for debugging"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    tables = [row[0] for row in cursor.fetchall()]
    conn.close()
    return tables

def safe_query(cursor, query: str, params=()) -> List[sqlite3.Row]:
    """Run a query safely — returns empty list if table doesn't exist"""
    try:
        cursor.execute(query, params)
        return cursor.fetchall()
    except sqlite3.OperationalError as e:
        print(f"Query failed (table may not exist): {e}")
        return []

async def fetch_strapi_content() -> List[Dict[str, Any]]:
    """
    Read all portfolio content directly from Strapi SQLite DB.
    Returns list of text chunks ready for embedding.
    """
    chunks = []

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # ── DEBUG: print all tables on first run ──────────────────────
        tables = inspect_tables()
        print(f"Available tables: {tables}")

        # ── HERO ──────────────────────────────────────────────────────
        # Strapi v5 table name: heroes
        rows = safe_query(cursor, """
            SELECT hero_word, bio_left, bio_right, counter_value, counter_label
            FROM heroes
            WHERE published_at IS NOT NULL
        """)

        # Fallback: try camelCase column names (Strapi v5 uses snake_case)
        if not rows:
            rows = safe_query(cursor, """
                SELECT heroWord, bioLeft, bioRight, counterValue, counterLabel
                FROM heroes
                WHERE publishedAt IS NOT NULL
            """)

        for row in rows:
            row = dict(row)
            values = list(row.values())
            chunks.append({
                "id": "hero_main",
                "content": f"""
Rithik Sharon A is a Full Stack Developer based in Chennai, India.
Tagline: {values[0] if len(values) > 0 else ''}
About: {values[1] if len(values) > 1 else ''} {values[2] if len(values) > 2 else ''}
Shipped: {values[3] if len(values) > 3 else ''} {values[4] if len(values) > 4 else ''}
                """.strip(),
                "source": "hero",
                "metadata": {"type": "hero"}
            })

        # ── ABOUT ─────────────────────────────────────────────────────
        rows = safe_query(cursor, """
            SELECT heading, para1, para2, para3,
                   stat1_value, stat1_label,
                   stat2_value, stat2_label,
                   stat3_value, stat3_label
            FROM abouts
            WHERE published_at IS NOT NULL
        """)

        if not rows:
            rows = safe_query(cursor, """
                SELECT heading, para1, para2, para3,
                       stat1Value, stat1Label,
                       stat2Value, stat2Label,
                       stat3Value, stat3Label
                FROM abouts
                WHERE publishedAt IS NOT NULL
            """)

        for row in rows:
            row = dict(row)
            values = list(row.values())
            chunks.append({
                "id": "about_main",
                "content": f"""
About Rithik Sharon A:
{values[0] if len(values) > 0 else ''}
{values[1] if len(values) > 1 else ''}
{values[2] if len(values) > 2 else ''}
{values[3] if len(values) > 3 else ''}
Stats: {values[4] if len(values) > 4 else ''} {values[5] if len(values) > 5 else ''},
{values[6] if len(values) > 6 else ''} {values[7] if len(values) > 7 else ''},
{values[8] if len(values) > 8 else ''} {values[9] if len(values) > 9 else ''}
                """.strip(),
                "source": "about",
                "metadata": {"type": "about"}
            })

        # ── PROJECTS ──────────────────────────────────────────────────
        rows = safe_query(cursor, """
            SELECT title, category, description, tech_stack, live_url
            FROM projects
            WHERE published_at IS NOT NULL
            ORDER BY "order" ASC
        """)

        if not rows:
            rows = safe_query(cursor, """
                SELECT title, category, description, techStack, liveUrl
                FROM projects
                WHERE publishedAt IS NOT NULL
                ORDER BY "order" ASC
            """)

        for i, row in enumerate(rows):
            row = dict(row)
            values = list(row.values())
            chunks.append({
                "id": f"project_{i}",
                "content": f"""
Project by Rithik Sharon A:
Title: {values[0] if len(values) > 0 else ''}
Category: {values[1] if len(values) > 1 else ''}
Description: {values[2] if len(values) > 2 else ''}
Technologies: {values[3] if len(values) > 3 else ''}
Live URL: {values[4] if len(values) > 4 else ''}
                """.strip(),
                "source": "projects",
                "metadata": {"type": "project", "title": values[0] if values else ""}
            })

        # ── STACK ITEMS ───────────────────────────────────────────────
        rows = safe_query(cursor, """
            SELECT name, cricket_role
            FROM stack_items
            WHERE published_at IS NOT NULL
            ORDER BY "order" ASC
        """)

        if not rows:
            rows = safe_query(cursor, """
                SELECT name, cricketRole
                FROM stack_items
                WHERE publishedAt IS NOT NULL
                ORDER BY "order" ASC
            """)

        if rows:
            all_stack = ", ".join([
                f"{list(dict(row).values())[0]} ({list(dict(row).values())[1]})"
                for row in rows
            ])
            chunks.append({
                "id": "stack_all",
                "content": f"""
Rithik Sharon A's tech stack and skills:
{all_stack}
He is proficient in full stack development using these technologies.
                """.strip(),
                "source": "stack",
                "metadata": {"type": "stack"}
            })

        # ── SERVICES ──────────────────────────────────────────────────
        rows = safe_query(cursor, """
            SELECT number, name, description
            FROM services
            WHERE published_at IS NOT NULL
            ORDER BY "order" ASC
        """)

        if not rows:
            rows = safe_query(cursor, """
                SELECT number, name, description
                FROM services
                WHERE publishedAt IS NOT NULL
                ORDER BY "order" ASC
            """)

        for i, row in enumerate(rows):
            row = dict(row)
            values = list(row.values())
            chunks.append({
                "id": f"service_{i}",
                "content": f"""
Service offered by Rithik Sharon A:
{values[0] if len(values) > 0 else ''}. {values[1] if len(values) > 1 else ''}
{values[2] if len(values) > 2 else ''}
                """.strip(),
                "source": "services",
                "metadata": {"type": "service", "name": values[1] if len(values) > 1 else ""}
            })

        # ── CONTACT ───────────────────────────────────────────────────
        rows = safe_query(cursor, """
            SELECT email, github, linkedin, phone
            FROM contacts
            WHERE published_at IS NOT NULL
        """)

        if not rows:
            rows = safe_query(cursor, """
                SELECT email, github, linkedin, phone
                FROM contacts
                WHERE publishedAt IS NOT NULL
            """)

        for row in rows:
            row = dict(row)
            values = list(row.values())
            chunks.append({
                "id": "contact_main",
                "content": f"""
Contact information for Rithik Sharon A:
Email: {values[0] if len(values) > 0 else ''}
GitHub: {values[1] if len(values) > 1 else ''}
LinkedIn: {values[2] if len(values) > 2 else ''}
Phone: {values[3] if len(values) > 3 else ''}
Available for: full-time roles and freelance projects
                """.strip(),
                "source": "contact",
                "metadata": {"type": "contact"}
            })

        conn.close()

    except FileNotFoundError as e:
        print(f"SQLite DB error: {e}")
    except Exception as e:
        print(f"Error reading SQLite content: {e}")

    print(f"Total chunks from SQLite: {len(chunks)}")
    return chunks
