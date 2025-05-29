<script lang="ts">
	import { onMount, onDestroy }
from 'svelte';

	export let texts: string[] = ['404']; 
	export let typingSpeed: number = 100; 
	export let deletingSpeed: number = 50; 
	export let delayBetweenTexts: number = 2000; 

	let currentTextIndex = 0;
	let displayedText = '';
	let isDeleting = false;
	let charIndex = 0;

	let typingInterval: any;

	function type() {
		const currentFullText = texts[currentTextIndex];

		if (isDeleting) {
			if (charIndex > 0) {
				displayedText = currentFullText.substring(0, charIndex - 1);
				charIndex--;
				typingInterval = setTimeout(type, deletingSpeed);
			} else {
				isDeleting = false;
				currentTextIndex = (currentTextIndex + 1) % texts.length;
				typingInterval = setTimeout(type, typingSpeed); 
			}
		} else {
			if (charIndex < currentFullText.length) {
				displayedText = currentFullText.substring(0, charIndex + 1);
				charIndex++;
				typingInterval = setTimeout(type, typingSpeed);
			} else {
				isDeleting = true;
				typingInterval = setTimeout(type, delayBetweenTexts);
			}
		}
	}

	onMount(() => {
		if (texts && texts.length > 0) {
			typingInterval = setTimeout(type, typingSpeed);
		}
		return () => {
			clearTimeout(typingInterval);
		};
	});

	onDestroy(() => {
		clearTimeout(typingInterval);
	});
</script>

<span class="typewriter-text">
	{displayedText}
</span>
<span class="cursor animate-ping">_</span>

<style>
	.cursor {
		display: inline-block;
		margin-left: 2px;
		animation: blink 0.7s infinite;
	}
	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
</style>
