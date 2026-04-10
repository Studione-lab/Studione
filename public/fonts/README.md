# Britti Sans Trial — Font Installation

The CSS is already configured to load Britti Sans Trial automatically.
You only need to place the font files here.

## Steps

1. **Download** the free trial from the official foundry:
   👉 https://noistype.com
   (Look for "Britti Sans" → "Free to Try" / "Trial")

2. **Extract** the downloaded ZIP and locate these files (names may vary slightly):
   - `BrittiSansTrial-Light.woff2`
   - `BrittiSansTrial-Light.woff`
   - `BrittiSansTrial-Regular.woff2`
   - `BrittiSansTrial-Regular.woff`

3. **Copy** those 4 files into THIS folder:
   ```
   /public/fonts/
   ```

4. **Refresh** the browser — the font activates instantly, no code changes needed.

## Font names used in CSS (`index.css`)

```css
@font-face {
  font-family: 'Britti Sans Trial';
  font-weight: 300; /* Light */
}
@font-face {
  font-family: 'Britti Sans Trial';
  font-weight: 400; /* Regular */
}
```

The CSS variable `--font-britti` already has the complete fallback chain:
```
'Britti Sans Trial' → 'DM Sans' → 'Plus Jakarta Sans' → 'Inter Tight' → system-ui
```

> **Licensing note:** The Trial version is for personal/prototype use only.
> For a published commercial site, purchase a license at noistype.com.
