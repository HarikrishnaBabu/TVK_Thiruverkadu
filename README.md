# TVK Digital Gallery

A simple static photo-gallery website built with HTML, CSS and vanilla JavaScript. It is suitable for GitHub Pages hosting.

## Run locally
Open `index.html` in your browser. For a local development server, you can use the VS Code Live Server extension.

## Add or remove photographs
1. Copy your photograph into the suitable folder, such as `images/events/`.
2. Open `script.js`.
3. Find the `photos` array near the top.
4. Add a record at the beginning of the array:

```js
{
  title: "Your event title",
  category: "Events", // Events, Community, or Celebrations
  date: "2026-11-09", // YYYY-MM-DD
  image: "images/events/your-photo.jpg"
},
```

5. Save and push the changes to GitHub. The newest records appear first.

To remove a photograph, delete its matching record from the `photos` array. You can then delete its image file from the images folder if it is not used elsewhere.

## Add personalities
In `script.js`, edit the `personalities` array. Replace the sample names, designations and image URLs with the correct details and approved photographs. You can use a local image path, for example `images/personalities/person-name.jpg`.

## Publish with GitHub Pages
1. Create a GitHub repository, for example `tvk-digital-gallery`.
2. Upload all files and folders from this project to the repository root.
3. Open the repository on GitHub.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then click **Save**.
7. Wait for GitHub Pages to publish your website. The published URL will appear in the Pages settings.

## Important notes
- This project is static: there is no database, login system or server-side upload dashboard.
- To publish new photos, edit `script.js`, add the image files, and push the changes to GitHub.
- Demo gallery and portrait images currently use remote Unsplash image URLs. Replace them with your own authorized photographs before publishing.
- Only publish photographs and personal details that you have permission to share.
- Do not present sample portrait cards as real personality profiles. Replace or remove them before launch.
