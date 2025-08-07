import time
from playwright.sync_api import sync_playwright, Page, expect

def verify_revamp(page: Page):
    """
    Navigates the revamped portfolio, captures screenshots of key scenes.
    """
    # Navigate to the local server, with a longer timeout to accommodate the slow dev server
    page.goto("http://localhost:3000", timeout=60000)

    # 1. Verify the Hero Scene
    # Wait for the headline to be visible to ensure animations have started
    expect(page.get_by_role("heading", name="Weaving Digital Narratives")).to_be_visible(timeout=10000)
    # Give a moment for the particles to appear
    time.sleep(1)
    page.screenshot(path="jules-scratch/verification/01_hero_scene.png")

    # 2. Verify the About Scene
    # Scroll down to reveal the next scene
    page.mouse.wheel(0, 800)
    expect(page.get_by_role("heading", name="About Me")).to_be_visible(timeout=10000)
    time.sleep(1) # Allow animations to settle
    page.screenshot(path="jules-scratch/verification/02_about_scene.png")

    # 3. Verify the Projects Scene
    # Scroll down further for the horizontal project scroll
    page.mouse.wheel(0, 2000)
    # The title of the first project should be visible
    expect(page.get_by_role("heading", name="Yahoo DSP")).to_be_visible(timeout=10000)
    time.sleep(1)
    page.screenshot(path="jules-scratch/verification/03_projects_scene.png")

    # 4. Verify the Skills Scene
    page.mouse.wheel(0, 2500)
    expect(page.get_by_role("heading", name="Skills")).to_be_visible(timeout=10000)
    time.sleep(1)
    page.screenshot(path="jules-scratch/verification/04_skills_scene.png")

    # 5. Verify the Contact Scene
    page.mouse.wheel(0, 2000)
    expect(page.get_by_role("heading", name="Let's build together.")).to_be_visible(timeout=10000)
    time.sleep(1)
    page.screenshot(path="jules-scratch/verification/05_contact_scene.png")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_revamp(page)
        browser.close()

if __name__ == "__main__":
    main()
