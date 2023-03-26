<script>
	import '../app.postcss';
	import logo from '$lib/assets/logo.png';
	import facebook from '$lib/assets/facebook.svg';
	import github from '$lib/assets/github.svg';
	import linkedin from '$lib/assets/linkedin.svg';
	import twitter from '$lib/assets/twitter.svg';
	import youtube from '$lib/assets/youtube.svg';
</script>

<slot />

<footer class="footer footer-center p-10 bg-base-200 text-base-content">
	<div>
		<a href="https://www.equalexperts.com">
			<img alt="Equal Experts logo" src={logo} width="200" height="200" />
		</a>
		<p class="font-bold">Making Software. Better.</p>
		<p>Copyright © 2023 - All rights reserved</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a title="facebook" href="https://facebook.com/EqualExperts">
				<img alt="Facebook" src={facebook} width="36" height="36" />
			</a>
			<a title="github" href="https://github.com/EqualExperts">
				<img alt="GitHub" src={github} width="36" height="36" />
			</a>
			<a title="linkedin" href="https://linkedin.com/company/equal-experts">
				<img alt="LinkedIn" src={linkedin} width="36" height="36" />
			</a>
			<a title="twitter" href="https://twitter.com/EqualExperts">
				<img alt="Twitter" src={twitter} width="36" height="36" />
			</a>
			<a title="youtube" href="https://youtube.com/user/EqualExperts">
				<img alt="YouTube" src={youtube} width="36" height="36" />
			</a>
		</div>
	</div>
</footer>
