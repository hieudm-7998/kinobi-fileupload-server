# [hieudm-7998] Kinobi 3rd Round Fullstack Software Engineer Take-home Assessment

This API web service is deployed at: [https://kinobi-fileupload-server.onrender.com/](https://kinobi-fileupload-server.onrender.com/)

---

## Server-side instruction

Make sure that your `nodejs` version is `22` or higher than `16`.

You can find `nodejs` install package [here](https://nodejs.org/en/download).

Pull this repository to your local machine, open terminal from this source code folder, then run this command to install the dependencies:

```
npm install
```

Run this command to run the server on local:

```
node server.js
```

If you see this log, the server are ready to server on your local:

```
🚀 File upload server serving at http://localhost:3001
```

Also, read the **note at the client source code.**

If you want to test the deployed API, here are some cURL:

* `GET` Get all the images

```
curl https://kinobi-fileupload-server.onrender.com/files
```

* `POST` Upload the image

```
curl -X POST https://kinobi-fileupload-server.onrender.com/upload \
  -F "file=@/path/to/image.jpg"
```

* `POST` Duplicate the image

```
curl -X POST https://kinobi-fileupload-server.onrender.com/files/example.jpg/duplicate
```

* `DELETE` Delete the image

```
curl -X DELETE https://kinobi-fileupload-server.onrender.com/files/example.jpg
```

---

## Breakdowns

* Supports image upload via `multipart/form-data`, with MIME-type validation (`.jpg`, `.jpeg`, `.png`) to prevent invalid files.
* RESTful endpoints include:

  * `POST /upload` – Upload a file
  * `GET /files` – List uploaded files
  * `DELETE /files/:filename` – Delete a file
  * `POST /files/:filename/duplicate` – Duplicate an existing file
* Uploaded files are stored in a public `/uploads` directory (I can't find any free hosting cloud at the moment 🤕).
* CORS and logging middleware are pre-integrated for cross-origin access and request tracing.

---



## Credit

Jake (Hieu Do Minh)

hieudm.7998@gmail.com

[https://jakedo-portfolio.vercel.app](https://jakedo-portfolio.vercel.app/)
