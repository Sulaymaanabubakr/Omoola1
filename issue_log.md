# Website Audit and Fix Log

This document tracks all identified issues and the steps taken to resolve them.

## Phase 2: Issue Identification

### Functionality Issues

*   **Cart Page Blank:** The `/cart.html` page was blank due to incorrect JavaScript logic. Fixed by rewriting `js/cart.js` to correctly use the global cart object and rendering functions. (Completed)
*   **Add to Cart:** Functionality is now fully working, including product addition, quantity update, and total calculation on the cart page. (Completed)

### Layout and Display Issues

*   **General:** Fixed content overlap with the fixed navigation bar by adding `padding-top` to the `body` in `css/styles.css`. (Completed)

### Code Cleanup

*   **Hardcoded Address:** The business address was hardcoded in multiple files and has been replaced with the new address.
*   *   Missing `favicon.ico`: The server logs show a 404 error for `favicon.ico`, indicating a missing asset.
*   **Broken Links:** Placeholder links (`href="#"`) in all HTML files have been replaced with `href="javascript:void(0)"` to prevent page reload. (Completed)

### Address Update

*   The address has been updated in all required files. (Completed)
    *   `README.md`
    *   `about.html`
    *   `cart.html`
    *   `contact.html`
    *   `index.html`
    *   `login.html`
    *   `services.html`
    *   `shop.html`
