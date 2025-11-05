# How to create a HTML page(hosted locally) for doing CORS requests
This is a step-by-step guide to help you on creating a local test page for CORS requests and troubleshooting common issues, specifically within an Okta environment. The objective is to create a simple HTML file that uses the JavaScript Fetch API to make an AJAX (CORS) request to an Okta API endpoint.

## 1. Hosting Locally

You cannot simply open this file using `file://....` You must host it using a simple local web server so the browser assigns it a port (e.g.,` 8080`) and a protocol (`http://`).
+ **VS Code:** If you use VS Code, install the Live Server extension and use it to run the HTML file.
+ **Python:** If you have Python installed, navigate to the directory where you saved the file and run:
  - **Python 3:** `python -m http.server 8080`
  - The page will be accessible at `http://localhost:8080/cors-test.html`.
    

## 2. Replace your Okta domain
+ Replace `{$yourOktaDomain}` in the `okta-cors-test.js` file with your actual Okta domain.
+ Endpoints callable from a browser often take a session cookie and use `/me` instead of a resource ID. The ideal endpoint for a browser-based CORS test is to get the currently authenticated user:
> **Endpoint:** `GET /api/v1/users/me`
<img width="1150" height="472" alt="oktadomain" src="https://github.com/user-attachments/assets/01067fa7-a27d-41d7-ba7e-eb856baac9ac" />

## 3. Grant cross-origin access to websites

You can enable CORS for websites that need cross-origin requests to the Okta API.
1. In the **Admin Console**, select **Security** and then **API**.
2. Select **Trusted Origins**.
3. Click **Add Origin**.
4. Enter a name for the origin. For this example, give it a meaningful name `Localhost CORS Test`.
5. Enter the base URL of the website that you want to allow cross-origin requests from. For this example, enter the exact `URL/port` from which your page is being hosted (e.g., `http://localhost:8080` or `http://127.0.0.1:5500`).
6. Select **CORS** as the **Type**. You can also enable the **Redirect** setting, which allows redirection to this Trusted Origin after a user signs in or out.
7. Click **Save**.

> [!NOTE]
> If you want to test your configuration, Grant cross-origin access to `https://developer.okta.com` and upload your Okta subdomain on the [form](https://developer.okta.com/docs/guides/enable-cors/main/#test-your-configuration) included and click **Test**.

Once saved, refresh your local HTML page (`http://localhost:8080/cors-test.html` or `http://127.0.0.1:5500/cors-test.html`). The request should now succeed, as the Okta server will recognize your local development server as a trusted origin and respond with the necessary CORS headers.

<img width="966" height="587" alt="Screenshot 2025-11-05 at 2 25 37 p m" src="https://github.com/user-attachments/assets/c3ff4ae0-c8ef-4d41-ab92-1a639ae683c7" />

