<script>
  // Let's import application's styles
  import Tailwind from "../styles/tailwind.svelte";
	import socket from "../network/socket.js";

	// import
	import { locale, locales } from "svelte-i18n";
	import { user } from "../config/stores/user.js";
	
	import { colors, theme, Spinner } from "darkmode-components/src/index"
  import Cookie from "cookie-universal";

  // Cookies instance
  const cookies = Cookie();

	// Let's check our current language.
	const language = cookies.get('_language');

	locale.set("ru");
	if (language) {
		if ($locales.include(language)) {
			locale.set(language);
		};
	};

	// Let's check (and update if needed) our current
	// theme
	const currentTheme = cookies.get('_theme');

	theme.setTheme("light");
	if (currentTheme != null) {
		theme.setTheme(currentTheme);
	};

  // Let's get user token and then
  // let's do something very interesting...
  const token = cookies.get('_account_token');

  if (token != null) {
		user.setToken(token);
  } else {
    user.setLoaded(true);
  }
</script>

<svelte:head>
	<link rel="stylesheet" href="./fonts/Junegull/junegull.css">
</svelte:head>

{ #if $user.loaded } 
	<main>
		<slot></slot>
	</main>
{ :else }
	<div style="height: 100vh;" class="w-full flex justify-center items-center bg-black">
		<!-- Branding -->
		<div class="flex flex-col justify-center items-center">
			<Spinner size="15" color="#fff" />
		</div>
	</div>
{ /if }