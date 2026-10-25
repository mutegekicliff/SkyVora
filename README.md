# SkyVora Website

This is the official, multi-page HTML5 website for SkyVora. It is built using semantic HTML5, modern CSS3 (no external frameworks), and Vanilla JS, following a mobile-first approach with top-tier accessibility and SEO best practices.

## File Structure

- `index.html`: Homepage featuring high-level overview, technology diagram, and performance figures.
- `about.html`: Company overview, vision, mission, and core values.
- `solutions.html`: Detailed breakdown of parking, access control, and traffic solutions.
- `technology.html`: Deep dive into the Cytel Minicloud, LPR, and Standby Box.
- `revenue-engines.html`: Focus on Mist Wheels, Insurance Renewal, and EV Charging.
- `products.html`: Filterable grid of hardware products.
- `sectors.html`: Solutions tailored by industry sector.
- `contact.html`: Regional offices and enquiry form.
- `privacy.html`: Privacy policy.
- `404.html`: Custom error page.
- `assets/css/styles.css`: Global styles, layout grids, variables, and typography.
- `assets/js/main.js`: Mobile navigation, lazy loading, and back-to-top functionality.
- `assets/js/contact.js`: Form submission logic.
- `assets/images/`: Directory containing all visual assets.

## Deployment

This site is fully static and requires no build process. It is ready to be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any standard shared hosting environment (e.g., cPanel)

### Configuring the Contact Form
To make the contact form functional, you must configure the API endpoint in `assets/js/contact.js`. 
1. Open `assets/js/contact.js`.
2. Locate the line: `const API_ENDPOINT = '';`
3. Replace the empty string with your backend form-processing URL (e.g., Formspree, Formkeep, or a custom API endpoint).

## Editing Instructions
- **Styles**: All colors and spacing are controlled by CSS variables located at the top of `assets/css/styles.css` under the `:root` pseudo-class.
- **Content**: Content is structured in semantic HTML. To update text, simply open the respective `.html` file and edit the text inside the HTML tags (`<p>`, `<h1>`, etc.).
