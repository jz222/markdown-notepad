import App from "./App.svelte";

// Polyfills
import "smoothscroll-polyfill";

const app = new App({
	target: document.body
});

export default app;