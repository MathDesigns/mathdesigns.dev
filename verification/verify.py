from playwright.sync_api import sync_playwright, expect
import time

def verify_page(page):
    print("Navigating to home page...")
    page.goto("http://localhost:5173/")
    expect(page).to_have_title("Mathéo S. | Fullstack Developer")

    print("Taking hero screenshot...")
    page.screenshot(path="verification/hero.png")

    print("Clicking View Work...")
    # View Work button goes to #projects
    page.get_by_role("link", name="View Work").click()

    # Wait a bit for scroll animation
    time.sleep(1)

    # Expect "Selected Works" to be visible
    print("Checking Selected Works...")
    expect(page.get_by_role("heading", name="Selected Works")).to_be_visible()

    print("Taking projects screenshot...")
    page.screenshot(path="verification/projects.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_page(page)
        finally:
            browser.close()
